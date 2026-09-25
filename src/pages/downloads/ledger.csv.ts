import { ledgerCsv } from '../../lib/exports';
export const GET = () => new Response(ledgerCsv(), { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
