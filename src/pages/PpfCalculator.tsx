import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  InputAdornment,
  Paper,
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
import { calculatePpf, PpfCalculationParams, PpfCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const PpfCalculator: React.FC = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(15);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<PpfCalculationResult>({
    maturityValue: 0,
    totalInvestment: 0,
    totalInterest: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: PpfCalculationParams = {
      yearlyInvestment,
      interestRate,
      tenure,
      considerInflation,
      inflationRate,
    };
    setResults(calculatePpf(params));
  }, [yearlyInvestment, interestRate, tenure, considerInflation, inflationRate]);

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
          label="Yearly Investment"
          value={yearlyInvestment}
          onChange={(value) => setYearlyInvestment(typeof value === 'number' ? value : 0)}
          min={500}
          max={150000}
          step={500}
          InputProps={{
            startAdornment: (
              <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={yearlyInvestment}
          onChange={(_, newValue) => setYearlyInvestment(newValue as number)}
          min={500}
          max={150000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={15}
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
          max={15}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Tenure (Years)"
          value={tenure}
          onChange={(value) => setTenure(typeof value === 'number' ? value : 0)}
          min={1}
          max={50}
          step={1}
          InputProps={{
            startAdornment: (
              <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={tenure}
          onChange={(_, newValue) => setTenure(newValue as number)}
          min={1}
          max={50}
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
          value: formatCurrency2(
            results.chartData.length > 0
              ? (results.chartData[results.chartData.length - 1].inflationAdjusted ?? 0) - results.totalInvestment
              : 0
          ),
          variant: 'green' as const,
        },
        {
          title: 'Inflation Adjusted Maturity',
          value: formatCurrency2(
            results.chartData.length > 0
              ? results.chartData[results.chartData.length - 1].inflationAdjusted ?? 0
              : 0
          ),
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
          { dataKey: 'value', color: colors.accent.secondary, name: 'Total Value' },
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
  const ppfTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Interest', key: 'interest' },
    { label: 'Total Value', key: 'value' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];
  const ppfTableRows = results.chartData.filter(row => row.year > 0).map(row => {
    const formattedRow = {
      ...row,
      investment: formatCurrency2(row.investment),
      interest: formatCurrency2(row.interest),
      value: formatCurrency2(row.value),
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
    <CalculatorTable columns={ppfTableColumns} rows={ppfTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How PPF is Calculated"
      items={[
        <><b>Yearly Investment:</b> The amount deposited every year.</>,
        <><b>Rate of Interest:</b> The annual interest rate set by the government.</>,
        <><b>Time Period:</b> Number of years the investment is held (minimum 15 years).</>,
        <><b>Formula:</b> A = P × (1 + r/n)^(nt)</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is a Public Provident Fund (PPF)?', a: 'A PPF is a long-term government-backed savings scheme in India with tax benefits and attractive interest rates.' },
    { q: 'How is PPF interest calculated?', a: 'A = P × (1 + r/n)^(nt), where A is maturity value, P is yearly investment, r is rate, n is frequency, t is time.' },
    { q: 'What is the tenure for PPF?', a: 'The minimum tenure is 15 years, but it can be extended in blocks of 5 years.' },
    { q: 'How does inflation affect PPF returns?', a: 'Inflation reduces the real value of your returns. The calculator can show inflation-adjusted results.' },
    { q: 'Is PPF interest taxable?', a: 'No, PPF interest is tax-free under Section 80C of the Income Tax Act.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="PPF Calculator"
      description="Calculate returns on your Public Provident Fund and plan your investments with our comprehensive calculator."
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

export default PpfCalculator; 