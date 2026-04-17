/**
 * @file utils/ui.ts
 * @description 纯展示计算（字号、颜色 hash 等）。
 *              所有页面/组件需要同样视觉规则的地方走这里，避免魔法公式散落。
 */

/**
 * 标签字号：出现次数越多越大，值域被上下限夹住。
 *
 * @param count    该标签的出现次数（默认 1）
 * @param opts.min 下界（px），默认 10
 * @param opts.max 上界（px），默认 14
 * @param opts.unit 每次增加的像素数，默认 1.5
 */
export function tagFontSizePx(
  count: number,
  opts: { min?: number; max?: number; unit?: number } = {},
): string {
  const { min = 10, max = 14, unit = 1.5 } = opts;
  const size = Math.max(min, Math.min(max, min + count * unit));
  return `${size}px`;
}

/** 把字符串哈希到一个固定长度的调色板下标（稳定、无副作用） */
export function hashToPaletteIndex(s: string, len: number): number {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % len;
}
