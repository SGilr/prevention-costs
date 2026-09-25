import { citationCff } from '../lib/exports';
export const GET = () => new Response(citationCff(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
