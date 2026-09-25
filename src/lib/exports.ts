// Download builders. The rows are exported exactly as they appear in ledger.json. Rebased
// figures, when signed off, are added as separate, labelled fields and never replace a source value.
import { LEDGER, ROWS } from './ledger';
import { rebasedFor, REBASE_ACTIVE, REBASE_LABEL } from './rebase';
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
      entries: Object.fromEntries(
        ROWS.map((r) => {
          const { rebased, reason } = rebasedFor(r);
          return [r.id, rebased ? { from_figure: rebased.figure, from_price_year: rebased.priceYear, basis: rebased.basis, gbp_2025_26: Math.round(rebased.rebased) } : { not_rebased: reason }];
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
  const head = [...COLS, ...CALC.map((c) => `calc_${c}`), 'rebased_2025_26_gbp', 'rebased_from_figure', 'rebased_from_price_year', 'rebased_note'];
  const lines = [head.join(',')];
  for (const r of ROWS) {
    const { rebased, reason } = rebasedFor(r);
    const calc = (r.calc ?? {}) as Record<string, unknown>;
    lines.push([
      ...COLS.map((c) => cell(r[c])),
      ...CALC.map((c) => cell(calc[c])),
      cell(rebased ? Math.round(rebased.rebased) : ''),
      cell(rebased?.figure),
      cell(rebased?.priceYear),
      cell(rebased ? REBASE_LABEL : reason ?? ''),
    ].join(','));
  }
  return '﻿' + lines.join('\r\n') + '\r\n';
}

export function citationCff() {
  return `cff-version: 1.2.0
message: "If you use this ledger, please cite it as below. Cite the original source for any individual figure."
type: dataset
title: "${SITE.title}"
version: "${SITE.version}"
date-released: "${SITE.sourcesCheckedISO}"
url: "${SITE.url}"
repository-code: "${SITE.repo}"
license: CC-BY-4.0
authors:
  - family-names: Gilmour
    given-names: Stan
contact:
  - name: "${SITE.publisher}"
    email: ${SITE.contact}
keywords:
  - prevention
  - early intervention
  - cost of late intervention
  - return on investment
  - lifecourse
  - neurodevelopment
`;
}
