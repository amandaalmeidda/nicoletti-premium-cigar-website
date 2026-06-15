# Nicoletti Premium Cigar Website

The official website for **Nicoletti Premium Cigar** — a luxury-focused website with a complete design system, static design assets, and production-ready React implementation.

## 🎯 Overview

This project consolidates design, branding, and implementation in a single repository:

- **Design System** — Complete brand tokens (colors, typography, spacing, components)
- **Static Design** — HTML/CSS design templates and brand assets
- **React Implementation** — Production Next.js application with design system integration

---

## 📁 Project Structure

```
nicoletti-premium-cigar-website/
├── design-system/               # Brand design tokens (JSON)
│   ├── colors.json              # Color palette
│   ├── typography.json          # Fonts and typography scale
│   ├── spacing.json             # Spacing tokens
│   ├── components.json          # Component specifications
│   └── README.md                # Design system documentation
│
├── design/                       # Static HTML/CSS design templates
│   ├── README.md                # Designer guide
│   └── assets/                  # Images, fonts, icons
│
├── src/                         # React/Next.js implementation
│   ├── design-system/           # TypeScript interfaces for tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── pages/                   # Website pages
│   ├── components/              # React components
│   ├── styles/                  # Global styles
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript types
│
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md                    # This file
```

---

## 🎨 Design System

All brand tokens are defined in `/design-system/` as JSON files:

| File | Purpose |
|------|---------|
| `colors.json` | Primary, secondary, neutral, and semantic colors |
| `typography.json` | Font families, sizes, weights, and line heights |
| `spacing.json` | Spacing scale (padding, margin, gaps) |
| `components.json` | Component definitions and variants |

### Token Usage

**For Designers:**
- Edit JSON files in `/design-system/`
- Reference tokens in `/design` HTML/CSS
- Keep design consistent across all pages

**For Developers:**
- Convert tokens to CSS variables or Tailwind
- Implement React components matching `/design` templates
- Ensure design intent is preserved in code

---

## 🔄 Design-to-Development Workflow

1. **Designer finalizes** tokens in `/design-system/`
2. **Designer creates** static HTML/CSS in `/design/`
3. **GitHub Pages** automatically deploys design preview
4. **Developer references** design at GitHub Pages URL
5. **Developer implements** React components in `/src/`
6. **Consistency check** — static design and React implementation match

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

**View static design (HTML/CSS):**
```bash
# Requires http-server
npm run serve:design
# Opens http://localhost:8000
```

**Run React development server:**
```bash
npm run dev
# Opens http://localhost:3000
```

### Build & Deploy

```bash
npm run build
npm start
```

---

## 📋 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Create production build |
| `npm start` | Serve production build |
| `npm run lint` | Lint TypeScript/TSX |
| `npm run format` | Format code with Prettier |
| `npm run serve:design` | Serve static design (HTML/CSS) |

---

## 🎭 Design vs Implementation

This project separates concerns clearly:

| Aspect | Owner | Location |
|--------|-------|----------|
| Brand tokens | Designer | `/design-system/` |
| Design mockups | Designer | `/design/` |
| Implementation | Developer | `/src/` |

The developer **always references** the designer's static design to ensure visual fidelity.

---

## 🔗 Design Preview

Once GitHub Pages is enabled, the static design is available at:
```
https://amandaalmeidda.github.io/nicoletti-premium-cigar-website/
```

Share this link with stakeholders and developers for reference.

---

## 💡 Key Features

✅ Centralized design tokens in JSON format  
✅ Design-first workflow with static HTML/CSS templates  
✅ GitHub Pages integration for design preview  
✅ TypeScript for type-safe React components  
✅ Separation of design and implementation concerns  
✅ Production-ready Next.js setup  

---

## 📝 Next Steps

1. **Finalize brand tokens** in `/design-system/`
2. **Create design templates** in `/design/`
3. **Enable GitHub Pages** in repository settings
4. **Share design preview** with developer team
5. **Implement React components** in `/src/`

---

## License

MIT

**Project Created:** June 15, 2026  
**Repository:** nicoletti-premium-cigar-website  
**Status:** Consolidated and ready for development
