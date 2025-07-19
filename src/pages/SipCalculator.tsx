import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
  styled,
  InputAdornment,
  Switch,
  FormControlLabel,
  Button,
  Paper,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import {
  StyledPaper,
  StyledSlider,
  ChartContainer,
  colors,
  typography,
} from '../components/calculatorStyles';
import { CustomNumberField } from '../components/CustomNumberField';
import { formatCurrency } from '../utils/formatUtils';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { calculateSip, SipCalculationParams, SipCalculationResult } from '../utils/calculatorUtils';
import { CalculatorChart } from '../components/CalculatorChart';

const CompactSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.background,
  borderRadius: '10px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  border: `1.5px solid ${colors.border}`,
  padding: theme.spacing(3, 4),
  marginBottom: theme.spacing(3),
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  '& .label': {
    color: colors.secondary,
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: 2,
    display: 'block',
  },
  '& .value': {
    color: colors.primary,
    fontWeight: typography.value.fontWeight,
    fontSize: typography.value.fontSize,
    fontFamily: typography.fontFamily,
  },
}));

const StatBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  justifyContent: 'space-between',
}));

const StatCard = styled(Box)(({ theme }) => ({
  flex: '1 1 180px',
  minWidth: 150,
  background: colors.background,
  borderRadius: '10px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  border: `1.5px solid ${colors.border}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5, 2),
  textAlign: 'center',
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: 28,
  marginBottom: theme.spacing(1),
  color: colors.accent.primary,
}));

interface YearlyBreakdown {
  year: number;
  investment: number;
  interest: number;
  total: number;
}

const SipCalculator: React.FC = () => {
  const theme = useTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [stepUpEnabled, setStepUpEnabled] = useState<boolean>(false);
  const [stepUpPercentage, setStepUpPercentage] = useState<number>(10);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<SipCalculationResult>({
    maturityValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    inflationAdjustedMaturity: 0,
    inflationAdjustedReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: SipCalculationParams = {
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      stepUpEnabled,
      stepUpPercentage,
      considerInflation,
      inflationRate,
    };
    setResults(calculateSip(params));
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUpEnabled, stepUpPercentage, considerInflation, inflationRate]);

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
          max={100000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
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
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
                  %
                </Typography>
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
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch checked={stepUpEnabled} onChange={(_, checked) => setStepUpEnabled(checked)} />}
          label="Enable Step-up SIP"
        />
        {stepUpEnabled && (
          <CustomNumberField
            fullWidth
            label="Step-up Percentage"
            value={stepUpPercentage}
            onChange={(value) => setStepUpPercentage(typeof value === 'number' ? value : 0)}
            min={0}
            max={100}
            step={0.05}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            helperText="Annual increase in investment amount"
          />
        )}
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch checked={considerInflation} onChange={(_, checked) => setConsiderInflation(checked)} />}
          label="Consider Inflation"
        />
        {considerInflation && (
          <CustomNumberField
            fullWidth
            label="Inflation Rate"
            value={inflationRate}
            onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
            min={0}
            max={15}
            step={0.1}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        )}
      </Box>
    </StyledPaper>
  );

  // Estimate a fixed height for the form section (e.g., 520px)
  const resultSectionHeight = 520;

  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
        <ResultCard title="Total Investment" value={formatCurrency(results.totalInvestment)} variant="secondary" fontSize="0.9rem" />
        <ResultCard title="Total Returns" value={formatCurrency(results.totalReturns)} variant="purple" fontSize="0.9rem" />
        <ResultCard title="Maturity Value" value={formatCurrency(results.maturityValue)} variant="primary" fontSize="0.9rem" />
      </Box>
      {considerInflation && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
          <ResultCard title="Inflation Adjusted Returns" value={formatCurrency(results.inflationAdjustedReturns)} variant="green" fontSize="0.9rem" />
          <ResultCard title="Inflation Adjusted Maturity" value={formatCurrency(results.inflationAdjustedMaturity)} variant="pink" fontSize="0.9rem" />
        </Box>
      )}
      <CalculatorChart
        data={results.chartData.map(row => ({
          ...row,
          inflationAdjustedReturns: considerInflation ? row.total / Math.pow(1 + inflationRate / 100, row.year) - row.investment : undefined,
          inflationAdjustedMaturity: considerInflation ? row.total / Math.pow(1 + inflationRate / 100, row.year) : undefined,
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
        tooltipFormatter={(value: number) => formatCurrency(value)}
        xAxisFormatter={(value: number) => `Year ${value}`}
        yAxisFormatter={formatCurrency}
        height={400}
      />
    </Paper>
  );

  const sipTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];

  // Prepare table data, adding inflationAdjusted if needed
  const sipTableRows = results.chartData.map((row) => {
    const formattedRow = {
      ...row,
      investment: formatCurrency2(row.investment),
      returns: formatCurrency2(row.returns),
      total: formatCurrency2(row.total),
    };
    if (considerInflation) {
      return {
        ...formattedRow,
        inflationAdjusted: formatCurrency2(row.total / Math.pow(1 + inflationRate / 100, row.year)),
      };
    }
    return formattedRow;
  });

  const tableSection = (
    <CalculatorTable columns={sipTableColumns} rows={sipTableRows} />
  );

  // Add particularsSection (How SIP is Calculated)
  const particularsSection = (
    <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
      <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
        <span><b>P (Monthly Investment):</b> The fixed amount invested every month.</span>
      </Box>
      <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
        <span><b>r (Rate):</b> The monthly interest rate (annual rate / 12 / 100).</span>
      </Box>
      <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
        <span><b>n (Months):</b> The total number of monthly investments (years × 12).</span>
      </Box>
      <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
        <span><b>A (Amount):</b> The maturity value after compounding.<br/>Formula: <b>A = P × [ (1 + r)^n – 1 ] / r × (1 + r)</b></span>
      </Box>
    </Box>
  );

  // Add FAQ section
  const [faqOpen, setFaqOpen] = React.useState(false);
  const faqSection = (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }} onClick={() => setFaqOpen((o) => !o)}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary, flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          Frequently Asked Questions
        </Typography>
        <span style={{ color: colors.secondary, fontWeight: 700 }}>{faqOpen ? '▲' : '▼'}</span>
      </Box>
      {faqOpen && (
        <Box sx={{ mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: typography.fontFamily }}>
          {[
            { q: 'What is a SIP?', a: 'A Systematic Investment Plan (SIP) is a way to invest a fixed amount regularly in mutual funds or other investment vehicles.' },
            { q: 'How is SIP maturity calculated?', a: 'A = P × [ (1 + r)^n – 1 ] / r × (1 + r), where A is maturity value, P is monthly investment, r is monthly rate, n is number of months.' },
            { q: 'What are the benefits of SIP?', a: 'SIP allows rupee cost averaging, compounding, and disciplined investing.' },
            { q: 'Can I change my SIP amount?', a: 'Yes, you can increase or decrease your SIP amount as per your financial goals.' },
            { q: 'Is SIP safe?', a: 'SIP is a method of investing, not a product. The safety depends on the underlying investment.' },
          ].map((item, idx, arr) => (
            <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
              <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
              <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
              {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );

  return (
    <CalculatorTemplate
      title="SIP Calculator"
      description="Calculate returns on your Systematic Investment Plan (SIP) investments"
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How SIP is Calculated
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

export default SipCalculator; 