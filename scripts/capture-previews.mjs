/**
 * Capture live screenshots of deployed projects for the portfolio cards.
 *
 *   npm run shots            -> capture every project with a live URL
 *   npm run shots abot linkly -> capture only the listed slugs
 *
 * Writes pics/projects/<slug>.png (900x560) and .webp (900px, q85) — the same
 * formats build-assets.mjs produces — so the card markup needs no changes.
 * If a site is unreachable the previous image is kept and the run continues.
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'pics', 'projects');
mkdirSync(outDir, { recursive: true });

const WIDTH = 900;
const HEIGHT = 560;

// Captured automatically (deployed + public):
//   abot, price-trail, linkly, ngelo
// Deliberately omitted:
//   house-price  — old Streamlit retired; re-add here when its new site URL arrives
//   covercraft   — project is private (GitHub only), card uses the static preview + case notes modal
const PROJECTS = [
    { slug: 'abot', url: 'https://abot-eta.vercel.app/' },
    { slug: 'price-trail', url: 'https://price-trail-ruddy.vercel.app/' },
    { slug: 'linkly', url: 'https://linkly-link.vercel.app/' },
    { slug: 'ngelo', url: 'https://ecom-seven-sand.vercel.app' },
];

const COLD_MARKERS = /asleep|sleeping|gone to sleep|wake it back|waking|cold start|starting up|starting your app|please wait|is loading|loading\.\.\.|coming back/i;
const WAKE_BUTTON = /get this app back|get it back|wake|reload/i;

const log = (msg) => console.log(msg);

async function capture(browser, { slug, url, coldStart = false }) {
    const context = await browser.newContext({
        viewport: { width: WIDTH, height: HEIGHT },
        deviceScaleFactor: 2, // supersample, then downscale to a crisp 900px
        locale: 'en-US',
    });
    const page = await context.newPage();
    const attempts = coldStart ? 8 : 3;

    try {
        let ready = false;
        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
            } catch (err) {
                log(`  ${slug}: navigation failed (attempt ${attempt}/${attempts}) — ${err.message.split('\n')[0]}`);
                await page.waitForTimeout(4000);
                continue;
            }

            await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
            await page.evaluate(() => document.fonts?.ready).catch(() => {});
            await page.waitForTimeout(coldStart && attempt === 1 ? 5000 : 2500);

            const text = await page.evaluate(() => document.body?.innerText?.slice(0, 3000) ?? '');
            const spinner = await page.locator('.stSpinner').count().catch(() => 0);
            if (!COLD_MARKERS.test(text) && spinner === 0) {
                ready = true;
                break;
            }

            // Free-tier host is showing a sleep/boot screen: wake it and retry.
            const wake = page.locator('button, a, [role="button"]', { hasText: WAKE_BUTTON }).first();
            if (await wake.count().catch(() => 0)) {
                log(`  ${slug}: sleep screen detected — clicking wake button`);
                await wake.click({ timeout: 5000 }).catch(() => {});
                await page.waitForTimeout(8000);
            } else {
                log(`  ${slug}: still loading (attempt ${attempt}/${attempts}), retrying...`);
                await page.waitForTimeout(6000);
            }
        }

        if (!ready) throw new Error(`app never finished waking up after ${attempts} attempts`);

        await page.evaluate(() => window.scrollTo(0, 0));
        const buf = await page.screenshot({ type: 'png', animations: 'disabled' });

        const png = await sharp(buf).resize({ width: WIDTH }).png({ compressionLevel: 9 }).toBuffer();
        const webp = await sharp(buf).resize({ width: WIDTH }).webp({ quality: 85, effort: 6 }).toBuffer();
        writeFileSync(join(outDir, `${slug}.png`), png);
        writeFileSync(join(outDir, `${slug}.webp`), webp);

        log(`  ${slug}: ok — png ${Math.round(statSync(join(outDir, `${slug}.png`)).size / 1024)} KB, webp ${Math.round(statSync(join(outDir, `${slug}.webp`)).size / 1024)} KB`);
        return true;
    } catch (err) {
        log(`  ${slug}: FAILED — ${err.message.split('\n')[0]} (keeping previous image)`);
        return false;
    } finally {
        await context.close();
    }
}

const wanted = process.argv.slice(2);
const targets = wanted.length ? PROJECTS.filter((p) => wanted.includes(p.slug)) : PROJECTS;
if (wanted.length && targets.length !== wanted.length) {
    const unknown = wanted.filter((s) => !PROJECTS.some((p) => p.slug === s));
    log(`Unknown slug(s): ${unknown.join(', ')}. Known: ${PROJECTS.map((p) => p.slug).join(', ')}`);
    process.exit(1);
}

// Prefer Playwright's bundled Chromium (CI installs it); fall back to a system
// browser so `npm run shots` works locally even when the CDN is unreachable.
async function launchBrowser() {
    for (const opts of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
        try {
            const browser = await chromium.launch({ headless: true, ...opts });
            log(`browser: ${opts.channel ?? 'bundled chromium'}\n`);
            return browser;
        } catch {
            /* try the next option */
        }
    }
    throw new Error('no usable browser — run `npx playwright install chromium` or install Chrome/Edge');
}

const browser = await launchBrowser();
let ok = 0;
let failed = 0;
for (const project of targets) {
    log(`${project.slug} <- ${project.url}`);
    if (await capture(browser, project)) ok++;
    else failed++;
}
await browser.close();

log(`\n${ok} captured, ${failed} failed (of ${targets.length})`);
// Only fail the build when nothing worked — a single dead site must not block the rest.
if (failed === targets.length) process.exit(1);
