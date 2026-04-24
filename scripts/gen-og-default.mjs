#!/usr/bin/env node
/**
 * scripts/gen-og-default.mjs
 *
 * 生成 public/og-default.png —— 1200×630 的站点 OG 缩略图。
 * 无外部图像依赖：纯 Node 标准库（zlib CRC + deflate）手写 PNG。
 *
 * 视觉：对角渐变（深紫→品牌粉），右下角柔光圆斑，右上角角标纹理。
 * 设计目标：Twitter/Facebook/微信卡片里有辨识度即可，不放文字（字体依赖太重）。
 *
 * 用法：`node scripts/gen-og-default.mjs`。
 * 文章若希望自定义卡片，在 frontmatter 填 `heroImage`，Layout 会优先使用它。
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'og-default.png');

const W = 1200,
  H = 630;

// ── 像素数据（RGB） ────────────────────────────────────────────────
// 渐变：左上 #0f0f12 → 右下 #ff2d6b，叠加右下 radial 光晕。
const pixels = Buffer.alloc(W * H * 3);

// 左上深紫、右下品牌粉
const [r0, g0, b0] = [0x0f, 0x0f, 0x12];
const [r1, g1, b1] = [0xff, 0x2d, 0x6b];

// 右下光晕中心（相对坐标 0-1）
const glowCx = 0.78,
  glowCy = 0.62;
const [gr, gg, gb] = [0xff, 0xaa, 0x00]; // 琥珀金

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // 对角渐变权重
    const t = (x / W + y / H) / 2;
    let r = r0 + (r1 - r0) * t;
    let g = g0 + (g1 - g0) * t;
    let b = b0 + (b1 - b0) * t;

    // 右下暖光晕：高斯距离衰减
    const dx = x / W - glowCx;
    const dy = y / H - glowCy;
    const d2 = dx * dx + dy * dy;
    const glow = Math.exp(-d2 / 0.08) * 0.45;
    r = r + (gr - r) * glow;
    g = g + (gg - g) * glow;
    b = b + (gb - b) * glow;

    const o = (y * W + x) * 3;
    pixels[o] = Math.max(0, Math.min(255, r | 0));
    pixels[o + 1] = Math.max(0, Math.min(255, g | 0));
    pixels[o + 2] = Math.max(0, Math.min(255, b | 0));
  }
}

// ── PNG 编码（手写，按 PNG 规范 https://www.w3.org/TR/png/） ──────
// scanline 前置 1 字节 filter（0 = None）
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0;
  pixels.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3);
}

// PNG CRC-32（标准多项式 0xEDB88320）
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// IHDR：13 字节（width + height + bitDepth + colorType + compression + filter + interlace）
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // 8-bit depth
ihdr[9] = 2; // truecolor RGB
ihdr[10] = 0; // compression: deflate
ihdr[11] = 0; // filter: adaptive (PNG 唯一合法值)
ihdr[12] = 0; // interlace: none

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), // PNG 签名
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, png);

const sha = createHash('sha256').update(png).digest('hex').slice(0, 12);
console.log(`✔ wrote ${OUT}  ${(png.length / 1024).toFixed(1)} KB  sha256:${sha}`);
