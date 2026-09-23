# OpenCode — Suggested UI Updates

Audit scope: visual / UI-only changes. No backend, form, or content-structure work.
Status legend: ☐ not started · ☐ approved · ☐ done

## UI style upgrades (look & feel fixes)

1. ☐ **Hero terminal card clipping** — code lines cut mid-word at the card edge on desktop
   (`"Scikit-`, `"...efficien`). Wrap/shrink the type so it reads clean.
2. ☐ **`100vh → 100dvh`** on the hero — kills the jump when iOS Safari's address bar collapses.
3. ☐ **About section balance** — right "Summary" card is half-empty with the resume button
   floating at the bottom; restructure so both cards end at the same optical height.
4. ☐ **Orphan pills** — "Data Pipelines" sits alone on row 2 of the tech strip; GitHub button
   sits alone on row 2 in Contact. Rebalance so rows fill evenly.
5. ☐ **`prefers-reduced-motion`** — typewriter, reveals, and hover-scaling currently ignore the
   OS setting; add one media query to respect it.
6. ☐ **Inline-style cleanup** — 13 `style=""` attributes (timeline locations, email line,
   dialog spacing) moved into proper classes so styling stays consistent.

## New UI features (visual additions only)

7. ☐ **Scroll progress bar** — slim accent line on the sticky nav showing how far you've read.
8. ☐ **Animated stat counters** — `3+ / 98%+ / 5` count up when they scroll into view.
9. ☐ **Tech-strip marquee** — the 11 pills scroll as a slow ticker, pause on hover (also fixes #4).
10. ☐ **Branded 404 page** — currently Vercel's default; match the site's dark/emerald style.
11. ☐ **Footer socials** — LinkedIn / GitHub / Resume icons beside the existing buttons.
12. ☐ **Work-card reveal polish** — stagger cards in each row slightly on scroll for a more
    premium cascade.

---

Approved subset and completion status get updated here as work lands.
