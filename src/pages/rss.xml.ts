/**
 * @file pages/rss.xml.ts
 * @description 构建时生成 RSS 2.0 订阅源（/rss.xml）。
 *              Layout.astro / Footer.astro / about.astro 的 RSS 链接都指向它。
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', (p) => !p.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    // context.site 来自 astro.config.mjs 的 `site` 字段；未配置时回退到 SITE.url
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.slug}/`,
      // 分类路径 + 标签合并去重（category 的叶子常和 tag 重合）
      categories: [...new Set([...p.data.category, ...p.data.tags])],
      author: SITE.author,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
