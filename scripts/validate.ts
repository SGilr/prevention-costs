// npm run validate: checks src/data/ledger.json against the schema, confirms the calculator
// can read its parameters from the ledger, and reproduces the calculator checks agreed on
// 25 September 2026. Runs before every build; any failure stops the build.
import { readFileSync, existsSync } from 'node:fs';
import { ledgerSchema } from '../src/lib/schema';
import { calcParams } from '../src/lib/params';
import { rebaseSchema } from '../src/lib/rebase-schema';

const fail = (msg: string) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};

const raw = JSON.parse(readFileSync('src/data/ledger.json', 'utf8'));
// Duplicate ids are checked on the raw file as well, because zod skips cross-row checks
// once any field error is found.
const rawIds: string[] = (raw.rows ?? []).map((r: { id: string }) => r.id);
const dups = rawIds.filter((id, i) => rawIds.indexOf(id) !== i);
const parsed = ledgerSchema.safeParse(raw);
if (!parsed.success || dups.length) {
  console.error('ledger.json failed validation:');
  for (const id of new Set(dups)) console.error(`  rows: duplicate id ${id}`);
  const issues = parsed.success ? [] : parsed.error.issues.filter((i) => !i.message.startsWith('duplicate id'));
  for (const i of issues) console.error(`  ${i.path.join('.')}: ${i.message}`);
  fail(`${issues.length + new Set(dups).size} schema error(s)`);
}
const d = parsed.data!;

const count = (k: string) => d.rows.filter((r) => r.kind === k).length;
console.log(
  `✓ ledger.json: ${d.rows.length} entries (${count('Harm cost')} harm costs, ${count('Intervention')} interventions, ` +
    `${count('Valuation parameter')} valuation parameters, ${count('Forecast')} forecasts)`,
);

let p;
try {
  p = calcParams(d);
} catch (e) {
  fail((e as Error).message);
}
console.log(`✓ calculator parameters read from P01, P03 and H08`);

// Calculator checks from the brief. Arithmetic mirrors src/scripts/calculator.ts.
const unitReturn = (id: string, n: number) => {
  const c = d.rows.find((r) => r.id === id)?.calc;
  if (!c || c.kind !== 'unit') fail(`${id} has no unit calc block`);
  const cost = n * (c as { unit_cost: number }).unit_cost;
  return { cost, lo: cost * c!.low, hi: cost * c!.high };
};
const checks: [string, number, number][] = [];
const pp = unitReturn('I07', 100);
checks.push(['Parenting programmes, 100 participants: cost', Math.round(pp.cost), 117700]);
checks.push(['Parenting programmes, 100 participants: return low', Math.round(pp.lo), 329560]);
checks.push(['Parenting programmes, 100 participants: return high', Math.round(pp.hi), 717970]);
checks.push(['Liaison and Diversion, 100 referrals: return', Math.round(unitReturn('I26', 100).lo), 93300]);
checks.push(['ACE scenario at 10%: DALYs averted', Math.round((p!.aceDalys * 10) / 100), 185870]);
for (const [label, got, want] of checks) {
  if (got !== want) fail(`${label}: got ${got}, expected ${want}`);
  console.log(`✓ ${label} = ${got.toLocaleString('en-GB')}`);
}

if (existsSync('src/data/rebase.json')) {
  const rb = rebaseSchema.safeParse(JSON.parse(readFileSync('src/data/rebase.json', 'utf8')));
  if (!rb.success) {
    for (const i of rb.error.issues) console.error(`  rebase.json ${i.path.join('.')}: ${i.message}`);
    fail('rebase.json failed validation');
  }
  const ids = new Set(d.rows.map((r) => r.id));
  for (const e of rb.data!.entries) if (!ids.has(e.id)) fail(`rebase.json refers to missing id ${e.id}`);
  console.log(`✓ rebase.json: ${rb.data!.entries.length} entries, status "${rb.data!.status}"`);
}
