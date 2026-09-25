// npm run citation: writes CITATION.cff in the repository root from src/lib/citation.ts.
import { writeFileSync } from 'node:fs';
import { citationCff } from '../src/lib/citation';
writeFileSync('CITATION.cff', citationCff());
console.log('✓ CITATION.cff written');
