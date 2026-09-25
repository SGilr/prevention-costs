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
  // Cloudflare Web Analytics beacon token. Leave empty until Stan supplies it; no beacon is
  // loaded while it is empty.
  analyticsToken: '',
  // Keep false until the site is launched on the custom domain. While false every page
  // carries noindex and a site-wide X-Robots-Tag header is written.
  indexable: false,
};

// Brain injury entries reviewed by Huw Williams. `confirmed` stays false, and the credit is
// shown as a marked placeholder, until Stan confirms the review is complete and the styling.
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
