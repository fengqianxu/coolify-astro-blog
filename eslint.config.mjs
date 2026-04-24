// @ts-check
/**
 * Flat ESLint 配置（ESLint 9+）。
 *
 * 规模很小，就做三件事：
 *  1. TS 文件用 @typescript-eslint 做基础类型/风格检查
 *  2. Astro 文件用 eslint-plugin-astro 走它推荐的 preset
 *  3. 忽略构建产物、依赖、第三方参考目录
 *
 * 故意没有 extends "strict"：Astro 项目里模板表达式太多，
 * 收益低、噪声高。等真的有重型业务逻辑了再逐条加规则。
 */

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',
      'public/**',
      'assets/**',
      '博客源代码参考/**',
    ],
  },

  // TS / JS 文件
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'warn',
      eqeqeq: ['warn', 'smart'],
    },
  },

  // Astro 文件走插件 preset
  ...astroPlugin.configs['flat/recommended'],
];
