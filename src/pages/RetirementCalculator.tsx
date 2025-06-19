import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
  TrendingUp as TrendingUpIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

interface RetirementResults {
  corpusNeeded: number;
  monthlyInvestment: number;
  totalInvestment: number;
  totalReturns: number;
  chartData: Array<{
    year: number;
    corpus: number;
    investment: number;
    returns: number;
    total: number;
  }>;
}

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [results, setResults] = useState<RetirementResults>({
    corpusNeeded: 0,
    monthlyInvestment: 0,
    totalInvestment: 0,
    totalReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, monthlyExpenses, inflationRate, expectedReturn, lifeExpectancy]);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // Calculate monthly expenses at retirement considering inflation
    const monthlyExpensesAtRetirement = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const yearlyExpensesAtRetirement = monthlyExpensesAtRetirement * 12;

    // Calculate corpus needed at retirement
    const corpusNeeded = yearlyExpensesAtRetirement * (1 - Math.pow(1 + inflationRate / 100, yearsInRetirement)) / (1 - (1 + inflationRate / 100));

    // Calculate monthly investment needed
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    const monthlyInvestment = corpusNeeded / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    // Generate chart data
    const chartData = Array.from({ length: yearsToRetirement + 1 }, (_, i) => {
      const year = i;
      const investment = monthlyInvestment * 12 * year;
      const returns = investment * (expectedReturn / 100 / 12);
      const total = investment + returns;

      return {
        year,
        corpus: total,
        investment,
        returns,
        total,
      };
    });

    setResults({
      corpusNeeded,
      monthlyInvestment,
      totalInvestment: monthlyInvestment * totalMonths,
      totalReturns: corpusNeeded - (monthlyInvestment * totalMonths),
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
          label="Current Age"
          value={currentAge}
          onChange={(value) => setCurrentAge(typeof value === 'number' ? value : 0)}
          min={18}
          max={70}
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
          value={currentAge}
          onChange={(_, newValue) => setCurrentAge(newValue as number)}
          min={18}
          max={70}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Retirement Age"
          value={retirementAge}
          onChange={(value) => setRetirementAge(typeof value === 'number' ? value : 0)}
          min={45}
          max={75}
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
          value={retirementAge}
          onChange={(_, newValue) => setRetirementAge(newValue as number)}
          min={45}
          max={75}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Monthly Expenses"
          value={monthlyExpenses}
          onChange={(value) => setMonthlyExpenses(typeof value === 'number' ? value : 0)}
          min={10000}
          max={200000}
          step={5000}
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
          value={monthlyExpenses}
          onChange={(_, newValue) => setMonthlyExpenses(newValue as number)}
          min={10000}
          max={200000}
          step={5000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Inflation Rate (p.a.)"
          value={inflationRate}
          onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={12}
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
          min={1}
          max={12}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Expected Return (p.a.)"
          value={expectedReturn}
          onChange={(value) => setExpectedReturn(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
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
          max={20}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Life Expectancy"
          value={lifeExpectancy}
          onChange={(value) => setLifeExpectancy(typeof value === 'number' ? value : 0)}
          min={60}
          max={100}
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
          value={lifeExpectancy}
          onChange={(_, newValue) => setLifeExpectancy(newValue as number)}
          min={60}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Corpus Needed', value: formatCurrency(results.corpusNeeded), bgcolor: '#eafafd' },
    { label: 'Monthly Investment', value: formatCurrency(results.monthlyInvestment), bgcolor: '#fbeeee' },
    { label: 'Total Investment', value: formatCurrency(results.totalInvestment), bgcolor: '#f3f1fa' },
    { label: 'Total Returns', value: formatCurrency(results.totalReturns), bgcolor: '#eafafd' },
  ];

  const resultSection = (
    <Box>
      <CalculatorResultCards items={resultCards} />
      
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
              dataKey="returns"
              name="Returns"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Value"
              stroke="#e57373"
              strokeWidth={2}
              dot={{ fill: '#e57373', strokeWidth: 2 }}
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
    year: row.year + 1,
    investment: formatCurrency(row.investment),
    returns: formatCurrency(row.returns),
    total: formatCurrency(row.total),
  }));

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="Retirement Calculator"
      description="Plan your retirement and calculate the corpus needed for a comfortable life."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default RetirementCalculator; 