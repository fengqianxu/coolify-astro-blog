/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Bright kawaii palette — spring cherry blossom
        sakura: {
          50:  '#fff0f6',
          100: '#ffe3ef',
          200: '#ffbad6',
          300: '#ff8fba',
          400: '#ff6ba0',
          500: '#f4457e',
          600: '#e02966',
          700: '#bb1a52',
        },
        peach: {
          50:  '#fff8f0',
          100: '#ffeed9',
          200: '#ffd9ad',
          300: '#ffbe7a',
          400: '#ff9d42',
          500: '#f97316',
        },
        mint: {
          50:  '#f0fdf8',
          100: '#d1fae9',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
        lavender: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cream: {
          50:  '#fffdf7',
          100: '#fff9ed',
          200: '#fef3d0',
          300: '#fde68a',
        },
        // Light surface colours
        surface: {
          50:  '#ffffff',
          100: '#fffaf5',   // warm cream base
          200: '#fdf4ff',   // lavender tinted
          300: '#fff0f9',   // pink tinted
        },
      },
      fontFamily: {
        heading: ['"Noto Serif JP"', 'serif'],
        body:    ['"Noto Sans JP"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-kawaii':  'linear-gradient(135deg, #ffbad6 0%, #c4b5fd 50%, #6ee7b7 100%)',
        'gradient-sakura':  'linear-gradient(135deg, #f4457e 0%, #8b5cf6 60%, #34d399 100%)',
        'gradient-hero':    'linear-gradient(160deg, #fff0f6 0%, #f5f3ff 50%, #f0fdf8 100%)',
        'gradient-card':    'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)',
        'gradient-warm':    'linear-gradient(135deg, #ffeed9 0%, #ffe3ef 100%)',
      },
      boxShadow: {
        'sakura':    '0 4px 20px rgba(244,69,126,0.18), 0 1px 4px rgba(244,69,126,0.10)',
        'card':      '0 2px 16px rgba(180,90,140,0.10), 0 1px 4px rgba(180,90,140,0.06)',
        'card-hover':'0 8px 32px rgba(180,90,140,0.18), 0 2px 8px rgba(180,90,140,0.10)',
        'nav':       '0 2px 20px rgba(244,69,126,0.08), 0 1px 4px rgba(0,0,0,0.04)',
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'twinkle':  'twinkle 2.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in':  'fadeIn 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.4', transform: 'scale(0.75)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-8px) rotate(3deg)' },
        },
      },
      typography: () => ({
        kawaii: {
          css: {
            '--tw-prose-body':           '#4b3f6b',
            '--tw-prose-headings':       '#2d1f52',
            '--tw-prose-links':          '#f4457e',
            '--tw-prose-bold':           '#2d1f52',
            '--tw-prose-code':           '#8b5cf6',
            '--tw-prose-pre-bg':         '#fdf4ff',
            '--tw-prose-quotes':         '#7c5c8a',
            '--tw-prose-quote-borders':  '#f4457e',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
