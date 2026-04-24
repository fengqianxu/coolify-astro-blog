/**
 * @file types/index.ts
 * @description 全站共享类型定义。组件 Props 若与此处类型重叠，
 *              直接 import 而非重复声明。
 */

/** 文章元数据（对应 content/config.ts 的 schema） */
export interface PostMeta {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags: string[];
  category: string[]; // 层级路径，如 ["考试","申论","大作文"]
  draft: boolean;
  featured: boolean;
}

/** PostCard / 列表展示用的精简版本 */
export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
  category: string[]; // 层级路径
  heroImage?: string;
  featured?: boolean;
}

/** 侧边栏所需聚合数据 */
export interface SidebarData {
  allTags: string[];
  tagCounts: Record<string, number>;
  recentPosts: Pick<PostSummary, 'slug' | 'title' | 'pubDate'>[];
  /** 顶级分类 → 该分类下文章数（口径与 about 页"分类数"一致） */
  categories: Record<string, number>;
  /** 非草稿文章总数（保证侧边栏与 about 页一致，不要自己从 tagCounts 求和） */
  totalPosts: number;
}

/** 搜索索引条目（序列化给客户端） */
export interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string[]; // 层级路径
  pubDate: string; // ISO string（Date 不可 JSON 序列化）
}

/**
 * 运行时校验：判断一个未知对象是否是合法的 SearchEntry。
 * 用于 fetch('/api/posts.json') 之后的结果校验，避免字段缺失/类型不匹配
 * 导致运行时 `undefined.toLowerCase()` 之类的崩溃。
 *
 * 故意写成纯类型守卫（不引入 zod），客户端 bundle 零额外体积。
 */
export function isSearchEntry(x: unknown): x is SearchEntry {
  if (x === null || typeof x !== 'object') return false;
  const e = x as Record<string, unknown>;
  const isStr = (v: unknown): v is string => typeof v === 'string';
  const isStrArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isStr);
  return (
    isStr(e.slug) &&
    isStr(e.title) &&
    isStr(e.description) &&
    isStrArray(e.tags) &&
    isStrArray(e.category) &&
    isStr(e.pubDate)
  );
}

/**
 * 只传递 `category` 字段的极简入参类型。
 * 给 utils/category.ts 用 —— 接受任何形如 `{ category: string[] }` 的对象，
 * 因此 CollectionEntry<'posts'>.data / PostMeta / PostSummary 都能传入。
 */
export interface CategoryData {
  category: string[];
}
