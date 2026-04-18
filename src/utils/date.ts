/**
 * @file utils/date.ts
 * @description 统一日期格式化工具。避免在模板里散落 `toLocaleDateString` 的不同形参。
 *
 * 命名约定：
 *  - `fmtYMD`  : 2024-03-05  （datetime 属性、RSS、JSON-LD 等机器场景）
 *  - `fmtMD`   : 03-05        （归档列表、分类树）
 *  - `fmtLong` : 2024年3月5日 （正文、卡片等人类阅读场景）
 */

const pad = (n: number): string => String(n).padStart(2, '0');

/** 2024-03-05 —— 机器可读，用于 <time datetime> / RSS / JSON-LD */
export function fmtYMD(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 03-05 —— 年内分组列表用 */
export function fmtMD(d: Date): string {
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 2024年3月5日 —— 人类可读中文长格式 */
export function fmtLong(d: Date): string {
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** 2024-03-05 等价，但 locale 化短形 —— 与 fmtYMD 一致，保留别名以语义化 */
export const fmtShort = fmtYMD;

/** 3月5日 —— 侧边栏/当年最近列表用 */
export function fmtMonthDayCN(d: Date): string {
  return d.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
}
