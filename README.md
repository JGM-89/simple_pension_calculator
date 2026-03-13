# Retirement Planner

A free, private retirement planning calculator that runs entirely in your browser.

**[Try it live](https://jgm-89.github.io/simple_pension_calculator/)**

## Features

- **Multiple pot types** — Pensions (with employer/employee contributions), S&S ISAs, Cash ISAs, and Premium Bonds
- **Flexible contributions** — Switch between £/month and % of salary for pensions
- **Growth projections** — Interactive Chart.js graph showing projected pot values to retirement
- **Drawdown vs Annuity** — Compare 4% drawdown and annuity income side by side
- **Dark mode** — Automatically matches your system theme
- **Persistent** — Your data is saved in localStorage and restored on return

## Privacy

All calculations run client-side in your browser. No data is sent to any server. Your settings are stored in your browser's local storage only.

## Assumptions

- Growth rate assumes a broad global equity tracker fund (e.g. FTSE Global All Cap)
- Inflation modelled at 2.5% per year
- State pension at current full rate of £11,500/yr
- Drawdown uses the 4% withdrawal rule
- Annuity rates are illustrative (5% pension, 4% ISA, 3% cash/bonds)
- Premium Bonds use the NS&I prize fund rate as expected return — actual returns are probabilistic
- Tax implications are not modelled

**This tool is for illustration only and does not constitute financial advice.**
