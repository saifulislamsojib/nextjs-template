import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
// import vitest from '@vitest/eslint-plugin';
import { flatConfigs as importConfigs } from 'eslint-plugin-import';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { configs as tsEslintConfigs } from 'typescript-eslint';

const files = ['**/*.{ts,tsx,d.ts}'];

export default [
  js.configs.recommended,
  importConfigs.recommended,
  importConfigs.typescript,
  react.configs.flat.recommended,
  prettierRecommended,
  ...tsEslintConfigs.recommendedTypeChecked.map((config) => ({ ...config, files })),
  { ignores: ['node_modules', '.next'] },
  {
    files: ['**/*.{ts,tsx,d.ts,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
          extensions: ['.ts', '.tsx', '.d.ts', '.json'],
        },
      },
      react: { version: '19.0' },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': next,
    },
    rules: {
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
  {
    files,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { arguments: false } },
      ],
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/lib/test.utils.tsx'],
    // plugins: { vitest, 'jest-dom': jestDom },
    plugins: { 'jest-dom': jestDom },
    rules: {
      // ...vitest.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      // 'vitest/max-nested-describe': ['error', { max: 3 }],
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];
