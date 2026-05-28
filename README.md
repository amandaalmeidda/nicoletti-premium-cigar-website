# Nicoletti Premium Cigar Website

The official website project for **Nicoletti Premium Cigar** — built on the Olmeda client website blueprint with integrated design system support.

## Overview

This project combines:

- A **Next.js + TypeScript** application shell
- A **two-layer design system** (agency base + Nicoletti Premium Cigar custom layer)
- A pragmatic source layout for pages, components, styles, and utilities
- A dedicated `design/` folder that hosts brand and design assets, intended to be served via GitHub Pages once populated

## Structure

```
design/                  # Static design assets (HTML/CSS, mocks, brand guidelines)
                         # Will be served via GitHub Pages once content is added
src/
├── design-system/       # Nicoletti Premium Cigar design tokens & components
│   ├── colors.ts
│   ├── typography.ts
│   └── index.ts
├── pages/               # Website pages
├── components/          # Reusable components
├── styles/              # Global styles
├── lib/                 # Utilities
└── types/               # TypeScript types
```

## Design System

This project uses a two-layer design system so Nicoletti Premium Cigar brand customization stays decoupled from shared agency infrastructure:

1. **Agency Base** (`@olmeda/design-system`)
   - Shared colors, spacing, typography
   - Base component structure
   - Updated centrally and consumed by all client projects

2. **Nicoletti Premium Cigar Custom** (`src/design-system/`)
   - Nicoletti Premium Cigar brand colors, typography, and tokens
   - Custom components specific to Nicoletti Premium Cigar
   - Overrides and extensions to the agency base

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Customize the design system

Edit the files in `src/design-system/` to reflect Nicoletti Premium Cigar brand:

- `src/design-system/colors.ts` — brand and semantic colors
- `src/design-system/typography.ts` — fonts, sizes, weights
- `src/design-system/index.ts` — exports

### 3. Drop in design assets

Place HTML / CSS mocks and brand assets into `design/`. Once content is added, GitHub Pages can be enabled to serve this folder.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building

```bash
npm run build
npm start
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint TypeScript/TSX sources |
| `npm run format` | Format sources with Prettier |

## Customizing the Design System

The two-layer approach lets Nicoletti Premium Cigar diverge visually from other client projects without forking the agency base:

- For shared changes (used by every client) — open a PR to `@olmeda/design-system`
- For Nicoletti Premium Cigar specific brand expression — edit `src/design-system/` locally in this project

## Brand Context

Nicoletti Premium Cigar is a premium client brand. Treat brand voice, typography choices, and color decisions with the care a premium product deserves — every brand-facing surface should reinforce the premium positioning.

## License

MIT
