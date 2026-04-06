export interface ColorTokenFlags {
  /**
   * Generate light/dark scale (50-900).
   * - `true`: auto-generate all levels
   * - `Record`: still generates all levels; entries in the Record use the provided value, others are auto-generated
   */
  scale?: boolean | Record<string, string>;

  /**
   * Generate a contrast foreground color (for text/icons on top of this color).
   * - `true`: auto-generate
   * - `string`: use this value directly
   */
  contrast?: boolean | string;
}

export const COLOR_TOKENS = {
  // surfaces
  canvas: {}, // page background
  surface: {}, // card / panel
  overlay: {}, // popover / modal / dropdown

  fg: { scale: true, contrast: true }, // default text/icon color
  line: { scale: true, contrast: true },

  // brand
  brand: { scale: true, contrast: true },

  // status
  success: { contrast: true },
  warning: { contrast: true },
  danger: { contrast: true },
} satisfies Record<string, ColorTokenFlags>;
