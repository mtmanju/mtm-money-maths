import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  Paper,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Percent as PercentIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateNps, NpsCalculationParams, NpsCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

function NpsCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [timePeriod, setTimePeriod] = useState<number>(20);
  const [annuityReturn, setAnnuityReturn] = useState<number>(6);
  const [results, setResults] = useState<NpsCalculationResult>({
    corpusAtRetirement: 0,
    totalContribution: 0,
    totalInterest: 0,
    monthlyPension: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: NpsCalculationParams = {
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      annuityReturn,
    };
    setResults(calculateNps(params));
  }, [monthlyInvestment, expectedReturn, timePeriod, annuityReturn]);

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
          max={50000}
          step={500}
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
          value={monthlyInvestment}
          onChange={(_, newValue) => setMonthlyInvestment(newValue as number)}
          min={500}
          max={50000}
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
          max={40}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={timePeriod}
          onChange={(_, newValue) => setTimePeriod(newValue as number)}
          min={1}
          max={40}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Annuity Return (p.a.)"
          value={annuityReturn}
          onChange={(value) => setAnnuityReturn(typeof value === 'number' ? value : 0)}
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
          value={annuityReturn}
          onChange={(_, newValue) => setAnnuityReturn(newValue as number)}
          min={1}
          max={30}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Maturity Value',
      value: formatCurrency2(results.corpusAtRetirement),
      variant: 'primary' as const,
    },
    {
      title: 'Total Investment',
      value: formatCurrency2(results.totalContribution),
      variant: 'secondary' as const,
    },
    {
      title: 'Total Interest',
      value: formatCurrency2(results.totalInterest),
      variant: 'purple' as const,
    },
    {
      title: 'Monthly Pension',
      value: formatCurrency2(results.monthlyPension),
      variant: 'green' as const,
    },
  ];

  // Result cards and chart
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      <CalculatorChart
        data={results.chartData}
        lines={[
          { dataKey: 'corpus', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'contribution', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'totalInterest', color: colors.accent.purple, name: 'Total Interest' },
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
  const npsTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'contribution' },
    { label: 'Total Interest', key: 'totalInterest' },
    { label: 'Total Value', key: 'corpus' },
  ];
  const npsTableRows = results.chartData.filter(row => row.year > 0).map(row => ({
    ...row,
    contribution: formatCurrency2(row.contribution),
    totalInterest: formatCurrency2(row.totalInterest),
    corpus: formatCurrency2(row.corpus),
  }));
  const tableSection = (
    <CalculatorTable columns={npsTableColumns} rows={npsTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How NPS is Calculated"
      items={[
        <><b>Monthly Contribution:</b> The fixed amount invested every month.</>,
        <><b>Rate of Return:</b> The expected annual return percentage.</>,
        <><b>Time Period:</b> Number of years the investment is held.</>,
        <><b>Annuity Purchase:</b> Portion of corpus used to buy annuity at retirement.</>,
        <><b>Lump Sum Withdrawal:</b> Portion of corpus withdrawn as lump sum at retirement.</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is NPS?', a: 'NPS stands for National Pension System, a government-sponsored retirement savings scheme.' },
    { q: 'How is NPS maturity calculated?', a: 'Based on monthly contributions, expected returns, and tenure. At retirement, part of the corpus is used to buy annuity, rest can be withdrawn.' },
    { q: 'Is NPS return guaranteed?', a: 'No, returns depend on market performance of underlying funds.' },
    { q: 'What is annuity in NPS?', a: 'An annuity is a regular pension purchased from the NPS corpus at retirement.' },
    { q: 'Is NPS tax-free?', a: 'Partial withdrawals and annuity have different tax treatments. Check latest tax rules.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="NPS Calculator"
      description="Calculate your National Pension Scheme returns and plan your retirement corpus with our comprehensive calculator."
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
}

export default NpsCalculator; 