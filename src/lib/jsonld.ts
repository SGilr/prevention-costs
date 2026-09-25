import { SITE } from '../site-config';
import { ROWS } from './ledger';

export function datasetLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: SITE.title,
    description:
      'What late intervention costs UK public systems, which preventive interventions have economic evidence, where each sits across the lifecourse and neurodevelopmental windows, and what each returns. Every entry carries a source, price year, design and evidence grade.',
    url: SITE.url,
    version: SITE.version,
    dateModified: SITE.sourcesCheckedISO,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    license: SITE.dataLicence.url,
    creator: { '@type': 'Person', name: 'Stan Gilmour', honorificSuffix: 'KPM FRSA' },
    publisher: { '@type': 'Organization', name: SITE.publisher },
    spatialCoverage: 'United Kingdom',
    variableMeasured: ['Harm cost', 'Intervention return', 'Valuation parameter', 'Forecast', 'Evidence grade'],
    size: `${ROWS.length} entries`,
    citation: ROWS.map((r) => r.url).filter((u, i, a) => a.indexOf(u) === i),
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE.url}/downloads/ledger.json` },
      { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE.url}/downloads/ledger.csv` },
    ],
  };
}
