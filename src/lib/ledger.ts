// The single loader for ledger.json. Every page, table, download and calculator value comes
// through here. The file is parsed with the schema so a bad edit fails the build.
import raw from '../data/ledger.json';
import { ledgerSchema, type Row, type Result } from './schema';
import { SITE } from '../site-config';

export const LEDGER = ledgerSchema.parse(raw);
export const ROWS = LEDGER.rows;
export const STAGES = LEDGER.stages;
export const WINDOWS = LEDGER.windows;

export const stageName = Object.fromEntries(STAGES.map((s) => [s[0], s[1]])) as Record<string, string>;
export const stageAge = Object.fromEntries(STAGES.map((s) => [s[0], s[2]])) as Record<string, string>;

// Result groups and their visual class, as in the approved prototype.
export const RES: Record<Result, string> = {
  'Cost-saving': 'r-return',
  'Pays back': 'r-return',
  'Cost-effective': 'r-ce',
  'Effective, low cost': 'r-eff',
  'Effective, cost unclear': 'r-eff',
  Uncertain: 'r-unc',
  'No effect in UK trial': 'r-null',
};
export const RESGROUP: [string, string][] = [
  ['r-return', 'Pays back or saves money'],
  ['r-ce', 'Cost-effective per QALY'],
  ['r-eff', 'Effective, cost incomplete'],
  ['r-unc', 'Uncertain'],
  ['r-null', 'No effect in UK trial'],
];
export const RESORDER = RESGROUP.map((g) => g[0]);
export const HS: Record<string, string> = {
  Want: 'Freedom from want',
  Fear: 'Freedom from fear',
  Dignity: 'Freedom to live in dignity',
};
export const KIND_PLURAL: Record<string, string> = {
  'Harm cost': 'harm costs',
  Intervention: 'interventions',
  'Valuation parameter': 'valuation parameters',
  Forecast: 'forecasts',
};

export const slug = (id: string) => id.toLowerCase();
export const entryHref = (id: string) => `/entry/${slug(id)}/`;
export const byId = (id: string) => ROWS.find((r) => r.id === id);
export const countKind = (k: string) => ROWS.filter((r) => r.kind === k).length;

/** Beneficiary text. Where none is recorded, null UK trials read "No benefit shown in trial";
 *  other results read "Benefit not established" (agreed 25 September 2026, DATA-QUERIES 15). */
export const benefitLabel = (r: Row) =>
  r.beneficiary || (r.result === 'No effect in UK trial' ? 'No benefit shown in trial' : 'Benefit not established');

/** Harvard-style reference built from the ledger's own source and URL fields. */
export const harvard = (r: Row) => `${r.source}. Available at: ${r.url} (Accessed: ${SITE.sourcesChecked}).`;


export type { Row };
