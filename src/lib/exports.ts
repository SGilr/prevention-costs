// Download builders. The rows are exported exactly as they appear in ledger.json. Rebased
// figures, when signed off, are added as separate, labelled fields and never replace a source value.
import { LEDGER, ROWS } from './ledger';
import { rebasedFor, REBASE_ACTIVE, REBASE_LABEL, fmtRebased, sig3 } from './rebase';
import { SITE } from '../site-config';

export function ledgerJson() {
  const out: Record<string, unknown> = {
    _about: {
      title: SITE.title,
      version: SITE.version,
      sources_checked: SITE.sourcesCheckedISO,
      publisher: SITE.publisher,
      author: SITE.author,
      licence: `${SITE.dataLicence.name} (${SITE.dataLicence.url}). The licence covers the compilation, grading and classification; underlying figures remain attributed to their original sources.`,
      url: SITE.url,
      handling: [
        'Figures are reported in each source\'s own price year.',
        'Harm costs overlap and must never be summed.',
        'Calculator outputs are illustrative arithmetic on sourced ratios, not new estimates.',
      ],
    },
    ...LEDGER,
  };
  if (REBASE_ACTIVE) {
    out.oxon_advisory_rebased_2025_26 = {
      label: REBASE_LABEL,
      precision: 'Three significant figures',
      entries: Object.fromEntries(
        ROWS.map((r) => {
          const { rebased, reason } = rebasedFor(r);
          return [r.id, rebased ? { from_figure: rebased.figure, from_price_year: rebased.priceYear, basis: rebased.basis, gbp_2025_26: sig3(rebased.rebased), display: fmtRebased(rebased.rebased) } : { not_rebased: reason }];
        }),
      ),
    };
  }
  return JSON.stringify(out, null, 2) + '\n';
}

const COLS = ['id', 'kind', 'stage', 'window', 'windowLabel', 'domain', 'hs', 'item', 'measure', 'value', 'result', 'payer', 'beneficiary', 'grade', 'design', 'place', 'year', 'source', 'url', 'note', 'short', 'headline'] as const;
const CALC = ['kind', 'unit_cost', 'low', 'high', 'horizon', 'persp', 'unit'] as const;
const cell = (v: unknown) => {
  const s = v === undefined || v === null ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function ledgerCsv() {
  const head = [...COLS, ...CALC.map((c) => `calc_${c}`), 'rebased_2025_26_gbp', 'rebased_2025_26_display', 'rebased_from_figure', 'rebased_from_price_year', 'rebased_note'];
  const lines = [head.join(',')];
  for (const r of ROWS) {
    const { rebased, reason } = rebasedFor(r);
    const calc = (r.calc ?? {}) as Record<string, unknown>;
    lines.push([
      ...COLS.map((c) => cell(r[c])),
      ...CALC.map((c) => cell(calc[c])),
      cell(rebased ? sig3(rebased.rebased) : ''),
      cell(rebased ? fmtRebased(rebased.rebased) : ''),
      cell(rebased?.figure),
      cell(rebased?.priceYear),
      cell(rebased ? REBASE_LABEL : reason ?? ''),
    ].join(','));
  }
  return '﻿' + lines.join('\r\n') + '\r\n';
}

export { citationCff } from './citation';
