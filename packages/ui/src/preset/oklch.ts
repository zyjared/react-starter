/**
 * Pure OKLCH color utilities — parse, format, scale, and derive.
 * No UnoCSS dependencies; safe to import anywhere.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface OklchChannels {
  l: number;
  c: number;
  h: number;
}

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ScaleStep = (typeof STEPS)[number];

export interface ScaleAnchors {
  /** Lightness at step 50 (near-white in light mode, near-black in dark). */
  anchor50: number;
  /** Lightness at step 900 (near-black in light mode, near-white in dark). */
  anchor900: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

/** Chroma multiplier per scale step — peaks at 500 for maximum vibrancy. */
const CHROMA: Record<ScaleStep, number> = {
  50: 0.03,
  100: 0.06,
  200: 0.16,
  300: 0.5,
  400: 1.0,
  500: 1.1,
  600: 0.95,
  700: 0.76,
  800: 0.52,
  900: 0.28,
};

export const LIGHT_ANCHORS: ScaleAnchors = { anchor50: 0.985, anchor900: 0.165 };
export const DARK_ANCHORS: ScaleAnchors = { anchor50: 0.115, anchor900: 0.92 };

// ── Parse & format ────────────────────────────────────────────────────────────

export function parseOklch(color: string): OklchChannels {
  const m = color.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return { l: 0.55, c: 0.22, h: 297 };
  const l = m[2] === "%" ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  return { l, c: parseFloat(m[3]), h: parseFloat(m[4]) };
}

export function oklch(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

// ── Scale builder ─────────────────────────────────────────────────────────────

/** Build a 50–900 perceptual color scale, anchored at the 400 step. */
export function buildScale(brand: string, anchors: ScaleAnchors): Record<string, string> {
  const { l: l400, c, h } = parseOklch(brand);

  return Object.fromEntries(
    STEPS.map((step) => {
      const l = clamp(
        step <= 400
          ? anchors.anchor50 + (l400 - anchors.anchor50) * ((step - 50) / 350) // tint  50→400
          : l400 + (anchors.anchor900 - l400) * ((step - 400) / 500), // shade 400→900
      );
      return [step, oklch(l, c * CHROMA[step as ScaleStep], h)];
    }),
  );
}

// ── Derived tokens ────────────────────────────────────────────────────────────

/**
 * Return `hi` or `canvas` — whichever gives higher contrast against `brand`.
 * Uses the WCAG 2.1 equal-contrast threshold (≈ 0.179).
 */
export function deriveContrast(brand: string, canvas: string, fg: string): string {
  return luminance(brand) > 0.179 ? fg : canvas;
}

/**
 * Lift a light-mode brand color to a dark-mode equivalent.
 * Result is clamped to [0.65, 0.82] — legible against a dark canvas (~L 0.16).
 */
export function deriveDarkBrand(brand: string): string {
  const { l, c, h } = parseOklch(brand);
  const delta = 0.14 + Math.max(0, 0.55 - l) * 0.5;
  return oklch(clamp(l + delta, 0.65, 0.82), c, h);
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function clamp(n: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, n));
}

/** WCAG 2.1 relative luminance via OKLCH → OKLab → linear sRGB. */
function luminance(color: string): number {
  const { l, c, h } = parseOklch(color);
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const ll = l_ ** 3;
  const mm = m_ ** 3;
  const ss = s_ ** 3;

  const r = clamp(4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss);
  const g = clamp(-1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss);
  const bl = clamp(-0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss);

  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}
