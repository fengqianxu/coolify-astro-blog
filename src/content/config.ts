import { defineCollection, z } from 'astro:content';

/**
 * 文章 frontmatter 模式。
 *
 * category 支持两种写法（兼容）：
 *   - 字符串：  category: "技术"                    → 视作 ["技术"]
 *   - 路径数组：category: ["考试", "申论", "大作文"]   → 保持层级
 *
 * 读取时统一用 src/utils/category.ts 的帮助函数，不要直接 data.category[0]。
 */
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage:   z.string().optional(),
    tags:        z.array(z.string()).default([]),
    category:    z.preprocess(
      (v) => (typeof v === 'string' ? [v] : v),
      z.array(z.string()).min(1),
    ).default(['随笔']),
    draft:       z.boolean().default(false),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { posts };
