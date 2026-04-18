/**
 * @file tailwind.config.mjs
 * @description Tailwind 配置 —— 双主题（Neon Sakura 夜间 + Soft Sakura 日间）
 *
 * 所有颜色通过 CSS 变量定义（rgb 三元组 + <alpha-value>），
 * 由 global.css 的 :root（日间）和 .dark（夜间）切换。
 *
 * 令牌语义：
 *   sakura-*   —— 品牌主色（粉系，两种模式下略有微调）
 *   gold-*     —— 品牌副色（金/琥珀）
 *   lavender-* —— 文字层次（名字保留兼容旧代码；日间为深色，夜间为浅色）
 *   void-*     —— 背景层次（日间为淡粉白，夜间为纯深黑）
 *   mint-*     —— 成功/在线状态（两模式一致）
 */

import typography from '@tailwindcss/typography';

const cssVar = (v) => `rgb(var(${v}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── Color tokens（全部走 CSS 变量） ────────────────────
      colors: {
        sakura: {
          100: cssVar('--c-sakura-100'),
          200: cssVar('--c-sakura-200'),
          300: cssVar('--c-sakura-300'),
          400: cssVar('--c-sakura-400'),
          500: cssVar('--c-sakura-500'),
          600: cssVar('--c-sakura-600'),
          700: cssVar('--c-sakura-700'),
        },
        lavender: {
          100: cssVar('--c-lavender-100'),
          200: cssVar('--c-lavender-200'),
          300: cssVar('--c-lavender-300'),
          400: cssVar('--c-lavender-400'),
          500: cssVar('--c-lavender-500'),
          600: cssVar('--c-lavender-600'),
          700: cssVar('--c-lavender-700'),
        },
        void: {
          950: cssVar('--c-void-950'),
          900: cssVar('--c-void-900'),
          800: cssVar('--c-void-800'),
          700: cssVar('--c-void-700'),
          600: cssVar('--c-void-600'),
          500: cssVar('--c-void-500'),
        },
        gold: {
          300: cssVar('--c-gold-300'),
          400: cssVar('--c-gold-400'),
          500: cssVar('--c-gold-500'),
        },
        mint: {
          400: cssVar('--c-mint-400'),
          500: cssVar('--c-mint-500'),
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        heading: ['"LXGW WenKai"',        'Georgia', 'serif'],
        body:    ['"LXGW WenKai Screen"',  '"LXGW WenKai"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },

      // ── Gradients（使用 CSS 变量，模式自适应） ───────────────
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--brand-g1) 0%, var(--brand-g2) 50%, var(--brand-g3) 100%)',
        'gradient-fade':  'linear-gradient(180deg, transparent 0%, rgb(var(--c-void-900)) 100%)',
        'gradient-card':  'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },

      // ── Shadows ────────────────────────────────────────────
      boxShadow: {
        'glow-pink':  'var(--shadow-glow-pink)',
        'glow-amber': 'var(--shadow-glow-amber)',
        'card':       'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'nav':        '0 2px 16px rgba(0,0,0,0.4)',
      },

      // ── Animations ─────────────────────────────────────────
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'twinkle':       'twinkle 2.5s ease-in-out infinite',
        'slide-up':      'slideUp 0.45s ease-out both',
        'fade-in':       'fadeIn 0.6s ease-out both',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
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

      // ── Prose（Markdown 正文）—— 变量化以支持两模式 ───────
      typography: () => ({
        twilight: {
          css: {
            '--tw-prose-body':           'rgb(var(--c-lavender-300))',
            '--tw-prose-headings':       'rgb(var(--c-lavender-100))',
            '--tw-prose-links':          'rgb(var(--c-sakura-500))',
            '--tw-prose-bold':           'rgb(var(--c-lavender-100))',
            '--tw-prose-code':           'rgb(var(--c-sakura-500))',
            '--tw-prose-pre-bg':         'rgb(var(--c-void-800))',
            '--tw-prose-quotes':         'rgb(var(--c-lavender-400))',
            '--tw-prose-quote-borders':  'rgb(var(--c-sakura-500))',
            '--tw-prose-hr':             'var(--divider-color)',
            '--tw-prose-bullets':        'rgb(var(--c-gold-400))',
            '--tw-prose-counters':       'rgb(var(--c-gold-400))',
            '--tw-prose-th-borders':     'var(--divider-color)',
            '--tw-prose-td-borders':     'var(--divider-color)',
          },
        },
      }),
    },
  },
  plugins: [typography],
};
