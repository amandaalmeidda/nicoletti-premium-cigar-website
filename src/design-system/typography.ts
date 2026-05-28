/**
 * Nicoletti Premium Cigar — Typography
 *
 * Font families, sizes, and weights. Tune these once the Nicoletti
 * Premium Cigar typography decisions are made.
 */

export const fontFamily = {
  // Display / headlines — typically a refined serif for a premium cigar brand
  display: '"Playfair Display", Georgia, serif',
  // Body copy
  body: '"Inter", system-ui, -apple-system, sans-serif',
  // Monospace for technical text
  mono: '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} as const;

export type Typography = typeof typography;
