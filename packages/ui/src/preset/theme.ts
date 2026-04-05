/**
 * Color tokens for the UI preset.
 *
 * Surface layers:   canvas → surface → overlay
 * Content:          ink (primary) · dim (secondary)
 * Brand:            brand 50-900 + contrast (auto-derived)
 * Structure:        subtle (hover/badge) · line (borders/dividers)
 *
 * Auto-derived (not user-configurable):
 *   ring → always tracks brand via CSS var reference
 *
 * Naming is checked against presetWind4 utilities to avoid collisions:
 *   ✗ stroke   → SVG stroke-{color} utility exists → renamed to `line`
 *   ✗ focus    → variant modifier (focus:) → kept out of theme, use ring-ring/50
 *   ✗ outline  → outline utility exists
 *   ✓ canvas / surface / overlay / ink / dim / brand / subtle / line
 *
 * Hue anchor: 297 (blue-violet → magenta, Dracula-inspired but original)
 */

export interface ColorTokens {
  canvas: string; // page background         bg-canvas
  surface: string; // card / panel             bg-surface
  overlay: string; // popover / dialog / sheet bg-overlay
  ink: string; // primary text             text-ink
  dim: string; // secondary text           text-dim
  brand: string; // brand color anchor       bg-brand, bg-brand-{50-900}
  subtle: string; // hover / badge surface    bg-subtle
  line: string; // borders / dividers       border-line, divide-line
}

// ---------------------------------------------------------------------------
// OKLCH parser & formatter
// ---------------------------------------------------------------------------

interface OklchChannels {
  l: number;
  c: number;
  h: number;
}

function parseOklch(color: string): OklchChannels {
  const m = color.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return { l: 0.55, c: 0.22, h: 297 };
  const l = m[2] === "%" ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  return { l, c: parseFloat(m[3]), h: parseFloat(m[4]) };
}

function oklch(l: number, c: number, h: number) {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

// ---------------------------------------------------------------------------
// Brand scale (50-900)
// 400 = user's value (DEFAULT)
// chroma peaks at 500 for vibrancy, fades at both ends
// anchor50/anchor900 control the tint/shade endpoints per mode:
//   light → 50 near-white (0.985), 900 near-black (0.165)
//   dark  → 50 near-black (0.115), 900 near-white (0.920)
// ---------------------------------------------------------------------------

const CHROMA: Record<number, number> = {
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

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

interface ScaleAnchors {
  anchor50: number;
  anchor900: number;
}

export const LIGHT_ANCHORS: ScaleAnchors = { anchor50: 0.985, anchor900: 0.165 };
export const DARK_ANCHORS: ScaleAnchors = { anchor50: 0.115, anchor900: 0.92 };

export function buildScale(brand: string, anchors: ScaleAnchors): Record<string, string> {
  const { l: l400, c, h } = parseOklch(brand);
  const scale: Record<string, string> = {};

  for (const step of STEPS) {
    const l = Math.max(
      0,
      Math.min(
        1,
        step <= 400
          ? anchors.anchor50 + (l400 - anchors.anchor50) * ((step - 50) / 350) // tint:  50→400
          : l400 + (anchors.anchor900 - l400) * ((step - 400) / 500), // shade: 400→900
      ),
    );
    scale[step] = oklch(l, c * CHROMA[step], h);
  }

  return scale;
}

// ---------------------------------------------------------------------------
// WCAG relative luminance: OKLCH → OKLab → Linear sRGB → Y
// ---------------------------------------------------------------------------

function oklchToLuminance(color: string): number {
  const { l, c, h } = parseOklch(color);
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  // OKLab → LMS (cube-root intermediates)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const ll = l_ ** 3;
  const mm = m_ ** 3;
  const ss = s_ ** 3;

  // LMS → Linear sRGB (clamp to [0,1] for in-gamut colors)
  const r = Math.max(0, Math.min(1, 4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss));
  const g = Math.max(0, Math.min(1, -1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss));
  const bl = Math.max(0, Math.min(1, -0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss));

  // WCAG relative luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
}

// ---------------------------------------------------------------------------
// Derived tokens
// ---------------------------------------------------------------------------

export function deriveContrast(brand: string, canvas: string, ink: string): string {
  // Equal-contrast threshold: Y where contrast vs white === contrast vs black
  // Solved: sqrt(1.05 * 0.05) - 0.05 ≈ 0.179 (WCAG 2.1)
  return oklchToLuminance(brand) > 0.179 ? ink : canvas;
}

export function deriveDarkBrand(brand: string): string {
  const { l, c, h } = parseOklch(brand);
  // Adaptive boost: darker light brands need a larger delta to read on dark backgrounds.
  // Result clamped to [0.65, 0.82] — the legible range against dark canvas (~L 0.16).
  const delta = 0.14 + Math.max(0, 0.55 - l) * 0.5;
  return oklch(Math.max(0.65, Math.min(0.82, l + delta)), c, h);
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const defaults: ColorTokens = {
  canvas: "oklch(0.985 0.004 297)", // near-white with a whisper of violet
  surface: "oklch(0.965 0.008 297)", // card layer — slightly deeper
  overlay: "oklch(0.990 0.002 297)", // popover — near-pure white, floats above
  ink: "oklch(0.160 0.028 297)", // deep violet-dark
  dim: "oklch(0.485 0.068 297)", // muted violet — placeholders, labels
  brand: "oklch(0.545 0.235 297)", // rich violet — the anchor
  subtle: "oklch(0.935 0.016 297)", // lavender tint — hover, badges
  line: "oklch(0.868 0.022 297)", // soft violet border
};

export const defaultsDark: ColorTokens = {
  canvas: "oklch(0.158 0.030 297)", // deep purple-dark
  surface: "oklch(0.195 0.034 297)", // elevated card — clearly distinct
  overlay: "oklch(0.215 0.036 297)", // popover — floats above surface
  ink: "oklch(0.925 0.010 297)", // near-white lavender
  dim: "oklch(0.630 0.068 297)", // muted violet text
  brand: "oklch(0.685 0.225 297)", // bright violet, readable on dark
  subtle: "oklch(0.228 0.032 297)", // slightly elevated dark surface
  line: "oklch(0.282 0.038 297)", // dark violet border
};

// ---------------------------------------------------------------------------
// Theme builder
// ---------------------------------------------------------------------------

export function buildTheme(t: ColorTokens) {
  const brandContrast = deriveContrast(t.brand, t.canvas, t.ink);

  return {
    colors: {
      // Core tokens
      canvas: t.canvas,
      surface: t.surface,
      overlay: t.overlay,
      ink: t.ink,
      dim: t.dim,
      brand: {
        ...buildScale(t.brand, LIGHT_ANCHORS),
        DEFAULT: t.brand,
        contrast: brandContrast,
      },
      subtle: t.subtle,
      line: t.line,

      // shadcn/ui compatibility aliases (copy components without renaming classes)
      ring: t.brand, // ring-ring
      background: t.canvas, // bg-background
      foreground: t.ink, // text-foreground
      muted: {
        DEFAULT: t.subtle, // bg-muted
        foreground: t.dim, // text-muted-foreground
      },
      primary: {
        DEFAULT: t.brand, // bg-primary
        foreground: brandContrast, // text-primary-foreground
      },
      secondary: {
        DEFAULT: t.subtle, // bg-secondary
        foreground: t.ink, // text-secondary-foreground
      },
      accent: {
        DEFAULT: t.subtle, // bg-accent
        foreground: t.ink, // text-accent-foreground
      },
      card: {
        DEFAULT: t.surface, // bg-card
        foreground: t.ink, // text-card-foreground
      },
      popover: {
        DEFAULT: t.overlay, // bg-popover
        foreground: t.ink, // text-popover-foreground
      },
      border: t.line, // border-border
      input: t.line, // border-input
    },
  };
}
