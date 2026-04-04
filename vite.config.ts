import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    options: {
      indentStyle: "space",
      indentWidth: 2,
      lineWidth: 100,
      quoteStyle: "single",
      jsxQuoteStyle: "double",
      trailingCommas: "all",
      semicolons: "always",
      bracketSpacing: true,
      arrowParens: "always",
    },
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
