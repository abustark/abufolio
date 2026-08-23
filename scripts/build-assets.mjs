import { mkdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pics = join(root, 'pics');
const projectPics = join(pics, 'projects');

mkdirSync(pics, { recursive: true });
mkdirSync(projectPics, { recursive: true });

async function heroWebp() {
    const src = join(pics, 'abu.png');
    const out = join(pics, 'abu.webp');
    await sharp(src).resize({ width: 800 }).webp({ quality: 85 }).toFile(out);
    const meta = await sharp(out).metadata();
    const size = statSync(out).size;
    console.log(`abu.webp ${meta.width}x${meta.height} ${Math.round(size / 1024)} KB`);
}

async function heroPngFallback() {
    const src = join(pics, 'abu.png');
    const tmp = join(pics, 'abu.tmp.png');
    await sharp(src).resize({ width: 800 }).png({ compressionLevel: 9, palette: true }).toFile(tmp);
    const { size } = statSync(tmp);
    const origSize = statSync(src).size;
    if (size < origSize * 0.8) {
        await sharp(tmp).toFile(join(pics, 'abu.png'));
        console.log(`abu.png optimized ${Math.round(origSize / 1024)} KB -> ${Math.round(size / 1024)} KB`);
    } else {
        console.log(`abu.png kept original ${Math.round(origSize / 1024)} KB`);
    }
    try { (await import('node:fs')).unlinkSync(tmp); } catch {}
}

const OG_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="og-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1117"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="og-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og-grad)"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#1e293b" stroke-width="2"/>
  <path d="M40 104 V40 H104" fill="none" stroke="url(#og-accent)" stroke-width="5"/>
  <path d="M1160 526 V590 H1096" fill="none" stroke="url(#og-accent)" stroke-width="5"/>
  <text x="84" y="132" font-family="'Geist Mono',Consolas,monospace" font-size="26" letter-spacing="7" fill="#6ee7b7">AI &amp; DATA PORTFOLIO · AMAZON ML ASSOCIATE</text>
  <text x="82" y="262" font-family="'Space Grotesk','Segoe UI',sans-serif" font-weight="700" font-size="110" fill="#f8fafc">Basith AbuSyed</text>
  <text x="86" y="336" font-family="'Geist Mono',Consolas,monospace" font-size="31" letter-spacing="2" fill="#34d399">ML DATA ASSOCIATE II @ AMAZON</text>
  <text x="86" y="392" font-family="'Geist Mono',Consolas,monospace" font-size="23" fill="#94a3b8">Data analysis · AI workflows · Predictive ML · Power BI</text>
  <line x1="84" y1="452" x2="620" y2="452" stroke="#334155" stroke-width="2"/>
  <text x="84" y="532" font-family="'Geist Mono',Consolas,monospace" font-size="22" fill="#64748b">abufolio.vercel.app · bas.abu0802@gmail.com</text>
  <g transform="translate(880 470)">
    <rect x="-120" y="-120" width="26" height="150" rx="13" fill="#34d399" opacity="0.22"/>
    <rect x="-66" y="-92" width="26" height="122" rx="13" fill="#34d399" opacity="0.5"/>
    <rect x="-12" y="-132" width="26" height="162" rx="13" fill="#34d399"/>
    <rect x="42" y="-72" width="26" height="102" rx="13" fill="#06b6d4" opacity="0.55"/>
    <rect x="96" y="-108" width="26" height="138" rx="13" fill="#06b6d4" opacity="0.28"/>
    <text x="130" y="-170" font-family="'Geist Mono',Consolas,monospace" font-size="19" fill="#6ee7b7">DATA IN, SIGNAL OUT</text>
  </g>
</svg>`;

async function ogCard() {
    const out = join(pics, 'og.png');
    await sharp(Buffer.from(OG_SVG), { density: 144 }).resize(1200, 630).png().toFile(out);
    const meta = await sharp(out).metadata();
    const size = statSync(out).size;
    console.log(`og.png ${meta.width}x${meta.height} ${Math.round(size / 1024)} KB`);
}

async function projectScreenshots() {
    const projects = ['abot', 'house-price', 'linkly', 'ecommerce'];
    for (const p of projects) {
        const srcPng = join(projectPics, `${p}.png`);
        const outWebp = join(projectPics, `${p}.webp`);
        if (existsSync(srcPng)) {
            await sharp(srcPng).resize({ width: 900 }).webp({ quality: 85 }).toFile(outWebp);
            const size = statSync(outWebp).size;
            console.log(`${p}.webp 900px ${Math.round(size / 1024)} KB`);
        }
    }
}

await heroWebp();
await heroPngFallback();
await ogCard();
await projectScreenshots();
