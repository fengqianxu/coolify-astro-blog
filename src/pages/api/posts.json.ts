/**
 * @file pages/api/posts.json.ts
 * @description 构建时生成的搜索索引端点。
 *              返回所有已发布文章的精简元数据 JSON，供客户端搜索组件懒加载。
 *
 * 访问路径：/api/posts.json
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { SearchEntry } from '../../types';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', (p) => !p.data.draft);

  const index: SearchEntry[] = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      tags: p.data.tags,
      category: p.data.category,
      pubDate: p.data.pubDate.toISOString(),
    }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
