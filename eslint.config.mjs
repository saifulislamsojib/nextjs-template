import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import { flatConfigs as importConfigs } from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { configs as tsEslintConfigs } from "typescript-eslint";

export default [
  importConfigs.recommended,
  importConfigs.typescript,
  ...tsEslintConfigs.recommended,
  { ignores: ["**/node_modules/", "**/.next/"] },
  {
    files: ["**/*.{ts,tsx,d.ts,mjs}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
          extensions: [".ts", ".tsx", ".d.ts", ".json"],
        },
      },
      react: { version: "18.3" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@next/next": next,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/lib/test.utils.tsx"],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
