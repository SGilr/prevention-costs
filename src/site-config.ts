// Site-wide settings, agreed 25 September 2026. Change here, not in templates.
export const SITE = {
  title: 'Prevention Returns Ledger',
  url: 'https://returns.howpreventionworks.com',
  publisher: 'Prevention Informatics, a division of Oxon Advisory',
  publisherShort: 'Prevention Informatics, Oxon Advisory',
  author: 'Stan Gilmour KPM FRSA',
  authorCitation: 'Gilmour, S.',
  contact: 'admin@oxonadvisory.com',
  sourcesChecked: '25 September 2026',
  sourcesCheckedISO: '2026-09-25',
  version: '1.0.0',
  year: 2026,
  repo: 'https://github.com/SGilr/prevention-costs',
  parent: 'https://howpreventionworks.com',
  dataLicence: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
  codeLicence: { name: 'MIT', url: 'https://opensource.org/license/mit' },
  // Cloudflare Web Analytics beacon token (not a secret: it appears in every page's source).
  // Cookieless. Set up manually for returns.howpreventionworks.com on 25 September 2026.
  // Empty string turns the beacon off.
  analyticsToken: '6bd54de6f80247dcaf86251b3a387b30',
  // Launched 25 September 2026. Set false to hide the site from search engines again: every
  // page then carries noindex, a site-wide X-Robots-Tag header is written, and robots.txt
  // disallows crawling.
  indexable: true,
};

// Brain injury entries reviewed by Huw Williams. The credit is hidden while `confirmed` is false.
// Launched without it on 25 September 2026; set to true (and the reviewer's styling) once Stan
// confirms the review is complete. It then shows on H15-H18, I22, /method/ and /about/.
export const REVIEW = {
  reviewer: 'Huw Williams',
  entries: ['H15', 'H16', 'H17', 'H18', 'I22'],
  confirmed: false,
};

export const NAV = [
  { href: '/map/', label: 'Map' },
  { href: '/ledger/', label: 'Ledger' },
  { href: '/who-pays/', label: 'Who pays' },
  { href: '/values/', label: 'Values' },
  { href: '/calculator/', label: 'Calculator' },
  { href: '/method/', label: 'Method' },
  { href: '/downloads/', label: 'Downloads' },
];
