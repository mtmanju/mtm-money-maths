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
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';

interface RDResults {
  maturityValue: number;
  totalInterest: number;
  totalInvestment: number;
  inflationAdjustedMaturity?: number;
  inflationAdjustedReturns?: number;
  chartData: Array<{
    year: number;
    investment: number;
    value: number;
    inflationAdjusted?: number;
  }>;
}

const RdCalculator: React.FC = () => {
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<RDResults>({
    maturityValue: 0,
    totalInterest: 0,
    totalInvestment: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateRD();
  }, [monthlyInstallment, interestRate, timePeriod, considerInflation, inflationRate]);

  const calculateRD = () => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = timePeriod * 12;
    
    // Formula for RD maturity value: P * (1 + r)^n * ((1 + r)^n - 1) / r
    // where P = monthly installment, r = monthly interest rate, n = total months
    const maturityValue = monthlyInstallment * 
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / 
      monthlyInterestRate * 
      (1 + monthlyInterestRate);
    
    const totalInvestment = monthlyInstallment * totalMonths;
    const totalInterest = maturityValue - totalInvestment;

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const monthsInYear = year * 12;
      const value = monthlyInstallment * 
        (Math.pow(1 + monthlyInterestRate, monthsInYear) - 1) / 
        monthlyInterestRate * 
        (1 + monthlyInterestRate);
      const investment = monthlyInstallment * monthsInYear;
      const inflationAdjusted = considerInflation
        ? value / Math.pow(1 + inflationRate / 100, year)
        : undefined;

      return {
        year,
        investment,
        value,
        inflationAdjusted,
      };
    });

    setResults({
      maturityValue,
      totalInterest,
      totalInvestment,
      inflationAdjustedMaturity: considerInflation
        ? maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)
        : undefined,
      inflationAdjustedReturns: considerInflation
        ? (maturityValue / Math.pow(1 + inflationRate / 100, timePeriod)) - totalInvestment
        : undefined,
      chartData,
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
          label="Monthly Installment"
          value={monthlyInstallment}
          onChange={(value) => setMonthlyInstallment(typeof value === 'number' ? value : 0)}
          min={100}
          max={100000}
          step={100}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={monthlyInstallment}
          onChange={(_, newValue) => setMonthlyInstallment(newValue as number)}
          min={100}
          max={100000}
          step={100}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
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

  const resultCards = [
    { label: 'Maturity Value', value: formatCurrency(results.maturityValue), variant: 'primary' as const },
    { label: 'Total Interest', value: formatCurrency(results.totalInterest), variant: 'secondary' as const },
    { label: 'Total Investment', value: formatCurrency(results.totalInvestment), variant: 'purple' as const },
  ];

  const inflationCards = considerInflation
    ? [
        { label: 'Inflation Adjusted Value', value: formatCurrency(results.inflationAdjustedMaturity ?? 0), bgcolor: '#eafafd' },
        { label: 'Inflation Adjusted Returns', value: formatCurrency(results.inflationAdjustedReturns ?? 0), bgcolor: '#fbeeee' },
      ]
    : [];

  const resultSection = (
    <Box>
      <CalculatorResultCards items={resultCards} />
      {considerInflation && <CalculatorResultCards items={inflationCards} sectionTitle="Inflation Adjusted" />}
      
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
              dataKey="value"
              name="Value"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            {considerInflation && (
              <Line
                type="monotone"
                dataKey="inflationAdjusted"
                name="Inflation Adjusted"
                stroke={colors.accent.purple}
                strokeWidth={2}
                dot={{ fill: colors.accent.purple, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Interest', key: 'interest' },
    { label: 'Value', key: 'value' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted', key: 'inflationAdjusted' }] : []),
  ];

  const tableRows = results.chartData.filter(row => row.year > 0).map((row) => ({
    year: row.year,
    investment: formatCurrency(row.investment),
    interest: formatCurrency(row.value - row.investment),
    value: formatCurrency(row.value),
    ...(considerInflation ? { inflationAdjusted: formatCurrency(row.inflationAdjusted ?? 0) } : {}),
  }));

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="RD Calculator"
      description="Calculate returns on your Recurring Deposits and plan your regular investments with our comprehensive calculator."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default RdCalculator; 