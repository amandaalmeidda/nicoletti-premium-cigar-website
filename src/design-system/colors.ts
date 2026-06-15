/**
 * Nicoletti Premium Cigar — Brand Colors
 *
 * Official color palette for Nicoletti Premium Cigar brand.
 * Source of truth: /design-system/colors.json
 */

export const colors = {
  primary: {
    light: '#E8D5B7',
    main: '#8B6F47',
    dark: '#5C4A2F',
  },
  secondary: {
    light: '#D4AF37',
    main: '#B8860B',
    dark: '#6B4423',
  },
  neutral: {
    50: '#FAFAF8',
    100: '#F5F3ED',
    200: '#E8E4DB',
    300: '#D8D2C4',
    400: '#C8BBA8',
    500: '#A89F8F',
    600: '#8B8375',
    700: '#6B645A',
    800: '#4A4540',
    900: '#2A2620',
    950: '#1A1815',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

export type Colors = typeof colors;
