import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Percent as PercentIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateFd, FdCalculationParams, FdCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const FdCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [timePeriod, setTimePeriod] = useState<number>(1);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<FdCalculationResult>({
    maturityValue: 0,
    totalInterest: 0,
    totalInvestment: 0,
    interestRate: 0,
    chartData: [],
    yearlyBreakdown: [],
  });

  useEffect(() => {
    const params: FdCalculationParams = {
      principal,
      interestRate,
      timePeriod,
      considerInflation,
      inflationRate,
    };
    setResults(calculateFd(params));
  }, [principal, interestRate, timePeriod, considerInflation, inflationRate]);

  // Helper for 2-decimal currency formatting, but no decimals if integer
  const formatCurrency2 = (value: number) => {
    const isInt = Number.isInteger(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: isInt ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Principal Amount"
          value={principal}
          onChange={(value) => setPrincipal(typeof value === 'number' ? value : 0)}
          min={1000}
          max={10000000}
          step={1000}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }}>
                  ₹
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={principal}
          onChange={(_, newValue) => setPrincipal(newValue as number)}
          min={1000}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (%)"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
          step={0.05}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
                  %
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
          min={1}
          max={20}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Time Period (Years)"
          value={timePeriod}
          onChange={(value) => setTimePeriod(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={timePeriod}
          onChange={(_, newValue) => setTimePeriod(newValue as number)}
          min={1}
          max={20}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={considerInflation}
            onChange={(_, checked) => setConsiderInflation(checked)}
            color="primary"
          />
        }
        label="Consider Inflation"
        sx={{ mt: 2, mb: 1, ml: 0.5, fontWeight: 600 }}
      />
      {considerInflation && (
        <Box>
          <CustomNumberField
            fullWidth
            label="Expected Inflation Rate (p.a.)"
            value={inflationRate}
            onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
            min={0}
            max={15}
            step={0.05}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PercentIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledSlider
            value={inflationRate}
            onChange={(_, newValue) => setInflationRate(newValue as number)}
            min={0}
            max={15}
            step={0.05}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `${v}%`}
          />
        </Box>
      )}
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Total Investment',
      value: formatCurrency2(results.totalInvestment),
      variant: 'secondary' as const,
    },
    {
      title: 'Total Interest',
      value: formatCurrency2(results.totalInterest),
      variant: 'purple' as const,
    },
    {
      title: 'Maturity Value',
      value: formatCurrency2(results.maturityValue),
      variant: 'primary' as const,
    },
  ];

  const inflationCards = considerInflation
    ? [
        {
          title: 'Inflation Adjusted Returns',
          value: formatCurrency2(results.inflationAdjustedReturns ?? 0),
          variant: 'green' as const,
        },
        {
          title: 'Inflation Adjusted Maturity',
          value: formatCurrency2(results.inflationAdjustedMaturity ?? 0),
          variant: 'pink' as const,
        },
      ]
    : [];

  // Result cards and chart
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
        {considerInflation && inflationCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      <CalculatorChart
        data={results.chartData.map(row => ({
          ...row,
          inflationAdjustedReturns: considerInflation ? (row.inflationAdjusted !== undefined ? row.inflationAdjusted - row.investment : undefined) : undefined,
          inflationAdjustedMaturity: considerInflation ? row.inflationAdjusted : undefined,
        }))}
        lines={[
          { dataKey: 'total', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'investment', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'interest', color: colors.accent.purple, name: 'Total Interest' },
          ...(considerInflation ? [
            { dataKey: 'inflationAdjustedReturns', color: colors.accent.green || '#81c784', name: 'Inflation Adjusted Returns' },
            { dataKey: 'inflationAdjustedMaturity', color: colors.accent.pink || '#e57373', name: 'Inflation Adjusted Maturity' },
          ] : []),
        ]}
        xKey="year"
        yLabel="Amount"
        tooltipFormatter={(value: number) => formatCurrency2(value)}
        xAxisFormatter={(value: number) => `Year ${value}`}
        yAxisFormatter={formatCurrency2}
        height={400}
      />
    </Paper>
  );

  // Table
  const fdTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Interest', key: 'interest' },
    { label: 'Total Value', key: 'total' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];
  const fdTableRows = results.chartData.filter(row => row.year > 0).map(row => {
    const formattedRow = {
      ...row,
      investment: formatCurrency2(row.investment),
      interest: formatCurrency2(row.interest),
      total: formatCurrency2(row.total),
    };
    if (considerInflation) {
      return {
        ...formattedRow,
        inflationAdjusted: formatCurrency2(row.inflationAdjusted ?? 0),
      };
    }
    return formattedRow;
  });
  const tableSection = (
    <CalculatorTable columns={fdTableColumns} rows={fdTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How FD is Calculated"
      items={[
        <><b>P (Principal):</b> The amount you deposit in the FD.</>,
        <><b>r (Rate):</b> The annual interest rate.</>,
        <><b>n (Compounds per year):</b> Number of times interest is compounded per year.</>,
        <><b>t (Time):</b> Number of years the money is deposited for.</>,
        <><b>A (Amount):</b> The maturity value after compounding.<br/>Formula: <b>A = P × (1 + r/n)^(nt)</b></>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is a Fixed Deposit (FD)?', a: 'A Fixed Deposit is a financial instrument where you deposit money for a fixed tenure at a fixed interest rate.' },
    { q: 'How is FD interest calculated?', a: 'A = P × (1 + r/n)^(nt), where A is maturity value, P is principal, r is rate, n is frequency, t is time.' },
    { q: 'Is FD interest taxable?', a: 'Yes, FD interest is taxable as per your income tax slab.' },
    { q: 'Can I withdraw FD before maturity?', a: 'Yes, but you may incur a penalty and get a lower interest rate.' },
    { q: 'What is the minimum tenure for FD?', a: 'It varies by bank, but usually starts from 7 days.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="FD Calculator"
      description="Calculate returns on your Fixed Deposits and plan your investments with our comprehensive calculator."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>{particularsSection}</Box>
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>{faqSection}</Box>
        </>
      }
    />
  );
};

export default FdCalculator; 
