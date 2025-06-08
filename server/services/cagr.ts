interface CagrRequest {
  initialInvestment: number;
  finalInvestmentValue: number;
  investmentPeriod: number;
  adjustForInflation?: boolean;
  inflationRate?: number;
}

interface YearlyValue {
  year: number;
  value: number;
  inflationAdjustedValue: number;
}

interface CagrResponse {
  cagr: number;
  totalReturn: number;
  absoluteReturn: number;
  inflationAdjustedCagr?: number;
  inflationAdjustedValue?: number;
  yearlyBreakdown: YearlyValue[];
}

export function calculateCagr(data: CagrRequest): CagrResponse {
  const {
    initialInvestment,
    finalInvestmentValue,
    investmentPeriod,
    adjustForInflation = false,
    inflationRate = 0,
  } = data;

  // Validate inputs
  if (initialInvestment <= 0) {
    throw new Error('Initial investment must be greater than 0');
  }
  if (finalInvestmentValue < 0) {
    throw new Error('Final investment value cannot be negative');
  }
  if (investmentPeriod <= 0) {
    throw new Error('Investment period must be greater than 0');
  }
  if (adjustForInflation && inflationRate < 0) {
    throw new Error('Inflation rate cannot be negative');
  }

  // Calculate CAGR
  const cagr = Math.pow(finalInvestmentValue / initialInvestment, 1 / investmentPeriod) - 1;
  const totalReturn = ((finalInvestmentValue - initialInvestment) / initialInvestment) * 100;
  const absoluteReturn = finalInvestmentValue - initialInvestment;

  // Calculate yearly breakdown
  const yearlyBreakdown: YearlyValue[] = [];
  for (let year = 1; year <= investmentPeriod; year++) {
    const value = initialInvestment * Math.pow(1 + cagr, year);
    const inflationAdjustedValue = adjustForInflation
      ? value / Math.pow(1 + inflationRate / 100, year)
      : value;

    yearlyBreakdown.push({
      year,
      value: Math.max(0, value), // Ensure value doesn't go below 0
      inflationAdjustedValue: Math.max(0, inflationAdjustedValue), // Ensure value doesn't go below 0
    });
  }

  const response: CagrResponse = {
    cagr: cagr * 100,
    totalReturn,
    absoluteReturn,
    yearlyBreakdown,
  };

  // Add inflation-adjusted values if requested
  if (adjustForInflation) {
    const inflationAdjustedValue = finalInvestmentValue / Math.pow(1 + inflationRate / 100, investmentPeriod);
    const inflationAdjustedCagr = Math.pow(inflationAdjustedValue / initialInvestment, 1 / investmentPeriod) - 1;

    response.inflationAdjustedCagr = inflationAdjustedCagr * 100;
    response.inflationAdjustedValue = inflationAdjustedValue;
  }

  return response;
} 