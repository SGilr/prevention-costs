// npm run links: checks that every internal href and src in dist/ resolves to a built file,
// and that every in-page #fragment exists. External links are checked weekly by links.yml.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const pages = walk(DIST).filter((f) => f.endsWith('.html'));

const ids = new Map<string, Set<string>>();
const idsOf = (file: string) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file)!;
};
const resolve = (path: string) => {
  const p = decodeURIComponent(path);
  for (const c of [join(DIST, p), join(DIST, p, 'index.html'), join(DIST, `${p}.html`)])
    if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
};

let checked = 0;
const broken: string[] = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const here = '/' + page.slice(DIST.length + 1).replace(/index\.html$/, '');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const link = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(link)) continue;
    checked++;
    const [pathPart, frag] = link.split('#');
    const target = pathPart ? resolve(new URL(pathPart, `https://x${here}`).pathname) : page;
    if (!target) { broken.push(`${here} → ${link} (no such file)`); continue; }
    if (frag && target.endsWith('.html') && !frag.startsWith('row-') && !idsOf(target).has(frag))
      broken.push(`${here} → ${link} (no element with id "${frag}")`);
  }
}
if (broken.length) {
  console.error(`✗ ${broken.length} broken internal link(s):\n  ${broken.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${checked} internal links across ${pages.length} pages resolve`);
