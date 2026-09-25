import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output, deployed to Cloudflare Pages by GitHub Actions (see .github/workflows).
// Every page is generated from src/data/ledger.json.
export default defineConfig({
  site: 'https://returns.howpreventionworks.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
