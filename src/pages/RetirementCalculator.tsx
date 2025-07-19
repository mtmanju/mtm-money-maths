import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  Paper,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateRetirement, RetirementCalculationParams, RetirementCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [results, setResults] = useState<RetirementCalculationResult>({
    corpusNeeded: 0,
    monthlyInvestment: 0,
    totalInvestment: 0,
    totalReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: RetirementCalculationParams = {
      currentAge,
      retirementAge,
      monthlyExpenses,
      inflationRate,
      expectedReturn,
      lifeExpectancy,
    };
    setResults(calculateRetirement(params));
  }, [currentAge, retirementAge, monthlyExpenses, inflationRate, expectedReturn, lifeExpectancy]);

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
          label="Current Age"
          value={currentAge}
          onChange={(value) => setCurrentAge(typeof value === 'number' ? value : 0)}
          min={18}
          max={70}
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
          value={currentAge}
          onChange={(_, newValue) => setCurrentAge(newValue as number)}
          min={18}
          max={70}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Retirement Age"
          value={retirementAge}
          onChange={(value) => setRetirementAge(typeof value === 'number' ? value : 0)}
          min={45}
          max={75}
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
          value={retirementAge}
          onChange={(_, newValue) => setRetirementAge(newValue as number)}
          min={45}
          max={75}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Monthly Expenses"
          value={monthlyExpenses}
          onChange={(value) => setMonthlyExpenses(typeof value === 'number' ? value : 0)}
          min={10000}
          max={200000}
          step={5000}
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
          value={monthlyExpenses}
          onChange={(_, newValue) => setMonthlyExpenses(newValue as number)}
          min={10000}
          max={200000}
          step={5000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Inflation Rate (p.a.)"
          value={inflationRate}
          onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={12}
          step={0.05}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
                  ₹
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={inflationRate}
          onChange={(_, newValue) => setInflationRate(newValue as number)}
          min={1}
          max={12}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Expected Return (p.a.)"
          value={expectedReturn}
          onChange={(value) => setExpectedReturn(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
          step={0.05}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
                  ₹
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={expectedReturn}
          onChange={(_, newValue) => setExpectedReturn(newValue as number)}
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
          label="Life Expectancy"
          value={lifeExpectancy}
          onChange={(value) => setLifeExpectancy(typeof value === 'number' ? value : 0)}
          min={60}
          max={100}
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
          value={lifeExpectancy}
          onChange={(_, newValue) => setLifeExpectancy(newValue as number)}
          min={60}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Corpus Needed',
      value: formatCurrency2(results.corpusNeeded),
      variant: 'primary' as const,
    },
    {
      title: 'Monthly Investment',
      value: formatCurrency2(results.monthlyInvestment),
      variant: 'secondary' as const,
    },
    {
      title: 'Total Investment',
      value: formatCurrency2(results.totalInvestment),
      variant: 'purple' as const,
    },
    {
      title: 'Total Returns',
      value: formatCurrency2(results.totalReturns),
      variant: 'green' as const,
    },
  ];

  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      <CalculatorChart
        data={results.chartData}
        lines={[
          { dataKey: 'total', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'investment', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'returns', color: colors.accent.purple, name: 'Returns' },
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

  // Table columns and rows
  const retirementTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
  ];
  const retirementTableRows = results.chartData.map(row => ({
    ...row,
    investment: formatCurrency2(row.investment),
    returns: formatCurrency2(row.returns),
    total: formatCurrency2(row.total),
  }));
  const tableSection = (
    <CalculatorTable columns={retirementTableColumns} rows={retirementTableRows} />
  );

  const particularsSection = (
    <ParticularsSection
      title="How Retirement Corpus is Calculated"
      items={[
        <><b>Current Age:</b> Your present age.</>,
        <><b>Retirement Age:</b> The age at which you plan to retire.</>,
        <><b>Monthly Expenses:</b> Your expected monthly expenses during retirement.</>,
        <><b>Inflation Rate:</b> The expected annual inflation rate.</>,
        <><b>Expected Return:</b> The annual return on your retirement corpus.</>,
        <><b>Formula:</b> Corpus = Required monthly income × 12 × number of years in retirement, adjusted for inflation and returns.</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is a retirement corpus?', a: 'The total amount you need at retirement to cover your expenses for the rest of your life.' },
    { q: 'How is retirement corpus calculated?', a: 'Based on your expected expenses, inflation, retirement age, and life expectancy.' },
    { q: 'What is the impact of inflation?', a: 'Inflation increases your future expenses, so your corpus must be higher to maintain your lifestyle.' },
    { q: 'What is a safe withdrawal rate?', a: 'A rule of thumb is 3-4% per year, but it depends on your investment returns and expenses.' },
    { q: 'Can I retire early?', a: 'Yes, but you need a larger corpus to cover more years of expenses.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="Retirement Calculator"
      description="Plan your retirement and calculate the corpus needed for a comfortable life."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>{faqSection}</Box>
        </>
      }
    />
  );
};

export default RetirementCalculator; 