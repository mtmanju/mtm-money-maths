import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  InputAdornment,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
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

interface PpfResults {
  maturityValue: number;
  totalInvestment: number;
  totalInterest: number;
  chartData: Array<{
    year: number;
    investment: number;
    interest: number;
    value: number;
    inflationAdjusted?: number;
  }>;
}

const PpfCalculator: React.FC = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(15);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<PpfResults>({
    maturityValue: 0,
    totalInvestment: 0,
    totalInterest: 0,
    chartData: [],
  });

  useEffect(() => {
    calculatePpf();
  }, [yearlyInvestment, interestRate, tenure, considerInflation, inflationRate]);

  const calculatePpf = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;
    let balance = 0;
    const chartData = [];

    for (let year = 0; year <= tenure; year++) {
      const yearlyInvestment = 150000; // Fixed yearly investment for PPF
      const yearlyInterest = balance * (interestRate / 100);
      balance += yearlyInvestment + yearlyInterest;

      if (year > 0) {
        chartData.push({
          year,
          investment: yearlyInvestment * year,
          interest: balance - (yearlyInvestment * year),
          value: balance,
          inflationAdjusted: considerInflation
            ? balance / Math.pow(1 + inflationRate / 100, year)
            : undefined,
        });
      }
    }

    setResults({
      maturityValue: balance,
      totalInvestment: yearlyInvestment * tenure,
      totalInterest: balance - (yearlyInvestment * tenure),
      chartData,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleYearlyInvestmentChange = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    setYearlyInvestment(Math.min(Math.max(numValue, 500), 150000));
  };

  const handleInterestRateChange = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    setInterestRate(Math.min(Math.max(numValue, 1), 15));
  };

  const handleTenureChange = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    setTenure(Math.min(Math.max(numValue, 1), 50));
  };

  const handleInflationRateChange = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    setInflationRate(Math.min(Math.max(numValue, 1), 15));
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Yearly Investment"
          value={yearlyInvestment}
          onChange={handleYearlyInvestmentChange}
          min={500}
          max={150000}
          step={500}
          InputProps={{
            startAdornment: (
              <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={yearlyInvestment}
          onChange={(_, newValue) => setYearlyInvestment(newValue as number)}
          min={500}
          max={150000}
          step={500}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => formatCurrency(v)}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate"
          value={interestRate}
          onChange={handleInterestRateChange}
          min={1}
          max={15}
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
          max={15}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Tenure (Years)"
          value={tenure}
          onChange={handleTenureChange}
          min={1}
          max={50}
          step={1}
          InputProps={{
            startAdornment: (
              <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
            ),
          }}
        />
        <StyledSlider
          value={tenure}
          onChange={(_, newValue) => setTenure(newValue as number)}
          min={1}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={considerInflation}
              onChange={(e) => setConsiderInflation(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.accent.primary,
                  '& + .MuiSwitch-track': {
                    backgroundColor: colors.accent.primary,
                  },
                },
              }}
            />
          }
          label="Consider Inflation"
        />
        {considerInflation && (
          <CustomNumberField
            label="Inflation Rate"
            value={inflationRate}
            onChange={handleInflationRateChange}
            min={1}
            max={15}
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
        )}
      </Box>
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Maturity Value', value: formatCurrency(results.maturityValue), variant: 'primary' as const },
    { label: 'Total Investment', value: formatCurrency(results.totalInvestment), variant: 'secondary' as const },
    { label: 'Total Interest', value: formatCurrency(results.totalInterest), variant: 'purple' as const },
  ];

  const inflationCards = considerInflation
    ? [
        { label: 'Inflation Adjusted Value', value: formatCurrency(results.chartData[results.chartData.length - 1]?.inflationAdjusted ?? 0), bgcolor: '#eafafd' },
        { label: 'Inflation Adjusted Returns', value: formatCurrency((results.chartData[results.chartData.length - 1]?.inflationAdjusted ?? 0) - results.totalInvestment), bgcolor: '#fbeeee' },
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
              dataKey="interest"
              name="Interest"
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
    interest: formatCurrency(row.interest),
    value: formatCurrency(row.value),
    ...(considerInflation ? { inflationAdjusted: formatCurrency(row.inflationAdjusted ?? 0) } : {}),
  }));

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="PPF Calculator"
      description="Calculate your Public Provident Fund returns and plan your long-term investments."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default PpfCalculator; 