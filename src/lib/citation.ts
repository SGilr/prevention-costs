// CITATION.cff content. Served at /CITATION.cff and kept identical in the repository root,
// where GitHub reads it for its "Cite this repository" button. `npm run validate` fails if
// the two differ; `npm run citation` rewrites the root copy.
import { SITE } from '../site-config';

export function citationCff() {
  return `cff-version: 1.2.0
message: "If you use this ledger, please cite it as below. Cite the original source for any individual figure."
type: dataset
title: "${SITE.title}"
version: "${SITE.version}"
date-released: "${SITE.sourcesCheckedISO}"
url: "${SITE.url}"
repository-code: "${SITE.repo}"
license: CC-BY-4.0
authors:
  - family-names: Gilmour
    given-names: Stan
contact:
  - name: "${SITE.publisher}"
    email: ${SITE.contact}
keywords:
  - prevention
  - early intervention
  - cost of late intervention
  - return on investment
  - lifecourse
  - neurodevelopment
`;
}
