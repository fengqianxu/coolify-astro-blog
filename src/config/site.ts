/**
 * @file site.ts
 * @description 全站唯一配置入口。所有组件从这里读取站点常量，
 *              不得在模板里硬编码站名、链接、作者信息等。
 */

export const SITE = {
  /** 站点名称，用于 <title>、logo 等 */
  name: 'AniLog',

  /** 默认 meta description */
  description: '记录技术成长，分享二次元热情',

  /** 部署后的完整 URL（不含结尾斜杠） */
  url: 'https://your-blog.com',

  /** 作者昵称 */
  author: '博主',

  /** 作者简介 */
  bio: '热爱动漫、代码和咖啡的前端开发者。在这里记录技术成长与生活感悟。',

  /** 头像路径（相对于 public/） */
  avatar: '/avatar.png',

  /** 主题色（用于 <meta name="theme-color">） */
  themeColor: '#f472b6',

  /** 主页全屏背景视频路径（相对于 public/） */
  heroVideo: '/videos/bg.mp4',

  /** 网站 locale */
  locale: 'zh-CN',
} as const;

/** 顶部导航链接列表 */
export const NAV_LINKS = [
  { href: '/',      label: '首页' },
  { href: '/blog',  label: '文章' },
  { href: '/tags',  label: '标签' },
  { href: '/about', label: '关于' },
] as const;

/** 文章分类对应的 emoji */
export const CATEGORY_EMOJI: Record<string, string> = {
  '技术':  '⚙️',
  '二次元': '🌸',
  '随笔':  '✏️',
  '游戏':  '🎮',
  '音乐':  '🎵',
};

/** 默认封面渐变（分类 → Tailwind gradient 类名） */
export const CATEGORY_GRADIENT: Record<string, string> = {
  '技术':   'from-indigo-950/80 to-violet-900/60',
  '二次元': 'from-pink-950/80   to-fuchsia-900/60',
  '随笔':   'from-slate-900/80  to-indigo-950/60',
};
