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
  CalendarMonth as CalendarMonthIcon,
  Percent as PercentIcon,
  AccountBalance as AccountBalanceIcon,
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
  StyledTableContainer,
} from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';

interface ChartDataPoint {
  year: number;
  contribution: number;
  corpus: number;
  totalInterest: number;
}

interface NPSResults {
  corpusAtRetirement: number;
  totalContribution: number;
  totalInterest: number;
  monthlyPension: number;
  chartData: ChartDataPoint[];
}

const NpsCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [timePeriod, setTimePeriod] = useState<number>(20);
  const [annuityReturn, setAnnuityReturn] = useState<number>(6);
  const [results, setResults] = useState<NPSResults>({
    corpusAtRetirement: 0,
    totalContribution: 0,
    totalInterest: 0,
    monthlyPension: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateNPS();
  }, [monthlyInvestment, expectedReturn, timePeriod, annuityReturn]);

  const calculateNPS = () => {
    const totalMonths = timePeriod * 12;
    
    // Calculate corpus at retirement
    const corpusAtRetirement = monthlyInvestment * 
      ((Math.pow(1 + expectedReturn / 100 / 12, totalMonths) - 1) / (expectedReturn / 100 / 12)) * 
      (1 + expectedReturn / 100 / 12);
    
    const totalContribution = monthlyInvestment * totalMonths;
    const totalInterest = corpusAtRetirement - totalContribution;
    
    // Calculate monthly pension (assuming 40% of corpus is used for annuity)
    const annuityCorpus = corpusAtRetirement * 0.4;
    const monthlyPension = annuityCorpus * annuityReturn / 100 / 12;

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const months = year * 12;
      const corpus = monthlyInvestment * 
        ((Math.pow(1 + expectedReturn / 100 / 12, months) - 1) / (expectedReturn / 100 / 12)) * 
        (1 + expectedReturn / 100 / 12);
      const contribution = monthlyInvestment * months;
      const totalInterest = corpus - contribution;

      return {
        year,
        contribution,
        corpus,
        totalInterest
      };
    });

    setResults({
      corpusAtRetirement,
      totalContribution,
      totalInterest,
      monthlyPension,
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

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Monthly Investment"
          value={monthlyInvestment}
          onChange={(value) => setMonthlyInvestment(typeof value === 'number' ? value : 0)}
          min={500}
          max={50000}
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
          max={50000}
          step={500}
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

      <Box>
        <CustomNumberField
          fullWidth
          label="Annuity Return (p.a.)"
          value={annuityReturn}
          onChange={(value) => setAnnuityReturn(typeof value === 'number' ? value : 0)}
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
          value={annuityReturn}
          onChange={(_, newValue) => setAnnuityReturn(newValue as number)}
          min={1}
          max={30}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Maturity Value', value: formatCurrency(results.corpusAtRetirement), bgcolor: '#eafafd' },
    { label: 'Total Interest', value: formatCurrency(results.totalInterest), bgcolor: '#fbeeee' },
    { label: 'Total Investment', value: formatCurrency(results.totalContribution), bgcolor: '#f3f1fa' },
  ];

  const statsCards = [
    { label: 'Total Investment', value: formatCurrency(results.totalContribution), variant: 'primary' as const },
    { label: 'Total Returns', value: formatCurrency(results.totalInterest), variant: 'secondary' as const },
    { label: 'Maturity Value', value: formatCurrency(results.corpusAtRetirement), variant: 'purple' as const },
  ];

  const resultSection = (
    <Box>
      <CalculatorResultCards items={statsCards} />
      
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
              formatter={(value) => formatCurrency(value as number)}
            />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line
              type="monotone"
              dataKey="contribution"
              name="Investment"
              stroke={colors.accent.primary}
              strokeWidth={2}
              dot={{ fill: colors.accent.primary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="totalInterest"
              name="Interest"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="corpus"
              name="Total Value"
              stroke={colors.accent.purple}
              strokeWidth={2}
              dot={{ fill: colors.accent.purple, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableRows = results.chartData
    .filter(row => row.year > 0)
    .map((row) => ({
      year: row.year,
      contribution: formatCurrency(row.contribution),
      totalInterest: formatCurrency(row.totalInterest),
      corpus: formatCurrency(row.corpus),
    }));

  const tableSection = (
    <StyledTableContainer>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Year</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Investment</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Interest</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>{row.year}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{row.contribution}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{row.totalInterest}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{row.corpus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  );

  return (
    <CalculatorTemplate
      title="NPS Calculator"
      description="Calculate your National Pension Scheme returns and plan your retirement corpus."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default NpsCalculator; 