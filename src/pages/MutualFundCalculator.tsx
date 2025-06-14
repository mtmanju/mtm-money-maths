import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  TableContainer,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { 
  StyledPaper, 
  StyledSlider, 
  ChartContainer, 
  chartAxisStyle,
  chartTooltipStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartLegendStyle,
} from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';

interface ChartDataPoint {
  year: number;
  investment: number;
  returns: number;
  total: number;
}

const MutualFundCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    absoluteReturns: number;
    chartData: ChartDataPoint[];
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    absoluteReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateMutualFund();
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  const calculateMutualFund = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    const totalInvestment = monthlyInvestment * months;
    
    let maturityValue = 0;
    const chartData: ChartDataPoint[] = [];
    
    for (let year = 1; year <= timePeriod; year++) {
      const yearInvestment = monthlyInvestment * 12;
      const yearReturns = maturityValue * (expectedReturn / 100);
      maturityValue = (maturityValue + yearInvestment) * (1 + expectedReturn / 100);
      
      chartData.push({
        year,
        investment: yearInvestment,
        returns: yearReturns,
        total: maturityValue
      });
    }
    
    const totalReturns = maturityValue - totalInvestment;
    const absoluteReturns = (totalReturns / totalInvestment) * 100;
    
    setResults({
      totalInvestment,
      totalReturns,
      maturityValue,
      absoluteReturns,
      chartData
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
                <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
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
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Maturity Value', value: formatCurrency(results.maturityValue), variant: 'primary' as const },
    { label: 'Total Investment', value: formatCurrency(results.totalInvestment), variant: 'secondary' as const },
    { label: 'Total Returns', value: formatCurrency(results.totalReturns), variant: 'purple' as const },
  ];

  const statsCards = [
    { 
      label: 'Monthly Investment', 
      value: formatCurrency(monthlyInvestment), 
      bgcolor: '#f8f9fc' 
    },
    { 
      label: 'Expected Return', 
      value: `${expectedReturn}% p.a.`, 
      bgcolor: '#f8f9fc' 
    },
    { 
      label: 'Time Period', 
      value: `${timePeriod} Years`, 
      bgcolor: '#f8f9fc' 
    },
  ];

  const resultSection = (
    <Box>
      <CalculatorResultCards items={resultCards} />
      <CalculatorResultCards items={statsCards} sectionTitle="Investment Statistics" />
      
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Investment Growth Over Time
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

  const tableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
  ];

  const tableRows = results.chartData.map((row) => ({
    year: row.year,
    investment: formatCurrency(row.investment),
    returns: formatCurrency(row.returns),
    total: formatCurrency(row.total),
  }));

  const tableSection = (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
        Yearly Breakdown
      </Typography>
      <CalculatorTable columns={tableColumns} rows={tableRows} />
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Mutual Fund Calculator"
      description="Calculate your mutual fund returns and plan your investments."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default MutualFundCalculator; 