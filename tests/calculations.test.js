const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)];
const appScript = scripts[scripts.length - 1][1];

const start = appScript.indexOf('const PALETTE');
const end = appScript.indexOf('function renderPots');
if (start < 0 || end < 0) {
  throw new Error('Could not locate calculation script section in index.html');
}

const calculationScript = appScript.slice(start, end);

function createContext(overrides = {}) {
  const elements = {
    coupleToggle: { checked: false },
    inflationToggle: { checked: false },
    annualRate: { value: '5' },
    currentAge: { value: '40' },
    retireAge: { value: '67' },
    partnerAge: { value: '40' },
    partnerRetireAge: { value: '67' },
    salary: { dataset: { raw: '60000' } },
    partnerSalary: { dataset: { raw: '30000' } },
    ...overrides,
  };

  const document = {
    getElementById(id) {
      if (!elements[id]) elements[id] = { value: '', checked: false, dataset: { raw: '0' } };
      return elements[id];
    },
    createElement() {
      return {
        innerHTML: '',
        set textContent(value) {
          this.innerHTML = String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        },
      };
    },
  };

  const context = {
    console,
    document,
    localStorage: { getItem: () => null, setItem: () => {} },
  };

  vm.runInNewContext(calculationScript, context);
  return { context, elements };
}

function run(code, overrides) {
  const { context, elements } = createContext(overrides);
  context.__result = undefined;
  vm.runInNewContext(`__result = (() => { ${code} })();`, context);
  return { result: context.__result, elements };
}

function approx(actual, expected, message, tolerance = 0.01) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${message}: expected ${expected}, got ${actual}`
  );
}

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

test('income tax handles allowance, basic rate, taper, and additional threshold', () => {
  approx(run('return calcIncomeTax(12570);').result, 0, 'personal allowance threshold');
  approx(run('return calcIncomeTax(50270);').result, 7540, 'basic-rate ceiling');
  approx(run('return calcIncomeTax(110000);').result, 33432, 'personal allowance taper');
  approx(run('return calcIncomeTax(125140);').result, 42516, 'fully tapered allowance');
});

test('capital gains tax uses allowance and remaining basic-rate band', () => {
  const basic = run(`
    const cgt = calcCapitalGainsTax(10000, calcIncomeTaxBreakdown(12570));
    return cgt;
  `).result;
  approx(basic.total, 1260, 'basic-rate CGT');
  approx(basic.basicGains, 7000, 'basic-rate gains after allowance');

  const split = run(`
    const cgt = calcCapitalGainsTax(52600, calcIncomeTaxBreakdown(32570));
    return cgt;
  `).result;
  approx(split.basicGains, 17700, 'basic-rate gain slice');
  approx(split.higherGains, 31900, 'higher-rate gain slice');
  approx(split.total, 10842, 'split-rate CGT');
});

test('projectPot compounds monthly with no contributions', () => {
  const projected = run(`
    return projectPot({ type: 'isa', value: 10000, employeeContrib: 0, employerContrib: 0, contribMode: 'pounds', owner: 'you' }, 10, 0.05);
  `).result;
  approx(projected, 16470.09, '10-year monthly compound projection');
});

test('workplace pension percent contributions use salary', () => {
  const monthly = run(`
    return getMonthlyContrib({ type: 'pension', value: 0, employeeContrib: 5, employerContrib: 3, contribMode: 'percent', owner: 'you' });
  `).result;
  approx(monthly, 400, '8% of 60000 divided by 12');
});

test('LISA contributions are capped and bonus stops at age 50', () => {
  const lisa = { type: 'lisa', value: 0, employeeContrib: 500, employerContrib: 0, contribMode: 'pounds', owner: 'you' };
  const result = run(`
    const pot = ${JSON.stringify(lisa)};
    return {
      monthly: getMonthlyContrib(pot),
      bonus: getLisaBonusMonthly(pot),
      years: getLisaContribYears(30, pot),
    };
  `, { currentAge: { value: '45' } }).result;

  approx(result.monthly, 4000 / 12, 'LISA monthly contribution cap');
  approx(result.bonus, 1000 / 12, 'LISA monthly bonus cap');
  approx(result.years, 5, 'LISA contribution years until age 50');
});

test('inflation-linked DB income projects while level DB income stays flat', () => {
  const result = run(`
    return {
      linked: projectDbIncome({ dbIncome: 10000, dbInflationLinked: true }, 10),
      level: projectDbIncome({ dbIncome: 10000, dbInflationLinked: false }, 10),
    };
  `).result;

  approx(result.linked, 12800.85, 'inflation-linked DB');
  approx(result.level, 10000, 'level DB');
});

test('single mode excludes partner pots from calculation set', () => {
  const single = run(`
    pots = [
      { type: 'isa', value: 1000, owner: 'you' },
      { type: 'isa', value: 999999, owner: 'partner' },
    ];
    return getCalculationPots().map(p => p.owner);
  `).result;
  assert.strictEqual(JSON.stringify(single), '["you"]');

  const couple = run(`
    pots = [
      { type: 'isa', value: 1000, owner: 'you' },
      { type: 'isa', value: 999999, owner: 'partner' },
    ];
    return getCalculationPots().map(p => p.owner);
  `, { coupleToggle: { checked: true } }).result;
  assert.strictEqual(JSON.stringify(couple), '["you","partner"]');
});

test('State Pension constant matches current weekly full rate annualised', () => {
  approx(run('return STATE_PENSION;').result, 12547.60, 'State Pension annual amount');
});
