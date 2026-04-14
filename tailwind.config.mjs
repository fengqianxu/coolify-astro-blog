/**
 * @file tailwind.config.mjs
 * @description Tailwind 配置 —— "暗紫樱花" 主题（Twilight Sakura）
 *
 * 调色盘设计原则：
 *  - 背景：深靛紫 #13111c（与 Saber 视频的暗色调一致）
 *  - 强调：樱花粉 #f472b6 + 薰衣草紫 #c084fc（呼应视频中的粉紫剑光）
 *  - 文字：淡紫白 #ede9fe（不刺眼，保持可读性）
 *  - 点缀：暖金 #fbbf24（对应 Saber 的金色眼睛）
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Color tokens ──────────────────────────────────────
      colors: {
        /** 樱花粉系 */
        sakura: {
          100: '#ffe4f0',
          200: '#fecdd3',
          300: '#fda4c4',
          400: '#fb7db0',
          500: '#f472b6',
          600: '#ec4899',
          700: '#db2777',
        },
        /** 薰衣草紫系 */
        lavender: {
          100: '#f5f3ff',
          200: '#ede9fe',
          300: '#ddd6fe',
          400: '#c4b5fd',
          500: '#c084fc',
          600: '#a855f7',
          700: '#9333ea',
        },
        /** 深色背景系（页面基底） */
        void: {
          950: '#0d0b14',
          900: '#13111c',
          800: '#1e1a2e',
          700: '#251f3d',
          600: '#2e284d',
          500: '#3b3460',
        },
        /** 暖金（点缀色） */
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        /** 薄荷绿（成功/在线状态） */
        mint: {
          400: '#34d399',
          500: '#10b981',
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        heading: ['"Noto Serif JP"', 'Georgia', 'serif'],
        body:    ['"Noto Sans JP"',  'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },

      // ── Gradients ──────────────────────────────────────────
      backgroundImage: {
        /** 品牌渐变：粉→紫，用于 Logo / 标题 / 强调装饰 */
        'gradient-brand':  'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)',
        /** 英雄区卡片底部渐变（视频→正文过渡） */
        'gradient-fade':   'linear-gradient(180deg, transparent 0%, #13111c 100%)',
        /** 卡片内层微光 */
        'gradient-card':   'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },

      // ── Shadows ────────────────────────────────────────────
      boxShadow: {
        /** 悬浮卡片发光效果 */
        'glow-pink':   '0 0 20px rgba(244,114,182,0.30), 0 0 60px rgba(244,114,182,0.10)',
        'glow-purple': '0 0 20px rgba(192,132,252,0.25), 0 0 60px rgba(192,132,252,0.08)',
        /** 卡片阴影 */
        'card':        '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
        'card-hover':  '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.10)',
        /** 导航栏阴影 */
        'nav':         '0 2px 16px rgba(0,0,0,0.4)',
      },

      // ── Animations ─────────────────────────────────────────
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'twinkle':       'twinkle 2.5s ease-in-out infinite',
        'slide-up':      'slideUp 0.45s ease-out both',
        'fade-in':       'fadeIn 0.6s ease-out both',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        /** 搜索模달 进场 */
        'scale-in':      'scaleIn 0.2s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.3', transform: 'scale(0.7)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%':      { transform: 'translateY(-7px) rotate(2deg)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96) translateY(-8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },

      // ── Prose (Markdown 文章正文) ───────────────────────────
      typography: () => ({
        twilight: {
          css: {
            '--tw-prose-body':           '#c4b5fd',
            '--tw-prose-headings':       '#ede9fe',
            '--tw-prose-links':          '#f472b6',
            '--tw-prose-bold':           '#ede9fe',
            '--tw-prose-code':           '#f472b6',
            '--tw-prose-pre-bg':         '#1e1a2e',
            '--tw-prose-quotes':         '#a78bfa',
            '--tw-prose-quote-borders':  '#f472b6',
            '--tw-prose-hr':             'rgba(255,255,255,0.08)',
            '--tw-prose-bullets':        '#c084fc',
            '--tw-prose-counters':       '#c084fc',
            '--tw-prose-th-borders':     'rgba(255,255,255,0.1)',
            '--tw-prose-td-borders':     'rgba(255,255,255,0.06)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
