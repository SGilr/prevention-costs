// Rebasing to 2025/26 prices with the HM Treasury GDP deflator series. This is an Oxon
// Advisory calculation layered on the source figures, never a replacement for them.
// Nothing is shown on the site until rebase.json has status "signed-off".
import { readFileSync } from 'node:fs';
import rebaseRaw from '../data/rebase.json';
import { rebaseSchema } from './rebase-schema';
import type { Row } from './schema';

const rebase = rebaseSchema.parse(rebaseRaw);
export const REBASE_ACTIVE = rebase.status === 'signed-off';
export const REBASE_LABEL = rebase.label;
export const REBASE_METHOD = rebase.method;

const fy = new Map<string, number>();
for (const line of readFileSync(new URL('../data/deflators.csv', import.meta.url), 'utf8').trim().split('\n').slice(1)) {
  const [year, idx] = line.split(',');
  if (idx) fy.set(year, Number(idx));
}
const fyLabel = (start: number) => `${start}/${String((start + 1) % 100).padStart(2, '0')}`;
const fyIndex = (label: string) => {
  const v = fy.get(label);
  if (v === undefined) throw new Error(`rebase: no deflator outturn for ${label}`);
  return v;
};

export function deflatorFor(priceYear: string, basis: 'financial' | 'calendar'): number {
  if (basis === 'financial') return fyIndex(priceYear);
  const y = Number(priceYear);
  return 0.25 * fyIndex(fyLabel(y - 1)) + 0.75 * fyIndex(fyLabel(y));
}

export type Rebased = { figure: string; priceYear: string; basis: string; amount: number; rebased: number; factor: number; note: string };

const byId = new Map<string, Rebased>();
for (const e of rebase.entries) {
  const factor = 100 / deflatorFor(e.price_year, e.basis);
  byId.set(e.id, { figure: e.figure, priceYear: e.price_year, basis: e.basis, amount: e.amount, rebased: e.amount * factor, factor, note: e.note });
}
const excluded = new Map(rebase.excluded.map((x) => [x.id, x.reason]));

/** The rebased figure for a row, or the reason there is none. Null in both while the file is a draft. */
export function rebasedFor(r: Row): { rebased?: Rebased; reason?: string } {
  if (!REBASE_ACTIVE) return {};
  const hit = byId.get(r.id);
  if (hit) {
    if (!r.value.includes(hit.figure)) throw new Error(`rebase: ${r.id} figure "${hit.figure}" no longer appears in its value`);
    return { rebased: hit };
  }
  return { reason: excluded.get(r.id) ?? 'not rebased: price year not stated' };
}

/** Format a rebased £ amount to three significant figures, in the ledger's own style. */
export function fmtRebased(n: number): string {
  const sig = (x: number) => Number(x.toPrecision(3));
  if (n >= 1e9) return `£${sig(n / 1e9).toLocaleString('en-GB')}bn`;
  if (n >= 1e6) return `£${sig(n / 1e6).toLocaleString('en-GB')}m`;
  return `£${sig(n).toLocaleString('en-GB')}`;
}

/** All draft calculations, for the review table in REBASE-REVIEW.md. Ignores the sign-off gate. */
export function draftTable() {
  return [...byId.entries()].map(([id, v]) => ({ id, ...v }));
}
