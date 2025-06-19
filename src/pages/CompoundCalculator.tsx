import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  styled,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import {
  StyledPaper,
  StyledSlider,
  ChartContainer,
  colors,
  typography,
} from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

const CompactSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.background,
  borderRadius: '24px',
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
  borderRadius: '24px',
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

interface CompoundResults {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
  }>;
}

const CompoundCalculator: React.FC = () => {
  const theme = useTheme();
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Monthly by default
  const [results, setResults] = useState<CompoundResults>({
    maturityValue: 0,
    totalInterest: 0,
    totalInvestment: 0,
    chartData: [],
    yearlyBreakdown: [],
  });

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, interestRate, timePeriod, compoundingFrequency]);

  const calculateCompoundInterest = () => {
    const ratePerPeriod = interestRate / 100 / compoundingFrequency;
    const numberOfPeriods = timePeriod * compoundingFrequency;
    const maturityValue = principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
    const totalInterest = maturityValue - principal;

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const periods = year * compoundingFrequency;
      const value = principal * Math.pow(1 + ratePerPeriod, periods);
      const interest = value - principal;

      return {
        year,
        investment: principal,
        interest,
        total: value,
      };
    });

    // Generate yearly breakdown with corrected calculation
    const yearlyBreakdown = Array.from({ length: timePeriod }, (_, i) => {
      const year = i + 1;
      const periodsInYear = compoundingFrequency;
      const investment = principal; // Fixed: investment is just the principal
      const total = principal * Math.pow(1 + ratePerPeriod, year * periodsInYear);
      const interest = total - investment;

      return {
        year,
        investment,
        interest,
        total,
      };
    });

    setResults({
      maturityValue,
      totalInterest,
      totalInvestment: principal,
      chartData,
      yearlyBreakdown,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const chartAxisStyle = {
    fill: colors.secondary,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  };

  const chartTooltipStyle = {
    backgroundColor: '#fff',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: typography.fontFamily,
  };

  const chartTooltipItemStyle = {
    color: colors.secondary,
    fontSize: '0.9rem',
    fontFamily: typography.fontFamily,
  };

  const chartTooltipLabelStyle = {
    color: colors.primary,
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: typography.fontFamily,
    marginBottom: '4px',
  };

  const chartLegendStyle = {
    paddingTop: '20px',
    fontFamily: typography.fontFamily,
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
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={30}
          step={0.05}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
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
        <CustomNumberField
          fullWidth
          label="Compounding Frequency (per year)"
          value={compoundingFrequency}
          onChange={(value) => setCompoundingFrequency(typeof value === 'number' ? value : 0)}
          min={1}
          max={365}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TrendingUpIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={compoundingFrequency}
          onChange={(_, newValue) => setCompoundingFrequency(newValue as number)}
          min={1}
          max={365}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}x`}
        />
      </Box>
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Total Interest', value: formatCurrency(results.totalInterest), bgcolor: '#fbeeee' },
    { label: 'Total Investment', value: formatCurrency(results.totalInvestment), bgcolor: '#f3f1fa' },
    { label: 'Maturity Value', value: formatCurrency(results.maturityValue), bgcolor: '#eafafd' },
  ];

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <ResultCard
          title="Maturity Value"
          value={formatCurrency(results.maturityValue)}
          variant="primary"
        />
        <ResultCard
          title="Total Interest"
          value={formatCurrency(results.totalInterest)}
          variant="secondary"
        />
        <ResultCard
          title="Total Investment"
          value={formatCurrency(results.totalInvestment)}
          variant="purple"
        />
      </Box>
      
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Investment Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData} style={{ fontFamily: typography.fontFamily }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="year" 
              stroke={colors.secondary} 
              tick={chartAxisStyle} 
              axisLine={{ stroke: colors.border }} 
              tickLine={{ stroke: colors.border }}
              label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              stroke={colors.secondary} 
              tick={chartAxisStyle} 
              axisLine={{ stroke: colors.border }} 
              tickLine={{ stroke: colors.border }}
              tickFormatter={(value) => formatCurrency(value)}
              label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
            />
            <RechartsTooltip
              contentStyle={chartTooltipStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              formatter={(value) => formatCurrency(value as number)}
            />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line
              type="monotone"
              dataKey="investment"
              name="Investment"
              stroke={colors.accent.primary}
              strokeWidth={2}
              dot={{ fill: colors.accent.primary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="interest"
              name="Interest"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total"
              stroke={colors.accent.purple}
              strokeWidth={2}
              dot={{ fill: colors.accent.purple, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Interest', key: 'interest' },
    { label: 'Total Value', key: 'total' },
  ];

  const tableRows = results.chartData.map((row) => ({
    year: row.year + 1,
    investment: formatCurrency(row.investment),
    interest: formatCurrency(row.interest),
    total: formatCurrency(row.total),
  }));

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="Compound Interest Calculator"
      description="Calculate compound interest and analyze investment growth over time."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default CompoundCalculator; 