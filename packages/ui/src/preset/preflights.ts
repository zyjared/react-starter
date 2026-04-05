import type { Preflight } from "unocss";

import {
  buildScale,
  LIGHT_ANCHORS,
  DARK_ANCHORS,
  defaults,
  defaultsDark,
  deriveDarkBrand,
  deriveContrast,
  type ColorTokens,
} from "./theme";

function tokenVars(tokens: ColorTokens): string {
  return Object.entries(tokens)
    .map(([k, v]) => `  --colors-${k}: ${v};`)
    .join("\n");
}

function scaleVars(scale: Record<string, string>): string {
  return Object.entries(scale)
    .map(([step, v]) => `  --colors-brand-${step}: ${v};`)
    .join("\n");
}

export function buildPreflights(colors?: Partial<ColorTokens>): Preflight[] {
  const light = { ...defaults, ...colors };
  const lightScale = buildScale(light.brand, LIGHT_ANCHORS);

  const darkBrand = colors?.brand ? deriveDarkBrand(colors.brand) : defaultsDark.brand;
  const dark = { ...defaultsDark, brand: darkBrand };
  const darkScale = buildScale(darkBrand, DARK_ANCHORS);

  return [
    {
      getCSS: () => `
        :root {
          ${tokenVars(light)}
          ${scaleVars(lightScale)}
          --colors-brand-contrast: ${deriveContrast(light.brand, light.canvas, light.ink)};
          --colors-ring: var(--colors-brand);
          background: var(--colors-canvas);
          color: var(--colors-ink);
        }
        .dark {
          ${tokenVars(dark)}
          ${scaleVars(darkScale)}
          --colors-brand-contrast: ${deriveContrast(dark.brand, dark.canvas, dark.ink)};
        }`,
    },
  ];
}
