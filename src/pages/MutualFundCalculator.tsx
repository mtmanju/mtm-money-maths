import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateMutualFund, MutualFundCalculationParams, MutualFundCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const MutualFundCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<MutualFundCalculationResult>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    absoluteReturns: 0,
    chartData: [],
  });
  const [faqOpen, setFaqOpen] = React.useState(false);

  useEffect(() => {
    const params: MutualFundCalculationParams = {
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      considerInflation,
      inflationRate,
    };
    setResults(calculateMutualFund(params));
  }, [monthlyInvestment, expectedReturn, timePeriod, considerInflation, inflationRate]);

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
          label="Monthly Investment"
          value={monthlyInvestment}
          onChange={(value) => setMonthlyInvestment(typeof value === 'number' ? value : 0)}
          min={500}
          max={100000}
          step={500}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={monthlyInvestment}
          onChange={(_, newValue) => setMonthlyInvestment(newValue as number)}
          min={500}
          max={100000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Expected Return (p.a.)"
          value={expectedReturn}
          onChange={(value) => setExpectedReturn(typeof value === 'number' ? value : 0)}
          min={1}
          max={30}
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
          value={expectedReturn}
          onChange={(_, newValue) => setExpectedReturn(newValue as number)}
          min={1}
          max={30}
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
      title: 'Total Returns',
      value: formatCurrency2(results.totalReturns),
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

  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      {considerInflation && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
          {inflationCards.map((card) => (
            <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
          ))}
        </Box>
      )}
      <CalculatorChart
        data={results.chartData.map(row => ({
          ...row,
          inflationAdjustedReturns: considerInflation ? (row.inflationAdjusted !== undefined ? row.inflationAdjusted - results.totalInvestment : undefined) : undefined,
          inflationAdjustedMaturity: considerInflation ? row.inflationAdjusted : undefined,
        }))}
        lines={[
          { dataKey: 'total', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'investment', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'returns', color: colors.accent.purple, name: 'Returns' },
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

  // Table columns and rows
  const mfTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];
  const mfTableRows = results.chartData.map(row => {
    const formattedRow = {
      ...row,
      investment: formatCurrency2(row.investment),
      returns: formatCurrency2(row.returns),
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
    <CalculatorTable columns={mfTableColumns} rows={mfTableRows} />
  );

  const particularsSection = (
    <ParticularsSection
      title="How Mutual Fund SIP is Calculated"
      items={[
        <><b>Monthly Investment:</b> The fixed amount invested every month.</>,
        <><b>Rate of Return:</b> The expected annual return percentage.</>,
        <><b>Time Period:</b> Number of years the investment is held.</>,
        <><b>Formula:</b> A = P × [ (1 + r)^n – 1 ] / r × (1 + r)</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is a Mutual Fund SIP?', a: 'A Systematic Investment Plan (SIP) in mutual funds allows you to invest a fixed amount regularly.' },
    { q: 'How is SIP maturity calculated?', a: 'A = P × [ (1 + r)^n – 1 ] / r × (1 + r), where A is maturity value, P is monthly investment, r is monthly rate, n is number of months.' },
    { q: 'What are the benefits of SIP?', a: 'SIP allows rupee cost averaging, compounding, and disciplined investing.' },
    { q: 'Can I change my SIP amount?', a: 'Yes, you can increase or decrease your SIP amount as per your financial goals.' },
    { q: 'Is SIP safe?', a: 'SIP is a method of investing, not a product. The safety depends on the underlying mutual fund.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="Mutual Fund SIP Calculator"
      description="Analyze your mutual fund investments and track their performance over time."
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

export default MutualFundCalculator; 