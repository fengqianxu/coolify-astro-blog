/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core palette — anime pink × space blue
        sakura: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
        },
        cosmic: {
          50:  '#eff6ff',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        void: {
          900: '#0a0e1a',
          800: '#0f1729',
          700: '#121d35',
          600: '#1a2744',
          500: '#1e3054',
        },
      },
      fontFamily: {
        heading: ['"Noto Serif JP"', 'serif'],
        body:    ['"Noto Sans JP"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-sakura': 'linear-gradient(135deg, #ec4899 0%, #7c3aed 50%, #2563eb 100%)',
        'gradient-cosmic': 'linear-gradient(180deg, #0a0e1a 0%, #0f1729 50%, #1a2744 100%)',
        'gradient-card':   'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'sakura-glow': '0 0 20px rgba(236,72,153,0.35), 0 0 60px rgba(236,72,153,0.15)',
        'blue-glow':   '0 0 20px rgba(37,99,235,0.35), 0 0 60px rgba(37,99,235,0.15)',
        'card':        '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'twinkle':     'twinkle 3s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'slide-up':    'slideUp 0.5s ease-out',
        'fade-in':     'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.3', transform: 'scale(0.7)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: (theme) => ({
        anime: {
          css: {
            '--tw-prose-body':        theme('colors.slate[300]'),
            '--tw-prose-headings':    theme('colors.white'),
            '--tw-prose-links':       theme('colors.sakura[400]'),
            '--tw-prose-bold':        theme('colors.white'),
            '--tw-prose-code':        theme('colors.sakura[300]'),
            '--tw-prose-pre-bg':      theme('colors.void[800]'),
            '--tw-prose-quotes':      theme('colors.slate[400]'),
            '--tw-prose-quote-borders': theme('colors.sakura[500]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
