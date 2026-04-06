import { type Preset } from "unocss";

import { THEME, type Theme } from "./theme";
import type { Colors } from "./colors";
import { SHORTCUTS } from "./shortcuts";
import { RULES } from "./rules";
import { PREFLIGHTS } from "./preflights";

export { violet, amber, ocean, rose } from "./palettes";

// ── Preset options ────────────────────────────────────────────────────────────

export interface UIPresetOptions {
  prefix?: string | string[];

  /**
   * Override color tokens for the default theme's light mode.
   * Only `brand` is typically needed — all others have sensible defaults.
   *
   * @example
   * colors: { brand: "oklch(0.7 0.15 30)" }
   */
  colors?: Colors;
}

// ── Preset ────────────────────────────────────────────────────────────────────

export function presetUI(options: UIPresetOptions = {}): Preset<Theme> {
  const { prefix } = options;

  return {
    name: "@repo/ui",
    prefix,
    theme: THEME,
    shortcuts: SHORTCUTS,
    rules: RULES,
    preflights: PREFLIGHTS,
  };
}
