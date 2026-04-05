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
