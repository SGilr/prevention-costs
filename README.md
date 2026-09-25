# Prevention Returns Ledger

A public evidence site recording what late intervention costs UK public systems, which preventive interventions have economic evidence, where each sits across the lifecourse and neurodevelopmental windows, and what each returns in cash, QALYs and DALYs. Every entry carries a source, a link, a price year, a study design and an evidence grade (A to D).

Published by Prevention Informatics, a division of Oxon Advisory. Compiled by Stan Gilmour KPM FRSA.

- Site: https://returns.howpreventionworks.com
- Data and text: CC BY 4.0 ([LICENSE-DATA](LICENSE-DATA)). Code: MIT ([LICENSE](LICENSE)).

## How it works

`src/data/ledger.json` is the only source of figures. Every page, table, download and calculator value is generated from it at build time. The build fails if the file does not match the schema in `src/lib/schema.ts`: a missing required field, a duplicate `id`, a `grade` outside A to D, an unknown `kind` or `result`, or a `url` that is not http or https.

| Path | What it holds |
|---|---|
| `src/data/ledger.json` | The ledger (87 entries at v1.0.0) |
| `src/data/deflators.csv`, `deflators.meta.json` | HM Treasury GDP deflators, June 2026 release, with source and download date |
| `src/data/rebase.json` | Which £ figure in each entry is shown in 2025/26 prices, or why none is. Inactive until signed off |
| `src/lib/` | Schema, loader, calculator parameters, rebasing, download builders |
| `src/pages/` | One file per route; `entry/[id].astro` makes the 87 entry pages |
| `scripts/` | Validation, social images, link checks, rebase review |
| `.github/workflows/` | Checks, deploy and weekly source link check |

## Running it locally

Needs Node 24 (see `.nvmrc`) and npm.

```bash
npm ci
npm run dev        # validate, generate social images, start the dev server
npm run build      # validate, generate social images, build to dist/
npm run preview    # serve dist/
```

Checks:

```bash
npm run validate   # schema and calculator checks
npx astro check    # TypeScript
npm run links      # internal links in dist/
npm run a11y       # pa11y-ci against a running preview on port 4331
npm run sources    # request every source URL (slow; writes source-links-report.md)
```

## Deploying

Deployment runs through GitHub Actions to the Cloudflare Pages project `prevention-costs`.

- A push to `main` runs the checks, then deploys to production.
- A pull request runs the checks, then deploys a preview and posts its address on the pull request.
- A push to any other branch runs the checks only.
- Every Monday, `links.yml` checks every source URL and opens or updates an issue listing broken links. It never edits the data.

The repository needs two secrets, `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Until launch, `indexable` in `src/site-config.ts` is `false`. This adds `noindex` to every page and an `X-Robots-Tag` header to every response, and `robots.txt` disallows all crawling. Set it to `true` when the site is live on the custom domain.

### Known behaviour on the custom domain

The howpreventionworks.com zone's Cloudflare security settings block some scripted requests on `returns.howpreventionworks.com`. As checked on 25 September 2026, curl, Python `requests` and requests with no user agent get a 403 block page. Browsers, R and Wget are allowed. Anyone scripting a download can use R, Wget or a browser, or fetch from `prevention-costs.pages.dev` until launch. If this becomes a problem, add a WAF skip rule for `/downloads/*` and `/CITATION.cff` on the `returns` hostname rather than relaxing the whole zone. The zone also injects a Cloudflare script, which the site's Content-Security-Policy blocks; visitors see no effect.

## Updating the data

See [UPDATING.md](UPDATING.md). Open queries about the data are in [DATA-QUERIES.md](DATA-QUERIES.md).
