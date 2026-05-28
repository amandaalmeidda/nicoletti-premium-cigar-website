/**
 * Nicoletti Premium Cigar — Brand Colors
 *
 * Brand and semantic color tokens. Replace placeholder values with the
 * actual Nicoletti Premium Cigar brand palette once the visual identity
 * is finalized.
 */

export const brand = {
  // Replace with Nicoletti Premium Cigar primary brand color
  primary: '#000000',
  // Replace with Nicoletti Premium Cigar secondary brand color
  secondary: '#FFFFFF',
  // Premium accent — e.g. deep gold, oxblood, tobacco brown
  accent: '#B8860B',
} as const;

export const neutral = {
  black: '#0A0A0A',
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray500: '#71717A',
  gray900: '#18181B',
} as const;

export const semantic = {
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
} as const;

export const colors = {
  brand,
  neutral,
  semantic,
} as const;

export type Colors = typeof colors;
