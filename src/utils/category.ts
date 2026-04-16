/**
 * @file utils/category.ts
 * @description 分类路径处理工具。category 统一是 string[]（从根到叶）。
 *              所有组件/页面都走这里的帮助函数，不要直接解构 data.category。
 */

/** 分类路径（从根到叶），例如 ["考试", "申论", "大作文"] */
export const catPath = (data: { category: string[] }): string[] => data.category;

/** 叶子分类名（用于卡片/胶囊上显示最具体的那一项） */
export const catLeaf = (data: { category: string[] }): string => {
  const p = data.category;
  return p[p.length - 1] ?? '随笔';
};

/** 字符串化路径，默认用 " / " 连接，用于面包屑显示 */
export const catPathStr = (data: { category: string[] }, sep = ' / '): string =>
  data.category.join(sep);

/** 用作 Map key 的紧凑字符串（"考试/申论/大作文"） */
export const catKey = (data: { category: string[] }): string =>
  data.category.join('/');

/** 对齐 URL slug 的路径（不转义，由调用方按需 encodeURIComponent） */
export const catSlug = (path: string[]): string => path.join('/');
