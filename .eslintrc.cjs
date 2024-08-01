/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-misused-promises": "off",
  },
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.cjs", "playwright-report/*", "test-results/*"],
};
