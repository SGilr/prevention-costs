// Calculator parameters, read out of the ledger's own text so that no figure is retyped
// into a template. Each extraction names the entry and the pattern it expects; if the
// entry's wording changes so the pattern no longer matches, the build fails loudly.
import type { Ledger, Row } from './schema';

const num = (s: string) => Number(s.replace(/,/g, ''));

function pick(rows: Row[], id: string, field: 'value' | 'note', re: RegExp): RegExpMatchArray {
  const row = rows.find((r) => r.id === id);
  if (!row) throw new Error(`params: entry ${id} not found in ledger.json`);
  const m = String(row[field] ?? '').match(re);
  if (!m) throw new Error(`params: could not read ${re} from ${id}.${field}: "${row[field]}"`);
  return m;
}

export function calcParams(d: Ledger) {
  const R = d.rows;
  const qaly = pick(R, 'P01', 'value', /^£([\d,]+)$/);
  const nice = pick(R, 'P03', 'value', /^£([\d,]+)–£([\d,]+) from (\w+ \d{4})/);
  const ace = pick(R, 'H08', 'value', /([\d,]+) DALYs/);
  const gdp = pick(R, 'H08', 'note', /US\$([\d,]+) for the UK/);
  const p01 = R.find((r) => r.id === 'P01')!;
  return {
    qalyValue: num(qaly[1]), // P01, HM Treasury Green Book
    qalyYear: p01.year,
    niceLow: num(nice[1]), // P03
    niceHigh: num(nice[2]),
    niceFrom: nice[3],
    aceDalys: num(ace[1]), // H08, Hughes et al. (2021)
    ukGdpPerCapitaUsd: num(gdp[1]), // H08 note
  };
}
export type CalcParams = ReturnType<typeof calcParams>;
