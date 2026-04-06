import type { COLOR_TOKENS } from "./tokens";

export type ColorTokens = keyof typeof COLOR_TOKENS;

export interface Palette {
  name: string;
  light: Record<ColorTokens, string>;
  dark?: Partial<Record<ColorTokens, string>>;
}

export const violet = {
  name: "violet",
  light: {
    canvas: "oklch(0.985 0.004 297)",
    surface: "oklch(0.965 0.008 297)",
    overlay: "oklch(0.990 0.002 297)",
    fg: "oklch(0.160 0.028 297)",
    line: "oklch(0.868 0.022 297)",
    brand: "oklch(0.545 0.235 297)",
    success: "oklch(0.532 0.157 145)",
    warning: "oklch(0.545 0.180 70)",
    danger: "oklch(0.555 0.245 27)",
  },
  dark: {
    canvas: "oklch(0.158 0.030 297)",
    surface: "oklch(0.195 0.034 297)",
    overlay: "oklch(0.215 0.036 297)",
    fg: "oklch(0.925 0.010 297)",
    line: "oklch(0.282 0.038 297)",
    brand: "oklch(0.685 0.225 297)",
    success: "oklch(0.696 0.170 145)",
    warning: "oklch(0.780 0.165 75)",
    danger: "oklch(0.704 0.191 22)",
  },
} satisfies Palette;

// warm golden amber
export const amber = {
  name: "amber",
  light: {
    canvas: "oklch(0.987 0.004 75)",
    surface: "oklch(0.968 0.009 75)",
    overlay: "oklch(0.992 0.002 75)",
    fg: "oklch(0.155 0.030 75)",
    line: "oklch(0.872 0.024 75)",
    brand: "oklch(0.600 0.160 75)",
    success: "oklch(0.532 0.157 145)",
    warning: "oklch(0.545 0.180 70)",
    danger: "oklch(0.555 0.245 27)",
  },
  dark: {
    canvas: "oklch(0.152 0.026 75)",
    surface: "oklch(0.188 0.030 75)",
    overlay: "oklch(0.208 0.034 75)",
    fg: "oklch(0.932 0.012 75)",
    line: "oklch(0.278 0.036 75)",
    brand: "oklch(0.740 0.155 75)",
    success: "oklch(0.696 0.170 145)",
    warning: "oklch(0.800 0.165 75)",
    danger: "oklch(0.704 0.191 22)",
  },
} satisfies Palette;

// deep teal ocean
export const ocean: Palette = {
  name: "ocean",
  light: {
    canvas: "oklch(0.985 0.005 210)",
    surface: "oklch(0.963 0.010 210)",
    overlay: "oklch(0.990 0.003 210)",
    fg: "oklch(0.158 0.030 210)",
    line: "oklch(0.862 0.024 210)",
    brand: "oklch(0.525 0.220 210)",
    success: "oklch(0.532 0.157 145)",
    warning: "oklch(0.545 0.180 70)",
    danger: "oklch(0.555 0.245 27)",
  },
  dark: {
    canvas: "oklch(0.145 0.032 218)",
    surface: "oklch(0.182 0.036 216)",
    overlay: "oklch(0.202 0.038 214)",
    fg: "oklch(0.930 0.008 210)",
    line: "oklch(0.268 0.040 214)",
    brand: "oklch(0.665 0.205 210)",
    success: "oklch(0.696 0.170 145)",
    warning: "oklch(0.780 0.165 75)",
    danger: "oklch(0.704 0.191 22)",
  },
} satisfies Palette;

// warm rose coral
export const rose: Palette = {
  name: "rose",
  light: {
    canvas: "oklch(0.986 0.005 10)",
    surface: "oklch(0.964 0.010 10)",
    overlay: "oklch(0.991 0.003 10)",
    fg: "oklch(0.158 0.030 10)",
    line: "oklch(0.865 0.024 10)",
    brand: "oklch(0.558 0.235 10)",
    success: "oklch(0.532 0.157 145)",
    warning: "oklch(0.545 0.180 70)",
    danger: "oklch(0.555 0.245 27)",
  },
  dark: {
    canvas: "oklch(0.153 0.030 10)",
    surface: "oklch(0.190 0.034 10)",
    overlay: "oklch(0.210 0.036 10)",
    fg: "oklch(0.927 0.010 10)",
    line: "oklch(0.275 0.038 10)",
    brand: "oklch(0.698 0.225 10)",
    success: "oklch(0.696 0.170 145)",
    warning: "oklch(0.780 0.165 75)",
    danger: "oklch(0.704 0.191 22)",
  },
} satisfies Palette;
