# Handover: Prevention Returns Ledger v1.0.0

Launched 25 September 2026. Prepared for Stan Gilmour KPM FRSA.

## What was built

A static site, generated from `src/data/ledger.json` (87 entries), at **https://returns.howpreventionworks.com**. It has a home page, a lifecourse map, a filterable ledger whose filters live in the URL, one page per entry with a citation, who pays, values, a scenario calculator, method, downloads and about. The downloads are JSON, CSV, the Excel workbook and `CITATION.cff`. Every figure, table, download and calculator value comes from `ledger.json`; none is typed into a template.

| | |
|---|---|
| Stack | Astro 5, TypeScript, npm, Node 24. No client framework and no third-party font requests |
| Repository | https://github.com/SGilr/prevention-costs (public). Code is MIT; data and text are CC BY 4.0 |
| Hosting | Cloudflare Pages project `prevention-costs`, deployed by GitHub Actions. `prevention-costs.pages.dev` redirects (301) to the custom domain through the Bulk Redirect `prevention_costs_pages_dev` |
| Analytics | Cloudflare Web Analytics. No cookies, no local storage and no other tracking |

## How changes ship

| Event | What runs |
|---|---|
| Push to `main` | Checks, then a production deploy |
| Pull request | Checks, then a preview deploy, with its address posted on the pull request |
| Push to another branch | Checks only |
| Mondays, 06:00 UTC | A source-link check, which opens or updates an issue if a source link has broken. It never edits the data |

The checks are: schema validation, the three calculator checks, the `CITATION.cff` match, the type check, the build, internal links, and accessibility on 16 pages. Nothing deploys unless they pass. To add or correct an entry, follow `UPDATING.md`.

## Secrets and settings

| Where | Name | Notes |
|---|---|---|
| GitHub repository secret | `CLOUDFLARE_API_TOKEN` | Custom token with Account → Cloudflare Pages → Edit. Set and verified 25 September 2026 |
| GitHub repository secret | `CLOUDFLARE_ACCOUNT_ID` | The account holding the threshold and faire Pages projects |
| `src/site-config.ts` | `analyticsToken` | The Web Analytics beacon token. It is not a secret |
| Cloudflare dashboard | Custom domain on the Pages project | Certificate issued by Google Trust Services |
| Cloudflare dashboard | Bulk Redirect `prevention_costs_pages_dev` | Preview addresses are not redirected |

## Decisions recorded

| Area | Decision |
|---|---|
| Rebasing | 20 entries show a 2025/26-price figure beside the source figure, labelled "Oxon Advisory calculation, 2025/26 prices, HM Treasury GDP deflator". Signed off by you on 25 September 2026, after every price year was checked against its source. The other 67 entries each state why they are not rebased. See `REBASE-REVIEW.md` |
| Data corrections | All approved: the price years for H01, H12 and I05; I17 revised from YEF's current Toolkit; the H29 and H30 headlines; wording for H19, I07 and I02; four URLs; and a note on P01. Each is in `CHANGELOG.md`, and the workbook was updated to match |
| Data queries | All decided. See `DATA-QUERIES.md`, which also has space for new ones |

## Checks at launch

- The type check has no errors, all 3,591 internal links resolve, and all 16 checked pages pass WCAG 2 AA (axe and HTML_CodeSniffer).
- All 85 source links reach their source: 65 automatically, and 20 that refuse scripts were checked in a browser or through Crossref.
- All three calculator checks reproduce: £117,700 and £329,560 to £717,970; £93,300; 185,870 DALYs.
- Lighthouse on the live `/`, `/map/` and `/ledger/`: performance 97 to 100, accessibility 100 and SEO 100. **Best practices is 92, below the 95 target.** See below.

## Open items

1. **Huw Williams's review credit.** It is hidden. When the review of H15 to H18 and I22 is confirmed, set `REVIEW.confirmed` to `true` in `src/site-config.ts`, with his styling. The credit then appears on those entries, the method page and the about page.
2. **Best practices score of 92.** Bot Fight Mode on the howpreventionworks.com zone injects an inline script, which the site's Content-Security-Policy blocks, and Lighthouse counts the console errors. Visitors see no effect. There are three ways to deal with it:
   - switch off JavaScript detections for the zone
   - allow `'unsafe-inline'` scripts, which is not recommended because it weakens the policy on every page
   - accept the score
3. **Scripted downloads.** The zone's security settings block curl and Python `requests` on the custom domain; browsers, R and Wget work. If researchers report problems, add a WAF skip rule for `/downloads/*` on the `returns` hostname. See `README.md`.
4. **Search consoles (optional).** Add the site to Google Search Console and Bing Webmaster Tools, and submit `https://returns.howpreventionworks.com/sitemap-index.xml`. Verification needs a DNS TXT record.
5. **Workbook.** It is a separate file. Any change to `ledger.json` needs the same change in the workbook, so that the two stay identical.
