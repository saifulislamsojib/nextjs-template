import next from '@next/eslint-plugin-next';
import getFlatConfigs, { devDepsImportAllowedFiles } from '@stack-lint/base';
import reactConfigs from '@stack-lint/react';
import getTsConfigs from '@stack-lint/typescript';
import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';

devDepsImportAllowedFiles.push('src/lib/test.utils.tsx', 'src/test.setup.ts');

export default getFlatConfigs(
  { ignores: ['next-env.d.ts'] },
  ...reactConfigs,
  ...getTsConfigs({
    tsconfigRootDir: import.meta.dirname,
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  }),
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      'react/function-component-definition': 'off',
      'import-x/exports-last': 'off',
      'import-x/no-nodejs-modules': 'off',
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}', 'src/lib/test.utils.tsx'],
    plugins: { vitest, 'jest-dom': jestDom },
    rules: {
      ...vitest.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
);
