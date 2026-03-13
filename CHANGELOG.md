# Changelog

## 2026-03-13 (v2)

### New features
- **GIA (General Investment Account)** — new pot type for investments outside tax wrappers, with CGT modelling on withdrawals
- **Tax modelling** — estimated income tax (2024/25 bands, personal allowance taper above £100k) and CGT on GIA gains shown across all income tabs
- **Couple mode** — toggle to plan for two people with separate ages, retirement ages, salaries, and pot ownership. Each person taxed independently
- **Inflation toggle** — view all figures in today's money to see real purchasing power, with tooltip explaining what this means
- **PLSA benchmarks** — Retirement Living Standards (Minimum, Moderate, Comfortable) shown as a visual bar beneath income totals, with single/couple figures
- **DB pension helper** — collapsible service-years calculator to estimate DB income from salary, accrual rate, and years of service
- **"Show the working" sections** — expandable breakdowns on drawdown, annuity, and compare tabs explaining every calculation step
- **Honest annuity comparison** — compare tab now includes a warning about annuity income eroding with inflation, pro/con lists, and detailed explanation of why year-1 comparisons are misleading

### Improvements
- Pot owner badges now show ⇄ icon to indicate clickability, with purple highlight for partner-owned pots
- Compare tab shows pros and cons for each strategy, not just raw numbers
- PDF disclaimers updated to reflect tax modelling, GIA CGT, couple mode, and annuity inflation erosion
- Default age placeholder changed from 30 to 18

### Fixes
- Employer contribution display now updates immediately when changed (was stale until full re-render)
- Old localStorage data with `contribMode: "fixed"` or missing `employeeContrib` no longer causes NaN values
- Partner salary correctly used for percent-mode contributions on partner-owned pots

## 2026-03-13

### New features
- **S&S LISA and Cash LISA** — new pot types with 25% government bonus on contributions (capped at £4,000/yr), bonus stops at age 50
- **Defined benefit pensions** — guaranteed annual income pot type (e.g. NHS, Teachers', Civil Service). No pot value or chart line — flows directly into all income calculations. Supports inflation-linked toggle
- **25% tax-free lump sum toggle** — optionally model taking the 25% pension lump sum, which reduces drawdown income across summary cards, totals, and income tabs
- **Target income tab** — enter a desired retirement income and see how much extra you need to contribute monthly to reach it
- **Monthly income figures** — projected income shown as £/month alongside £/year across all views
- **Contribution breakdown** — each pot card displays employee vs employer contributions separately
- **Show total toggle** — optional total line on the growth chart (off by default), inline with the legend
- **Reset button** — clears all pots, settings, and saved state back to defaults
- **Empty start** — page loads with no pots, no assumed age or salary. Users build their own picture from scratch

### Improvements
- Retirement age slider now ranges from current age to 100 (was 57–70), default changed to 67
- ISA renamed to S&S ISA throughout the app
- All pots can be removed (no forced minimum of one pot)
- Lump sum toggle moved from chart area to above income tabs where it's contextually relevant
- Toggling lump sum no longer causes layout shifts — elements stay in place using visibility

### Fixes
- DB pension add form now shows "Expected annual income (£/yr)" instead of "Current value (£)"
- Lump sum now correctly reduces drawdown figures in summary cards, totals row, and income tabs
- Target income input no longer loses focus after typing one character
- Salary/target inputs no longer jump on hover (removed padding change on hover/focus)

## 2026-03-12

### Initial release
- Multi-pot retirement planner supporting Pension, S&S ISA, Cash ISA, and Premium Bonds
- Compound growth projection chart (Chart.js)
- Drawdown, annuity, and comparison income tabs
- State pension included in all income calculations
- Dark mode support via `prefers-color-scheme`
- localStorage persistence
- Single-file static site (no build step, no dependencies beyond Chart.js CDN)
