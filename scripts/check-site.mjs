/**
 * Static quality gates for the portfolio — no dependencies, no network by default.
 *
 *   npm run check            -> all offline checks
 *   npm run check -- --links -> also HEAD/GET every external URL (needs network)
 *   npm run check -- --json  -> machine-readable summary
 *
 * Checks
 *   1. HTML structure   — doctype/meta/title/lang, id uniqueness, heading order,
 *                         `<img>` alt + intrinsic size, hash targets in the page,
 *                         unsupported/typo'd tags.
 *   2. Local references — every href/src/srcset/url() resolves to a real file.
 *   3. Encoding         — no mojibake (double-encoded UTF-8) and valid encoding.
 *   4. CSS build        — css/styles.css is in sync with src/input.css
 *                         (`--allow-stale` skips this when npm isn't installed).
 *   5. Content sync     — project copy in js/main.js `projectDetails` stays in sync
 *                         with the project cards in index.html.
 *   6. External links   — optional (`--links`): every https URL returns < 400.
 *
 * Exit code 0 = all gates pass, 1 = at least one error.
 * Warnings never fail the run.
 */
import { readFileSync, existsSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const wantLinks = args.includes('--links');
const wantJson = args.includes('--json');
const allowStaleCss = args.includes('--allow-stale');

const errors = [];
const warnings = [];
const passes = [];

const rel = (p) => p.replace(root, '').replace(/\\/g, '/').replace(/^\//, '');
const read = (p) => readFileSync(join(root, p), 'utf8');
const err = (gate, msg) => errors.push({ gate, msg });
const warn = (gate, msg) => warnings.push({ gate, msg });
const pass = (gate, msg) => passes.push({ gate, msg });
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

const PAGES = ['index.html', '404.html'];

// ---------------------------------------------------------------- 3. Encoding
// Run first: mojibake corrupts every later string comparison.
function checkEncoding() {
    const GATE = 'encoding';
    const MOJIBAKE = [
        ['â€', 'en-dash / em-dash / curly quotes'],
        ['Â', 'non-breaking space or separator'],
        ['Ã', 'multi-byte character'],
        ['â€“', 'en dash'],
        ['â€”', 'em dash'],
    ];
    for (const page of PAGES) {
        if (!existsSync(join(root, page))) {
            err(GATE, `${page}: file is missing`);
            continue;
        }
        const text = read(page);
        // A UTF-8 BOM is legal but trips editors/tools and is not used anywhere
        // in this repo — treat it as an error so it cannot creep in unnoticed.
        if (text.charCodeAt(0) === 0xfeff) err(GATE, `${page}: starts with a UTF-8 BOM — re-save without one`);
        if (text.includes('\uFFFD')) {
            err(GATE, `${page}: contains U+FFFD replacement characters (invalid UTF-8)`);
        }
        for (const [bad, label] of MOJIBAKE) {
            let idx = text.indexOf(bad);
            while (idx !== -1) {
                const line = lineOf(text, idx);
                const ctx = text.slice(idx, idx + 12).split('\n')[0];
                err(GATE, `${page}:${line}: mojibake "${ctx}" (${label}) — re-save as UTF-8`);
                idx = text.indexOf(bad, idx + 1);
            }
        }
    }
    if (!errors.some((e) => e.gate === GATE)) pass(GATE, `${PAGES.length} pages are valid UTF-8 with no mojibake`);
}

// ---------------------------------------------------------- 1. HTML structure
const VOID = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
]);
// Elements we actually use or that are current HTML. Anything else gets flagged,
// which catches typos like <secton> and stale tags like <center>.
const KNOWN = new Set([
    ...VOID,
    'html', 'head', 'body', 'title', 'style', 'script', 'noscript', 'template', 'slot',
    'section', 'header', 'footer', 'main', 'nav', 'aside', 'article', 'div', 'span', 'p',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
    'a', 'strong', 'em', 'b', 'i', 'u', 's', 'small', 'sub', 'sup', 'mark', 'abbr', 'code', 'pre',
    'br', 'blockquote', 'q', 'cite', 'time', 'dfn', 'kbd', 'samp', 'var', 'del', 'ins',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'picture',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
    'form', 'label', 'input', 'textarea', 'select', 'option', 'optgroup', 'button',
    'fieldset', 'legend', 'output', 'datalist', 'progress', 'meter',
    'details', 'summary', 'dialog', 'canvas', 'svg', 'video', 'audio', 'iframe', 'object',
    'meta', 'link', 'base',
    // SVG — every inline icon on the page. Names are lowercased by the scanner.
    'g', 'defs', 'symbol', 'use', 'desc', 'clippath', 'mask', 'pattern', 'marker',
    'lineargradient', 'radialgradient', 'stop', 'filter', 'feturbulence', 'fecolormatrix',
    'feblend', 'feoffset', 'fegaussianblur', 'fecomposite', 'feflood', 'femerge',
    'femergenode', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon', 'path',
    'text', 'tspan', 'textpath', 'foreignobject',
]);
const SVG_ATTR_TAGS = KNOWN;

function parseHtml(text) {
    const ids = new Map();           // id -> line
    const hashTargets = new Set();   // every id + every [name]
    const images = [];               // { line, attrs, inSource }
    const anchors = [];              // { line, href }
    const refs = [];                 // { line, kind, value }
    const unknownTags = [];
    const headings = [];
    // JS references to ids are collected once, outside the per-page walk.
    const idsRefd = jsRequiredIds();
    const idsOptional = jsOptionalIds();
    const inSource = [];

    // Walk tags in document order.
    const tagRe = /<([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>/g;
    let m;
    while ((m = tagRe.exec(text))) {
        const rawName = m[1] || m[4];
        if (!rawName) continue;
        const closing = !m[1];
        const attrsRaw = m[2] || '';
        const name = rawName.toLowerCase();
        const line = lineOf(text, m.index);
        if (closing) {
            if (name === 'source') inSource.pop();
            continue;
        }
        if (!KNOWN.has(name)) unknownTags.push({ line, name });

        const attrs = {};
        const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
        let a;
        while ((a = attrRe.exec(attrsRaw))) {
            attrs[a[1].toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? '';
        }

        if (name === 'source') inSource.push(attrs);
        if (attrs.id) {
            if (ids.has(attrs.id)) err('html', `duplicate id="${attrs.id}" (first at line ${ids.get(attrs.id)})`);
            else ids.set(attrs.id, line);
            hashTargets.add(attrs.id);
        }
        if (attrs.name) hashTargets.add(attrs.name);

        if (name === 'img') images.push({ line, attrs, inSource: !!inSource.length });
        if (name === 'a' && attrs.href) anchors.push({ line, href: attrs.href });
        if (/^h[1-6]$/.test(name)) headings.push({ line, level: Number(name[1]), text: '' });

        for (const kind of ['href', 'src']) {
            if (attrs[kind]) refs.push({ line, kind, value: attrs[kind] });
        }
        if (attrs.srcset) {
            for (const part of attrs.srcset.split(',')) {
                const url = part.trim().split(/\s+/)[0];
                if (url) refs.push({ line, kind: 'srcset', value: url });
            }
        }
        // <style> bodies are scanned separately; note external CSS refs already captured.
    }

    return { ids, hashTargets, images, anchors, refs, unknownTags, headings, idsRefd };
}

// ---------------------------------------------------------------- JS id hooks
// Guarded (`if (el)`) lookups are optional hooks, and `.id = 'x'` assignments
// create elements at runtime. Only unguarded direct grabs must exist in markup —
// those are the ones that throw on a renamed or deleted element.
function jsSource() {
    const jsPath = join(root, 'js/main.js');
    return existsSync(jsPath) ? readFileSync(jsPath, 'utf8') : '';
}
function jsOptionalIds() {
    const js = jsSource();
    const optional = new Set();
    for (const gm of js.matchAll(/if\s*\(\s*!?\s*([\w$]+)\s*\)/g)) void gm;
    for (const gm of js.matchAll(/const\s+([\w$]+)\s*=\s*(?:document\.)?getElementById\(\s*['"]([\w-]+)['"]\s*\)/g)) {
        const [, varName, id] = gm;
        // Treat as optional when the variable is used behind a guard: `if (!x)`,
        // `x?.`, `if (x)`, or `x &&`.
        const guarded = new RegExp(`if\\s*\\(\\s*!?\\s*${varName}\\b`).test(js)
            || new RegExp(`if\\s*\\([^)]*\\b${varName}\\b`).test(js)
            || new RegExp(`\\b${varName}\\s*\\?\\.`).test(js)
            || new RegExp(`\\b${varName}\\s*&&`).test(js);
        if (guarded) optional.add(id);
    }
    for (const gm of js.matchAll(/\.id\s*=\s*['"]([\w-]+)['"]/g)) optional.add(gm[1]);
    return optional;
}
function jsRequiredIds() {
    const js = jsSource();
    const optional = jsOptionalIds();
    const required = new Set();
    for (const gm of js.matchAll(/document\.getElementById\(\s*['"]([\w-]+)['"]\s*\)/g)) required.add(gm[1]);
    for (const gm of js.matchAll(/document\.querySelector\(\s*['"]#([\w-]+)['"]\s*\)/g)) required.add(gm[1]);
    for (const id of optional) required.delete(id);
    return required;
}

function checkHtml() {
    const GATE = 'html';
    const parsedPages = {};

    for (const page of PAGES) {
        const path = join(root, page);
        if (!existsSync(path)) {
            err(GATE, `${page}: file is missing`);
            continue;
        }
        const text = read(page);
        const p = parseHtml(text);
        parsedPages[page] = { text, ...p };

        const label = (msg) => `${page}: ${msg}`;

        // Document skeleton
        if (!/^<!DOCTYPE html>/i.test(text)) err(GATE, label('missing <!DOCTYPE html>'));
        if (!/<html[^>]*\slang="[^"]+"/i.test(text)) err(GATE, label('<html> is missing a lang attribute'));
        if (!/<meta\s+charset=["']?utf-8/i.test(text) && !/charset="?utf-8/i.test(text)) {
            err(GATE, label('missing <meta charset="utf-8">'));
        }
        if (!/<meta[^>]+name=["']viewport["']/i.test(text)) err(GATE, label('missing viewport meta tag'));
        if (page === 'index.html') {
            if (!/<title>[^<]+\S[^<]*<\/title>/i.test(text)) err(GATE, label('missing or empty <title>'));
            const desc = text.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
            if (!desc) err(GATE, label('missing meta description'));
            else if (desc[1].length < 50 || desc[1].length > 160) {
                warn(GATE, label(`meta description is ${desc[1].length} chars (aim 50–160)`));
            }
            if (!/<link[^>]+rel=["']canonical["']/i.test(text)) err(GATE, label('missing rel="canonical"'));
        }

        // Unknown / stale tags
        for (const t of p.unknownTags) err(GATE, label(`line ${t.line}: <${t.name}> is not a known HTML element`));

        // Images: alt + intrinsic dimensions (CLS)
        for (const img of p.images) {
            const src = img.attrs.src || '(no src)';
            if (img.attrs.alt === undefined) {
                err(GATE, label(`line ${img.line}: <img src="${src}"> has no alt attribute`));
            }
            if (!img.attrs.width || !img.attrs.height) {
                warn(GATE, label(`line ${img.line}: <img src="${src}"> has no width/height (layout shift risk)`));
            }
            if (!img.attrs.loading && !img.attrs.fetchpriority) {
                warn(GATE, label(`line ${img.line}: <img src="${src}"> sets neither loading nor fetchpriority`));
            }
        }

        // Heading order
        let prev = 0;
        for (const h of p.headings) {
            if (prev && h.level > prev + 1) {
                err(GATE, label(`line ${h.line}: <h${h.level}> follows <h${prev}> — heading level skipped`));
            }
            prev = h.level;
        }

        // In-page anchors must resolve to an id/name
        for (const a of p.anchors) {
            if (!a.href.startsWith('#')) continue;
            const id = decodeURIComponent(a.href.slice(1));
            if (!id) continue;
            if (!p.hashTargets.has(id)) err(GATE, label(`line ${a.line}: href="#${id}" has no matching id`));
        }

        // JS ids must exist (guards silent-failure selectors)
        for (const id of p.idsRefd) {
            if (!p.hashTargets.has(id)) err(GATE, label(`js/main.js references #${id} but no element has that id`));
        }

        if (!errors.some((e) => e.gate === GATE && e.msg.startsWith(page))) {
            pass(GATE, `${page}: ${p.ids.size} ids, ${p.images.length} images, ${p.anchors.length} links — structure valid`);
        }
    }

    return parsedPages;
}

// ------------------------------------------------------ 2. Local references
function checkLocalReferences(parsedPages) {
    const GATE = 'refs';
    const seen = new Set();

    const resolveRef = (page, value) => {
        const clean = value.trim();
        if (!clean) return null;
        if (/^(https?:|data:|mailto:|tel:|javascript:|#)/i.test(clean)) return null;

        // Strip the query/fragment; only the path has to exist on disk.
        const [, pathOnly = ''] = clean.match(/^([^?#]*)/) || [];
        if (!pathOnly) return null; // "/#work" — a root path plus a fragment only.

        // "/" is served from index.html by Vercel's static host.
        if (pathOnly === '/' || pathOnly === '') return { abs: join(root, 'index.html'), label: '/' };

        const base = pathOnly.startsWith('/')
            ? root                                  // root-relative (Vercel static host)
            : join(root, dirname(page));            // page-relative
        return { abs: resolvePath(base, pathOnly.replace(/^\//, '')), label: pathOnly };
    };

    for (const [page, parsed] of Object.entries(parsedPages)) {
        for (const ref of parsed.refs) {
            const target = resolveRef(page, ref.value);
            if (!target) continue;
            const key = `${page}:${ref.kind}:${ref.value}`;
            if (seen.has(key)) continue;
            seen.add(key);
            if (!existsSync(target.abs)) {
                const hint = target.abs.startsWith(root) ? '' : ' (resolves outside the repo)';
                err(GATE, `${page}:${ref.line}: ${ref.kind}="${ref.value}" does not exist${hint}`);
            } else if (!statSync(target.abs).isFile()) {
                err(GATE, `${page}:${ref.line}: ${ref.kind}="${ref.value}" is not a file`);
            }
        }
    }

    // Local url() references inside the Tailwind source resolve against /css/.
    // The source is CSS, so balance parens instead of using a naive regex — a
    // data: URI with `filter='url(%23x)'` inside it would otherwise split wrongly.
    if (existsSync(join(root, 'src/input.css'))) {
        const css = read('src/input.css');
        // Linear scan: the nested data: URIs here contain their own `url(...)`.
        const urlRe = /url\(\s*(?:(["'])([^"']*)\1|([^)]*?))\s*\)/gi;
        let m;
        while ((m = urlRe.exec(css))) {
            const value = (m[2] && m[2].length ? m[2] : m[3] ?? '').trim().replace(/^["']|["']$/g, '');
            // A data: URI may itself contain a nested url(...) — skip past it whole.
            if (/^data:/i.test(value)) continue;
            if (!value || /^(https?:|#)/i.test(value)) continue;
            const abs = resolvePath(join(root, 'css'), value);
            if (!existsSync(abs)) err(GATE, `src/input.css:${lineOf(css, m.index)}: url(${value}) does not resolve`);
        }
    }

    if (!errors.some((e) => e.gate === GATE)) pass(GATE, `${seen.size} local references resolve`);
}

// -------------------------------------------------------------- 4. CSS build
function checkCssBuild() {
    const GATE = 'css';
    const srcPath = join(root, 'src/input.css');
    const outPath = join(root, 'css/styles.css');
    if (!existsSync(srcPath) || !existsSync(outPath)) {
        err(GATE, 'src/input.css or css/styles.css is missing');
        return;
    }
    const src = statSync(srcPath).mtimeMs;
    const out = statSync(outPath).mtimeMs;

    // Rebuild into a temp file and compare — the only trustworthy staleness test.
    const tailwindCmd = process.platform === 'win32'
        ? join(root, 'node_modules', '.bin', 'tailwindcss.cmd')
        : join(root, 'node_modules', '.bin', 'tailwindcss');
    if (!existsSync(tailwindCmd)) {
        if (allowStaleCss) {
            warn(GATE, 'Tailwind CLI not installed — skipped compiled-CSS freshness check (run npm ci)');
        } else {
            warn(GATE, 'Tailwind CLI not installed — skipped compiled-CSS freshness check (run npm ci)');
        }
        if (out < src) {
            err(GATE, 'css/styles.css is older than src/input.css — run `npm run build:css`');
        } else {
            pass(GATE, 'css/styles.css is newer than src/input.css (content not verified)');
        }
        return;
    }

    const tmp = join(root, 'css', '.styles.check.css');
    try {
        // `shell: true` is required for the .cmd shim on Windows. Tailwind writes
        // informational warnings to stderr (stale caniuse data), so success is
        // judged by the output file, not the exit status.
        execFileSync(tailwindCmd, ['-i', 'src/input.css', '-o', 'css/.styles.check.css', '--minify'], {
            cwd: root, stdio: 'pipe', shell: true,
        });
        if (!existsSync(tmp)) throw new Error('Tailwind produced no output file');
        const fresh = readFileSync(tmp, 'utf8');
        const current = readFileSync(outPath, 'utf8');
        if (fresh !== current) {
            err(GATE, 'css/styles.css is stale — run `npm run build:css` and commit the result');
        } else {
            pass(GATE, `css/styles.css matches a fresh build of src/input.css (${(current.length / 1024).toFixed(1)} KB)`);
        }
    } catch (e) {
        const detail = e.stderr?.toString() || e.stdout?.toString() || e.message;
        const first = detail.split('\n').filter((l) => l.trim() && !/^(Browserslist|\[baseline|At line|  \+)/.test(l.trim()))[0] || e.message;
        err(GATE, `CSS build failed: ${first}`);
    } finally {
        try { if (existsSync(tmp)) unlinkSync(tmp); } catch { /* ignore */ }
    }
}

// --------------------------------------------------------- 5. Content sync
function checkContentSync(parsedPages) {
    const GATE = 'content';
    const page = parsedPages['index.html'];
    if (!page) {
        warn(GATE, 'index.html could not be parsed — content sync skipped');
        return;
    }
    const jsPath = join(root, 'js/main.js');
    if (!existsSync(jsPath)) {
        warn(GATE, 'js/main.js missing — content sync skipped');
        return;
    }
    const js = read('js/main.js');

    // projectDetails keys, discovered by their `title:` field so we stay robust
    // to the object's formatting.
    const keys = [...js.matchAll(/^\s{4}(?:'([\w-]+)'|([\w-]+)):\s*\{/gm)].map((m) => m[1] || m[2]);
    const cardIds = [...page.text.matchAll(/data-open-project="([^"]+)"/g)].map((m) => m[1]);
    const uniqueCards = [...new Set(cardIds)];

    for (const id of uniqueCards) {
        if (!keys.includes(id)) err(GATE, `index.html opens project "${id}" but js/main.js has no projectDetails entry`);
    }
    for (const id of keys) {
        if (!uniqueCards.includes(id)) err(GATE, `js/main.js defines project "${id}" but no card in index.html opens it`);
    }

    // Each detail entry needs the fields the dialog/palette read.
    for (const id of keys) {
        const start = js.search(new RegExp(`^\\s{4}(?:'${id}'|${id}):\\s*\\{`, 'm'));
        const block = js.slice(start, js.indexOf('\n    }', start));
        for (const field of ['label', 'title', 'description', 'focus', 'tags', 'link']) {
            if (!new RegExp(`\\b${field}\\s*:`).test(block)) err(GATE, `projectDetails["${id}"] is missing "${field}"`);
        }
        const link = block.match(/link:\s*'([^']+)'/);
        if (link && !/^https:\/\//.test(link[1])) err(GATE, `projectDetails["${id}"].link is not an https URL`);
    }

    // Cross-check the live URL in the card markup against projectDetails.
    for (const id of keys) {
        const block = js.slice(js.search(new RegExp(`^\\s{4}(?:'${id}'|${id}):\\s*\\{`, 'm')));
        const link = (block.match(/link:\s*'([^']+)'/) || [])[1];
        if (!link) continue;
        const cardStart = page.text.indexOf(`data-open-project="${id}"`);
        if (cardStart === -1) continue;
        const cardChunk = page.text.slice(Math.max(0, cardStart - 4000), cardStart);
        // Compare host+path, ignoring a trailing slash (either form is valid).
        const norm = (u) => u.replace(/\/+$/, '');
        if (!cardChunk.includes(norm(link))) {
            warn(GATE, `project "${id}": card markup does not link to ${link} (check card/JS sync)`);
        }
    }

    // Display order is a deliberate ranking (best project first). It must match
    // between the visible card markup and the projectDetails object, otherwise
    // the palette and the page disagree about what comes first. Override with
    // PROJECT_ORDER=a,b,c when the ranking intentionally changes.
    const RANKED_ORDER = [
        'abot', 'linkly', 'price-trail', 'house-price', 'ngelo', 'covercraft',
    ];
    const ranked = process.env.PROJECT_ORDER
        ? process.env.PROJECT_ORDER.split(',').map((s) => s.trim()).filter(Boolean)
        : RANKED_ORDER;
    {
        const domOrder = [...page.text.matchAll(/data-open-project="([^"]+)"/g)].map((m) => m[1]);
        const uniqueDom = domOrder.filter((id, i) => domOrder.indexOf(id) === i);
        if (uniqueDom.join(',') !== ranked.join(',')) {
            err(GATE, `card order is [${uniqueDom.join(', ')}] but expected [${ranked.join(', ')}]`);
        }
        if (keys.join(',') !== ranked.join(',')) {
            err(GATE, `projectDetails order is [${keys.join(', ')}] but expected [${ranked.join(', ')}]`);
        }
        if (!errors.some((e) => e.gate === GATE)) {
            pass(GATE, `project ranking matches the documented order (${ranked[0]} first)`);
        }
    }

    // Live-site count in the hero must match the number of featured projects.
    const heroCount = page.text.match(/<dt>(\d+)<\/dt>\s*<dd>Live deployments<\/dd>/);
    if (heroCount) {
        const claimed = Number(heroCount[1]);
        const liveLinks = [...new Set(
            keys.map((id) => {
                const block = js.slice(js.search(new RegExp(`^\\s{4}(?:'${id}'|${id}):\\s*\\{`, 'm')));
                return (block.match(/link:\s*'([^']+)'/) || [])[1];
            }).filter(Boolean),
        )];
        if (claimed !== liveLinks.length) {
            err(GATE, `hero claims "${claimed} Live deployments" but there are ${liveLinks.length} project live links`);
        } else {
            pass(GATE, `hero "Live deployments" (${claimed}) matches ${liveLinks.length} project links`);
        }
    }

    if (!errors.some((e) => e.gate === GATE)) {
        pass(GATE, `${keys.length} projects in sync between index.html and js/main.js`);
    }
}

// ------------------------------------------------------- 6. External links
async function checkExternalLinks(parsedPages) {
    const GATE = 'links';
    if (!wantLinks) {
        warn(GATE, 'external link check skipped — pass --links to verify live URLs');
        return;
    }
    const urls = new Set();
    for (const [page, parsed] of Object.entries(parsedPages)) {
        for (const ref of parsed.refs) {
            if (/^https?:/i.test(ref.value)) urls.add(ref.value.trim());
        }
        for (const m of parsed.text.matchAll(/content="(https?:\/\/[^"]+)"/g)) urls.add(m[1]);
        void page;
    }

    const results = await Promise.all([...urls].map(async (url) => {
        // Two retries: Streamlit free tier and Vercel cold starts routinely need
        // >25 s on the first hit after idling.
        let lastError = '';
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow',
                    signal: AbortSignal.timeout(30000),
                    headers: { 'user-agent': 'abufolio-checks/1.0 (+https://abufolio.vercel.app/)' },
                });
                return { url, status: res.status, attempt };
            } catch (e) {
                lastError = e.message;
                if (attempt < 3) await new Promise((r) => setTimeout(r, 3000 * attempt));
            }
        }
        return { url, status: 0, error: lastError };
    }));

    // Some hosts block non-browser user agents outright:
    //   999 — LinkedIn's bot block; 403 from a few CDNs.
    // A blocked request is not evidence the link is broken, so warn, don't fail.
    const BOT_BLOCKED = /linkedin\.com|x\.com|twitter\.com|instagram\.com/i;
    const COLD_START = /streamlit\.app/i;

    for (const r of results) {
        if (r.status === 0) {
            if (COLD_START.test(r.url)) warn(GATE, `${r.url} — unreachable after 3 attempts (${r.error}); Streamlit cold start, re-check manually`);
            else err(GATE, `${r.url} — request failed (${r.error})`);
        } else if (r.status === 999 || (BOT_BLOCKED.test(r.url) && r.status >= 400)) {
            warn(GATE, `${r.url} — HTTP ${r.status} (host blocks automated checks; open manually)`);
        } else if (r.status >= 400) {
            err(GATE, `${r.url} — HTTP ${r.status}`);
        } else if (r.status >= 300 && r.status < 400) {
            warn(GATE, `${r.url} — HTTP ${r.status} after redirects`);
        }
    }
    if (!errors.some((e) => e.gate === GATE)) pass(GATE, `${results.length} external URLs respond 2xx`);
}

// ----------------------------------------------------------------- Reporting
function report() {
    const color = (code, s) => (process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s);
    const out = [];
    for (const p of passes) out.push(`${color(32, 'PASS')}  ${p.gate.padEnd(9)} ${p.msg}`);
    for (const w of warnings) out.push(`${color(33, 'WARN')}  ${w.gate.padEnd(9)} ${w.msg}`);
    for (const e of errors) out.push(`${color(31, 'FAIL')}  ${e.gate.padEnd(9)} ${e.msg}`);
    out.push('');
    out.push(
        `${errors.length === 0 ? color(32, 'All gates passed') : color(31, `${errors.length} error(s)`)}` +
        ` · ${warnings.length} warning(s) · ${passes.length} gate(s) passed`,
    );
    console.log(out.join('\n'));
}

async function main() {
    if (wantJson) {
        checkEncoding();
        const parsed = checkHtml();
        checkLocalReferences(parsed);
        checkCssBuild();
        checkContentSync(parsed);
        await checkExternalLinks(parsed);
        console.log(JSON.stringify({ errors, warnings, passes }, null, 2));
    } else {
        console.log('Abufolio static quality gates\n');
        checkEncoding();
        const parsed = checkHtml();
        checkLocalReferences(parsed);
        checkCssBuild();
        checkContentSync(parsed);
        await checkExternalLinks(parsed);
        report();
    }
    process.exit(errors.length === 0 ? 0 : 1);
}

main().catch((e) => {
    console.error('Check runner crashed:', e);
    process.exit(1);
});
