---
title: "Astro + Tailwind CSS 实战技巧"
description: "分享在使用 Astro 和 Tailwind CSS 搭建博客过程中积累的一些实用技巧。"
pubDate: 2026-04-10
tags: ["Astro", "Tailwind", "技术"]
category: "技术"
---

## 1. 暗色模式的最佳实践

使用 `class` 策略比 `media` 策略更灵活，可以让用户自由切换：

```js
// tailwind.config.mjs
export default {
  darkMode: 'class',
  // ...
}
```

然后在 `<html>` 上加 `class="dark"` 即可默认启用暗色模式。

## 2. 玻璃拟态卡片

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

这个效果在深色背景下非常漂亮，是二次元风格 UI 的标配。

## 3. CSS 变量 + Tailwind 的组合

```css
:root {
  --reading-progress: 0%;
}

.reading-progress {
  width: var(--reading-progress);
}
```

搭配 JS 动态更新 CSS 变量，阅读进度条就完成了。

## 4. Astro 内容集合类型安全

```typescript
import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title:   z.string(),
    pubDate: z.coerce.date(),
    tags:    z.array(z.string()).default([]),
  }),
});
```

Zod schema 让你的 frontmatter 完全类型安全，爽！
