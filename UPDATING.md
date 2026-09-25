# Updating the Ledger

Every figure in the ledger needs a source that someone has actually read. Do not add a figure from memory, from a secondary summary you have not traced, or from a search result snippet. If the primary source has not been seen, the entry is graded D and the note says so.

## Adding or correcting an entry

1. Create a branch.
2. Edit `src/data/ledger.json`. Copy the shape of a similar entry. Required fields: `id`, `kind`, `stage`, `item`, `measure`, `value`, `grade`, `design`, `place`, `year`, `source`, `url`.
   - `id`: the next free number in its series: `H` harm cost, `I` intervention, `P` valuation parameter, `F` forecast. Never reuse or renumber an id, because entry pages are cited by their address.
   - `value`: the figure exactly as the source reports it, including its units and qualifiers ("at least", "about"). Do not round or rebase it.
   - `year`: the price year the source states, or "not stated".
   - `grade`: A to D, as defined on the method page.
   - Interventions also need `result` (one of the seven values in `src/lib/schema.ts`), `payer` and `beneficiary`.
3. Run `npm run validate`. Fix anything it reports.
4. If the entry has a single £ figure and a stated price year, add it to `src/data/rebase.json` under `entries`, or under `excluded` with the reason. Run `npm run rebase:review` and check the result.
5. Run `npm run build` and look at the entry page.
6. Add a line to `CHANGELOG.md`.
7. Open a pull request. Say what changed, and name the source and the page or table you read the figure from. The checks and a preview deployment run automatically.

## Correcting a source link

If the weekly check reports a broken link, find where the source now lives and update `url`. If the source has gone, note that in `note` and consider regrading. Do not change the figure unless you have read the source again.

## When the sources are rechecked

Update `sourcesChecked` in `src/site-config.ts`, bump `version`, and add a `CHANGELOG.md` entry.
