import { definePreset, type Preset } from "unocss";

import { shortcuts } from "./sortcuts";
import { rules } from "./rules";
import { buildPreflights } from "./preflights";
import { buildTheme, defaults, type ColorTokens } from "./theme";

export interface UIPresetOptions {
  prefix?: string | string[];

  /**
   * Override individual light-mode color tokens.
   * Only `brand` is typically needed — all others have defaults.
   *
   * Auto-derived (never set manually):
   *   brand-50…900 · brand-contrast
   *
   * Focus ring: use `ring-brand/50` directly in components.
   *
   * @example
   * colors: { brand: "oklch(0.7 0.15 30)" }  // warm amber
   */
  colors?: Partial<ColorTokens>;
}

export const presetUI = definePreset<UIPresetOptions>((options = {}) => {
  const { prefix, colors } = options;

  const light = { ...defaults, ...colors };

  const preset: Preset = {
    name: "@repo/ui",
    prefix,

    theme: buildTheme(light),

    shortcuts,
    rules,

    preflights: buildPreflights(colors),
  };

  return preset;
});
