# Changelog

## v1.2.4 (27 September 2026)

- New entry H37, language impairment among children in custody, approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md): 47% significantly below average in an aspect of language and 28% impaired among 93 males aged 15–18 in a young offender institution in England; 7 of the 26 with an impairment had received speech and language therapy. Source: Hughes et al. (2017), JCPP. Grade B. Excluded from rebasing (prevalence). Row added to the workbook.

## v1.2.3 (27 September 2026)

- New entries approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md):
  - I37, Nuffield Early Language Intervention (NELI), Reception: teacher-rated behavioural adjustment d = 0.23 and language skills 0.26 (0.17, 0.35) in a 193-school cluster RCT; £58 per pupil per year over three years for materials and training, excluding staff time; grade A; result "Effective, cost unclear". Sources: West et al. (2022); Dimova et al. (2020).
  - I38, Talk of the Town (whole-school speech, language and communication support): no effect on reading comprehension or oral language in a 64-school cluster RCT; £50.97 per pupil per year; grade A; result "No effect in UK trial". Source: Thurston, Roseth and O'Hare (2016).
  - Both excluded from rebasing (price year not stated).
  - Known gaps: added "The youth justice study of speech and language therapy reviewed for the ledger (Gregory and Bryan, 2011) measures language, not offending or costs."
  - Rows and the gap added to the workbook.

## v1.2.2 (27 September 2026)

- Changes approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md):
  - I24: the source of "£15 per £1" traced to Knapp et al. (2014), Investing in recovery (Rethink Mental Illness), p.10. Value now reads "At least £15 per £1 over 10 years"; grade D → C; design, source and link (LSE Research Online) updated; the note gives the 2012/13-price savings behind it and says the ratio's calculation is not shown.
  - P01: paragraph reference corrected from A1.63 to A1.64 (Green Book 2022, p.87). The note now records that the 2026 Green Book's link to supplementary guidance on health leads to a 2013 page with no current QALY value.
  - The same cells updated in the workbook, including the Parameters sheet's P01 reference.

## v1.2.1 (27 September 2026)

- H36 rebased: £1.3bn (2015/16 prices) is also shown as £1.8bn in 2025/26 prices, labelled as an Oxon Advisory calculation (HM Treasury GDP deflator, 2015/16 index 72.09). Signed off by Stan Gilmour on 27 September 2026. 21 entries are now rebased and 67 are not.

## v1.2.0 (27 September 2026)

- New entry I36, Kurve kriegen (police-led early intervention, North Rhine-Westphalia): €3.23 net benefit per €1 in Prognos's cautious scenario, €10.55 in its optimistic one; grade C; result "Uncertain" because the University of Kiel's quasi-experimental impact evaluation (2015) found no fall in participants' recorded offending relative to a comparison group. Excluded from rebasing (ratio; euro figures). Row added to the workbook. Approved by Stan Gilmour on 27 September 2026.
- Known gaps: added "No economic evaluation with a comparison group of police-identified early intervention for children on the Kurve kriegen model; the German return is modelled from before-and-after data." (method page and workbook).
- I31: page reference in the note corrected from p.34 to p.35, to match the copy of the report at the I31 link.

## v1.1.0 (27 September 2026)

- Sources checked 27 September 2026: all 85 source links reach their source (63 automatically, 13 through Crossref, 9 in a browser), and nine entries were read against their primary sources. The date is updated on the site, in `CITATION.cff` and in the workbook.
- The method page now gives the date the HM Treasury deflators were downloaded (25 September 2026), not the date sources were checked.

- Data corrections after checking six primary sources, approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md):
  - H18: the £1.9bn in benefits is marked as outside the £43bn total, as the report states (p.9). Price year `2025` → `2023/24`. The note now gives the model's coverage (traumatic brain injury, stroke and brain tumour), the two descriptions of the total, and the page for the £91.5bn wellbeing cost, which no longer relies on a secondary summary.
  - H22: price year `2024` → `not stated`. The note now gives the 2021/22 data year.
  - H23: place `UK` → `England`; price year `2020/21` → `not stated`. The note now gives the 2017/18 cost year and the unpublished Public Health England analysis behind the figure.
  - H28: "(≈£85bn in 2024 prices)" removed from the value. It is not in the Home Office report or the OSR correspondence.
  - H35: note added on the three parts of the £11.2bn. It is tax revenue only and excludes benefit spending.
  - H36: source changed from the Economics Observatory (2025) to the Youth Violence Commission (2020) final report, with its Warwick repository link. Price year `2018/19` → `2015/16`, the price base of every cost table in the report. The value now includes the £700m minimum. The entry is not yet rebased.
  - H18 item "Acquired brain injury (all causes)" → "Acquired brain injury (traumatic brain injury, stroke and brain tumour)".
  - H36 reason for not rebasing in `rebase.json` changed to "price year 2015/16, confirmed on 27 September 2026; rebasing awaits sign-off", approved by Stan Gilmour on 27 September 2026.
  - The same cells updated in the workbook.
- Data corrections after checking three Priority 2 sources (grade D entries), approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md):
  - I31: source changed from Centre for Mental Health Briefing 59 (2022) to Parsonage, Grant and Stubbs (2016), the primary report. Grade D → C; design "Secondary citation of Parsonage et al. (2016)" → "Charity economic analysis". Value now reads "£2,700 per person (one-off); about £3,000 a year saved in mental health service use". Note added on how the £3,000 is derived.
  - H13: grade D → C; design "Secondary citation" → "Danish registry sibling comparison, scaled to the UK adult population"; source now says the Taskforce converts Daley et al. (2019). The note gives Daley's euro figures, the lower estimate at 0.5% prevalence and the paper's caveat.
  - I24: note gives the 2009 price base of the Park et al. figures and says the source of £15 per £1 is still untraced. Grade stays D.
  - The same cells updated in the workbook.

## v1.0.0 (25 September 2026)

- First release of the site, generated from the ledger approved on 25 September 2026.
- 87 entries: 36 harm costs, 35 interventions, 7 valuation parameters and 9 forecasts.
- Sources checked 25 September 2026.
- Pages: home, lifecourse map, filterable ledger, one page per entry, who pays, values, scenario calculator, method, downloads and about.
- Downloads: `ledger.json`, `ledger.csv`, the Excel workbook and `CITATION.cff` (also in the repository root).
- Launched on https://returns.howpreventionworks.com, open to search engines, with cookieless Cloudflare Web Analytics. `prevention-costs.pages.dev` redirects to it.
- The brain injury review credit for Huw Williams is held back until the review is confirmed.
- Data corrections, approved by Stan Gilmour on 25 September 2026: H01 price year `2016` → `2016/17` (EIF report p.13: "£16.6bn (2016‐17 prices)"); H12 price year `2024` → `2023/24` (IPPR report, footnote 23: "a 'present value' in 2023/24 prices"). I05 price year `2012/13` → `2013` (Corbacho et al., accepted manuscript: "expressed in UK pounds sterling (2013 GBP)"). The same cells updated in the workbook.
- Data changes from the query review, approved by Stan Gilmour on 25 September 2026 (details in DATA-QUERIES.md):
  - I17 revised from YEF's current "Formal pre-court diversion" strand. It was: "Pre-court diversion", −13% reoffending (high confidence), low cost, result "Effective, low cost", place "Mostly US".
  - H29 headline `£78bn` → `£61bn`; H30 headline `£16–20bn` → `£15–18bn` (source figures instead of sums).
  - H19 measure "Unit cost per year" → "Spend per child per year", with the NAO definition added to the note.
  - I07 "per family" → "per participant" (value, calculator unit, who-pays note).
  - I02 source now names the first author (Ullah et al.).
  - P01 note on the 2026 Green Book.
  - URLs: F01 and F02 (moved pages), H08 and I02 (doi.org links).
  - The same changes made in the workbook.
- HM Treasury GDP deflators (June 2026 Quarterly National Accounts) added for rebasing to 2025/26 prices. Rebasing to 2025/26 prices signed off by Stan Gilmour KPM FRSA on 25 September 2026: 20 entries show a second figure, labelled as an Oxon Advisory calculation; 67 show why they are not rebased.
