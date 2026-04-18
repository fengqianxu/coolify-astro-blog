import { defineCollection, z } from 'astro:content';

/**
 * 文章 frontmatter 模式。
 *
 * category 支持两种写法（兼容）：
 *   - 字符串：  category: "技术"                    → 视作 ["技术"]
 *   - 路径数组：category: ["考试", "申论", "大作文"]   → 保持层级
 *
 * 读取时统一用 src/utils/category.ts 的帮助函数，不要直接 data.category[0]。
 *
 * 校验策略：
 *  - title 1..120 字符，避免 <title> 过长被截断
 *  - description 1..200 字符，SEO 建议 ≤ 160，给一点缓冲
 *  - heroImage 必须是 `/` 开头的绝对路径或合法 URL（禁相对路径，避免构建后 404）
 *  - tags 全部 trim 后非空，避免列表里混进空串
 */
const heroImageSchema = z
  .string()
  .refine(
    (s) => s.startsWith('/') || /^https?:\/\//.test(s),
    { message: 'heroImage 必须是 / 开头的绝对路径或 http(s) URL' },
  );

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string().min(1).max(120),
    description: z.string().min(1).max(200),
    pubDate:     z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage:   heroImageSchema.optional(),
    tags:        z.array(z.string().trim().min(1)).default([]),
    category:    z.preprocess(
      (v) => (typeof v === 'string' ? [v] : v),
      z.array(z.string().trim().min(1)).min(1),
    ).default(['随笔']),
    draft:       z.boolean().default(false),
    featured:    z.boolean().default(false),
  })
  // updatedDate 必须不早于 pubDate，否则是写错了
  .refine(
    (d) => !d.updatedDate || d.updatedDate.valueOf() >= d.pubDate.valueOf(),
    { message: 'updatedDate 不能早于 pubDate', path: ['updatedDate'] },
  ),
});

export const collections = { posts };
