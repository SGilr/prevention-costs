// Schema for src/data/ledger.json. The build fails if the file does not match.
// Figures are free text by design: the ledger records values exactly as each source reports them.
import { z } from 'zod';

export const KINDS = ['Harm cost', 'Intervention', 'Valuation parameter', 'Forecast'] as const;
export const GRADES = ['A', 'B', 'C', 'D'] as const;
export const RESULTS = [
  'Cost-saving',
  'Pays back',
  'Cost-effective',
  'Effective, low cost',
  'Effective, cost unclear',
  'Uncertain',
  'No effect in UK trial',
] as const;
export const HS_VALUES = ['Want', 'Fear', 'Dignity', ''] as const;

const text = z.string().trim().min(1);
const url = z
  .string()
  .url()
  .refine((u) => /^https?:\/\//.test(u), { message: 'url must be http or https' });

const calcRatio = z.object({
  kind: z.literal('ratio'),
  low: z.number().positive(),
  high: z.number().positive(),
  horizon: text,
  persp: text,
});
const calcUnit = z.object({
  kind: z.literal('unit'),
  unit_cost: z.number().positive(),
  low: z.number().positive(),
  high: z.number().positive(),
  horizon: text,
  persp: text,
  unit: text,
});

export const rowSchema = z
  .object({
    // required
    id: z.string().regex(/^[HIPF]\d{2}$/, 'id must look like H01, I32, P03 or F09'),
    kind: z.enum(KINDS),
    stage: text,
    item: text,
    measure: text,
    value: text,
    grade: z.enum(GRADES),
    design: text,
    place: text,
    year: text,
    source: text,
    url,
    // optional
    window: z.string().optional(),
    windowLabel: z.string().optional(),
    domain: z.string().optional(),
    hs: z.enum(HS_VALUES).optional(),
    result: z.enum(RESULTS).optional(),
    payer: z.string().optional(),
    beneficiary: z.string().optional(),
    note: z.string().optional(),
    calc: z.discriminatedUnion('kind', [calcRatio, calcUnit]).optional(),
    short: z.string().optional(),
    headline: z.string().optional(),
  })
  .strict();

export const ledgerSchema = z
  .object({
    stages: z.array(z.tuple([text, text, text])).min(1),
    windows: z.array(z.tuple([text, text, z.string(), z.number().int().min(0), z.number().int().min(0)])),
    rows: z.array(rowSchema).min(1),
    gaps: z.array(text),
    pocket: z.array(z.object({ id: text, text: text }).strict()),
  })
  .strict()
  .superRefine((d, ctx) => {
    const stageIds = new Set(d.stages.map((s) => s[0]));
    const windowIds = new Set(d.windows.map((w) => w[0]));
    const seen = new Set<string>();
    d.rows.forEach((r, i) => {
      const at = ['rows', i];
      if (seen.has(r.id)) ctx.addIssue({ code: 'custom', path: [...at, 'id'], message: `duplicate id ${r.id}` });
      seen.add(r.id);
      if (!stageIds.has(r.stage)) ctx.addIssue({ code: 'custom', path: [...at, 'stage'], message: `unknown stage ${r.stage}` });
      if (r.window && !windowIds.has(r.window)) ctx.addIssue({ code: 'custom', path: [...at, 'window'], message: `unknown window ${r.window}` });
      if (r.kind === 'Intervention' && !r.result) ctx.addIssue({ code: 'custom', path: [...at, 'result'], message: `intervention ${r.id} has no result` });
    });
    d.windows.forEach((w, i) => {
      if (w[3] > w[4] || w[4] >= d.stages.length)
        ctx.addIssue({ code: 'custom', path: ['windows', i], message: `window ${w[0]} spans stages outside the map` });
    });
    d.pocket.forEach((p, i) => {
      const r = d.rows.find((x) => x.id === p.id);
      if (!r) ctx.addIssue({ code: 'custom', path: ['pocket', i], message: `pocket refers to missing id ${p.id}` });
      else if (!r.payer) ctx.addIssue({ code: 'custom', path: ['pocket', i], message: `pocket entry ${p.id} has no payer` });
    });
  });

export type Ledger = z.infer<typeof ledgerSchema>;
export type Row = z.infer<typeof rowSchema>;
export type Result = (typeof RESULTS)[number];
