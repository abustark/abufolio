# Abufolio — Project Info Sheet

> **Purpose:** every fact a human or an AI needs to understand the six projects
> featured on this portfolio and write accurate resume entries, portfolio
> summaries, LinkedIn posts or interview talking points — without reading each
> project's source code.
>
> **Rule:** use only the facts in this sheet. Do not invent users, traffic,
> revenue, funding, team size or timelines. If a number is not here, it does not
> exist. Each project also keeps its own `PROJECT-INFO.md` in its source repo;
> those files are the upstream source of truth for this summary.

**Portfolio owner:** Basith AbuSyed / ABu (`abustark` on GitHub) — Data &
Analytics Engineer, ML Data Associate II at Amazon.
**Portfolio site:** https://abufolio.vercel.app/
**Last audited:** 2026-11-06

---

## Project index

| # | Project | Type | Live | Source | License |
|---|---|---|---|---|---|
| 1 | **ABot — AI Chat Hub** | Multi-model AI chat client + serverless proxy | https://abot-ai.vercel.app/ | private `abustark/abot` | Private, all rights reserved |
| 2 | **PriceTracked — Ecommerce Price Tracker** | Full-stack price-tracking web app | https://pricetracked.vercel.app/ | https://github.com/abustark/price-trail | None declared (private) |
| 3 | **Linkly — Link Management & Analytics** | Full-stack app + public REST API | https://linkly-link.vercel.app/ | https://github.com/abustark/linkly | MIT |
| 4 | **House Price Prediction (Bengaluru)** | ML regression + FastAPI + Streamlit | https://house-price-prediction-using-machine-learning-algorithms-9qccn.streamlit.app/ | https://github.com/abustark/HOUSE-PRICE-PREDICTION-USING-MACHINE-LEARNING-ALGORITHMS | No code license; dataset CC0 |
| 5 | **N-GELO — Digital Marketplace for Developers** | Dual-stack Vue 3 + Next.js 16 marketplace | https://ecom-seven-sand.vercel.app/ | https://github.com/abustark/project_bmw | MIT |
| 6 | **CoverCraft — AI Cover Letter Builder** | Applied-AI React SPA + serverless proxy | https://coverltr.vercel.app/ | https://github.com/abustark/cover_letter_gen | None declared (private) |

**Live-link note (audit, 2026-11-06):** the historical PriceTrail aliases
`https://price-trail-ruddy.vercel.app/` and `https://pricetrailed.vercel.app/`
return 404. The working production URL is `https://pricetracked.vercel.app/`,
an alias for the same Vercel deployment as
`https://price-trail-abustarks-projects.vercel.app/`; both serve the current
"PriceTrail — buy at the right time" build (34,215 bytes, verified 200).

---

## 1. ABot — AI Chat Hub

### Identity

| Field | Value |
|---|---|
| Name | **ABot — AI Chat Hub** |
| Type | Full-stack web application (multi-model AI chat client + hardened serverless proxy) |
| Author | ABu / Basith AbuSyed (`abustark` on GitHub) |
| Live site | https://abot-ai.vercel.app/ |
| Source | Private GitHub repo `abustark/abot` (access on request) |
| License | Private, all rights reserved (`UNLICENSED`) |
| Version | 2.8.0 (2026-10-29) |
| Status | Actively maintained |

**One-liner (25 words):** ABot is a vanilla-JS chat hub routing 31 configured
models across Google Gemini, Groq, NVIDIA NIM and OpenRouter free tier, with SSE
streaming and Firestore chat storage.

### Stack

- **Frontend:** vanilla HTML/CSS/JS, 13 ES modules (~4,342 lines), zero UI
  frameworks and no app bundler.
- **Styling:** Tailwind CSS 3.4.13 compiled to 91 KB of CSS; typography plugin.
- **Backend:** Vercel serverless `api/chat.js` (60 s max duration) and a local
  Express 4.18 mirror (`server.js`) sharing `lib/chat-security.js`.
- **Auth & data:** Firebase Auth (email/password, Google, anonymous guest) and
  Cloud Firestore, owner-only rules at `users/{uid}/chats/{chatId}`.
- **AI providers:** Google Gemini direct, Groq, NVIDIA NIM and OpenRouter free
  tier; 31 configured models across 4 provider APIs.
- **Chat rendering:** SSE streaming, vendored `marked`, lazy-loaded
  `highlight.js`, safe-markdown guard.
- **Platform:** installable PWA (manifest + service worker, 25 precached
  assets), strict CSP with two SHA-256-pinned inline scripts, security headers.
- **Quality:** 4 Node test suites, ESLint, acorn syntax check, `tsc` check-only
  JSDoc types, HTML validation, Playwright E2E and browser UI audits.

### Architecture highlights

- Provider keys never reach the browser: the client sends a Firebase JWT to
  `POST /api/chat`, which verifies the token and email, applies per-identity and
  per-IP rate limits, validates request size (40 messages / 8k chars each /
  200k total / 256 KB JSON), then streams the upstream response.
- `*:free` model IDs route to OpenRouter; `google/*` to Gemini direct; `groq/*`
  to Groq; `nvidia/*` to NIM; everything else to OpenRouter.
- Chat CRUD is one Firestore write per action; search, TTS, export/import and a
  9-preset prompt library sit on top.
- Static-file allowlist serves only `index.html`, `dist/`, `js/`, `vendor/`,
  the service worker, manifest and icons; `.env`, the service-account key and
  `.git/` return 404.

### Feature highlights

- 31 models across 4 providers, including an OpenRouter auto-failover router.
- Per-request web-search and thinking toggles with capability gating.
- Streaming with 100 ms throttled rendering, stop-generation and retry cards.
- Full markdown with lazy syntax highlighting.
- New/rename/delete chats, search, timestamps, TTS, JSON + Markdown
  export/import, draft leave-guard.
- Email/password, Google and 5-message guest mode; guest-to-Google merge.
- Command palette (`Ctrl+K`), keyboard shortcuts, dark/light pre-paint theme.
- Installable PWA with safe-area insets and a mobile keyboard dock.

### Metrics

- 31 models / 4 provider APIs; 9 prompt presets.
- ~4,342 lines across 13 JS modules; `index.html` 853 lines.
- 1,751 lines of Tailwind source → 91 KB compiled CSS.
- 4 automated test suites; 49-entry bug registry.
- 30 requests / 15 min per identity + 100 requests / 15 min per IP.
- 55 s upstream abort inside a 60 s serverless limit.
- 10 security findings remediated in Phase 1.

### Resume bullets

- Built a multi-model AI chat hub (vanilla ES modules, Tailwind, no framework)
  routing 31 models across Google Gemini, Groq, NVIDIA NIM and OpenRouter free
  tier with SSE streaming and 100 ms throttled rendering.
- Designed a hardened proxy (`api/chat.js` + `server.js` sharing
  `lib/chat-security.js`) with Firebase JWT verification, an email-verified
  gate, per-uid/hashed-IP rate limits, 40/8k/200k caps, a 55 s abort and generic
  error envelopes — provider keys never reach the browser.
- Implemented Firestore per-user chat CRUD, search, TTS, JSON/Markdown
  export/import, a 9-preset prompt library, a `Ctrl+K` palette and 5-message
  guest mode inside an installable dark/light PWA.
- Closed 10 security findings (open static root, missing limiter, CORS combo,
  query-token auth, URL key, token-burn caps, error leakage, client-only guest
  cap, hung lambdas, inline CSP) with an allowlist static server, header-only
  auth and a strict CSP.

### Portfolio blurb (~30 words)

ABot — one calm hub for 31 AI models with streaming chat, prompt presets, TTS
and deep chat management. Hardened proxy, Google + guest auth, installable PWA.
`Vanilla JS · Tailwind · Firebase · Vercel · 4 AI providers`

### Do not claim

No user counts, traffic, revenue or "production at scale". Not TypeScript (JSDoc
+ `tsc` check-only). No WCAG certification. Free-tier models can be rate-limited
or retired. Guest mode is capped at 5 messages. The repo is private — link the
live demo, not the repo.

---

## 2. PriceTracked — Ecommerce Price Tracker

> The portfolio card uses the label **PriceTracked**; the project's repo is
> `price-trail` and the live app tab title reads "PriceTrail — buy at the right time".

### Identity

| Field | Value |
|---|---|
| Name | **PriceTracked — Ecommerce Price Tracker** (repo `price-trail`, app title "PriceTrail") |
| Type | Full-stack web application (consumer price-tracking utility) |
| Author | ABu (`abustark` on GitHub) |
| Live site | https://pricetracked.vercel.app/ |
| Source | https://github.com/abustark/price-trail |
| License | None declared (private) |
| Status | Production-deployed on Vercel, actively maintained (2026, 60 commits) |

**One-liner (25 words):** PriceTracked is a Next.js + MongoDB price tracker for
Amazon India, Flipkart, Myntra and AJIO with Google sign-in, guest watchlists,
daily cron scans and SVG history charts.

### Stack

- **Framework:** Next.js 15.3 App Router, React 19, TypeScript 5.8 (strict,
  `tsc --noEmit` gate).
- **Database:** MongoDB Atlas through the raw `mongodb` 6.16 driver (no ORM);
  `products` + `price_samples`, 5 indexes.
- **Auth:** Auth.js / NextAuth 5.0 beta with Google OAuth and JWT sessions, plus
  `google-auth-library` for the popup code-exchange flow.
- **Validation:** zod 3.24 for the `POST /api/products` schema.
- **Hosting:** Vercel Functions for API routes and a daily Vercel Cron job
  (`0 0 * * *` → `GET /api/cron/scan`).
- **Styling:** custom CSS (`app/globals.css`, 707 lines), no CSS framework;
  Geist / Geist Mono / Fraunces / Playfair via Next fonts.
- **Charts:** hand-rolled SVG `PriceChart.tsx` (414 lines, no chart library).
- **Quality:** ESLint 9.25 (`next/core-web-vitals`), `tsc --noEmit`,
  `next build`. No unit or E2E framework.

### Architecture highlights

- Server components read MongoDB directly; client components call 7 API paths.
- Two auth paths set the same session cookie: the standard NextAuth handler and
  a fast Google popup that exchanges and verifies the code server-side.
- Guest-first watchlists use an httpOnly UUID cookie; on sign-in
  `claimGuestProducts` merges guest rows into the Google account by
  `normalizedUrl` and re-points samples.
- Scanner is isolated in `lib/scanner.ts`: direct fetch (Chrome/125 UA, 18 s
  timeout, 3 attempts), optional render-proxy fallback, parse order JSON-LD →
  Open Graph price → store regex → generic `data-price`/commerce JSON; MRP,
  currency, stock and SSRF/redirect guards.
- Daily cron scans up to 20 due products per run and records `nextScanAt` and
  `lastError`.
- The first scan queues a 6-point synthetic baseline so charts render before
  real history accumulates.

### Feature highlights

- Paste-to-track with short-link resolution and URL normalisation.
- 4 dedicated store adapters + 1 generic structured-data adapter.
- Highest/lowest/most-common price, change count and average change frequency.
- `BUY NOW / FAIR PRICE / WAIT` verdict with a /100 deal score and SVG gauge.
- Interactive 720×300 SVG chart with 220-point downsampling, MRP overlay,
  crosshair and keyboard inspection.
- In-app target-price alerts with presets and a progress bar (no email or push
  worker).
- Manual rescan and history reset.
- Guest-to-account watchlist migration.
- Recent-drops tape, dark/light theme, `/how-it-works`, `/privacy`, `/terms`,
  SEO/OG images and branded 404.

### Metrics

- 77 git-tracked files; ~5,353 lines across TS/TSX/CSS.
- 7 API paths / 8 route files / 10 method handlers.
- 15 components, 9 lib modules, 7 pages.
- 2 collections, 5 indexes.
- 4 dedicated stores + 1 generic adapter.
- 6 synthetic price samples per new product; up to 1,000 samples loaded per
  detail page, last 12 shown.
- 60 commits on `main`.

### Resume bullets

- Built an ecommerce price tracker (Next.js 15 App Router, React 19,
  TypeScript, MongoDB driver) for Amazon India, Flipkart, Myntra and AJIO plus a
  generic JSON-LD/OG fallback, with short-link resolution and SSRF-safe
  normalisation.
- Designed a scraper→upsert pipeline (Chrome UA, 18 s × 3 attempts, proxy
  fallback, store-specific + generic parsing, MRP/currency/stock extraction)
  with per-user `{userId,normalizedUrl}` uniqueness and daily Vercel Cron
  rescans (≤20 due per run).
- Implemented Google OAuth via Auth.js (standard handler + fast popup
  code-exchange flow) with guest UUID watchlists that merge into accounts on
  sign-in, plus in-app target-price alerts and manual rescan/history-reset.
- Created a hand-rolled SVG price chart (220-point downsampling, MRP overlay,
  crosshair + keyboard inspection) with highest/lowest/mode/change-frequency
  stats and a BUY/FAIR/WAIT verdict with deal score.

### Portfolio blurb (~30 words)

PriceTracked — paste any product link to track its price over time, see
highs/lows/trends with a buy verdict, set target alerts, and let daily scans keep
history fresh. Guest mode included.
`Next.js · React · MongoDB · Auth.js · Vercel`

### Do not claim

No email alerts, no PWA installability and no unit/E2E test suite — none exist.
No Cheerio, Nodemailer or Tailwind CSS. It is Next.js 15, not Next.js 14. Git
history starts 2026-05-17, so the portfolio label says **May 2026 – Present**.

---

## 3. Linkly — Link Management & Analytics Platform

### Identity

| Field | Value |
|---|---|
| Name | **Linkly — Link Management & Analytics Platform** |
| Type | Full-stack web application + public REST API (self-hosted SaaS-style utility) |
| Author | ABu (`abustark` on GitHub) |
| Live site | https://linkly-link.vercel.app |
| Live demo | https://linkly-link.vercel.app/dashboard.html?demo=1 (also `/demo`) |
| API reference | https://linkly-link.vercel.app/api.html · OpenAPI: `/openapi.json` |
| Source | https://github.com/abustark/linkly |
| License | MIT |
| Status | Production-deployed on Vercel, actively maintained (2026) |

**One-liner (25 words):** Linkly is a link management platform built on
Node.js/Express and MongoDB with Firebase Google sign-in, branded short links,
privacy-conscious analytics, QR codes and a documented REST API.

### Stack

- **Runtime:** Node.js 22, Express 4.18 locally, Vercel serverless functions in
  production, one shared codebase.
- **Database:** MongoDB Atlas via Mongoose 7.5.
- **Auth:** Firebase Auth on the client (v10.12.2) + `firebase-admin` 13.5 on
  the server; Google Identity Services credential/One Tap flow.
- **API keys:** Node `crypto`; `lk_live_…` keys stored as SHA-256 hashes.
- **Frontend:** vanilla HTML5/CSS3/ES2022, zero frameworks and zero build step.
- **Extras:** self-hosted qrcodejs, hand-written service worker + manifest
  (`linkly-v6`), strict CSP and security headers.
- **Testing:** Node built-in test runner, 36 tests across 4 files, plus a
  Playwright browser harness and GitHub Actions CI.

### Architecture highlights

- The same API modules run as a local Express server (`server.js`, :5000) and as
  Vercel functions (`api/*.js`).
- `Url` documents hold an atomic `clickCount` and pre-aggregated `clicksByDay`
  buckets; `Click` documents keep coarse dimensions for 90 days via a TTL index;
  `ApiKey` stores only a hash; `RateLimit` backs persistent limiting.
- Two auth planes: Firebase ID tokens for browser sessions and hashed
  `lk_live_` keys for the public API (revocable, max 10 active).
- Per-request pipeline: credential verification → fail-closed ownership check →
  Mongo-backed sliding-window rate limit (in-memory fallback) → input
  validation.
- Short codes are 3–12 chars (`[a-zA-Z0-9_-]{3,12}`) and redirect with a `302`
  plus an atomic `$inc`.

### Feature highlights

- Branded short links with custom aliases, expiry and `409` on collision.
- 30-day click analytics from day buckets; lifetime totals preserved.
- Dashboard search, `7d/30d/All` filters and a single `$facet` aggregation for
  links + aggregates + series + traffic.
- Referrer, device, country, browser, OS, UTM source and campaign breakdowns.
- Privacy-preserving unique visitors: salted HMAC of IP + UA + UTC day, stored
  only as a rotating hash; raw IP/UA never persisted.
- QR preview + PNG download; CSV export with RFC 4180 quoting and
  formula-injection guards.
- Public REST API v1 with pagination, search, filters, structured errors and
  120 requests/min per key.
- API-key create/list/revoke, shown once, `lastUsedAt`, max 10.
- Seeded 12-link browser-only demo, no sign-in and no database access.
- PWA, SEO (JSON-LD, sitemap, branded 404), strict CSP, accessible responsive
  UI, dark theme.

### Metrics

- 79 git-tracked files; ~5,564 lines across 42 JS/HTML/CSS files.
- 17 API operations (5 public v1 + 12 dashboard/admin/ops).
- 4 Mongoose models + 7 shared utilities.
- 36 automated tests / 4 test files.
- 0 frontend frameworks, 0 build steps.
- 30-day analytics window; 90-day raw click retention.
- 120 requests/min per API key; 50 links/day default quota; 10 active keys.
- Demo workspace: 12 links, 30 days of clicks, 7 traffic dimensions.

### Resume bullets

- Built a link management and analytics platform (Node.js/Express,
  MongoDB/Mongoose) with Google sign-in via Firebase + Google Identity Services
  credential flow — no OAuth redirect chain.
- Designed an analytics pipeline with atomic click increments and pre-aggregated
  daily buckets powering a 30-day chart in a single `$facet` query, plus
  referrer/device/country/browser/OS/UTM breakdowns and privacy-preserving
  unique visitors.
- Shipped a public REST API (OpenAPI 3.1) with revocable SHA-256-hashed keys,
  per-key rate limiting, structured errors and a documented quick start.
- Added a no-sign-in live demo that renders a seeded 12-link workspace entirely
  client-side, plus CSV export, QR generation and strict CSP/security headers.
- Wrote 36 automated tests (`node --test`) plus a Playwright browser harness
  with dated screenshot artifacts.

### Portfolio blurb (~30 words)

Linkly — a link management and analytics platform: branded short links, 30-day
trends, traffic and UTM breakdowns, unique visitors, QR codes, CSV export, and a
documented REST API with hashed, revocable keys. Explore the seeded live demo
without an account.
`Node.js · Express · MongoDB · Firebase · Vercel · Vanilla JS`

### Do not claim

No frontend framework or build step. Analytics are coarse and privacy-conscious
— do not imply full visitor tracking. The demo is seeded and client-side. Keep
the MIT license attribution.

---

## 4. House Price Prediction Using Machine Learning Algorithms (Bengaluru)

### Identity

| Field | Value |
|---|---|
| Name | **House Price Prediction Using Machine Learning Algorithms (Bengaluru)** |
| Type | Machine-learning + full-stack web application (regression + FastAPI + Streamlit + vanilla SPA) |
| Author | Basith AbuSyed / ABu (`abustark` on GitHub) — Final-year MCA, The American College |
| Live site | https://house-price-prediction-using-machine-learning-algorithms-9qccn.streamlit.app/ |
| Source | https://github.com/abustark/HOUSE-PRICE-PREDICTION-USING-MACHINE-LEARNING-ALGORITHMS |
| License | No code license; dataset CC0 public domain (Kaggle) |
| Status | Maintained (2026, main branch, Docker + CI green) |

**One-liner (25 words):** House-price predictor trained on 13,320 Bengaluru
listings comparing Linear, Ridge and Random Forest, served via FastAPI REST plus
Streamlit and vanilla SPA frontends.

### Stack

- **Language:** Python 3.11.
- **ML:** scikit-learn 1.9.1 (pinned), pandas, numpy, joblib.
- **Models:** LinearRegression, Ridge (`alpha=0.1` via 5-fold CV), RandomForest
  (`n_estimators=200`, `min_samples_leaf=3`, `random_state=2`).
- **Serving:** FastAPI + uvicorn (`api/server.py`), a 4-page Streamlit app, and a
  vanilla HTML/CSS/JS SPA served by FastAPI.
- **Deployment:** Docker (`python:3.11-slim`, port 8000); Vercel-ready lean
  runtime; Streamlit Cloud for the public demo.
- **Testing:** pytest, 7 tests; GitHub Actions (`compileall` + `pytest -q`).
- **Artifacts:** 8 matplotlib diagnostic charts, a 33-cell executed notebook and
  a 23-slide deck.

### Architecture highlights

- One training pipeline: CSV → `src/train.py` (+ `src/encoding.py`) →
  `models/*.joblib` + `metrics.json` + charts → `src/predict.py` → Streamlit
  or FastAPI.
- `src/encoding.py` is the single feature source: sqft text → number with unit
  conversion and range midpoints, `size` → BHK, availability → completion year,
  label-encoded `area_type`, train-only frequency encoding for `location` and
  `society`, `log1p(price)` target, and `StandardScaler` for linear models.
- FastAPI loads artifacts once at import; `POST /predict` supports
  `linear`/`ridge`/`random_forest`/`all`, returns Lakh (2 dp), INR and an
  `unseen_society` flag.
- Docker copies only `requirements.txt`, `src/`, `api/` and `models/`.

### Feature highlights

- 3-model comparison on a 70/30 split (train 9,282 / test 3,979).
- 8 features: total sqft, baths, balconies, BHK, area type, completion year,
  location, society.
- Robust cleaning: 59 rows dropped (0.4%); unit conversion for sq. metre,
  sq. yards, acres, perch/guntha/ground.
- Frequency encoding for ~1,305 locations and ~2,688 societies without leakage.
- FastAPI with 6 routes (`POST /predict`; `GET /models`, `/locations`, `/meta`,
  `/health`, `/`) plus Swagger `/docs`.
- Streamlit with 4 pages: Predict, Data & EDA, Model Report, About.
- Vanilla SPA with model chips, R² badges and Lakh/INR formatting.
- 8 diagnostic charts and a 33-cell notebook.

### Metrics

- 50 git-tracked files; ~1,382 lines across 11 Python files.
- 13,320 rows × 9 columns; 59 rows dropped.
- 3 models, 6 API routes, 8 features, 8 charts, 4 Streamlit pages, 1 SPA.
- Best Random Forest R² (log) **0.787**, MAE (log) 0.231, MAE 31.41 Lakh,
  RMSE 89.35 Lakh; CV R² 0.776.
- Linear/Ridge R² 0.644 (identical — small-alpha Ridge ≈ OLS).
- 7 pytest tests; 5-fold CV for Ridge alpha and RF grid.
- 33-cell notebook; 23-slide deck; 13.92 MB Random Forest artifact.

### Resume bullets

- Built a Bengaluru house-price predictor (Python 3.11, scikit-learn 1.9.1,
  pandas/numpy) on 13,320 Kaggle listings, comparing Linear, Ridge (alpha=0.1
  via CV) and Random Forest (200 trees, leaf ≥3 via a 2×3 grid) on a 70/30
  split.
- Engineered an 8-feature pipeline (sqft unit conversion + range midpoints, BHK
  extraction, completion-year parsing, label + frequency encoding, `log1p`
  target, StandardScaler for linear models) with 59-row sane filtering.
- Achieved best R² (log) 0.787 / MAE (log) 0.231 / RMSE 89.35 Lakh with Random
  Forest (CV 0.776 ≈ test); Linear/Ridge both 0.644.
- Served via dual interfaces sharing `src/predict.py` — FastAPI REST (6 routes
  + Swagger + vanilla offline SPA) and a 4-page Streamlit app — plus a Docker
  image and Vercel-ready lean runtime.
- Wrote 7 pytest tests (artifact shapes, plausibility, unseen society,
  monotonicity, route imports) with GitHub Actions CI; produced 8 diagnostic
  charts, a 33-cell executed notebook and a 23-slide deck.

### Portfolio blurb (~30 words)

Bengaluru House Prices — describe any flat (location, BHK, sqft, baths) and
compare three models' predictions side-by-side with R² scores and diagnostics.
Dual FastAPI + Streamlit UI, Docker-ready.
`Python · scikit-learn · FastAPI · Streamlit · Docker`

### Do not claim

No XGBoost and no code license. The Streamlit site is live; the FastAPI + SPA
face is local-only. The dataset is CC0, not the code.

---

## 5. N-GELO — Digital Marketplace for Developers

### Identity

| Field | Value |
|---|---|
| Name | **N-GELO — Digital Marketplace for Developers** (`project_bmw`) |
| Type | Full-stack-frontend monorepo (dual-stack marketplace, no backend — localStorage persistence) |
| Author | ABu / Basith Abusyed (`abustark`, Chennai) + Arena Agent — rebuild of a Thiagarajar College BCA 2018–2021 major project (S. Wasim Thoufiq, N. Basith Abusyed, P. Muthukumar; guide Mrs. M.B.C. Asha Vani) |
| Live sites | Vue: https://ecom-seven-sand.vercel.app/ · React twin: https://ecom-react-self.vercel.app/ · Pages (legacy): https://abustark.github.io/project_bmw/ |
| Source | https://github.com/abustark/project_bmw |
| License | MIT (keep college attribution in About if reusing DFDs) |
| Status | Production-deployed (Vercel `ecom` + `ecom-react`, `main`, v2.0.18, 2026) |

**One-liner (25 words):** N-GELO is a pixel-identical Vue 3 + Next.js 16
marketplace for developer digital products with 14 items, cart coupons, checkout
orders and buyer/seller/admin dashboards.

### Stack

- **Stack A (root):** Vue 3.4.21, vue-router 4.3, Pinia 2.1.7, reka-ui
  (shadcn-vue) 2.10.4, Tailwind CSS 3.4.1, Vite 5.4.
- **Stack B (`react/`):** React 19.2.8, Next.js 16.3.5 App Router, Zustand
  5.0.15 with `persist`, shadcn/ui, Tailwind CSS 4, TypeScript 5.
- **Shared:** clsx + tailwind-merge + class-variance-authority, lucide icons,
  Poppins / Playfair Display / JetBrains Mono.
- **Hosting:** two Vercel projects + GitHub Pages with a SPA `404.html`
  fallback and `.nojekyll`.
- **Quality:** Playwright installed; 5 documented gate passes
  (functional/security/UI/business/perf) rather than a unit-test suite.

### Architecture highlights

- One spec (`docs/PROJECT_SPEC.md`, v2.0) drives both stacks; only
  state/router/UI bindings differ (Pinia vs Zustand, templates vs JSX,
  vue-router vs App Router).
- `src/data/products.js` (417 lines) and `react/src/data/products.ts` (443
  lines) each hold 14 products and 8 filters.
- Shared cart contract: `items[{...product,qty}]`, `count/subtotal/discount/total`
  getters, `add/remove/setQty/clear/applyCoupon`, drawer flag and toast.
- Code-first product pages: Preview / Code / Info tabs, live iframe or rendered
  preview, copyable snippet, stack/files badges, seller card, similar products.
- No backend by design: checkout auto-creates an account from email, saves an
  `NG-XXXXXX` order to localStorage, and dashboards read local orders. The
  Pinia/Zustand shapes mirror future `users/products/orders/reviews/reports/faqs/payouts`
  tables for a Node + PostgreSQL upgrade.

### Feature highlights

- 14 developer products across 7 categories (8 filters including `all`).
- Faceted shop: category pills, URL-synced search (`?cat=&q=`), price slider,
  rating radio, tags, physical/digital toggle and 5 sorts.
- Cart drawer + page with quantity controls and `WELCOME20` (20%) /
  `NGELO10` (10%) last-wins coupons.
- Mock checkout: contact → Stripe/PayPal toggle → billing → `NG-XXXXXX` order.
- Buyer dashboard (orders, spend, downloads), seller dashboard (revenue,
  sales, visits, payouts, traffic chart), admin dashboard (reports, FAQ queue,
  admins).
- Wishlist persistence and header badges.
- Responsive mobile drawer, reduced-motion support, focus rings, semantic HTML,
  SEO title/meta/OG.
- Three live targets from one spec: 2 Vercel projects + GitHub Pages.

### Metrics

- 788 git-tracked files; 494 real-app files; 82 first-party app files.
- ~2,280 lines Vue `src/` + ~2,536 lines React `src/` (~4,816 combined).
- 8 routes × 2 stacks; 14 products × 8 filters × 5 sorts.
- 2 coupons; 3 roles; 4 localStorage contracts per stack.
- 6-digit order IDs; 3 live deployments; 2 builds (Vue <3 s, React ~2.5 s).
- v2.0.18; BCA 2020 spec → 2025 rebuild → 2026 dual-stack.

### Resume bullets

- Rebuilt a BCA e-commerce major project into N-GELO, a dual-stack digital
  marketplace (Vue 3 + Vite + Pinia + shadcn-vue at root, Next.js 16 + React 19
  + Zustand + shadcn/ui in `react/`) from a single 158-line spec,
  pixel-identical across stacks.
- Implemented a 14-product catalogue across 7 dev categories with live search
  (`?cat=&q=`), price/rating/tag/physical-digital filters, 5 sorts, wishlist
  persistence and code-first product pages (live preview + copyable snippets +
  iframe docs).
- Built cart + mock checkout (slide-over drawer + page, quantity controls,
  `WELCOME20`/`NGELO10` last-wins coupons, Stripe/PayPal toggle, `NG-XXXXXX`
  localStorage orders) with buyer/seller/admin dashboards (orders/downloads,
  revenue/payouts/traffic, reports/FAQ/admins).
- Shipped 8 routes × 2 stacks to 3 live targets (2 Vercel projects + GitHub
  Pages with `base`/`404.html`/`.nojekyll`/SPA rewrite) with a shared Tailwind
  token system and offline-safe font loading.

### Portfolio blurb (~30 words)

N-GELO — a marketplace for developer digital goods with faceted shop, live code
previews, coupon cart, mock checkout and triple dashboards. Same site in Vue and
Next.js, pixel-identical.
`Vue 3 · Next.js 16 · Pinia · Zustand · shadcn · Tailwind · Vercel`

### Do not claim

No real payments, no backend database and no server auth — checkout is mocked,
persistence is localStorage, and dashboards are open. The catalogue is a
reference set priced at ₹0. Keep the MIT/college attribution.

---

## 6. CoverCraft — AI Cover Letter Builder

### Identity

| Field | Value |
|---|---|
| Name | **CoverCraft — AI Cover Letter Builder** |
| Type | Full-stack web application (AI productivity utility) |
| Author | ABu (`abustark` on GitHub) |
| Live site | https://coverltr.vercel.app/ |
| Source | https://github.com/abustark/cover_letter_gen |
| License | None declared (private, all rights reserved — footer `© ABu`) |
| Status | Production-deployed on Vercel, actively maintained (2026, latest commit 2026-10-16) |

**One-liner (25 words):** CoverCraft is a React + Vite + Tailwind app that
drafts tailored cover letters from a resume and job description or posting URL
via OpenRouter free models.

### Stack

- **Frontend:** React 19.2, Vite 6.2, TypeScript 5.8, Tailwind CSS 4.3.3 with
  `@tailwindcss/vite`.
- **AI gateway:** OpenRouter chat completions through `api/openrouter.ts`.
- **Models:** NVIDIA Nemotron 3 Ultra 550B (standard + URL), Nemotron 3 Super
  120B (thinking), Google Gemma 4 26B (low-latency + resume formatting).
- **Auth:** `@react-oauth/google` 0.13.5; Google JWT decoded client-side and
  stored in localStorage for ~1 hour. No server session.
- **Document parsing:** `pdfjs-dist` 4.4.168 (PDF) and `mammoth` 1.12 (DOCX),
  both lazy-loaded.
- **Export:** `jspdf` 2.5.2 (PDF) and `docx` 9.7.1 (DOCX), both lazy-loaded.
- **Hosting:** Vercel; `api/openrouter.ts` and `api/fetch-url.ts` serverless
  functions. Vite dev server on port 3000.
- **Quality:** `tsc --noEmit` + `vite build`. No automated test suite.

### Architecture highlights

- Thin server proxy, rich client: the browser never sees
  `OPENROUTER_API_KEY`; production AI traffic goes through `/api/openrouter`.
- Dev/prod split: in development Vite injects the key from `.env.local`; the
  production bundle contains no key.
- `api/fetch-url.ts` fetches job postings server-side, strips
  `<script>`/`<style>` and returns up to 12,000 characters, bypassing browser
  CORS.
- Auth is a client-side gate: JWT decoded in `services/auth.tsx`
  (`sub/name/email/picture/exp`), persisted as `covercraft_google_auth` until
  expiry. No `firebase-admin` or per-request token verification.
- State is local-first: drafts (`drafts_local`) and theme (`theme`) in
  localStorage; no database.
- Heavy libraries are dynamically imported only on upload/export.

### Feature highlights

- 4 generation modes: Standard, Thinking, Low Latency, Search Grounding /
  From URL (URL input forces Search Grounding).
- 4 tones: Professional, Enthusiastic, Confident, Creative.
- Dual job-description input: pasted text or posting URL, with graceful
  fallback to paste-text on fetch failure.
- PDF/DOCX resume upload with optional AI reformatting.
- 16 generation paths (4 modes × 4 tones × 2 input types) from one prompt
  template family.
- Google sign-in gate with avatar/name/email and sign-out.
- Copy, PDF, DOCX, Save draft and Regenerate actions; output auto-linkifies
  URLs.
- Local drafts with UUIDs, company names, ISO timestamps and hover-delete.
- Dark/light theme with a View-Transition wave; ARIA `Segmented` controls;
  65ch document surface.
- SEO title/description, OG and Twitter cards.

### Metrics

- 38 git-tracked files; ~2,121 lines across 18 TS/TSX/CSS files.
- 2 API endpoints, 2 services, 8 UI components.
- 4 modes × 4 tones × 2 input types = 16 generation paths.
- 5 export/save actions.
- 0 databases, 0 server-side auth checks.
- 4.4 MB production `dist/` (largest chunk: `pdf.worker`, ~2.09 MB,
  lazy-loaded).
- 34 commits (2025-11-02 to 2026-10-16).

### Resume bullets

- Built an AI cover-letter builder (React 19, Vite 6, Tailwind v4, TypeScript)
  that drafts tailored letters from a resume plus pasted text or a posting URL
  via OpenRouter free models (Nemotron 3 Ultra/Super, Gemma 4).
- Designed a serverless proxy (`api/openrouter.ts`, `api/fetch-url.ts`) keeping
  `OPENROUTER_API_KEY` server-side and fetching job postings server-side to
  bypass CORS, returning up to 12k chars of cleaned text.
- Added PDF/DOCX resume upload (lazy-loaded `pdfjs-dist` + `mammoth`) with
  optional AI reformatting, plus 4 generation modes × 4 tones routed to distinct
  models at temperature 0.7.
- Implemented Google OAuth gating (`@react-oauth/google`, localStorage JWT with
  1-hour expiry), local-first drafts (`crypto.randomUUID`, ISO timestamps), and
  one-click Copy/PDF (`jsPDF`)/DOCX (`docx`) export with linkified output.
- Shipped a responsive dark/light SPA (View-Transition theme wave, `Segmented`
  ARIA controls, 65ch document surface) on Vercel with SEO/OG tags;
  `tsc --noEmit` + Vite build gates.

### Portfolio blurb (~30 words)

CoverCraft — paste your resume and any job post (or just its URL) to get a
tailored cover letter in your chosen tone, then copy, download, or save drafts.
Google sign-in, dark mode, instant export.
`React · Vite · TypeScript · Tailwind · OpenRouter · Vercel`

### Do not claim

No automated test suite, no database and no server-side auth — none exist. The
Google JWT is a client-side gate, not a verified server session. Drafts are
localStorage-only.

---

## Cross-project keyword index

**Languages:** TypeScript, JavaScript (ES2022/ES modules), Python 3.11, HTML5,
CSS3.
**Frontend:** React 19, Next.js 15/16 App Router, Vue 3, Vite, Tailwind CSS
3/4, shadcn/ui, shadcn-vue, Pinia, Zustand, vanilla JS, responsive design, dark
mode, accessibility (ARIA), PWA.
**Backend:** Node.js, Express, Vercel Serverless Functions, FastAPI, REST APIs,
OpenAPI 3.1, SSE streaming, rate limiting, CSP/security headers.
**Data:** MongoDB Atlas, Mongoose, Firestore, raw MongoDB driver, pandas, numpy,
scikit-learn, joblib, matplotlib, seaborn, Jupyter.
**AI:** OpenRouter, Google Gemini, Groq, NVIDIA NIM, prompt engineering, LLM
routing, streaming chat.
**ML:** regression, Random Forest, Ridge, Linear Regression, cross-validation,
feature engineering, frequency encoding, log-target transformation, model
evaluation (R², MAE, RMSE).
**DevOps & quality:** Docker, GitHub Actions, Vercel Cron, pytest, Node test
runner, Playwright, ESLint, `tsc --noEmit`, Git/GitHub.

---

## Audit notes (2026-11-06)

- All six project descriptions, case-notes dialogs and command-palette entries
  were checked against the project sheets above.
- **Corrected on the site:** PriceTracked start date changed from "Dec 2025" to
  "May 2026" (first commit 2026-05-17); live link moved from the 404
  `pricetrailed.vercel.app` to `https://pricetracked.vercel.app/` (same Vercel
  deployment as `price-trail-abustarks-projects.vercel.app`, verified 200).
- **Naming:** the portfolio label is **PriceTracked**; the repo is
  `price-trail` and the live app tab title reads "PriceTrail — buy at the right
  time". The portfolio name was updated per owner instruction in v1.3.5.
- **No unverified claims added.** ABot facts come from its private-repo
  `docs/PROJECT-INFO.md` and the live app; the other five come from their
  `PROJECT-INFO.md` files.
- **Source-of-truth caveats:** PriceTracked has no email alerts, PWA or unit test
  suite; CoverCraft has no test suite, database or server-side auth; N-GELO has
  no real payments, backend DB or server auth; House Price has no XGBoost and no
  code license.
