# Data Queries

Points noticed in `src/data/ledger.json` while building the site, and what Stan Gilmour decided on each. New queries go at the end under **Open**, and any change to the data goes through a pull request with the source checked.

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

## Decided, 27 September 2026

Six Priority 1 sources were read in full against their entries. Page numbers are the printed page numbers.

| Entry | Finding | Decision |
|---|---|---|
| H18 | APPG on ABI and UKABIF (2025): £43.0bn for 2023/24 is NHS and social care £20.0bn, productivity £21.5bn, and justice and education £1.5bn (p.7). Benefits of £1.9bn are "not included in the total costing" because they are transfers (p.9). The model covers traumatic brain injury, stroke and brain tumour, about 85% of ABI episodes (p.9). The total is called both the lifetime costs of ABI in 2023/24 (p.9) and a typical year (p.25). Price bases are mixed: "current prices" (p.32), 2024/25 prices (p.26) and 2024 prices (p.35, note 53). | Value marks benefits as outside the total. Price year `2025` → `2023/24`. Note rewritten. Still excluded from rebasing. |
| H22 | IAS methodology, "2021/22 Local Authority Alcohol Cost Profile Methodology" (p.1). Some components are stated in 2021/22 prices (pp.1–2); the crime costs, the largest component, use Home Office unit costs with no uprating stated (p.2). | Price year `2024` → `not stated`, with the data year in the note. Still excluded from rebasing. |
| H23 | Black (2020), Part One evidence pack: "The total cost of harms related to illicit drug use in England was £19.3 billion for 2017-18" (p.14), from unpublished Public Health England analysis (p.16). No price base is stated there, in the Part One summary or in the Part Two annexes (p.2). | Place `UK` → `England`. Price year `2020/21` → `not stated`, with the cost year in the note. Still excluded from rebasing. |
| H28 | Home Office (2019), horr107: totals headed "for 2016/17" (pp.6, 42). Most components are in 2016/17 prices (pp.14, 26, 32), but the physical and emotional harm, £47.3bn of £66.2bn, uses a life-year value "adjusted to 2017 prices" (p.24). The "≈£85bn in 2024 prices" in the value is in neither this report nor the OSR correspondence. | "(≈£85bn in 2024 prices)" removed. Price year unchanged. Still excluded from rebasing. |
| H35 | IPPR (2024), p.28 and note 9: £11.2bn is IPPR's £4.5bn (the OBR's £5,000 per person applied to a 900,000 rise since 2020), plus the OBR's £3.0bn for in-work ill-health and £3.7bn for indirect effects on other taxes. The OBR (2023, p.7) gives its figures in cash for 2023-24 and puts the rise in benefit spending at £6.8bn. | Note added. Value and price year unchanged. Still excluded from rebasing. |
| H36 | Youth Violence Commission (2020), final report: every cost table is "in GBP and using 2015/16 prices" (pp.55, 57), and the unit costs are "in 2015/16 prices" (p.52). £1.3bn is the "more likely" figure; the minimum, from police-recorded crime only, is £700m (p.42). | Source changed to the Commission's report. Price year `2018/19` → `2015/16`. Value gives the minimum. Rebasing held (see Open). |

### Follow-up decisions, 27 September 2026

| Entry | Finding | Decision |
|---|---|---|
| H36 | With the price year confirmed as 2015/16, the exclusion reason in `rebase.json` ("price year not stated in the source") contradicted the entry. | Reason changed to "not rebased: price year 2015/16, confirmed on 27 September 2026; rebasing awaits sign-off". Rebasing itself stays on hold. |
| H18 | The item read "Acquired brain injury (all causes)", but the model costs traumatic brain injury, stroke and brain tumour only (p.9). | Item changed to "Acquired brain injury (traumatic brain injury, stroke and brain tumour)". |

## Decided, 27 September 2026 (Priority 2)

Three grade D entries checked against their primary sources. Page numbers are the printed page numbers.

| Entry | Finding | Decision |
|---|---|---|
| I31 | Parsonage, Grant and Stubbs (2016), published 1 April 2016: "a one-off cost of IPS support of around £2,700 per client" (pp.5, 34). Savings of £5,125 over 18 months, £20,000 over five years and £32,400 over ten years are, annualised, "within the range £3,000 - £4,000 a year" (p.34). Figures are in "today's prices", not defined; the only stated price base is 2015/16, for another chapter (p.11). | Source changed to the report; grade D → C; value and note revised. Price year stays "not stated". |
| H13 | Daley et al. (2019), *European Psychiatry* 61, 41–48, report in euros from 2010 Danish register data (p.44): €20,135 more per adult with ADHD per year than a same-sex sibling (p.45); for the UK, €19,974m at 2.5% prevalence and €4,361m at 0.5% (Table 4, p.46), described as "crude estimates" (p.45). The £17bn and £17,000 are the NHS England ADHD Taskforce's conversion at an unstated rate, using the higher prevalence. "Avoidable" is the Taskforce's word. | Option A: Taskforce £ figures and headline kept; grade D → C; design, source wording and note revised. |
| I24 | Park, McCrone and Knapp (2016): "Costs were all reported in UK pounds, standardized to 2009 prices" (p.145); £2,087 is reduced lost productivity over years 1 to 3 (Table 3, p.147). "£15 per £1" is not in Park. NHS England's 2023 guidance on the EIP access and waiting time standard repeats it (PDF pp.6, 17) without a citation that could be found. | Option A: note revised. Grade stays D; price year stays "not stated". |

### Follow-up decision, 27 September 2026 (Priority 2)

| Entry | Finding | Decision |
|---|---|---|
| H13 | "Avoidable" in the measure is the Taskforce's framing; Daley et al. measure a cost difference. | Measure kept as "Avoidable economic cost". The note explains the source. |

## Open

| # | Entry | Query |
|---|---|---|
| 1 | H36 | Whether to rebase H36 from 2015/16 to 2025/26 prices. Held by Stan Gilmour on 27 September 2026. |
| 2 | I24 | The primary source for "£15 per £1 over 10 years" is still untraced. |
| 3 | I36 | Draft entry for Kurve kriegen (NRW), from Prognos (2016) with the Kiel impact evaluation (2015) in the note, and its rebasing exclusion in `rebase.json`. Awaiting Stan Gilmour's approval. |
| 4 | I31 | The copy of Parsonage, Grant and Stubbs (2016) served at the I31 link has page numbers one higher than the copy used on 27 September: the passages cited as pp.5, 11 and 34 are on pp.6, 12 and 35. Its back cover gives "Published January 2016". The I31 note's "(p.34)" should read "(p.35)". |
