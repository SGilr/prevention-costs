// Generates the Open Graph images (1200 x 630) into public/og/: one for the site and one
// per entry. Run by `npm run build` after validation. Output is not committed.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ledgerSchema } from '../src/lib/schema';

const d = ledgerSchema.parse(JSON.parse(readFileSync('src/data/ledger.json', 'utf8')));
const font = (pkg: string, file: string) => readFileSync(`node_modules/@fontsource/${pkg}/files/${file}`);
const fonts = [
  { name: 'Garamond', data: font('eb-garamond', 'eb-garamond-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Sans', data: font('source-sans-3', 'source-sans-3-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Sans', data: font('source-sans-3', 'source-sans-3-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];
const C = { navy: '#1D2B4F', paper: '#F3F4F7', ochre: '#DDAE55', muted: '#AFC0E6' };

type Card = { eyebrow: string; title: string; foot: string };
const card = ({ eyebrow, title, foot }: Card) => ({
  type: 'div',
  props: {
    style: { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: C.navy, color: C.paper, padding: '64px 72px', fontFamily: 'Sans' },
    children: [
      { type: 'div', props: { style: { display: 'flex', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, fontWeight: 600 }, children: eyebrow } },
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column' },
          children: [
            { type: 'div', props: { style: { width: 120, height: 5, background: C.ochre, marginBottom: 28 } } },
            { type: 'div', props: { style: { display: 'flex', fontFamily: 'Garamond', fontSize: title.length > 60 ? 62 : 76, lineHeight: 1.08, fontWeight: 600 }, children: title } },
          ],
        },
      },
      { type: 'div', props: { style: { display: 'flex', fontSize: 26, color: C.muted }, children: foot } },
    ],
  },
});

async function png(c: Card, out: string) {
  const svg = await satori(card(c) as never, { width: 1200, height: 630, fonts });
  writeFileSync(out, new Resvg(svg).render().asPng());
}

mkdirSync('public/og', { recursive: true });
const foot = 'returns.howpreventionworks.com · Prevention Informatics, Oxon Advisory';
await png({ eyebrow: 'Evidence ledger', title: 'Prevention Returns Ledger', foot }, 'public/og/site.png');
for (const r of d.rows) {
  await png({ eyebrow: `Prevention Returns Ledger · ${r.id} · ${r.kind}`, title: r.item, foot: `Evidence grade ${r.grade} · returns.howpreventionworks.com/entry/${r.id.toLowerCase()}/` }, `public/og/${r.id.toLowerCase()}.png`);
}
console.log(`✓ Open Graph images: ${d.rows.length + 1} written to public/og/`);
