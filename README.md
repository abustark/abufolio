# Abufolio

Personal portfolio of **Basith AbuSyed** — Data & Analytics Engineer, ML Data
Associate II at Amazon.

**Live site:** https://abufolio.vercel.app/

The site presents six live projects across applied AI, full-stack engineering,
cloud databases and machine learning, with case notes, a resume quick-look, a
command palette and four colour palettes.

---

## What's inside

| Section | Content |
|---|---|
| **Home** | Hero, role summary, live metrics and primary calls to action |
| **About / Role Fit** | Target roles, working style and a short professional summary |
| **Projects** | Six featured projects with live screenshots, case notes and stack tags |
| **Skills** | Technical capabilities grouped by data, ML, backend and AI tooling |
| **Experience** | Amazon ML Data Associate II timeline and validated outcomes |
| **Contact** | Email, LinkedIn, GitHub, resume and a Formspree contact form |

Supporting UI:

- **Command palette** (`Ctrl/⌘ + K`) — search sections, projects, themes and actions.
- **Case notes** — a dialog per project with focus, architecture and stack detail.
- **Resume quick-look** — preview, download or copy the resume as plain text.
- **Theme & palette** — dark/light mode plus Emerald, Violet, Blue and Amber palettes, persisted in `localStorage`.
- **Project filters** — All, AI Applications, Cloud & Databases, Data & ML.
- **Branded 404** page.

---

## Tech stack

- **Hand-authored HTML, CSS and JavaScript** — no UI framework, no runtime dependencies.
- **Tailwind CSS 3.4** compiled to a single minified stylesheet (`css/styles.css`).
- **Self-hosted web fonts** (Space Grotesk, Geist Sans, Geist Mono) — no third-party font requests.
- **Vanilla JavaScript** (one deferred script, no framework) for the command palette, dialogs, filters, theme, estimator and animations.
- **WebP project previews** with PNG fallbacks.
- **Vercel** for static hosting and automatic deploys.

---

## Project structure

```text
abufolio/
├─ index.html                 # the single-page site
├─ 404.html                   # branded not-found page
├─ css/
│  └─ styles.css              # compiled, minified Tailwind output
├─ js/
│  └─ main.js                 # UI behaviour, project data, dialogs, palette
├─ src/
│  └─ input.css               # Tailwind source + custom design system
├─ assets/
│  ├─ fonts/                  # self-hosted woff2 files
│  └─ Basith_AbuSyed_Resume.pdf
├─ pics/
│  ├─ abu.png / abu.webp      # hero portrait (abu.webp is generated)
│  ├─ og.png                  # generated Open Graph card
│  └─ projects/               # live project screenshots (png + webp)
├─ scripts/
│  ├─ build-assets.mjs        # portrait, OG card and WebP generation
│  └─ capture-previews.mjs    # Playwright live screenshots
├─ docs/
│  ├─ commits.md              # versioned commit log
│  ├─ FUTURE_FEATURES_ROADMAP.md
│  └─ opencode-suggested-ui-updates.md
├─ PROJECT-INFO.md            # verified facts for every featured project
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vercel.json
```

---

## Getting started

**Requirements:** Node.js 18+ (for the build scripts) and npm.

```bash
npm install
npm run build        # compile CSS + regenerate image assets
```

Then serve the folder with any static server:

```bash
python -m http.server 4173
# or
npx serve .
```

Open <http://localhost:4173>.

During CSS work, run the watcher in a second terminal:

```bash
npm run watch:css
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run build:css` | Compiles `src/input.css` → `css/styles.css` (minified). |
| `npm run watch:css` | Recompiles the stylesheet on change. |
| `npm run build:assets` | Generates `abu.webp`, `abu-400.webp`, `og.png` and project WebP files. |
| `npm run build` | Runs the CSS build and the asset build. |
| `npm run check` | Runs the static quality gates (HTML, refs, encoding, CSS freshness, content sync). |
| `npm run check:links` | Also verifies every live project URL responds (needs network). |
| `npm run shots` | Captures fresh 900×560 screenshots of the live projects with Playwright. |

`npm run shots` accepts project slugs, for example `npm run shots abot linkly`.
A scheduled GitHub Actions workflow refreshes the previews every Monday.

---

## Quality gates

`npm run check` runs `scripts/check-site.mjs` — a dependency-free static checker
that fails the build on:

| Gate | What it enforces |
|---|---|
| **encoding** | Both pages are valid UTF-8 with no mojibake (`â€"`, `Â·`, `Ã`). |
| **html** | Doctype, `lang`, charset, viewport, title/meta/canonical; no duplicate ids; no skipped heading levels; `<img>` has `alt` + intrinsic size; in-page anchors resolve; unguarded `getElementById` targets exist. |
| **refs** | Every local `href`/`src`/`srcset`/`url()` resolves to a real file. |
| **css** | `css/styles.css` is byte-identical to a fresh build of `src/input.css` (never commit a stale stylesheet). |
| **content** | `js/main.js` `projectDetails` and the `index.html` cards describe the same projects, every entry has its required fields, the hero "Live deployments" count matches the real number of project links, and the project ranking (best first) matches the documented order. |
| **links** | *(with `--links` only)* every external URL responds — LinkedIn's bot block and Streamlit cold starts are reported as warnings, not failures. |

CI runs these on every push and pull request to `main`
(`.github/workflows/quality-gates.yml`); the live-link job runs only on `main`.

---

## Editing project content

Project copy lives in two places and must stay in sync:

1. **`js/main.js`** — the `projectDetails` object powers the case-notes dialog and
   the command palette.
2. **`index.html`** — the visible project cards.

**`PROJECT-INFO.md`** is the verified source of truth for every project: stack
versions, architecture, features, metrics, resume bullets, portfolio blurbs and
the claims each project must **not** make. Update it first, then the two files
above.

Projects are displayed in a deliberate ranking, best first:

| # | Project | `data-project` |
|---|---|---|
| 1 | ABot — Multi-Model AI Chat Hub | `abot` |
| 2 | Linkly — Link Management & Analytics | `linkly` |
| 3 | PriceTracked — Ecommerce Price Tracker | `price-trail` |
| 4 | House Price Prediction (Bengaluru) | `house-price` |
| 5 | N-GELO — Digital Marketplace | `ngelo` |
| 6 | CoverCraft — AI Cover Letter Builder | `covercraft` |

Cards 1–3 render in the grid; 4–6 sit inside the "More projects" `<details>`.
`npm run check` fails if either the card order or the `projectDetails` order
diverges from this ranking — change the ranking in `scripts/check-site.mjs`
(`RANKED_ORDER`) or override it for one run with `PROJECT_ORDER=a,b,c`.

---

## Deployment

The site is deployed on Vercel. `vercel.json` runs `npm run build` and serves the
repository root as static output:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "framework": null,
  "installCommand": "npm install"
}
```

Any push to `main` triggers a production deploy. No environment variables are
required for the site itself; the contact form posts to Formspree.

---

## Accessibility & performance

- Responsive from 320 px upward with fluid type and spacing.
- Keyboard-operable dialogs, command palette and project cards.
- Visible focus states, ARIA labels and live regions.
- `prefers-reduced-motion` support for reveals, ticker and typewriter effects.
- Self-hosted fonts, lazy-loaded screenshots and WebP with PNG fallbacks.
- Semantic landmarks, skip link, SEO metadata, JSON-LD and Open Graph tags.

---

## Contact

- **Email:** bas.abu0802@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/bas-abu/
- **GitHub:** https://github.com/abustark

---

## License

Personal portfolio — all rights reserved. The content, copy, screenshots and
resume are © Basith AbuSyed and are not licensed for reuse.
