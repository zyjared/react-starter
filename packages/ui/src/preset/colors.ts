import { buildScale, deriveContrast, DARK_ANCHORS, LIGHT_ANCHORS } from "./oklch";
import type { Palette } from "./palettes";
import { COLOR_TOKENS, type ColorTokenFlags } from "./tokens";

/** Per-token output shape, derived from COLOR_TOKENS literal types. */
type TokenEntry<F> = F extends { scale: unknown }
  ? { DEFAULT: string } & Record<string, string> // has scale → 50-900 + optional fg
  : F extends { contrast: unknown }
    ? { DEFAULT: string; fg: string } // contrast only
    : string; // plain value

export type Colors = {
  [K in keyof typeof COLOR_TOKENS]: TokenEntry<(typeof COLOR_TOKENS)[K]>;
};

/**
 * Resolve a palette into a UnoCSS `theme.colors`-compatible map.
 *
 * Tokens with `scale` get a full 50–900 range; tokens with `contrast` get a
 * `fg` entry derived via WCAG contrast. Plain tokens pass through as-is.
 *
 * @example
 * // uno.config.ts
 * theme: { colors: resolveColors(violet, 'light') }
 */
export function resolveColors(palette: Palette, mode: "light" | "dark" = "light"): Colors {
  const merged =
    mode === "dark" && palette.dark ? { ...palette.light, ...palette.dark } : { ...palette.light };
  const flat = Object.fromEntries(
    Object.entries(merged).filter((e): e is [string, string] => e[1] !== undefined),
  );

  const anchors = mode === "dark" ? DARK_ANCHORS : LIGHT_ANCHORS;
  const result = {} as Colors;

  const tokenMap = COLOR_TOKENS as Record<string, ColorTokenFlags>;
  const out = result as Record<string, unknown>;

  for (const [name, value] of Object.entries(flat)) {
    const flags = tokenMap[name] ?? {};

    if (!flags.scale && !flags.contrast) {
      out[name] = value;
      continue;
    }

    const entry: Record<string, string> = { DEFAULT: value }; // user value is always the base

    if (flags.scale) {
      const overrides = typeof flags.scale === "object" ? flags.scale : {};
      const generated = buildScale(value, anchors);
      for (const [step, auto] of Object.entries(generated)) {
        entry[step] = overrides[step] ?? auto;
      }
    }

    if (flags.contrast) {
      entry.fg =
        typeof flags.contrast === "string"
          ? flags.contrast
          : deriveContrast(value, flat.canvas ?? value, flat.fg ?? value);
    }

    out[name] = entry;
  }

  return result;
}
