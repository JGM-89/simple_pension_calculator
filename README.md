# Simple Pension Calculator

A free, private UK retirement planning calculator that runs entirely in your browser.

**[simplepensioncalculator.co.uk](https://simplepensioncalculator.co.uk)**

## Features

- **8 pot types** — Pensions, S&S ISAs, GIAs, Cash ISAs, S&S LISAs, Cash LISAs, Premium Bonds, and Defined Benefit pensions
- **Couple mode** — Plan for two people with separate ages, salaries, and pot ownership in dedicated sections
- **Tax modelling** — Estimated income tax (2024/25 bands with personal allowance taper) and CGT on GIA withdrawals, with full band-by-band "show the working" breakdowns
- **LISA government bonus** — 25% bonus on contributions up to £4,000/yr, automatically stops at age 50
- **Defined benefit pensions** — Model guaranteed income from DB schemes (e.g. NHS, Teachers', Civil Service) with optional inflation linking and a service-years helper calculator
- **Flexible contributions** — Switch between £/month and % of salary for pensions; employer and employee contributions shown separately
- **Growth projections** — Interactive chart showing projected pot values to retirement (default 5% nominal return)
- **Income comparison** — Drawdown (4% rule), annuity, and side-by-side comparison tabs with "show the working" breakdowns
- **Inflation toggle** — View income figures in today's money to see real purchasing power
- **PLSA benchmarks** — Retirement Living Standards (Minimum, Moderate, Comfortable) always shown in today's money for an honest comparison
- **25% tax-free lump sum** — Toggle to model taking the pension lump sum, with drawdown recalculated accordingly
- **Target income** — Set a desired retirement income and see how much extra you need to contribute monthly
- **PDF export** — Download a full report with projections, income breakdown, disclaimers, and site branding
- **Dark mode** — Automatically matches your system theme
- **Persistent** — Your data is saved in localStorage and restored on return
- **Blank start** — No assumed age, salary, or pots. Build your own picture from scratch

## Privacy

All calculations run client-side in your browser. No data is sent to any server. No cookies, no tracking, no analytics. Your settings are stored in your browser's local storage only.

## Assumptions

- Default growth rate of 5% assumes a broad global equity tracker fund (e.g. FTSE Global All Cap). This is a nominal return before inflation
- Inflation modelled at 2.5% per year
- State pension shown at current full rate of £11,500/yr, projected forward at 2.5% inflation (triple lock) — no real-terms growth assumed
- Drawdown uses the 4% withdrawal rule
- Annuity rates are illustrative (5% pension, 4% ISA/LISA, 3% cash/bonds) — level (non-escalating), so income erodes with inflation
- Tax estimates use 2024/25 income tax bands and CGT rates; personal allowance taper above £100k is modelled
- GIA withdrawals taxed using £3,000 CGT allowance and 20% higher rate as a conservative estimate
- In couple mode, each person's income is taxed independently
- LISA contributions capped at £4,000/yr with 25% government bonus; bonus stops at age 50
- Premium Bonds use the NS&I prize fund rate as expected return — actual returns are probabilistic
- Defined benefit income is entered manually — check your annual benefit statement for your projected amount
- PLSA benchmarks are for outside London and assume no housing costs (mortgage paid off)

**This tool is for illustration only and does not constitute financial advice.**

## Contact

Bugs or questions: [blurt_bonded370@simplelogin.com](mailto:blurt_bonded370@simplelogin.com)

## License

GPL-3.0 — see [LICENSE](LICENSE) for details.
