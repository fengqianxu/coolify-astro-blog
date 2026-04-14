---
title: "TypeScript 泛型实战：从入门到真香"
description: "通过实际案例理解 TypeScript 泛型，让你的代码更健壮、更优雅。"
pubDate: 2026-03-28
tags: ["TypeScript", "技术", "教程"]
category: "技术"
---

## 为什么需要泛型？

没用泛型前：

```typescript
function identity(arg: any): any {
  return arg;  // 类型信息完全丢失
}
```

用了泛型后：

```typescript
function identity<T>(arg: T): T {
  return arg;  // 类型安全！
}

const result = identity<string>('hello');  // result: string
```

## 常用泛型工具类型

```typescript
// Partial — 所有属性变可选
type DraftPost = Partial<Post>;

// Required — 所有属性变必须
type PublishedPost = Required<Post>;

// Pick — 挑选部分属性
type PostPreview = Pick<Post, 'title' | 'pubDate' | 'slug'>;

// Omit — 排除部分属性
type PostWithoutContent = Omit<Post, 'content'>;
```

## 实战：通用的 API 响应类型

```typescript
interface ApiResponse<T> {
  data:    T;
  status:  number;
  message: string;
}

async function fetchPosts(): Promise<ApiResponse<Post[]>> {
  const res  = await fetch('/api/posts');
  return res.json();
}

// data 的类型自动推断为 Post[]
const { data } = await fetchPosts();
```

泛型是 TypeScript 最强大的特性之一，掌握它你会爱上写类型 🎉
