---
title: "你好，AniLog！"
description: "博客上线啦！来聊聊为什么用 Astro 搭建这个博客，以及接下来的计划。"
pubDate: 2026-04-14
tags: ["Astro", "博客", "随笔"]
category: "随笔"
featured: true
---

## 为什么要搭建博客？

其实这个问题我想了很久。在各种社交平台上发帖，内容总是碎片化的，也没有一个属于自己的空间。终于，在某个喝着手冲咖啡的午后，我决定——**自己搭一个**。

## 为什么选 Astro？

> 用最少的 JavaScript，输出最快的网页。

Astro 的这个理念深深吸引了我。作为一个内容博客，根本不需要大量的客户端交互，静态生成才是王道。

```typescript
// 这就是 Astro 内容集合的魅力
const posts = await getCollection('posts');
const sorted = posts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
```

## 接下来的计划

- [ ] 写更多技术文章
- [ ] 分享追番笔记
- [ ] 完善评论系统
- [ ] RSS 订阅支持

感谢你的阅读，希望这个小站能给你带来一丝温暖 🌸
