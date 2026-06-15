# Nicoletti Premium Cigars — Static Design Templates

This folder contains your **pure HTML/CSS design** — the source of truth for how the site should look and function.

## Structure

```
design/
├── index.html                 # Homepage
├── assets/
│   ├── css/                  # Stylesheets
│   ├── fonts/                # Typography files
│   ├── images/               # Design images, logos, photos
│   └── icons/                # SVG icons
└── README.md                 # This file
```

## How to View

### Option 1: GitHub Pages (Online)
Once the repository is pushed to GitHub with GitHub Pages enabled:
```
https://amandaalmeidda.github.io/nicoletti-premium-cigars/
```

### Option 2: Local Static Server
```bash
# From project root
npm run serve:design
# Opens http://localhost:8000
```

### Option 3: Python
```bash
cd design/
python -m http.server 8000
# Opens http://localhost:8000
```

## For Your Developer

This is your **reference for what the design should look like**. Use this to:

1. **See exactly how the design works** — Navigation, layouts, spacing, colors
2. **Reference CSS structure** — View source for styles and token usage
3. **Match responsive behavior** — See how pages adapt on mobile
4. **Copy HTML structure** — Use as a guide when building React components

## Design vs Implementation

- **`/design`** — Your pure HTML/CSS (what it should look like)
- **`/src`** — React/Next.js implementation (how it works dynamically)

The developer converts your static HTML into React components while keeping your design intent intact.

---

**Last Updated:** May 27, 2026
