import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// NOTE: 若要修改站点域名，请同时更新 src/config/site.ts 的 SITE.url
// 这里不直接 import .ts 是为了避免给 astro 的 config loader 加额外约束
export default defineConfig({
  // 全站绝对 URL —— canonical / sitemap / og:url 都会基于这个生成
  site: 'https://blog.helingtao.com',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
