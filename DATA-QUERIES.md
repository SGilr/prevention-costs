# Data Queries

Points noticed in `src/data/ledger.json` while building the site, and what Stan Gilmour decided on each, 25 September 2026. There are no open queries. New queries go at the end under **Open**, and any change to the data goes through a pull request with the source checked.

## Decided, 25 September 2026

### Source links

| # | Entry | Finding | Decision |
|---|---|---|---|
| 1 | I17 | YEF replaced its pre-court diversion page with separate formal and informal strands. The formal strand now gives −14% reoffending (moderate confidence) and moderate cost. | Entry revised from YEF's formal pre-court diversion page. The old figures are recorded in its note and in `CHANGELOG.md`. |
| 2 | H02 | The link is the NSPCC landing page, not the report. The report is by Pro Bono Economics for the NSPCC and four other charities, and is hosted by the NSPCC. | No change: the NSPCC page is the official landing page. |
| 3 | P01 | The hosted PDF is the 2022 edition, and £70,000 is correct there. The 2026 Green Book no longer states a QALY value. | Note added. Value and source unchanged. |
| 4 | 24 links | These refuse automated checks. All 24 were checked in a browser or through Crossref, and all reach the right source. F01 and F02 had moved; H08 and I02 used ScienceDirect links that block browsers. | F01 and F02 updated to the new addresses; H08 and I02 changed to doi.org links. |

### Wording

| Entry | Finding | Decision |
|---|---|---|
| H19 | The NAO's £318,400 is spend per child, and its residential category is wider than children's homes. | Measure changed to "Spend per child per year", with the NAO definition added to the note. |
| I07 | Bonin et al. give £1,177 per participant. | "Per family" changed to "per participant" in the value, the calculator unit and the who-pays note. |
| I02 | The source had no author. | Changed to "Ullah et al. (2025), Lancet Psychiatry (ROSHNI-2 economic evaluation)". |
| H28 | The source total is £66.2bn, recorded as £66bn, and the three-year caveat is already in the note. | No change. |

### Headlines that are sums

| Entry | Finding | Decision |
|---|---|---|
| H29 | The map headline "£78bn" added the individual and business figures. | Headline changed to "£61bn", the source's figure for crime against individuals. |
| H30 | The map headline "£16–20bn" added the adult and children's ranges. | Headline changed to "£15–18bn", the source's adult range. |

### Calculator

| Entry | Finding | Decision |
|---|---|---|
| I11, I27, I34 | Low and high are different published measures, not the ends of one estimate. | Figures kept. The calculator and entry page now say so (site text in `src/lib/calc-notes.ts`). |
| I26 | The ratio 1.42 is derived (£933 ÷ £659). | Figures kept. It is labelled as derived by Oxon Advisory. |
| I08 | The Exchequer ratio (≈0.89) is derived. | Figures kept. It is labelled as derived by Oxon Advisory. |

### Price years

Every figure rebased to 2025/26 prices had its price year checked against its source. Three year fields were corrected: H01 to 2016/17, H12 to 2023/24 and I05 to 2013. Entries whose source states no price year or mixes price bases (H18, H22, H23, H28, H35, H36) are left out of rebasing, and their year fields are unchanged. H03 ("2014 report") and F07 ("2022; 2025") are left out for the same reason. `REBASE-REVIEW.md` has the detail.

### Other

| Entry | Finding | Decision |
|---|---|---|
| I09 | With no beneficiary recorded, the pages said "No benefit shown in trial", which overstates an "Uncertain" result. | Now reads "Benefit not established". The null UK trials (I05, I18, I19) keep "No benefit shown in trial". |
| Workbook | A separate file, so it can drift from `ledger.json`. | Every change above was made in both. As of 25 September 2026, every Ledger-sheet field matches `ledger.json`. |

## Open

None.
