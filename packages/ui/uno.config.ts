import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetUI } from "@repo/ui/preset";

/**
 * @see https://unocss.dev/integrations/vscode
 */
export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        "accordion-down": "{from{height:0}to{height:var(--radix-accordion-content-height)}}",
        "accordion-up": "{from{height:var(--radix-accordion-content-height)}to{height:0}}",
        "collapsible-down": "{from{height:0}to{height:var(--radix-collapsible-content-height)}}",
        "collapsible-up": "{from{height:var(--radix-collapsible-content-height)}to{height:0}}",
        "caret-blink": "{0%,70%,100%{opacity:1}20%,50%{opacity:0}}",
      },
      durations: {
        "accordion-down": "0.2s",
        "accordion-up": "0.2s",
        "collapsible-down": "0.2s",
        "collapsible-up": "0.2s",
        "caret-blink": "1.25s",
      },
      timingFns: {
        "accordion-down": "ease-out",
        "accordion-up": "ease-out",
        "collapsible-down": "ease-out",
        "collapsible-up": "ease-out",
        "caret-blink": "ease-out",
      },
      counts: {
        "caret-blink": "infinite",
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "PingFang SC",
        "Hiragino Sans GB",
        "Microsoft YaHei",
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
  preflights: [
    {
      getCSS: () => `:root {
      }`,
    },
  ],
});
