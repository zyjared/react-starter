import type { PresetUnoTheme } from "unocss";
import { resolveColors } from "./colors";
import type { ColorTokens, Palette } from "./palettes";
import { violet } from "./palettes";

export const THEME = {
  colors: resolveColors(violet, "dark"),
  animation: {
    keyframes: {
      "accordion-down": "{from{height:0}to{height:var(--radix-accordion-content-height)}}",
      "accordion-up": "{from{height:var(--radix-accordion-content-height)}to{height:0}}",
      "collapsible-down": "{from{height:0}to{height:var(--radix-collapsible-content-height)}}",
      "collapsible-up": "{from{height:var(--radix-collapsible-content-height)}to{height:0}}",
      "caret-blhi": "{0%,70%,100%{opacity:1}20%,50%{opacity:0}}",
    },
    durations: {
      "accordion-down": "0.2s",
      "accordion-up": "0.2s",
      "collapsible-down": "0.2s",
      "collapsible-up": "0.2s",
      "caret-blhi": "1.25s",
    },
    timingFns: {
      "accordion-down": "ease-out",
      "accordion-up": "ease-out",
      "collapsible-down": "ease-out",
      "collapsible-up": "ease-out",
      "caret-blhi": "ease-out",
    },
    counts: {
      "caret-blhi": "infinite",
    },
  },
} satisfies PresetUnoTheme;

export type Theme = typeof THEME;

/**
 * Build the UnoCSS `theme.colors` object from a palette.
 *
 * This defines the utility class structure (e.g. `bg-brand`, `text-brand-500`,
 * `bg-brand-fg`). Actual CSS variable values are injected by `buildPreflights`.
 *
 * @example
 * // uno.config.ts
 * theme: buildTheme()
 * theme: buildTheme(violet, { brand: 'oklch(0.55 0.22 30)' })
 */
export function buildTheme(
  palette: Palette = violet,
  overrides?: Partial<Record<ColorTokens, string>>,
) {
  const resolved: Palette = overrides
    ? { ...palette, light: { ...palette.light, ...overrides } as typeof palette.light }
    : palette;

  return {
    colors: resolveColors(resolved, "light"),
  };
}
