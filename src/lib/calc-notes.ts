// Explanatory notes shown with calculator results, agreed with Stan Gilmour on 25 September
// 2026 (DATA-QUERIES 7 to 11). Site text only: they describe how the ledger's calc figures
// relate to the source, and change no figure. Keyed by entry id; every id must have a calc block.
import { ROWS } from './ledger';

const MIXED = 'Low and high are different published measures (see the horizon), not the ends of one estimate.';

export const CALC_NOTES: Record<string, string> = {
  I11: MIXED,
  I27: MIXED,
  I34: MIXED,
  I26: "Ratio derived by Oxon Advisory from the source's reported cost and saving per referral; the source does not publish a ratio.",
  I08: "The Exchequer figure in the perspective is derived by Oxon Advisory from the source's reported figures.",
};

for (const id of Object.keys(CALC_NOTES)) {
  if (!ROWS.find((r) => r.id === id)?.calc) throw new Error(`calc-notes: ${id} has no calc block in ledger.json`);
}
