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

const SipCalculator: React.FC = () => {
  const theme = useTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    chartData: any[];
    inflationAdjustedMaturity?: number | null;
    inflationAdjustedReturns?: number | null;
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    chartData: [],
    inflationAdjustedMaturity: null,
    inflationAdjustedReturns: null,
  });

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, timePeriod, considerInflation, inflationRate]);

  const calculateSIP = () => {
    // Always use expectedReturn for nominal values
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    const totalInvestment = monthlyInvestment * months;

    // Nominal maturity value
    const maturityValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalReturns = maturityValue - totalInvestment;

    // Inflation-adjusted values (only if enabled)
    let inflationAdjustedMaturity = null;
    let inflationAdjustedReturns = null;
    if (considerInflation) {
      inflationAdjustedMaturity = maturityValue / Math.pow(1 + inflationRate / 100, timePeriod);
      inflationAdjustedReturns = inflationAdjustedMaturity - totalInvestment;
    }

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const investment = monthlyInvestment * 12 * (year + 1);
      const months = (year + 1) * 12;
      const value = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      let inflationAdjusted = null;
      if (considerInflation) {
        inflationAdjusted = value / Math.pow(1 + inflationRate / 100, year + 1);
      }
      return {
        year,
        investment: Math.round(investment),
        value: Math.round(value),
        inflationAdjusted: inflationAdjusted !== null ? Math.round(inflationAdjusted) : null,
      };
    });

    setResults({
      totalInvestment,
      totalReturns,
      maturityValue,
      chartData,
      inflationAdjustedMaturity,
      inflationAdjustedReturns,
    });
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Monthly Investment"
          value={monthlyInvestment}
          onChange={(value) => setMonthlyInvestment(typeof value === 'number' ? value : 0)}
          min={1000}
          max={100000}
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
          value={monthlyInvestment}
          onChange={(_, newValue) => setMonthlyInvestment(newValue as number)}
          min={1000}
          max={100000}
          step={1000}
          valueLabelDisplay="auto"
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
          step={0.1}
          valueLabelDisplay="auto"
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
            step={0.1}
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
            step={0.1}
            valueLabelDisplay="auto"
          />
        </Box>
      )}
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Total Investment" value={formatCurrency(results.totalInvestment)} variant="primary" />
        <ResultCard title="Total Returns" value={formatCurrency(results.totalReturns)} variant="secondary" />
        <ResultCard title="Maturity Value" value={formatCurrency(results.maturityValue)} variant="purple" />
      </Box>
      {considerInflation && (
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
            Inflation Adjusted
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
            <ResultCard title="Total Returns" value={formatCurrency(results.inflationAdjustedReturns ?? 0)} variant="secondary" />
            <ResultCard title="Maturity Value" value={formatCurrency(results.inflationAdjustedMaturity ?? 0)} variant="purple" />
          </Box>
        </>
      )}
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Investment Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData} style={{ fontFamily: typography.fontFamily }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="year" stroke={colors.secondary} tick={chartAxisStyle} axisLine={{ stroke: colors.border }} tickLine={{ stroke: colors.border }} />
            <YAxis stroke={colors.secondary} tick={chartAxisStyle} axisLine={{ stroke: colors.border }} tickLine={{ stroke: colors.border }} />
            <RechartsTooltip contentStyle={chartTooltipStyle} itemStyle={chartTooltipItemStyle} labelStyle={chartTooltipLabelStyle} />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line type="monotone" dataKey="investment" name="Investment" stroke={colors.accent.primary} strokeWidth={2} dot={{ fill: colors.accent.primary, strokeWidth: 2 }} />
            <Line type="monotone" dataKey="value" name="Maturity Value" stroke={colors.accent.secondary} strokeWidth={2} dot={{ fill: colors.accent.secondary, strokeWidth: 2 }} />
            {considerInflation && (
              <Line
                type="monotone"
                dataKey="inflationAdjusted"
                name="Inflation Adjusted Maturity Value"
                stroke="#e57373"
                strokeWidth={2}
                dot={{ fill: '#e57373', strokeWidth: 2 }}
                strokeDasharray="6 3"
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Total Investment', key: 'investment' },
    { label: 'Maturity Value', key: 'value' },
    ...(considerInflation ? [{ label: 'Maturity Value (Inflation Adjusted)', key: 'inflationAdjusted' }] : []),
  ];
  const tableRows = results.chartData.map((row, idx) => ({
    ...row,
    year: row.year + 1,
    inflationAdjusted: considerInflation ? formatCurrency(row.inflationAdjusted ?? 0) : undefined,
    investment: formatCurrency(row.investment),
    value: formatCurrency(row.value),
  }));

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="SIP Calculator"
      description="Calculate the future value of your SIP investments and see how your wealth can grow over time."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default SipCalculator; 