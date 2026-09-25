import { SITE } from '../site-config';
export const GET = () =>
  new Response(
    SITE.indexable
      ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`
      : `# Not yet launched: indexing is off until the site is live on ${SITE.url}\nUser-agent: *\nDisallow: /\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
