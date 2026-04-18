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
  url: 'https://blog.helingtao.com',

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

/**
 * 列表 / 切片的数量上限。
 * 统一集中管理，避免在模板里散落 `.slice(0, 8)` 这种魔法数字。
 */
export const LIMITS = {
  /** 首页精选卡片数量 */
  homeFeatured:  8,
  /** 搜索结果展示条数 */
  searchResults: 8,
  /** 侧边栏「最近文章」条数 */
  sidebarRecent: 5,
  /** 文章卡片上最多展示的 tag 数 */
  postCardTags:  3,
  /** 标签云里最多展示多少标签（0 = 不限制） */
  tagCloudMax:   0,
} as const;

/** 「此刻」小卡片列表 —— 在 /about 页展示 */
export const NOW_LIST = [
  { icon: 'tv',   label: '在追', title: '春季番巡礼',            sub: '详情见 /blog 里的追番指南' },
  { icon: 'book', label: '在读', title: '《程序员修炼之道》',     sub: '查漏补缺' },
  { icon: 'game', label: '在玩', title: '独立游戏 Hollow Knight', sub: '白宫通关中' },
] as const;

/**
 * 社交 / 联系方式 —— 在 /about 页展示。
 * TODO(owner): 若有新的社交平台，按此结构追加；href 若暂无请填 '#' 并在 UI
 * 层通过 `href === '#'` 决定渲染方式（避免放弃式 mailto:hello@example.com）。
 */
export const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/coderhelt',        icon: 'github' },
  { name: 'RSS',    href: '/rss.xml',                            icon: 'rss'    },
  { name: 'Email',  href: 'mailto:hello@helingtao.com',          icon: 'mail'   },
] as const;

/**
 * /about 页的技术栈矩阵。
 * 从 about.astro 外提到 config，和 NOW_LIST / SOCIALS 同处管理，
 * 改一个地方即可；accent 走 sakura / mint / gold 三档色调与全站一致。
 */
export const ABOUT_STACKS = [
  {
    group: '语言',
    items: [
      { name: 'Java',       accent: 'sakura', note: '主力' },
      { name: 'Python',     accent: 'mint',   note: '略懂' },
      { name: 'SQL',        accent: 'gold' },
    ],
  },
  {
    group: '后端 & 存储',
    items: [
      { name: 'Spring Boot', accent: 'sakura' },
      { name: 'MySQL',       accent: 'gold'   },
      { name: 'Redis',       accent: 'sakura' },
      { name: 'MyBatis',     accent: 'mint'   },
    ],
  },
  {
    group: '工具',
    items: [
      { name: 'Git',    accent: 'gold'   },
      { name: 'Docker', accent: 'sakura' },
      { name: 'Linux',  accent: 'mint'   },
    ],
  },
] as const;
