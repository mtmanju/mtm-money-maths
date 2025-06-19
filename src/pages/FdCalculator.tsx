import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  CalendarMonth as CalendarMonthIcon,
  Percent as PercentIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Payments as PaymentsIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

interface FDResults {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  interestRate: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
    inflationAdjusted?: number;
  }>;
  yearlyBreakdown: Array<{
    year: number;
    investment: number;
    interest: number;
    total: number;
  }>;
}

const FdCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [timePeriod, setTimePeriod] = useState<number>(1);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<FDResults>({
    maturityValue: 0,
    totalInterest: 0,
    totalInvestment: 0,
    interestRate: 0,
    chartData: [],
    yearlyBreakdown: [],
  });

  useEffect(() => {
    calculateFD();
  }, [principal, interestRate, timePeriod, considerInflation, inflationRate]);

  const calculateFD = () => {
    // Convert annual rate to quarterly rate
    const quarterlyRate = interestRate / 100 / 4;
    const totalQuarters = timePeriod * 4;
    
    // Calculate maturity value using quarterly compounding
    const maturityValue = principal * Math.pow(1 + quarterlyRate, totalQuarters);
    const totalInterest = maturityValue - principal;

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const quarters = year * 4;
      const value = principal * Math.pow(1 + quarterlyRate, quarters);
      const interest = value - principal;
      const inflationAdjusted = considerInflation
        ? value / Math.pow(1 + inflationRate / 100, year)
        : undefined;

      return {
        year,
        investment: principal,
        interest,
        total: value,
        inflationAdjusted,
      };
    });

    // Generate yearly breakdown
    const yearlyBreakdown = Array.from({ length: timePeriod }, (_, i) => {
      const year = i + 1;
      const quarters = year * 4;
      const investment = principal;
      const total = principal * Math.pow(1 + quarterlyRate, quarters);
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
      interestRate,
      inflationAdjustedMaturity: considerInflation
        ? maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)
        : undefined,
      inflationAdjustedReturns: considerInflation
        ? (maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)) - principal
        : undefined,
      chartData,
      yearlyBreakdown,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
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
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
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

  const resultCards = [
    {
      label: 'Total Investment',
      value: formatCurrency(principal),
      icon: <AccountBalanceWalletIcon />,
      variant: 'primary' as const
    },
    {
      label: 'Total Interest',
      value: formatCurrency(results.totalInterest),
      icon: <TrendingUpIcon />,
      variant: 'secondary' as const
    },
    {
      label: 'Maturity Amount',
      value: formatCurrency(results.maturityValue),
      icon: <AccountBalanceWalletIcon />,
      variant: 'purple' as const
    }
  ];

  const inflationCards = considerInflation
    ? [
        { label: 'Inflation Adjusted Value', value: formatCurrency(results.inflationAdjustedMaturity ?? 0), bgcolor: '#eafafd' },
        { label: 'Inflation Adjusted Returns', value: formatCurrency(results.inflationAdjustedReturns ?? 0), bgcolor: '#fbeeee' },
      ]
    : [];

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <ResultCard
          title="Total Investment"
          value={formatCurrency(principal)}
          variant="primary"
        />
        <ResultCard
          title="Total Interest"
          value={formatCurrency(results.totalInterest)}
          variant="secondary"
        />
        <ResultCard
          title="Maturity Amount"
          value={formatCurrency(results.maturityValue)}
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
            {considerInflation && (
              <Line
                type="monotone"
                dataKey="inflationAdjusted"
                name="Inflation Adjusted"
                stroke={colors.accent.pink}
                strokeWidth={2}
                dot={{ fill: colors.accent.pink, strokeWidth: 2 }}
              />
            )}
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
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Interest</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Value</th>
            {considerInflation && (
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Inflation Adjusted</th>
            )}
          </tr>
        </thead>
        <tbody>
          {results.chartData.filter(row => row.year > 0).map((row) => (
            <tr key={row.year}>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>{row.year}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.investment)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.interest)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.total)}</td>
              {considerInflation && (
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.inflationAdjusted ?? 0)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );

  return (
    <CalculatorTemplate
      title="FD Calculator"
      description="Calculate returns on your Fixed Deposits and plan your investments with our comprehensive calculator."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default FdCalculator; 
