const nextJest = require("next/jest");

/** @typedef {import('jest').Config} Config */
/** @type {(config: Config) => Config} */
const createJestConfig = nextJest({
  dir: "./",
});

/** @type {Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(config);
