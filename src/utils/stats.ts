/**
 * @file utils/stats.ts
 * @description 站点统计的**唯一**来源。所有页面/组件展示的「文章数/标签数/分类数/字符数」
 *              必须走这里，保证各页数字口径一致。
 *
 * 口径约定：
 *  - 文章数  = 非草稿文章总数
 *  - 分类数  = **顶级分类**去重后的数量（category[0]），而不是叶子
 *  - 标签数  = 标签去重后的数量
 *  - 字符数  = 所有非草稿文章正文长度之和（不含 frontmatter）
 */

import { getCollection } from 'astro:content';

export async function getSiteStats() {
  const allPosts = (await getCollection('posts', (p) => !p.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  // 标签计数
  const tagCounts: Record<string, number> = {};
  // 顶级分类计数（Sidebar 分类列表 + about 分类数都用这个）
  const categoriesByTopLevel: Record<string, number> = {};
  let totalBodyChars = 0;

  for (const p of allPosts) {
    for (const t of p.data.tags) {
      tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }
    const top = p.data.category[0];
    if (top) {
      categoriesByTopLevel[top] = (categoriesByTopLevel[top] ?? 0) + 1;
    }
    totalBodyChars += p.body.length;
  }

  const allTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b]! - tagCounts[a]!);

  return {
    allPosts,
    totalPosts: allPosts.length,
    totalTags: allTags.length,
    totalCategories: Object.keys(categoriesByTopLevel).length,
    totalBodyChars,
    tagCounts,
    allTags,
    categoriesByTopLevel,
  };
}

/** 数字缩写：1234 → "1.2k" */
export const kilo = (n: number): string => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
