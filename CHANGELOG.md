# Changelog

## 2026-03-13

### New features
- **Monthly income figures** — projected income shown as £/month alongside £/year across all views
- **Contribution breakdown** — each pot card displays employee vs employer contributions separately
- **25% tax-free lump sum toggle** — optionally model taking the 25% pension lump sum, which reduces drawdown income accordingly across summary cards, totals, and income tabs
- **Reset button** — clears all pots, settings, and saved state back to defaults
- **Target income tab** — enter a desired retirement income and see how much extra you need to contribute monthly to reach it
- **Defined benefit pensions** — new pot type for guaranteed annual income (e.g. NHS, Teachers', Civil Service pensions). No pot value or chart line — flows directly into all income calculations. Supports inflation-linked toggle
- **Show total toggle** — optional total line on the growth chart (off by default), inline with the legend

### Fixes
- DB pension add form now shows "Expected annual income (£/yr)" instead of "Current value (£)"
- Lump sum toggle moved away from chart to sit above income tabs where it's contextually relevant
- Lump sum now correctly reduces drawdown figures in summary cards, totals row, and income tabs

## 2026-03-12

### Initial release
- Multi-pot retirement planner supporting Pension, ISA, Cash ISA, and Premium Bonds
- Compound growth projection chart (Chart.js)
- Drawdown, annuity, and comparison income tabs
- State pension included in all income calculations
- Dark mode support via `prefers-color-scheme`
- localStorage persistence
- Single-file static site (no build step, no dependencies beyond Chart.js CDN)
