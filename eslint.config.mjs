import getFlatConfigs, { testFiles } from '@stack-lint/base';
import nextConfigs from '@stack-lint/react/next';
import getTsConfigs from '@stack-lint/typescript';
import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';

export default getFlatConfigs(
  ...nextConfigs,
  ...getTsConfigs({ tsconfigRootDir: import.meta.dirname }),
  {
    files: testFiles,
    plugins: { vitest, 'jest-dom': jestDom },
    rules: {
      ...vitest.configs.recommended.rules,
      ...jestDom.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
  },
);
