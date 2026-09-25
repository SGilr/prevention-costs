import { ledgerJson } from '../../lib/exports';
export const GET = () => new Response(ledgerJson(), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
