/**
 * Nicoletti Premium Cigar — Spacing Scale
 *
 * Official spacing tokens for consistent padding, margins, and gaps.
 * Source of truth: /design-system/spacing.json
 */

export const spacing = {
  xs: '4px',
  sm: '8px',
  base: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

export type Spacing = typeof spacing;
