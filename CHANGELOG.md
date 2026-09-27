# Changelog

## Unreleased

- Data corrections after checking six primary sources, approved by Stan Gilmour on 27 September 2026 (details in DATA-QUERIES.md):
  - H18: the £1.9bn in benefits is marked as outside the £43bn total, as the report states (p.9). Price year `2025` → `2023/24`. The note now gives the model's coverage (traumatic brain injury, stroke and brain tumour), the two descriptions of the total, and the page for the £91.5bn wellbeing cost, which no longer relies on a secondary summary.
  - H22: price year `2024` → `not stated`. The note now gives the 2021/22 data year.
  - H23: place `UK` → `England`; price year `2020/21` → `not stated`. The note now gives the 2017/18 cost year and the unpublished Public Health England analysis behind the figure.
  - H28: "(≈£85bn in 2024 prices)" removed from the value. It is not in the Home Office report or the OSR correspondence.
  - H35: note added on the three parts of the £11.2bn. It is tax revenue only and excludes benefit spending.
  - H36: source changed from the Economics Observatory (2025) to the Youth Violence Commission (2020) final report, with its Warwick repository link. Price year `2018/19` → `2015/16`, the price base of every cost table in the report. The value now includes the £700m minimum. The entry is not yet rebased.
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
