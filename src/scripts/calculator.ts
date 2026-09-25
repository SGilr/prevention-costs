// Scenario calculator. Arithmetic and caveat wording follow the approved prototype exactly.
// Every parameter arrives from ledger.json through the calc-data block; none is typed here.
type Calc = { kind: 'ratio' | 'unit'; low: number; high: number; horizon: string; persp: string; unit_cost?: number; unit?: string };
type CI = { id: string; name: string; year: string; source: string; grade: string; calc: Calc; note: string };
type P = { qalyValue: number; qalyYear: string; niceLow: number; niceHigh: number; niceFrom: string; aceDalys: number; ukGdpPerCapitaUsd: number };
const { P, CI } = JSON.parse(document.getElementById('calc-data')!.textContent!) as { P: P; CI: CI[] };

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const fmt = (n: number) => '£' + Math.round(n).toLocaleString('en-GB');
const fmtM = (n: number) => (n >= 1e9 ? '£' + (n / 1e9).toFixed(2) + 'bn' : n >= 1e6 ? '£' + (n / 1e6).toFixed(1) + 'm' : fmt(n));
const gbp = (n: number) => '£' + n.toLocaleString('en-GB');
// The prototype stripped a final "s", which gave "per familie" and "per people housed".
const singular = (u: string) => u.replace(/^people\b/, 'person').replace(/ies$/, 'y').replace(/(?<![s\s])s$/, '');

// Return on spend
const sel = $<HTMLSelectElement>('c-int');
const amt = $<HTMLInputElement>('c-amt');
const defaults = (r: CI) => (r.calc.kind === 'unit' ? 100 : 1000000);
const find = (id: string) => CI.find((r) => r.id === id)!;
const want = new URLSearchParams(location.search).get('int')?.toUpperCase();
sel.value = want && CI.some((r) => r.id === want) ? want : 'I07';
amt.value = String(defaults(find(sel.value)));
sel.addEventListener('change', () => { amt.value = String(defaults(find(sel.value))); calc(); });
amt.addEventListener('input', calc);

function calc() {
  const r = find(sel.value), k = r.calc, n = Math.max(0, +amt.value || 0);
  $('c-amtlabel').textContent = k.kind === 'unit' ? `Number of ${k.unit}` : 'Spend (£)';
  const cost = k.kind === 'unit' ? n * k.unit_cost! : n;
  const lo = cost * k.low, hi = cost * k.high;
  const max = Math.max(hi, cost) || 1;
  const bar = (lab: string, v: number, o?: boolean) =>
    `<div class="bar"><span>${lab}</span><span class="track"><span class="fill${o ? ' o' : ''}" data-w="${((v / max) * 100).toFixed(1)}"></span></span><span class="v">${fmtM(v)}</span></div>`;
  const range = k.low === k.high ? fmtM(lo) : `${fmtM(lo)} to ${fmtM(hi)}`;
  $('c-out').innerHTML =
    `<small>Returned value</small><span class="big">${range}</span>
     <small>Ratio ${k.low === k.high ? k.low.toFixed(2) : k.low.toFixed(2) + ' to ' + k.high.toFixed(2)} per £1 · ${esc(k.horizon)} · ${esc(k.persp)} · price year ${esc(r.year)}</small>
     <div class="bars">${bar('Cost', cost, true)}${bar('Return (low)', lo)}${k.low !== k.high ? bar('Return (high)', hi) : ''}</div>
     <small>${k.kind === 'unit' ? `Unit cost ${fmt(k.unit_cost!)} per ${esc(singular(k.unit!))}. ` : ''}Source: ${esc(r.source)}. Grade ${r.grade}. <a href="/entry/${r.id.toLowerCase()}/">Open ${r.id}</a></small>${r.note ? `<div class="warn">${esc(r.note)}</div>` : ''}`;
  // Widths set through the CSSOM, which the Content-Security-Policy allows, not inline style attributes.
  $('c-out').querySelectorAll<HTMLElement>('.fill').forEach((f) => (f.style.width = f.dataset.w + '%'));
}
calc();

// Valuing health gains
const qn = $<HTMLInputElement>('q-n');
function qcalc() {
  const n = Math.max(0, +qn.value || 0);
  $('q-out').innerHTML =
    `<small>Social value at the Green Book rate (${gbp(P.qalyValue)} per QALY, ${esc(P.qalyYear)} prices)</small><span class="big">${fmtM(n * P.qalyValue)}</span>
     <small>Maximum cost NICE would normally accept for these QALYs: ${fmtM(n * P.niceLow)} to ${fmtM(n * P.niceHigh)} (${gbp(P.niceLow)}–${gbp(P.niceHigh)} per QALY from ${esc(P.niceFrom)}). The Green Book figure values health; the NICE range is an opportunity cost for NHS spending.</small>`;
}
qn.addEventListener('input', qcalc);
qcalc();

// ACE scenario
const ap = $<HTMLInputElement>('a-pct');
function acalc() {
  const p = +ap.value;
  $('a-pctv').textContent = String(p);
  const dalys = (P.aceDalys * p) / 100;
  $('a-out').innerHTML =
    `<small>DALYs averted a year (UK base ${P.aceDalys.toLocaleString('en-GB')}; Hughes et al. 2021)</small><span class="big">${Math.round(dalys).toLocaleString('en-GB')}</span>
     <small>At Hughes et al.'s own valuation (UK GDP per capita, US$${P.ukGdpPerCapitaUsd.toLocaleString('en-GB')}): US$${((dalys * P.ukGdpPerCapitaUsd) / 1e9).toFixed(2)}bn a year. At ${gbp(P.qalyValue)} per DALY, treating a DALY averted as roughly one QALY gained: ${fmtM(dalys * P.qalyValue)} a year.</small>
     <div class="warn">Illustrative arithmetic only. It assumes burden falls in proportion to ACE prevalence, as Bellis et al. (2019) did for Europe and North America. DALYs and QALYs are different measures, and the ${gbp(P.qalyValue)} conversion is a simplifying assumption.</div>`;
}
ap.addEventListener('input', acalc);
acalc();

export {};
