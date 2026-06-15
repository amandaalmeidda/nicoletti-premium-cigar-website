# Design System — Nicoletti Premium Cigar

This folder contains TypeScript interfaces and exports for design tokens defined in `/design-system/`.

## Files

| File | Purpose |
|------|---------|
| `colors.ts` | Color tokens (primary, secondary, neutral, semantic) |
| `typography.ts` | Typography scale (fonts, sizes, weights, line heights) |
| `spacing.ts` | Spacing scale (padding, margin, gaps) |
| `index.ts` | Barrel export — use this for importing tokens |

## Usage

Import all tokens from the barrel:

```typescript
import { colors, typography, spacing } from '@/design-system';

// Access color tokens
const primaryColor = colors.primary.main; // '#8B6F47'

// Access typography
const heading = typography.fontFamily.heading; // 'Georgia, serif'

// Access spacing
const padding = spacing.md; // '16px'
```

Or import specific tokens:

```typescript
import { colors } from '@/design-system';
import { spacing } from '@/design-system';

const bgColor = colors.neutral[50];
const gap = spacing.lg;
```

## Source of Truth

The canonical source for these tokens is `/design-system/` (JSON files):
- `/design-system/colors.json`
- `/design-system/typography.json`
- `/design-system/spacing.json`
- `/design-system/components.json`

**If you update a design token, update the JSON file first**, then update the corresponding TypeScript file to keep them in sync.

## Type Safety

All tokens are exported with TypeScript types:

```typescript
import type { Colors, Typography, Spacing } from '@/design-system';

const brandColors: Colors = { /* ... */ };
```

This ensures type-safe usage throughout the application.
