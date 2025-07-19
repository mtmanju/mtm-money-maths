import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  InputAdornment,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateCompound, CompoundCalculationParams, CompoundCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const CompoundCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Monthly by default
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<CompoundCalculationResult>({
    maturityValue: 0,
    totalInterest: 0,
    totalInvestment: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: CompoundCalculationParams = {
      principal,
      interestRate,
      timePeriod,
      compoundingFrequency,
      considerInflation,
      inflationRate,
    };
    setResults(calculateCompound(params));
  }, [principal, interestRate, timePeriod, compoundingFrequency, considerInflation, inflationRate]);

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
                <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
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
          label="Interest Rate (p.a.)"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
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
          max={30}
          step={1}
          InputProps={{
            startAdornment: (
              <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={timePeriod}
          onChange={(_, newValue) => setTimePeriod(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Compounding Frequency (per year)"
          value={compoundingFrequency}
          onChange={(value) => setCompoundingFrequency(typeof value === 'number' ? value : 0)}
          min={1}
          max={12}
          step={1}
          InputProps={{
            startAdornment: (
              <PaymentsIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={compoundingFrequency}
          onChange={(_, newValue) => setCompoundingFrequency(newValue as number)}
          min={1}
          max={12}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}x`}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={considerInflation}
              onChange={(e) => setConsiderInflation(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.accent.primary,
                  '& + .MuiSwitch-track': {
                    backgroundColor: colors.accent.primary,
                  },
                },
              }}
            />
          }
          label="Consider Inflation"
        />
        {considerInflation && (
          <CustomNumberField
            label="Inflation Rate"
            value={inflationRate}
            onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
            min={1}
            max={15}
            step={0.1}
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
        )}
      </Box>
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
          inflationAdjustedReturns: considerInflation ? (row.inflationAdjusted !== undefined ? row.inflationAdjusted - results.totalInvestment : undefined) : undefined,
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
  const compoundTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Total Interest', key: 'interest' },
    { label: 'Total Value', key: 'total' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];
  const compoundTableRows = results.chartData.map(row => {
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
    <CalculatorTable columns={compoundTableColumns} rows={compoundTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How Compound Interest is Calculated"
      items={[
        <><b>P (Principal):</b> The initial amount of money invested or loaned.</>,
        <><b>r (Rate):</b> The annual interest rate (as a decimal).</>,
        <><b>n (Compounds per year):</b> The number of times interest is compounded per year.</>,
        <><b>t (Time):</b> The number of years the money is invested or borrowed for.</>,
        <><b>A (Amount):</b> The final amount after compounding.<br/>Formula: <b>A = P × (1 + r/n)^(nt)</b></>,
      ]}
    />
  );

  // Modern FAQ section
  const faqItems: FAQItem[] = [
    { q: 'What is compound interest?', a: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods.' },
    { q: 'How often is interest compounded?', a: 'It can be compounded annually, semi-annually, quarterly, monthly, or daily.' },
    { q: 'Why does compounding matter?', a: 'Compounding increases the amount of interest earned or paid over time.' },
    { q: 'What is the formula for compound interest?', a: 'A = P × (1 + r/n)^(nt)' },
    { q: 'Is compound interest better than simple interest?', a: 'Yes, because you earn interest on interest as well as principal.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="Compound Interest Calculator"
      description="Calculate compound interest and see how your money grows over time."
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

export default CompoundCalculator; 