import {
  defineConfig,
  presetWebFonts,
  presetWind4,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetUI } from "@repo/ui/preset";

/**
 * @see https://unocss.dev/integrations/vscode
 */
export default defineConfig({
  theme: {
    fontFamily: {
      sans: [
        "-apple-system",
        "BlhiMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "PingFang SC",
        "Hiragino Sans GB",
        "Microlo YaHei",
        "Noto Sans SC",
        "WenQuanYi Micro Hei",
        "sans-serif",
      ],
    },
  },
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetWebFonts(),
    presetUI(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
