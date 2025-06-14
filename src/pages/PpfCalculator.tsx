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
  ResultCard, 
  ChartContainer, 
  StyledTableContainer,
  chartAxisStyle,
  chartTooltipStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartLegendStyle,
} from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

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
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
          min={1}
          max={15}
          step={0.1}
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

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard bgcolor="#eafafd">
          <span className="label">Maturity Value</span>
          <span className="value">{formatCurrency(results.maturityValue)}</span>
        </ResultCard>
        <ResultCard bgcolor="#fbeeee">
          <span className="label">Total Investment</span>
          <span className="value">{formatCurrency(results.totalInvestment)}</span>
        </ResultCard>
        <ResultCard bgcolor="#f3f1fa">
          <span className="label">Total Interest</span>
          <span className="value">{formatCurrency(results.totalInterest)}</span>
        </ResultCard>
      </Box>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Investment Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData} style={{ fontFamily: typography.fontFamily }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis
              dataKey="year"
              stroke={colors.secondary}
              tick={chartAxisStyle}
              axisLine={{ stroke: colors.border }}
              tickLine={{ stroke: colors.border }}
            />
            <YAxis
              stroke={colors.secondary}
              tick={chartAxisStyle}
              axisLine={{ stroke: colors.border }}
              tickLine={{ stroke: colors.border }}
              tickFormatter={(value) => value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            />
            <RechartsTooltip
              contentStyle={chartTooltipStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              formatter={(value) => value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line
              type="monotone"
              dataKey="investment"
              name="Investment"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="interest"
              name="Interest"
              stroke={colors.accent.primary}
              strokeWidth={2}
              dot={{ fill: colors.accent.primary, strokeWidth: 2 }}
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
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.value)}</td>
              {considerInflation && (
                <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>
                  {formatCurrency(row.inflationAdjusted || 0)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
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