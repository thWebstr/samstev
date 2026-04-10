# Samstev — Photography Portfolio

A simple static portfolio site for Samstev Lensman showcasing weddings, corporate, documentary and event photography.

## Overview

This repository contains the static website for Samstev Lensman. It's a lightweight, plain-HTML/CSS/JS site intended to be served as static files (no build step required).

## Features

- Responsive gallery with bento layout
- Portfolio pages for Weddings, Corporate, Documentary, Birthdays
- Contact page with inquiry form and direct links
- Small tooling scripts under `tools/` for image checks and page fetching

## Project structure

- `index.html` — homepage
- `pages/` — internal pages (about, gallery, contact, services, etc.)
- `css/` — modular CSS (gallery.css, hero.css)
- `js/` — gallery data and loader scripts
- `images/` & `photos/` — image assets used by the site
- `tools/` — helper Python scripts (image checks, fetchers)

## Preview locally

Option 1 — Open locally:

1. Open `index.html` in your browser (double-click or use your editor's Live Preview).

Option 2 — Serve via a simple HTTP server (recommended to avoid CORS / file path issues):

Python 3:

```
python -m http.server 8000

# then open http://localhost:8000
```

Or use a quick node static server, e.g. `npx serve`.

## Development notes

- No build pipeline — edit HTML/CSS/JS directly.
- CSS: main stylesheet is `style.css` at project root; page-specific styles in `css/`.
- JS: interactive gallery code lives in `js/`.
- Tools: `tools/check_images.py`, `tools/check_server_images.py`, and others help validate assets.

## Contributing

- PRs and small improvements welcome. Prefer minimal, focused changes.

## Contact

- Owner: Samuel Stephen
- Email: <hello@samstev.com>

---
This README was generated to summarize the repository and how to preview it locally.

# Samstev Lensman — Portfolio

A high-performance, dark-themed photography portfolio meticulously built for **Samuel Stephen** (Samstev Lensman). This project combines elegant typography, high-impact visuals, and a deeply optimized interlocking masonry grid to deliver a world-class experiential layout.

## 🌟 Key Features

- **Infinite Masonry Bento Grid:** A custom-engineered CSS Grid architectural pattern (`grid-auto-rows`) utilizing `nth-child` sequencing that flawlessly tiles hundreds of photos of varying spans into an unbroken, visually stunning masonry wall.
- **Dynamic Category Filtering:** Instantly sort an exhaustive image pool locally into specific portfolios (`Weddings`, `Corporate`, `Documentary`, `Birthdays`) smoothly.
- **Global Design System:** Structured CSS variables (`--black`, `--navy`, `--off-white`) natively controlling a unified dark-mode esthetic applied globally across all internal subpages.
- **Component-Driven Subpages:** Fully developed internal scaffolding across the `pages/` directory that programmatically scale the assets to unique page requirements.
- **Micro-Interactions:** Custom JavaScript cursor trails, elegant scroll-reveals (`IntersectionObserver`), and animated numerical statistics.
- **Fully Responsive:** Layouts fluidly adapt from high-resolution studio displays down to mobile screens without dropping the visual narrative.

## 🛠 Tech Stack

- **HTML5:** Semantic, strictly structured layout layers.
- **CSS3:** Heavy use of modern pseudo-selectors, `Grid`, `Flexbox`, `clamp()` typography, and CSS variables. Pure vanilla approach, avoiding heavy frame-worked abstractions.
- **JavaScript (Vanilla):** Zero-dependency intersection tracking, responsive DOM manipulation, and dynamic cursor tracking.
- **FontAwesome:** Integrated scalable SVG/CSS icons for universal social connections.

## 📂 Project Structure

```text
samstev/
├── index.html            # Main landing & aggregate showcase
├── script.js             # Global state, reveals, interactions
├── style.css             # Unified global design system
├── README.md             # Project documentation
├── images/               # Heavily structured global asset directories
│   ├── weddings/
│   ├── birthdays/
│   ├── corporate/
│   └── documentary/
└── pages/                # Specific targeted route layouts
    ├── about.html
    ├── contact.html
    ├── gallery.html      # Ultimate infinite-grid global portfolio
    └── ...
```

## 🚀 SEO & Optimization

The suite relies on deep meta-property mapping, native lazy-image loading (`loading="lazy"`), constrained `object-position`/`object-fit` models to maintain portrait gravity, and lightweight HTML footprints to secure top-tier lighthouse performance and Search Engine rendering across the global web.

---
*Developed for optimal human visual engagement.*
