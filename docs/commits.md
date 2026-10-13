# Abufolio Commit Log

This document tracks every commit made on `main` following the versioning schema:
- Structure: `1.0.1` … `1.0.10` ➔ **rolls over to `1.1.0`**; then `1.1.1` … `1.1.10` ➔ **`1.2.0`**, and so on.
- **The third number NEVER exceeds `.10`.** When it would, roll the second number. Do not write `1.0.11`, `1.1.11`, … — that is the drift this rule exists to prevent.
- Format: `<version> - <short sentence>`

> ### 📌 Next version — **keep this line current, every commit**
> - **`main` → `1.1.1`** (current head is `1.1.0` — see below)

> **🧾 History note (why early history has no numbers):** all commits before `1.1.0` used unversioned `style:` / `feat:` / `docs:` / `chore:` subjects (see `git log`). Versioning starts at **`1.1.0`**; `package.json` stays `1.0.0` (decoupled, same as ABot). The `📌 Next version` line must be updated with each commit.

---

## Commit History

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
