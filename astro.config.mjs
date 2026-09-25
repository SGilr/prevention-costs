import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/site-config';

// Until launch, every response carries X-Robots-Tag: noindex, including the JSON and CSV
// downloads, which the meta tag cannot reach. Cloudflare Pages reads _headers from dist.
const robotsHeader = {
  name: 'prl-robots-header',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (SITE.indexable) return;
      appendFileSync(fileURLToPath(new URL('_headers', dir)), '\n/*\n  X-Robots-Tag: noindex, nofollow\n');
    },
  },
};

// Static output, deployed to Cloudflare Pages by GitHub Actions (see .github/workflows).
// Every page is generated from src/data/ledger.json.
export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'never' },
  // Keep every script and stylesheet in its own file so the Content-Security-Policy
  // needs no 'unsafe-inline'.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [sitemap({ filter: (p) => !p.endsWith('/404/') }), robotsHeader],
  devToolbar: { enabled: false },
});
