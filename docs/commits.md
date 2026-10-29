# Abufolio Commit Log

This document tracks every commit made on `main` following the versioning schema:
- Structure: `1.0.1` … `1.0.10` ➔ **rolls over to `1.1.0`**; then `1.1.1` … `1.1.10` ➔ **`1.2.0`**, and so on.
- **The third number NEVER exceeds `.10`.** When it would, roll the second number. Do not write `1.0.11`, `1.1.11`, … — that is the drift this rule exists to prevent.
- Format: `<version> - <short sentence>`

> ### 📌 Next version — **keep this line current, every commit**
> - **`main` → `1.3.2`** (current head is `1.3.1` — see below)

> **🧾 History note (why early history has no numbers):** all commits before `1.1.0` used unversioned `style:` / `feat:` / `docs:` / `chore:` subjects (see `git log`). Versioning starts at **`1.1.0`**; `package.json` stays `1.0.0` (decoupled, same as ABot). The `📌 Next version` line must be updated with each commit.

---

## Commit History

### 1.3.1 - Fix mobile filter pills vertical clipping and apply Apple glass blur to section headers
- **Date**: 2026-10-29
- **Changes**:
  - **Fixed Mobile Filter Pills Vertical Clipping**:
    - Identified root cause in `.filter-bar`: `overflow-x: auto` forces `overflow-y` to compute to `auto`/`hidden` per CSS specification, while `.filter-bar` had `padding-top: 0` and minimal `padding-bottom: 0.4rem`. The chips sat flush against the top overflow boundary (`y = 0`), clipping the 1px border and capsule curves at both top and bottom edges, while `translateY(-2px)` on touch pushed chips into negative space.
    - Added generous vertical track padding (`padding: 0.65rem 0.5rem 0.85rem 0.5rem;`), `align-items: center;`, normalized chip line-height (`line-height: 1.25;`), and removed hover translation on mobile touch screens (`transform: none`). Filter capsules now retain 100% round curvature and complete borders/shadows with ample clearance.
  - **Applied Apple iOS Liquid Glass Blur to Section Sticky Headers**:
    - Upgraded `.section-sticky` (`01 / role fit`, `02 / projects`, `03 / skills`, `04 / experience`): applied `backdrop-filter: blur(20px) saturate(190%)`, translucent obsidian glass gradient (`rgba(255, 255, 255, 0.05)` to `0.01`), specular top hairline (`border-top: 1px solid rgba(255, 255, 255, 0.08)`), physical depth shadow (`inset 0 1px 0 rgba(255, 255, 255, 0.12)`, `0 8px 24px -4px rgba(0, 0, 0, 0.35)`), and light mode frosted glass support.
    - Removed duplicate `border-top` on `.section-index` so the glass bar renders as a single seamless luminous lens.
  - **Apple Glass Filter Chips**:
    - Upgraded `.filter-chip` to match the liquid glass tactile aesthetic with top specular highlights and bottom refraction in both dark and light modes.
  - Recompiled production stylesheet (`npm run build:css`).
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.3.2`.

### 1.3.0 - Fix mobile description clipping and restore rounded pill aesthetics
- **Date**: 2026-10-29
- **Changes**:
  - Eliminated the mobile text clipping bug where project descriptions bled or were covered by the skills tag row:
    - Removed `-webkit-line-clamp: 3` and artificial desktop `min-height: 4.8rem` on `.project-content p:not(.project-label)`.
    - Removed `-webkit-line-clamp: 2` on secondary `.project-row-desc`.
    - Added dedicated vertical margins (`margin: 0 0 0.85rem 0`) and flexible container heights so the entire description is 100% visible across all screen sizes with comfortable breathing room above the tags.
  - Restored the organic rounded pill shape (`border-radius: 999px`) across all project cards (`.tag-row span`, `.project-row .tag-row span`), skills cards (`.tool-group span`), and modals (`.resume-tags span`), eliminating the flat harsh rectangular boxes.
  - Recompiled production stylesheet (`npm run build:css`).
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.3.1`.

### 1.2.10 - Apply gstack-vetted radius hierarchy to project and skill badges
- **Date**: 2026-10-29
- **Changes**:
  - Implemented `gstack`-calibrated border-radius hierarchy to eliminate "uniform bubbly pill radius on everything" AI-slop pattern.
  - **Project Cards (`.tag-row span`, `.project-row .tag-row span`)**: Upgraded from 999px rounded balloon capsules to 6px technical code squircles (`border-radius: 6px` / `5px`), crisp monospace typography (`var(--font-mono)`, 0.74rem, weight 500, -0.01em tracking), machined dark slate background with hairline border, and top inset highlight (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04)`).
  - **Skills Section (`.skills-card .tool-group span`)**: Replaced generic 999px pills and fake button-jump hover with 8px tactile competency badges (`border-radius: 8px`), sans-serif typography, clean tonal surface, and subtle accent border illumination on hover (`border-color: color-mix(in srgb, var(--accent) 35%, var(--line))`).
  - **Resume Dialog (`.resume-tags span`)**: Styled with matching 8px competency badges.
  - Recompiled production minified stylesheet (`npm run build:css`).
  - `docs/commits.md`: `📌 Next version` rolled over to `main → 1.3.0` (per strict `.10` rollover rule).

### 1.2.9 - Fix skills streaming ticker for desktop and make track unclickable
- **Date**: 2026-10-29
- **Changes**:
  - Made `.tech-strip` unclickable and non-interactive (`pointer-events: none; user-select: none; cursor: default;`) so it cannot be selected or clicked.
  - Removed hover/focus pause triggers from `.tech-strip-track` so the marquee streams 100% of the time on desktop.
  - Added an exemption inside `@media (prefers-reduced-motion: reduce)` for `.tech-strip-track` so that Windows OS reduced-motion settings do not freeze the stream into a static cut-off element.
  - Applied GPU transform acceleration (`transform: translate3d(0, 0, 0)` and `will-change: transform`).
  - Recompiled production minified stylesheet (`npm run build:css`).
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.2.10`.

### 1.2.8 - Add live project screenshots and CoverCraft picture card thumbnail
- **Date**: 2026-10-29
- **Changes**:
  - Captured fresh live screenshots for ABot (`https://abot-ai.vercel.app/`), CoverCraft (`https://coverltr.vercel.app/`), Linkly (`https://linkly-link.vercel.app/`), and N-GELO (`https://ecom-seven-sand.vercel.app/`).
  - Generated high-resolution 900×560 desktop screenshots for PriceTrailed from the official project artifacts (`d:/projects/price-trail/artifacts/final-light-desktop.png`).
  - Added fallback `house-price.png` matching `house-price.webp`.
  - Upgraded CoverCraft card thumbnail in `index.html` from the static `.covercraft-tile` monogram placeholder to a standard responsive `<picture>` + `<img>` thumbnail linking to the live site.
  - Added CoverCraft to `scripts/capture-previews.mjs`.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.2.9`.

### 1.2.7 - Update project summaries from source info sheets, update ABot and PriceTrailed links
- **Date**: 2026-10-29
- **Changes**:
  - Aligned all 6 project cards, case notes dialogs, and command palette entries with their source-of-truth `PROJECT-INFO.md` files in `d:/projects/`.
  - Updated ABot: live link to `https://abot-ai.vercel.app/`, zero-framework vanilla ES modules architecture, 31 models across 4 providers, SSE streaming, Express/Vercel serverless proxy, Firebase Auth & Firestore chat storage.
  - Updated PriceTrailed (formerly PriceTrail): renamed to PriceTrailed, live link to `https://pricetrailed.vercel.app/`, Next.js 15 App Router & React 19, multi-store scraping for Amazon India/Flipkart/Myntra/AJIO with SSRF guards, in-app target alerts, interactive SVG chart, and Auth.js Google sign-in with guest migration.
  - Updated Linkly: dual Express/Vercel serverless runtimes on MongoDB Atlas, atomic 302 click tracking, single-query $facet 30-day analytics, rotating HMAC visitor tracking, and OpenAPI 3.1 REST API with SHA-256 keys.
  - Updated House Price Prediction: final-year MCA thesis on 13,320 Bengaluru listings, 8-feature preprocessing in `src/encoding.py`, Linear/Ridge baselines vs Random Forest (R² = 0.787), dual Streamlit & FastAPI REST serving with Docker and 7 pytest tests.
  - Updated N-GELO: dual-stack developer marketplace from unified spec (Vue 3 + Pinia + shadcn-vue and Next.js 16 + React 19 + Zustand), 14 dev products, coupon cart, mock checkout with order generation, and triple dashboards.
  - Updated CoverCraft: React 19 + Vite + Tailwind v4 + TypeScript, Vercel serverless functions isolating OpenRouter keys and scraping job postings past CORS, lazy-loaded PDF/DOCX resume parsing with Gemma 4 formatting, 16 mode/tone paths, and one-click PDF/DOCX export.
  - Updated `scripts/capture-previews.mjs` URLs for ABot and PriceTrailed; rebuilt Tailwind CSS bundle (`css/styles.css`).
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.2.8`.

### 1.1.7 - mobile header controls reverted to pre-1.1.5 sizes, sticky re-tucked
- **Date**: 2026-10-17
- **Owner directive**: the phone header bar looked bulky after the 44px touch-target change — full revert of the header controls to the old, smaller sizes (accepting smaller tap areas).
- **Changes**:
  - Header icon controls back to pre-1.1.5 sizes — ≤640: palette trigger 44 → 38px (`2.35rem`), theme + menu toggles 44×44 → 38×38; ≤480: palette trigger 44 → 36px (`2.25rem`), toggles 44×44 → 36×36. Desktop/tablet (>640) untouched; filter chips stay 44px.
  - `.section-sticky` re-tucked to the now-shorter header (58.1px at ≤480, 65.6px at ≤640): ≤640 `4.4rem → 4.05rem`, ≤480 `4.1rem → 3.6rem`; strips eliminated again at 390/480/620, 768/1024 unchanged.
  - C-pass re-run on rebuild: 31/32 (the single "fail" is the known artifact — `scroll-snap-type: x proximity` serializes to `x`; built CSS carries `x proximity`), 0 console errors over http, sticky probe hits the unit at all five widths, hero metrics unchanged from 1.1.6, light/dark contrast intact.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.8`.

### 1.1.6 - verification follow-ups: per-breakpoint sticky tuck, tighter hero band gaps
- **Date**: 2026-10-16
- **Context**: The deferred Playwright C-pass (over local http, real fonts) on 1.1.5 exposed: the sticky strip still existed at 481–960px because the real header is 71.6/78.8px there (not the assumed 81px), and the band→photo gap measured 100–108px.
- **Changes**:
  - `.section-sticky` `top` retuned to measured header heights — ≤640 → 4.4rem (from 5rem), new ≤960 override 4.9rem; strips eliminated at 390/480/620/768 while >960 stayed tucked; `elementFromPoint` probes now hit the sticky unit everywhere tested.
  - `.hero-panel` top margin: ≤640 3rem → 1.75rem, ≤480 2.5rem → 1.5rem — band→photo gap 108/100 → ~88/84px; the profile photo still starts below the fold on 360/390/430, preserving the scroll-reveal behavior.
  - C-pass verified: 0 console errors over http; light-mode contrast ≥4.5 on all four palettes; 44px touch targets; filter edge-fade + chip snap; terminal word-wrap intact; tech strip above the 900px desktop fold; dark mode intact; no horizontal overflow from 360–1440.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.7`.

### 1.1.5 - mobile hero signal band, sticky tuck, light-mode contrast, 44px targets
- **Date**: 2026-10-16
- **Owner directive**: keep the mobile hero photo as a scroll reveal but fill the dead void with a designed, taller stats band; ship the core audit fixes plus the four selected polish items; verification pass deferred until after push.
- **Changes**:
  - Mobile hero (≤640 + ≤480): `.signal-grid` is now a taller "signal band" — hairline top rule, more padding (2.5rem/2rem), stat tiles ≥7rem with vertically centered content, larger numerals (≤640 clamp 1.75–2.15rem, ≤480 1.8rem), roomier eyebrow/lede rhythm; `.hero-panel` top margin tightened (3rem/2.5rem) so the profile photo stays just below the fold and still reveals on scroll.
  - `.section-sticky` mobile `top` retuned to the frosted header (5rem at ≤640, new 4.1rem override at ≤480) — removes the 12px strip where scrolling content flashed above the stuck title.
  - Header icon buttons (palette/theme/menu) raised to 44px touch targets on both mobile breakpoints.
  - Light-mode palettes: accent ramps darkened to clear 4.5:1 text contrast (emerald `#047857`/`#0f766e`, blue `#0369a1`/`#075985`, amber `#b45309`/`#be123c`; violet already passed) — glows and hairlines follow.
  - Polish: mobile filter bar gets edge-fade mask + chip scroll-snap; tech strip top margin 3.5rem → 1.75rem (ticker clears the 900px desktop fold); terminal card wraps on word boundaries (`overflow-wrap`); command palette placeholder shortened so it no longer clips under the close button; removed a dead duplicate `.hero` rule.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.6`.
  - No gates or browser checks run per owner order (build only); Playwright verification pass scheduled after push.

### 1.1.4 - sticky title unit, section-change haptics, scroll-reactive separators
- **Date**: 2026-10-13
- **Owner directive**: stick the section title with the number bar (no gap); haptic on every section transition; small dynamic-color line at the middle/end of sections.
- **Changes**:
  - `.section-sticky` wrapper (label + h2) pins as one full-bleed frosted unit, zero gap; lead scrolls away; 01–04 only, contact card too short (unchanged).
  - Scroll-spy fires `tapHaptic([15, 40, 15])` on active-section change (scroll-driven, initial fire skipped; coarse-pointer gated).
  - `.section-end` separators at the end of all 5 sections: accent gradient fill + glow track visibility via `--fill` observer; static full line under reduced-motion.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.5`.
  - No gates or browser checks run per owner order (build only).

### 1.1.3 - full-bleed sticky number tiles that pin for the whole section
- **Date**: 2026-10-13
- **Owner directive**: the number-tile box should span edge-to-edge (no rounded-rect gap on the sides), and it must stay pinned for the entire section, not disappear after a slight scroll.
- **Changes**:
  - Moved `.section-index` out of `.section-head` to be a direct child of each `<section>` (01–04) so sticky holds for the full section height, not just the head block.
  - Full-bleed breakout: `width: 100vw` + `margin-left/right: calc(50% - 50vw)`, square corners, top/bottom hairline borders only, frosted bg, text padded back to the 1120px column. Compact mobile variant kept.
  - Contact label left static inside its card (not a section child).
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.4`.

### 1.1.2 - sticky number tiles only + mobile left-cut fixes
- **Date**: 2026-10-13
- **Owner directive**: only the number tile (`01 / role fit` etc.) stays sticky — headings and descriptions scroll away; while stuck it sits in a full-width box. Mobile left edge cuts titles/descriptions — find and fix.
- **Changes**:
  - Sticky moved from `.section-head` to the label itself (scoped `.section-head > .section-index` + contact label, so card labels never stick): always-box bar (border, blur, full container width), compact mobile variant; `.section-head` back to static.
  - Mobile cut fixes: removed the exact-viewport-width sticky head with negative margins (sub-pixel pannable overflow); `.skills-metric-pill` text wraps (e.g. the 44-char accuracy pill overflowed ~66px at 320px); `.status-pill` wraps on mobile; `overflow-wrap: anywhere` on about/resume email links.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.3`.
  - No gates or browser checks run per owner order (build only).

### 1.1.1 - haptic tap feedback: press states + mobile vibration
- **Date**: 2026-10-13
- **Owner directive**: haptic feel on clicks, especially mobile.
- **Changes**:
  - Visual press states (`scale` 0.94–0.96) on nav links, icon buttons, segment pills, dialog close, command rows; `transform` added to their transition lists (instant under reduced-motion via the existing kill-block).
  - `tapHaptic` in `main.js`: `navigator.vibrate` gated on coarse pointers (10ms taps, double-tap pattern on primary CTAs) via one delegated click listener covering buttons, links, summaries, checks, ranges, selects.
  - `docs/commits.md`: `📌 Next version` advanced to `main → 1.1.2`.
  - No gates or browser checks run per owner order (build only).

### 1.1.0 - sticky section heads, numbered labels, A1 removal, A2 collapse
- **Date**: 2026-10-13
- **Owner directive**: (a) sub-section headers stay visible below the main header while scrolling their section, PC + mobile — agent's choice of style; (b) validation simulator removed from Skills (too technical), price estimator collapsed in the House Price card; versioned `docs/commits.md` history imitating ABot's format.
- **Changes**:
  - Sticky `.section-head` (About/Work/Skills/Experience): `position: sticky` below the pill nav, frosted contained bar, compact mobile variant; `overflow-x: hidden` → `clip` on `html`/`body` so Chromium keeps sticky working.
  - Numbered labels restored on all five sections (`01 / role fit` … `05 / contact`); Contact intro paragraph standardized with the shared `section-lead` class.
  - A1 validation simulator removed entirely (markup in Enterprise Rigor card, `renderDQ` JS, `.sim-metrics`/`.sim-matrix`/`.sim-check` CSS); roadmap item 1 marked removed per owner directive.
  - A2 estimator collapsed by default behind a native `<details>` disclosure with live mini-price in the summary; `/model` palette shortcut auto-opens it (plus the existing filter reset); roadmap items 2 + 4 updated.
  - `docs/commits.md`: created, versioning starts at `1.1.0`; `📌 Next version` set to `main → 1.1.1`.
  - No gates or browser checks run per owner order (build only).
