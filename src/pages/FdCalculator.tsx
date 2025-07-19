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
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          A = P × (1 + r/n)^(nt)
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          A = ₹{principal.toLocaleString('en-IN')} × (1 + {interestRate / 100}/4)^{4 * timePeriod} = <b>{formatCurrency2(results.maturityValue)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>P (Principal):</b> The initial amount invested.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>r (Rate):</b> The annual interest rate (as a decimal).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>n (Frequency):</b> Number of times interest is compounded per year (for FD, usually 4 for quarterly).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>t (Time):</b> Number of years the money is invested for.</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>A (Amount):</b> The maturity value after compounding.</span>
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
            q: 'What is a Fixed Deposit (FD)?',
            a: 'A Fixed Deposit is a financial instrument where you deposit money for a fixed tenure at a fixed interest rate.'
          },
          {
            q: 'How is FD interest calculated?',
            a: 'A = P × (1 + r/n)^(nt), where A is maturity value, P is principal, r is rate, n is frequency, t is time.'
          },
          {
            q: 'What is compounding frequency in FD?',
            a: 'It is the number of times interest is added to the principal per year (for FD, usually quarterly = 4).' 
          },
          {
            q: 'How does inflation affect FD returns?',
            a: 'Inflation reduces the real value of your returns. The calculator can show inflation-adjusted results.'
          },
          {
            q: 'Is FD interest taxable?',
            a: 'Yes, interest earned on FD is taxable as per your income tax slab.'
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
      title="FD Calculator"
      description="Calculate returns on your Fixed Deposits and plan your investments with our comprehensive calculator."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How FD is Calculated
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
};

export default FdCalculator; 
