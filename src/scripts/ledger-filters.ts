// Ledger filters. State lives in the URL query (?q=&kind=&stage=&domain=&result=&grade=&hs=)
// so a filtered view can be shared. Rows are rendered at build time; this only hides them.
const KEYS = ['kind', 'stage', 'domain', 'result', 'grade', 'hs'] as const;
const form = document.getElementById('filters') as HTMLFormElement;
const q = document.getElementById('f-q') as HTMLInputElement;
const rows = [...document.querySelectorAll<HTMLDetailsElement>('details.row')];
const shown = document.getElementById('shown')!;
const empty = document.getElementById('empty')!;
const copy = document.getElementById('copylink') as HTMLButtonElement;
const sel = (k: string) => document.getElementById(`f-${k}`) as HTMLSelectElement;

function readUrl() {
  const p = new URLSearchParams(location.search);
  q.value = p.get('q') ?? '';
  for (const k of KEYS) {
    const v = p.get(k) ?? '';
    const s = sel(k);
    s.value = [...s.options].some((o) => o.value === v) ? v : '';
  }
}

function writeUrl() {
  const p = new URLSearchParams();
  if (q.value.trim()) p.set('q', q.value.trim());
  for (const k of KEYS) if (sel(k).value) p.set(k, sel(k).value);
  const qs = p.toString();
  history.replaceState(null, '', qs ? `?${qs}${location.hash}` : location.pathname + location.hash);
}

function render() {
  const term = q.value.trim().toLowerCase();
  let n = 0;
  for (const r of rows) {
    const ok =
      KEYS.every((k) => !sel(k).value || r.dataset[k] === sel(k).value) &&
      (!term || (r.dataset.search ?? '').includes(term));
    r.hidden = !ok;
    if (ok) n++;
  }
  empty.hidden = n > 0;
  shown.textContent = `Showing ${n} of ${rows.length} entries`;
}

form.addEventListener('input', () => { writeUrl(); render(); });
form.addEventListener('submit', (e) => e.preventDefault());
document.getElementById('reset')!.addEventListener('click', () => {
  form.reset();
  writeUrl();
  render();
});
copy.hidden = !navigator.clipboard;
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    copy.textContent = 'Link copied';
    setTimeout(() => (copy.textContent = 'Copy link to this view'), 1800);
  } catch { /* clipboard refused; the address bar still holds the link */ }
});
window.addEventListener('popstate', () => { readUrl(); render(); });

readUrl();
render();

// Open a row named in the hash, for example /ledger/#row-I32.
const target = location.hash.startsWith('#row-') ? (document.getElementById(location.hash.slice(1)) as HTMLDetailsElement | null) : null;
if (target) {
  if (target.hidden) { form.reset(); writeUrl(); render(); }
  target.open = true;
  target.scrollIntoView({ block: 'start' });
  target.classList.add('flash');
  setTimeout(() => target.classList.remove('flash'), 1400);
}

export {};
