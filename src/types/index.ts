/**
 * @file types/index.ts
 * @description 全站共享类型定义。组件 Props 若与此处类型重叠，
 *              直接 import 而非重复声明。
 */

/** 文章元数据（对应 content/config.ts 的 schema） */
export interface PostMeta {
  title:        string;
  description:  string;
  pubDate:      Date;
  updatedDate?: Date;
  heroImage?:   string;
  tags:         string[];
  category:     string;
  draft:        boolean;
  featured:     boolean;
}

/** PostCard / 列表展示用的精简版本 */
export interface PostSummary {
  slug:        string;
  title:       string;
  description: string;
  pubDate:     Date;
  tags:        string[];
  category:    string;
  heroImage?:  string;
  featured?:   boolean;
}

/** 侧边栏所需聚合数据 */
export interface SidebarData {
  allTags:     string[];
  tagCounts:   Record<string, number>;
  recentPosts: Pick<PostSummary, 'slug' | 'title' | 'pubDate'>[];
  categories:  Record<string, number>;
}

/** 搜索索引条目（序列化给客户端） */
export interface SearchEntry {
  slug:        string;
  title:       string;
  description: string;
  tags:        string[];
  category:    string;
  pubDate:     string; // ISO string（Date 不可 JSON 序列化）
}
