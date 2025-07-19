export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export interface SipCalculationParams {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  stepUpEnabled: boolean;
  stepUpPercentage: number;
  considerInflation: boolean;
  inflationRate: number;
}

export interface SipCalculationResult {
  maturityValue: number;
  totalInvestment: number;
  totalReturns: number;
  inflationAdjustedMaturity: number;
  inflationAdjustedReturns: number;
  chartData: Array<{
    year: number;
    investment: number;
    returns: number;
    total: number;
  }>;
}

export function calculateSip(params: SipCalculationParams): SipCalculationResult {
  const {
    monthlyInvestment,
    expectedReturn,
    timePeriod,
    stepUpEnabled,
    stepUpPercentage,
    considerInflation,
    inflationRate,
  } = params;

  const monthlyRate = expectedReturn / 12 / 100;
  let totalInvestment = 0;
  let maturityValue = 0;
  let currentMonthly = monthlyInvestment;
  let monthCounter = 0;
  const chartData = [];

  for (let year = 1; year <= timePeriod; year++) {
    let yearInvestment = 0;
    for (let m = 1; m <= 12; m++) {
      monthCounter++;
      if (stepUpEnabled && m === 1 && year > 1) {
        currentMonthly = currentMonthly * (1 + stepUpPercentage / 100);
      }
      maturityValue = (maturityValue + currentMonthly) * (1 + monthlyRate);
      yearInvestment += currentMonthly;
    }
    totalInvestment += yearInvestment;
    chartData.push({
      year,
      investment: totalInvestment,
      returns: maturityValue - totalInvestment,
      total: maturityValue,
    });
  }

  const totalReturns = maturityValue - totalInvestment;

  let inflationAdjustedMaturity = maturityValue;
  let inflationAdjustedReturns = totalReturns;
  if (considerInflation) {
    inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
    inflationAdjustedReturns = inflationAdjustedMaturity - totalInvestment;
  }

  return {
    maturityValue,
    totalInvestment,
    totalReturns,
    inflationAdjustedMaturity,
    inflationAdjustedReturns,
    chartData,
  };
}

export interface FdCalculationParams {
  principal: number;
  interestRate: number;
  timePeriod: number;
  considerInflation: boolean;
  inflationRate: number;
}

export interface FdCalculationResult {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  interestRate: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
    inflationAdjusted?: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
  }>;
}

export function calculateFd(params: FdCalculationParams): FdCalculationResult {
  const { principal, interestRate, timePeriod, considerInflation, inflationRate } = params;
  const quarterlyRate = interestRate / 100 / 4;
  const totalQuarters = timePeriod * 4;
  const maturityValue = principal * Math.pow(1 + quarterlyRate, totalQuarters);
  const totalInterest = maturityValue - principal;

  const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
    const year = i;
    const quarters = year * 4;
    const value = principal * Math.pow(1 + quarterlyRate, quarters);
    const interest = value - principal;
    const inflationAdjusted = considerInflation
      ? value / Math.pow(1 + inflationRate / 100, year)
      : undefined;
    return {
      year,
      investment: principal,
      interest,
      total: value,
      inflationAdjusted,
    };
  });

  const yearlyBreakdown = Array.from({ length: timePeriod }, (_, i) => {
    const year = i + 1;
    const quarters = year * 4;
    const investment = principal;
    const total = principal * Math.pow(1 + quarterlyRate, quarters);
    const interest = total - investment;
    return {
      year,
      investment,
      interest,
      total,
    };
  });

  return {
    maturityValue,
    totalInterest,
    totalInvestment: principal,
    interestRate,
    inflationAdjustedMaturity: considerInflation
      ? maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)
      : undefined,
    inflationAdjustedReturns: considerInflation
      ? (maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)) - principal
      : undefined,
    chartData,
    yearlyBreakdown,
  };
}

export interface RdCalculationParams {
  monthlyInstallment: number;
  interestRate: number;
  timePeriod: number;
  considerInflation: boolean;
  inflationRate: number;
}

export interface RdCalculationResult {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    value: number;
    inflationAdjusted?: number;
  }>;
}

export function calculateRd(params: RdCalculationParams): RdCalculationResult {
  const { monthlyInstallment, interestRate, timePeriod, considerInflation, inflationRate } = params;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = timePeriod * 12;
  const maturityValue = monthlyInstallment * (Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate * (1 + monthlyInterestRate);
  const totalInvestment = monthlyInstallment * totalMonths;
  const totalInterest = maturityValue - totalInvestment;

  const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
    const year = i;
    const monthsInYear = year * 12;
    const value = monthlyInstallment * (Math.pow(1 + monthlyInterestRate, monthsInYear) - 1) / monthlyInterestRate * (1 + monthlyInterestRate);
    const investment = monthlyInstallment * monthsInYear;
    const inflationAdjusted = considerInflation
      ? value / Math.pow(1 + inflationRate / 100, year)
      : undefined;
    return {
      year,
      investment,
      value,
      inflationAdjusted,
    };
  });

  return {
    maturityValue,
    totalInterest,
    totalInvestment,
    inflationAdjustedMaturity: considerInflation
      ? maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)
      : undefined,
    inflationAdjustedReturns: considerInflation
      ? (maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)) - totalInvestment
      : undefined,
    chartData,
  };
}

export interface PpfCalculationParams {
  yearlyInvestment: number;
  interestRate: number;
  tenure: number;
  considerInflation: boolean;
  inflationRate: number;
}

export interface PpfCalculationResult {
  maturityValue: number;
  totalInvestment: number;
  totalInterest: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    value: number;
    inflationAdjusted?: number;
  }>;
}

export function calculatePpf(params: PpfCalculationParams): PpfCalculationResult {
  const { yearlyInvestment, interestRate, tenure, considerInflation, inflationRate } = params;
  let balance = 0;
  const chartData = [];

  for (let year = 0; year <= tenure; year++) {
    const yearlyInterest = balance * (interestRate / 100);
    balance += yearlyInvestment + yearlyInterest;
    if (year > 0) {
      chartData.push({
        year,
        investment: yearlyInvestment * year,
        interest: balance - (yearlyInvestment * year),
        value: balance,
        inflationAdjusted: considerInflation
          ? balance / Math.pow(1 + inflationRate / 100, year)
          : undefined,
      });
    }
  }

  return {
    maturityValue: balance,
    totalInvestment: yearlyInvestment * tenure,
    totalInterest: balance - (yearlyInvestment * tenure),
    chartData,
  };
}

export interface MutualFundCalculationParams {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  considerInflation?: boolean;
  inflationRate?: number;
}

export interface MutualFundCalculationResult {
  totalInvestment: number;
  totalReturns: number;
  maturityValue: number;
  absoluteReturns: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    returns: number;
    total: number;
    inflationAdjusted?: number;
  }>;
}

export function calculateMutualFund(params: MutualFundCalculationParams): MutualFundCalculationResult {
  const { monthlyInvestment, expectedReturn, timePeriod, considerInflation, inflationRate } = params;
  const monthlyRate = expectedReturn / 12 / 100;
  const months = timePeriod * 12;
  const totalInvestment = monthlyInvestment * months;
  let maturityValue = 0;
  const chartData = [];
  for (let year = 1; year <= timePeriod; year++) {
    let yearInvestment = 0;
    for (let m = 1; m <= 12; m++) {
      maturityValue = (maturityValue + monthlyInvestment) * (1 + monthlyRate);
      yearInvestment += monthlyInvestment;
    }
    let inflationAdjusted = undefined;
    if (considerInflation && inflationRate !== undefined) {
      inflationAdjusted = maturityValue / Math.pow(1 + inflationRate / 100, year);
    }
    chartData.push({
      year,
      investment: yearInvestment,
      returns: maturityValue - (yearInvestment + (year - 1) * monthlyInvestment * 12),
      total: maturityValue,
      inflationAdjusted,
    });
  }
  const totalReturns = maturityValue - totalInvestment;
  const absoluteReturns = (totalReturns / totalInvestment) * 100;
  let inflationAdjustedMaturity = undefined;
  let inflationAdjustedReturns = undefined;
  if (considerInflation && inflationRate !== undefined) {
    inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
    inflationAdjustedReturns = inflationAdjustedMaturity - totalInvestment;
  }
  return {
    totalInvestment,
    totalReturns,
    maturityValue,
    absoluteReturns,
    inflationAdjustedMaturity,
    inflationAdjustedReturns,
    chartData,
  };
}

export interface CompoundCalculationParams {
  principal: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
  considerInflation?: boolean;
  inflationRate?: number;
}

export interface CompoundCalculationResult {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
    inflationAdjusted?: number;
  }>;
}

export function calculateCompound(params: CompoundCalculationParams): CompoundCalculationResult {
  const { principal, interestRate, timePeriod, compoundingFrequency, considerInflation, inflationRate } = params;
  const ratePerPeriod = interestRate / 100 / compoundingFrequency;
  const numberOfPeriods = timePeriod * compoundingFrequency;
  const maturityValue = principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
  const totalInterest = maturityValue - principal;
  const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
    const year = i;
    const periods = year * compoundingFrequency;
    const value = principal * Math.pow(1 + ratePerPeriod, periods);
    const interest = value - principal;
    let inflationAdjusted = undefined;
    if (considerInflation && inflationRate !== undefined) {
      inflationAdjusted = value / Math.pow(1 + inflationRate / 100, year);
    }
    return {
      year,
      investment: principal,
      interest,
      total: value,
      inflationAdjusted,
    };
  });
  let inflationAdjustedMaturity = undefined;
  let inflationAdjustedReturns = undefined;
  if (considerInflation && inflationRate !== undefined) {
    inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
    inflationAdjustedReturns = inflationAdjustedMaturity - principal;
  }
  return {
    maturityValue,
    totalInterest,
    totalInvestment: principal,
    inflationAdjustedMaturity,
    inflationAdjustedReturns,
    chartData,
  };
}

export interface InvestmentCalculationParams {
  investmentType: 'lumpsum' | 'sip';
  principal: number; // for lumpsum
  monthlyInvestment: number; // for sip
  expectedReturn: number;
  timePeriod: number;
  considerInflation: boolean;
  inflationRate: number;
}

export interface InvestmentCalculationResult {
  totalInvestment: number;
  totalReturns: number;
  maturityValue: number;
  absoluteReturns: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    returns: number;
    total: number;
    inflationAdjusted?: number;
  }>;
}

export function calculateInvestment(params: InvestmentCalculationParams): InvestmentCalculationResult {
  const {
    investmentType,
    principal,
    monthlyInvestment,
    expectedReturn,
    timePeriod,
    considerInflation,
    inflationRate,
  } = params;

  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = timePeriod * 12;
  let totalInvestment = 0;
  let maturityValue = 0;
  let chartData: InvestmentCalculationResult['chartData'] = [];

  if (investmentType === 'lumpsum') {
    totalInvestment = principal;
    maturityValue = principal * Math.pow(1 + monthlyRate, totalMonths);
    chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const months = year * 12;
      const total = principal * Math.pow(1 + monthlyRate, months);
      const returns = total - principal;
      const inflationAdjusted = considerInflation
        ? total / Math.pow(1 + inflationRate / 100, year)
        : undefined;
      return {
        year,
        investment: principal,
        returns,
        total,
        inflationAdjusted,
      };
    });
  } else {
    totalInvestment = monthlyInvestment * totalMonths;
    let runningMaturity = 0;
    chartData = [];
    for (let year = 0; year <= timePeriod; year++) {
      const months = year * 12;
      let total = 0;
      if (months === 0) {
        total = 0;
      } else {
        total = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      }
      const investment = monthlyInvestment * months;
      const returns = total - investment;
      const inflationAdjusted = considerInflation
        ? total / Math.pow(1 + inflationRate / 100, year)
        : undefined;
      chartData.push({
        year,
        investment,
        returns,
        total,
        inflationAdjusted,
      });
      if (year === timePeriod) {
        maturityValue = total;
      }
    }
  }

  const totalReturns = maturityValue - totalInvestment;
  const absoluteReturns = totalInvestment > 0 ? (totalReturns / totalInvestment) * 100 : 0;
  let inflationAdjustedMaturity = undefined;
  let inflationAdjustedReturns = undefined;
  if (considerInflation) {
    inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
    inflationAdjustedReturns = inflationAdjustedMaturity - totalInvestment;
  }

  return {
    totalInvestment,
    totalReturns,
    maturityValue,
    absoluteReturns,
    inflationAdjustedMaturity,
    inflationAdjustedReturns,
    chartData,
  };
}

export interface RetirementCalculationParams {
  currentAge: number;
  retirementAge: number;
  monthlyExpenses: number;
  inflationRate: number;
  expectedReturn: number;
  lifeExpectancy: number;
}

export interface RetirementCalculationResult {
  corpusNeeded: number;
  monthlyInvestment: number;
  totalInvestment: number;
  totalReturns: number;
  chartData: Array<{
    year: number;
    corpus: number;
    investment: number;
    returns: number;
    total: number;
  }>;
}

export function calculateRetirement(params: RetirementCalculationParams): RetirementCalculationResult {
  const {
    currentAge,
    retirementAge,
    monthlyExpenses,
    inflationRate,
    expectedReturn,
    lifeExpectancy,
  } = params;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Calculate monthly expenses at retirement considering inflation
  const monthlyExpensesAtRetirement = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const yearlyExpensesAtRetirement = monthlyExpensesAtRetirement * 12;

  // Calculate corpus needed at retirement
  const corpusNeeded = yearlyExpensesAtRetirement * (1 - Math.pow(1 + inflationRate / 100, yearsInRetirement)) / (1 - (1 + inflationRate / 100));

  // Calculate monthly investment needed
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;
  const monthlyInvestment = corpusNeeded / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

  // Generate chart data
  const chartData = Array.from({ length: yearsToRetirement + 1 }, (_, i) => {
    const year = i;
    const investment = monthlyInvestment * 12 * year;
    const returns = investment * (expectedReturn / 100 / 12);
    const total = investment + returns;
    return {
      year,
      corpus: total,
      investment,
      returns,
      total,
    };
  });

  return {
    corpusNeeded,
    monthlyInvestment,
    totalInvestment: monthlyInvestment * totalMonths,
    totalReturns: corpusNeeded - (monthlyInvestment * totalMonths),
    chartData,
  };
}

export interface NpsCalculationParams {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
  annuityReturn: number;
}

export interface NpsCalculationResult {
  corpusAtRetirement: number;
  totalContribution: number;
  totalInterest: number;
  monthlyPension: number;
  chartData: Array<{
    year: number;
    contribution: number;
    corpus: number;
    totalInterest: number;
  }>;
}

export function calculateNps(params: NpsCalculationParams): NpsCalculationResult {
  const { monthlyInvestment, expectedReturn, timePeriod, annuityReturn } = params;
  const totalMonths = timePeriod * 12;
  const monthlyRate = expectedReturn / 100 / 12;

  // Calculate corpus at retirement
  const corpusAtRetirement = monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const totalContribution = monthlyInvestment * totalMonths;
  const totalInterest = corpusAtRetirement - totalContribution;

  // Calculate monthly pension (assuming 40% of corpus is used for annuity)
  const annuityCorpus = corpusAtRetirement * 0.4;
  const monthlyPension = annuityCorpus * annuityReturn / 100 / 12;

  // Generate chart data
  const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
    const year = i;
    const months = year * 12;
    const corpus = monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const contribution = monthlyInvestment * months;
    const totalInterest = corpus - contribution;
    return {
      year,
      contribution,
      corpus,
      totalInterest,
    };
  });

  return {
    corpusAtRetirement,
    totalContribution,
    totalInterest,
    monthlyPension,
    chartData,
  };
}

export interface HraCalculationParams {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  metroCity: boolean;
}

export interface HraCalculationResult {
  hraExemption: number;
  taxableHRA: number;
  totalHRA: number;
  chartData: Array<{
    component: string;
    amount: number;
  }>;
}

export function calculateHra(params: HraCalculationParams): HraCalculationResult {
  const { basicSalary, hraReceived, rentPaid, metroCity } = params;
  // Calculate HRA exemption based on the three rules
  const rule1 = hraReceived;
  const rule2 = rentPaid - (0.1 * basicSalary);
  const rule3 = metroCity ? 0.5 * basicSalary : 0.4 * basicSalary;
  // HRA exemption is the minimum of the three rules
  const hraExemption = Math.max(0, Math.min(rule1, rule2, rule3));
  const taxableHRA = hraReceived - hraExemption;
  // Generate chart data
  const chartData = [
    { component: 'HRA Received', amount: hraReceived },
    { component: 'HRA Exemption', amount: hraExemption },
    { component: 'Taxable HRA', amount: taxableHRA },
  ];
  return {
    hraExemption,
    taxableHRA,
    totalHRA: hraReceived,
    chartData,
  };
}

export interface EmiCalculationParams {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface EmiCalculationResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principalComponent: number;
    interestComponent: number;
    outstandingBalance: number;
  }>;
}

export function calculateEmi(params: EmiCalculationParams): EmiCalculationResult {
  const { loanAmount, interestRate, loanTerm } = params;
  const principal = loanAmount;
  const annualInterestRate = interestRate;
  const years = loanTerm;

  if (principal === 0 || annualInterestRate === 0 || years === 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
      amortizationSchedule: [],
    };
  }

  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;

  const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalPay = emi * numberOfPayments;
  const totalInt = totalPay - principal;

  // Generate amortization schedule
  const schedule = [];
  let outstandingBalance = principal;
  for (let i = 1; i <= numberOfPayments; i++) {
    const interestComponent = outstandingBalance * monthlyInterestRate;
    const principalComponent = emi - interestComponent;
    outstandingBalance -= principalComponent;
    schedule.push({
      month: i,
      emi: emi,
      principalComponent: principalComponent,
      interestComponent: interestComponent,
      outstandingBalance: outstandingBalance,
    });
  }

  return {
    monthlyEmi: emi,
    totalInterest: totalInt,
    totalPayment: totalPay,
    amortizationSchedule: schedule,
  };
}

export interface GstCalculationParams {
  amount: number;
  gstRate: number;
  isInterState: boolean;
}

export interface GstCalculationResult {
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  totalAmount: number;
  chartData: Array<{
    component: string;
    amount: number;
  }>;
}

export function calculateGst(params: GstCalculationParams): GstCalculationResult {
  const { amount, gstRate, isInterState } = params;
  const gstAmount = (amount * gstRate) / 100;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  if (isInterState) {
    igst = gstAmount;
  } else {
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  }
  const totalAmount = amount + gstAmount;
  const chartData = [
    { component: 'Base Amount', amount: amount },
    { component: 'CGST', amount: cgst },
    { component: 'SGST', amount: sgst },
    { component: 'IGST', amount: igst },
  ];
  return {
    cgst,
    sgst,
    igst,
    totalGST: gstAmount,
    totalAmount,
    chartData,
  };
}

export interface IncomeTaxCalculationParams {
  income: number;
  regime: 'new' | 'old';
  deductions: number;
}

export interface IncomeTaxCalculationResult {
  totalIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveTaxRate: number;
  taxBreakdown: Array<{
    slab: string;
    taxableAmount: number;
    taxAmount: number;
  }>;
}

export function calculateIncomeTax(params: IncomeTaxCalculationParams): IncomeTaxCalculationResult {
  const { income, regime, deductions } = params;
  // FY 2025-26 slabs and rules
  const newRegimeSlabs: { min: number; max: number; rate: number }[] = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400001, max: 800000, rate: 5 },
    { min: 800001, max: 1200000, rate: 10 },
    { min: 1200001, max: 1600000, rate: 15 },
    { min: 1600001, max: 2000000, rate: 20 },
    { min: 2000001, max: 2400000, rate: 25 },
    { min: 2400001, max: Infinity, rate: 30 },
  ];
  const oldRegimeSlabs: { min: number; max: number; rate: number }[] = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250001, max: 500000, rate: 5 },
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: Infinity, rate: 30 },
  ];
  // Standard deduction
  const stdDeduction = regime === 'new' ? 75000 : 50000;
  // Only allow deductions in old regime
  const allowedDeductions = regime === 'old' ? deductions : 0;
  // Taxable income
  const taxableIncome = Math.max(0, income - stdDeduction - allowedDeductions);
  const slabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;
  let totalTax = 0;
  const taxBreakdown: Array<{
    slab: string;
    taxableAmount: number;
    taxAmount: number;
  }> = [];
  slabs.forEach((slab) => {
    if (taxableIncome > slab.min) {
      const taxableAmount = Math.min(
        taxableIncome - slab.min,
        slab.max === Infinity ? taxableIncome - slab.min : slab.max - slab.min
      );
      const taxAmount = (taxableAmount * slab.rate) / 100;
      totalTax += taxAmount;
      taxBreakdown.push({
        slab: `₹${slab.min.toLocaleString('en-IN')} - ₹${slab.max === Infinity ? '∞' : slab.max.toLocaleString('en-IN')}`,
        taxableAmount,
        taxAmount,
      });
    }
  });
  // Section 87A rebate
  let rebate = 0;
  if (regime === 'new' && taxableIncome <= 1200000) {
    rebate = Math.min(totalTax, 60000);
  } else if (regime === 'old' && taxableIncome <= 500000) {
    rebate = Math.min(totalTax, 12500);
  }
  let taxAfterRebate = Math.max(0, totalTax - rebate);
  // Surcharge
  let surchargeRate = 0;
  if (taxableIncome > 50000000) {
    surchargeRate = 0.37; // 37% for >5Cr (capped at 25% for certain incomes in new regime, not handled here)
  } else if (taxableIncome > 20000000) {
    surchargeRate = 0.25;
  } else if (taxableIncome > 10000000) {
    surchargeRate = 0.15;
  } else if (taxableIncome > 5000000) {
    surchargeRate = 0.10;
  }
  let surcharge = taxAfterRebate * surchargeRate;
  // Cess 4% on (tax + surcharge)
  let cess = (taxAfterRebate + surcharge) * 0.04;
  let finalTax = taxAfterRebate + surcharge + cess;
  return {
    totalIncome: income,
    taxableIncome,
    totalTax: finalTax,
    effectiveTaxRate: taxableIncome > 0 ? (finalTax / taxableIncome) * 100 : 0,
    taxBreakdown,
  };
}

// ROI Calculator Types and Logic
export interface RoiCalculationParams {
  initialInvestment: number;
  finalValue: number;
  timePeriod: number;
}

export interface RoiCalculationResult {
  roi: number;
  absoluteReturns: number;
  totalValue: number;
  totalReturns: number;
  chartData: { year: number; investment: number; returns: number; total: number }[];
}

export function calculateRoi(params: RoiCalculationParams): RoiCalculationResult {
  const { initialInvestment, finalValue, timePeriod } = params;
  const absoluteReturns = finalValue - initialInvestment;
  const roi = (absoluteReturns / initialInvestment) * 100;

  // Generate chart data
  const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
    const year = i;
    const investment = initialInvestment;
    const returns = (absoluteReturns / timePeriod) * year;
    const total = investment + returns;
    return {
      year,
      investment,
      returns,
      total,
    };
  });

  return {
    roi,
    absoluteReturns,
    totalValue: finalValue,
    totalReturns: absoluteReturns,
    chartData,
  };
} 