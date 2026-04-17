/**
 * @file site.ts
 * @description 全站唯一配置入口。所有组件从这里读取站点常量，
 *              不得在模板里硬编码站名、链接、作者信息等。
 */

export const SITE = {
  /** 站点名称，用于 <title>、logo 等
   *  helt：北欧语「英雄」，亦作 He L(ingtao) T 拼音缩写 */
  name: 'HeltLog',

  /** 默认 meta description —— 苏轼《和子由渑池怀旧》 */
  description: '人生到处知何似，应似飞鸿踏雪泥',

  /** 部署后的完整 URL（不含结尾斜杠） */
  url: 'https://your-blog.com',

  /** 作者昵称 */
  author: '何凌韬',

  /** 作者简介 */
  bio: '后端开发者（Java），代码之外读书、备考、写点闲笔。偶为飞鸿，聊留指爪。',

  /** 头像路径（相对于 public/） */
  avatar: '/avatar.png',

  /** 主题色（用于 <meta name="theme-color">） */
  themeColor: '#FF2D6B',

  /** 主页全屏背景视频（暗色模式 - Saber） */
  heroVideo: '/videos/bg.mp4',

  /** 主页全屏背景视频（亮色模式 - 日间版本） */
  heroVideoLight: '/videos/bg-day.mp4',

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
  '考试':  '📚',
  '申论':  '✒️',
  '行测':  '🔢',
  '读书':  '📖',
  '随笔':  '✏️',
};

/** 默认封面渐变（分类 → Tailwind gradient 类名） */
export const CATEGORY_GRADIENT: Record<string, string> = {
  '技术':   'from-gray-950/80   to-zinc-900/60',
  '二次元': 'from-rose-950/80   to-pink-900/60',
  '随笔':   'from-stone-900/80  to-zinc-950/60',
};
