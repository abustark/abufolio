# Abufolio Commit Log

This document tracks every commit made on `main` following the versioning schema:
- Structure: `1.0.1` … `1.0.10` ➔ **rolls over to `1.1.0`**; then `1.1.1` … `1.1.10` ➔ **`1.2.0`**, and so on.
- **The third number NEVER exceeds `.10`.** When it would, roll the second number. Do not write `1.0.11`, `1.1.11`, … — that is the drift this rule exists to prevent.
- Format: `<version> - <short sentence>`

> ### 📌 Next version — **keep this line current, every commit**
> - **`main` → `1.1.5`** (current head is `1.1.4` — see below)

> **🧾 History note (why early history has no numbers):** all commits before `1.1.0` used unversioned `style:` / `feat:` / `docs:` / `chore:` subjects (see `git log`). Versioning starts at **`1.1.0`**; `package.json` stays `1.0.0` (decoupled, same as ABot). The `📌 Next version` line must be updated with each commit.

---

## Commit History

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
