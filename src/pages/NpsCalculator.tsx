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
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          FV = P × [(1 + r)^nt - 1] / r × (1 + r)
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          FV = ₹{monthlyInvestment.toLocaleString('en-IN')} × [(1 + {expectedReturn / 1200})^{timePeriod * 12} - 1] / {expectedReturn / 1200} × (1 + {expectedReturn / 1200}) = <b>{formatCurrency2(results.corpusAtRetirement)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>P (Installment):</b> The monthly deposit amount.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>r (Rate):</b> The monthly interest rate (annual rate / 12 / 100).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>n (Frequency):</b> Number of times interest is compounded per year (for NPS, usually 12 for monthly).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>t (Time):</b> Number of years the money is invested for.</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>FV (Future Value):</b> The corpus at retirement.</span>
        </Box>
      </Box>
    </Box>
  );

  // Modern FAQ section
  const [faqOpen, setFaqOpen] = React.useState(false);
  const faqSection = (
    <Box sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }} onClick={() => setFaqOpen((o) => !o)}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary, flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          Frequently Asked Questions
        </Typography>
        <Box component="span" sx={{ color: colors.secondary, ml: 1, display: 'flex', alignItems: 'center' }}>
          <svg style={{ transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s', width: 22, height: 22 }} viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
        </Box>
      </Box>
      <Box sx={{ display: faqOpen ? 'block' : 'none', mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: typography.fontFamily }}>
        {[
          {
            q: 'What is NPS?',
            a: 'The National Pension System (NPS) is a government-sponsored retirement savings scheme for individuals in India.'
          },
          {
            q: 'How is NPS maturity value calculated?',
            a: 'FV = P × [(1 + r)^nt - 1] / r × (1 + r), where FV is corpus, P is monthly investment, r is monthly rate, n is frequency, t is time.'
          },
          {
            q: 'What is the annuity return?',
            a: 'It is the expected annual return from the annuity purchased at retirement.' 
          },
          {
            q: 'Is NPS taxable?',
            a: 'Partial withdrawal and annuity are taxable as per prevailing tax laws.'
          },
          {
            q: 'Can I change my monthly investment?',
            a: 'Yes, you can increase or decrease your monthly contribution as per your financial goals.'
          }
        ].map((item, idx, arr) => (
          <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
            <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
            {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
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
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How NPS is Calculated
            </Typography>
            {particularsSection}
          </Box>
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>
            {faqSection}
          </Box>
        </>
      }
    />
  );
}

export default NpsCalculator; 