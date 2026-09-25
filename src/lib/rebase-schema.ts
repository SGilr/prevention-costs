import { z } from 'zod';

export const rebaseSchema = z
  .object({
    status: z.enum(['draft', 'signed-off']),
    signed_off_by: z.string().nullable(),
    signed_off_on: z.string().nullable(),
    label: z.string().min(1),
    target_price_year: z.literal('2025/26'),
    deflators: z.string(),
    method: z.object({ financial: z.string(), calendar: z.string() }),
    rules: z.string(),
    entries: z.array(
      z
        .object({
          id: z.string(),
          figure: z.string().min(2),
          amount: z.number().positive(),
          price_year: z.string().regex(/^\d{4}(\/\d{2})?$/),
          basis: z.enum(['financial', 'calendar']),
          note: z.string(),
        })
        .strict(),
    ),
    excluded: z.array(z.object({ id: z.string(), reason: z.string().startsWith('not rebased: ') }).strict()),
  })
  .strict()
  .refine((d) => d.status === 'draft' || (d.signed_off_by && d.signed_off_on), {
    message: 'a signed-off rebase.json needs signed_off_by and signed_off_on',
  });

export type Rebase = z.infer<typeof rebaseSchema>;
