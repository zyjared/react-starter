import type { Preflight } from "unocss";
import type { Theme } from "./theme";

export const PREFLIGHTS = [
  {
    getCSS: ({ theme }) => {
      const colors = theme.colors || {};

      return `
       :root {
         background-color: ${colors.canvas ?? "#fff"};
         color: ${colors.fg?.DEFAULT ?? "#000"};
      }`;
    },
  },
] satisfies Preflight<Theme>[];
