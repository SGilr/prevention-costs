# Data Queries

Things noticed in `src/data/ledger.json` while building the site, 25 September 2026. None has been changed. Each needs a decision from Stan Gilmour, and any change goes through a pull request with the source checked.

## Source links

1. **I17, pre-court diversion.** `https://youthendowmentfund.org.uk/toolkit/pre-court-diversion/` returns 404, including to a browser-like request. The YEF Toolkit may have moved or renamed the page.
2. **H02, children's services spend.** The source is Horton and Franklin (2026), *Rebalancing the system*, Pro Bono Economics, but the URL is the NSPCC Learning page on children's services spending reports. The link may be a deliberate route to the report; if not, it should point to the report itself.
3. **P01, value of a QALY.** The source cites the Green Book (2022), Annex 1, para A1.63, but the URL is a hosted copy whose path suggests the 2020 edition (`ohe.org/wp-content/uploads/2020/08/The_Green_Book.pdf`). Worth confirming that the paragraph and value match the edition linked.
4. **Links that refuse automated checks.** 24 source links, from publishers including Wiley, Elsevier, JAMA, NEJM, the Health Foundation, IFS and UK Parliament, return 403 to scripts. The weekly check lists these separately rather than as broken. They have not been checked by hand in this build.

## Headlines that are sums

5. **H29, crime.** The map headline is "£78bn", the sum of £61bn (individuals) and £17bn (businesses). The sum does not appear in the value text. It is a within-entry sum, so it does not break the "never sum harm costs" rule, but it presents an Oxon Advisory addition as if it were the source's figure.
6. **H30, reoffending.** The headline "£16–20bn" adds the adult range (£15.0–18.3bn) to the children's range (£1.3–1.6bn) and rounds. The same point as H29 applies.

## Calculator ratios

7. **I11, KiVa.** The calculator range 1.58 to 5.58 joins a four-year return (£1.58 per £1) with estimates that include wage effects at age 18 (£3.97–£5.58). The horizon label says so, but "low" and "high" are different measures, not the ends of one range.
8. **I27, drug and alcohol treatment.** The range 4 to 21 joins the drugs one-year return (£4) with the drugs ten-year return (£21). The alcohol figures (£3 and £26) are not used.
9. **I34, public health interventions.** The range 4.1 to 27.2 uses the local and national medians. The entry's own note says these are "medians, not predictions for any one programme".
10. **I26, Liaison and Diversion.** The ratio 1.4157814871016692 is derived (£933 ÷ £659) and displays as "1.42 per £1". The source reports costs and savings, not a ratio. The figure is arithmetically faithful, but the calculator shows a ratio the source did not publish.
11. **I08, Sure Start.** The perspective "Total (Exchequer ≈0.89)" contains a derived figure (£2.4bn ÷ £2.7bn) that is not in the source text.

## Price years

12. **Publication year or price year.** Several `year` values may be publication years rather than price years: H01 (2016), H12 (2024), H18 (2025), H22 (2024), H25 (2023), H26 (2023) and I35 (2025). For example, EIF's 2016 analysis may report costs at an earlier price base. `rebase.json` reads each `year` as the price year, so each of these should be confirmed against the source before sign-off.
13. **H03.** The year field reads "2014 report", which is a publication date, not a price year. It is left out of rebasing.
14. **F07.** The year field holds two years ("2022; 2025"), for the forecast and the outturn. This is correct for the entry, but the field has no single price year.

## Other

15. **Blank beneficiaries.** I05, I09, I18 and I19 have an empty `beneficiary`. The prototype displays these as "No benefit shown in trial". That fits the three null UK trials (I05, I18, I19), but I09 (PACT) has the result "Uncertain", and the label may overstate what its trial showed.
16. **Workbook.** `prevention-returns-ledger.xlsx` was not among the seed files moved from Downloads. The downloads page says the workbook "will be added here shortly" until it is placed at `public/downloads/prevention-returns-ledger.xlsx`. Once supplied, it should be checked against `ledger.json` so the two do not disagree.
