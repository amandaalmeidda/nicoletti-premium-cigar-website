/**
 * Nicoletti Premium Cigar — Typography
 *
 * Official typography scale for Nicoletti Premium Cigar.
 * Source of truth: /design-system/typography.json
 */

export const fontFamily = {
  heading: 'Georgia, serif',
  body: 'Segoe UI, Roboto, sans-serif',
} as const;

export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
} as const;

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} as const;

export type Typography = typeof typography;
