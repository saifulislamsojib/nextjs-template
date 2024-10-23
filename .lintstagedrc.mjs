import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --max-warnings 0 --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

export default {
  "*.{ts,tsx,d.ts,mjs}": [buildEslintCommand],
  "*.{ts,tsx,d.ts,mjs,json,css,scss,yml,md}": "prettier --log-level warn --write",
};
