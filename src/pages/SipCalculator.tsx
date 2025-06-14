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
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
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
  AreaChart,
  Area,
} from 'recharts';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import {
  StyledPaper,
  StyledSlider,
  ChartContainer,
  colors,
  typography,
  CalculatorHeading,
  StyledTableContainer,
  tableStyles,
  tableHeaderCell,
  tableCell,
  chartAxisStyle,
  chartTooltipStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartLegendStyle,
} from '../components/calculatorStyles';
import { CustomNumberField } from '../components/CustomNumberField';
import { formatCurrency } from '../utils/formatUtils';
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
  const [results, setResults] = useState<{
    maturityValue: number;
    totalInvestment: number;
    totalReturns: number;
    inflationAdjustedMaturity: number;
    inflationAdjustedReturns: number;
    chartData: any[];
  }>({
    maturityValue: 0,
    totalInvestment: 0,
    totalReturns: 0,
    inflationAdjustedMaturity: 0,
    inflationAdjustedReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUpEnabled, stepUpPercentage, considerInflation, inflationRate]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    let totalInvestment = 0;
    let maturityValue = 0;
    let currentMonthly = monthlyInvestment;
    let monthCounter = 0;
    const chartData = [];

    // For yearly breakdown
    for (let year = 1; year <= timePeriod; year++) {
      let yearInvestment = 0;
      let yearValue = maturityValue;
      for (let m = 1; m <= 12; m++) {
        monthCounter++;
        // Step-up logic: increase SIP at the start of each year (except first)
        if (stepUpEnabled && m === 1 && year > 1) {
          currentMonthly = currentMonthly * (1 + stepUpPercentage / 100);
        }
        maturityValue = (maturityValue + currentMonthly) * (1 + monthlyRate);
        yearInvestment += currentMonthly;
      }
      totalInvestment += yearInvestment;
      chartData.push({
        year,
        investment: totalInvestment,
        returns: maturityValue - totalInvestment,
        total: maturityValue,
      });
    }

    const totalReturns = maturityValue - totalInvestment;

    // Inflation adjustment
    let inflationAdjustedMaturity = maturityValue;
    let inflationAdjustedReturns = totalReturns;
    if (considerInflation) {
      inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
      inflationAdjustedReturns = inflationAdjustedMaturity - totalInvestment;
    }

    setResults({
      maturityValue,
      totalInvestment,
      totalReturns,
      inflationAdjustedMaturity,
      inflationAdjustedReturns,
      chartData,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
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
        <StyledSlider
          value={expectedReturn}
          onChange={(_, newValue) => setExpectedReturn(newValue as number)}
          min={1}
          max={30}
          step={0.1}
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
                <Typography sx={{ color: '#00bfc6', fontWeight: 400 }}>
                  Y
                </Typography>
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
            step={1}
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

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Maturity Value" value={formatCurrency(results.maturityValue)} variant="primary" />
        <ResultCard title="Total Investment" value={formatCurrency(results.totalInvestment)} variant="secondary" />
        <ResultCard title="Total Returns" value={formatCurrency(results.totalReturns)} variant="purple" />
      </Box>
      {considerInflation && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
          <ResultCard title="Inflation Adjusted Maturity" value={formatCurrency(results.inflationAdjustedMaturity)} variant="primary" />
          <ResultCard title="Inflation Adjusted Returns" value={formatCurrency(results.inflationAdjustedReturns)} variant="secondary" />
        </Box>
      )}
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
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Value"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
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
              dataKey="returns"
              name="Returns"
              stroke={colors.accent.purple}
              strokeWidth={2}
              dot={{ fill: colors.accent.purple, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableSection = (
    <StyledTableContainer>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Year</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Investment</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Returns</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Total Value</th>
            {considerInflation && (
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Inflation Adjusted Value</th>
            )}
          </tr>
        </thead>
        <tbody>
          {results.chartData.map((row) => (
            <tr key={row.year}>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>{row.year}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.investment)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.returns)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.total)}</td>
              {considerInflation && (
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.total / Math.pow(1 + inflationRate / 100, row.year))}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );

  return (
    <CalculatorTemplate
      title="SIP Calculator"
      description="Calculate returns on your Systematic Investment Plan (SIP) investments"
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default SipCalculator; 