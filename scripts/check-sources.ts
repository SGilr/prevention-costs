// npm run sources: requests every source URL in ledger.json and writes a Markdown report
// to source-links-report.md. Read-only: it never edits the data. Exit code 1 if any link
// is broken, so the weekly workflow knows to open an issue.
//
// Some publishers refuse automated requests (403, 429, 999) while working in a browser.
// Those are listed separately as "could not check automatically" rather than as broken.
import { readFileSync, writeFileSync } from 'node:fs';
import { ledgerSchema } from '../src/lib/schema';

const d = ledgerSchema.parse(JSON.parse(readFileSync('src/data/ledger.json', 'utf8')));
const UA = 'Mozilla/5.0 (compatible; PreventionReturnsLedger-linkcheck/1.0; +https://returns.howpreventionworks.com/about/)';
const BLOCKED = new Set([401, 403, 405, 406, 429, 999]);

type Res = { status: number | string; final?: string };
async function probe(url: string): Promise<Res> {
  for (const method of ['HEAD', 'GET']) {
    try {
      const r = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,application/pdf,*/*' }, signal: AbortSignal.timeout(30000) });
      if (method === 'HEAD' && (r.status >= 400 || r.status === 0)) continue;
      return { status: r.status, final: r.url !== url ? r.url : undefined };
    } catch (e) {
      if (method === 'GET') return { status: (e as Error).name === 'TimeoutError' ? 'timeout' : `error: ${(e as Error).message}` };
    }
  }
  return { status: 'error' };
}

const urls = new Map<string, string[]>();
for (const r of d.rows) urls.set(r.url, [...(urls.get(r.url) ?? []), r.id]);

const results: { url: string; ids: string[]; res: Res }[] = [];
const queue = [...urls.entries()];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (let job = queue.shift(); job; job = queue.shift()) results.push({ url: job[0], ids: job[1], res: await probe(job[0]) });
  }),
);
results.sort((a, b) => a.ids[0].localeCompare(b.ids[0]));

const ok = results.filter((x) => typeof x.res.status === 'number' && x.res.status < 400);
const blocked = results.filter((x) => typeof x.res.status === 'number' && BLOCKED.has(x.res.status));
const broken = results.filter((x) => !ok.includes(x) && !blocked.includes(x));
const moved = ok.filter((x) => x.res.final && new URL(x.res.final).hostname !== new URL(x.url).hostname);
const line = (x: (typeof results)[number]) => `| ${x.ids.join(', ')} | ${x.res.status} | ${x.url} |${x.res.final ? ` ${x.res.final} |` : ' |'}`;
const table = (rows: typeof results) => ['| Entries | Status | URL | Redirected to |', '|---|---|---|---|', ...rows.map(line)].join('\n');

const report = [
  `Checked ${results.length} source URLs used by ${d.rows.length} entries on ${new Date().toISOString().slice(0, 10)}.`,
  '',
  `**Broken: ${broken.length}.** These need a person to find the current location of the source and update the entry through a pull request. This check does not change the data.`,
  broken.length ? '\n' + table(broken) : '',
  '',
  `Could not check automatically: ${blocked.length}. The publisher refused an automated request; check these in a browser.`,
  blocked.length ? '\n' + table(blocked) : '',
  '',
  `Redirected to a different site: ${moved.length}.`,
  moved.length ? '\n' + table(moved) : '',
].join('\n');
writeFileSync('source-links-report.md', report + '\n');
console.log(report);
process.exit(broken.length ? 1 : 0);
