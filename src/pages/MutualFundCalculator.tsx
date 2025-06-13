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
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  MonetizationOn as MonetizationOnIcon,
  Speed as SpeedIcon,
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
import { CalculatorTemplate, StyledPaper, ResultCard, StyledTextField, StyledSlider } from '../components/CalculatorTemplate';

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#FFFFFF',
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(18px)',
  borderRadius: '24px',
  border: '1.5px solid rgba(90,107,255,0.18)',
  boxShadow: '0 8px 32px rgba(90, 107, 255, 0.10)',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  height: '400px',
}));

const CompactSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(34, 40, 70, 0.92)',
  borderRadius: '18px',
  boxShadow: '0 4px 16px rgba(90, 107, 255, 0.12)',
  border: '1.5px solid #5A6BFF',
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  gap: theme.spacing(2),
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  '& .label': {
    color: '#A7BFFF',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: 2,
    display: 'block',
  },
  '& .value': {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.25rem',
  },
}));

const YearWiseTable = styled('table')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(4),
  borderCollapse: 'collapse',
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '12px',
  overflow: 'hidden',
  fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
  fontSize: '1rem',
  boxShadow: '0 2px 8px rgba(90,107,255,0.06)',
  color: '#232946',
  'th, td': {
    padding: theme.spacing(1, 2),
    borderBottom: '1px solid #E0E7FF',
    textAlign: 'center',
  },
  'th': {
    background: '#E0E7FF',
    color: '#5A6BFF',
    fontWeight: 700,
  },
  'tr:last-child td': {
    borderBottom: 'none',
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
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(90,107,255,0.08)',
  border: '1.5px solid #e0e7ef',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 1.5),
  textAlign: 'center',
  color: '#232946',
  position: 'relative',
}));

const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: 28,
  marginBottom: theme.spacing(0.5),
  color: '#5A6BFF',
}));

const StatLabel = styled('span')(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#7F8FA6',
  fontWeight: 500,
  marginBottom: 2,
}));

const StatValue = styled('span')(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.25rem',
  color: '#232946',
}));

const getStatColor = (value: number, invested: number, theme: any) => {
  if (value > invested) return theme.palette.success.main;
  if (value < invested) return theme.palette.error.main;
  return '#232946';
};

const MutualFundCalculator: React.FC = () => {
  const theme = useTheme();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [considerInflation, setConsiderInflation] = useState<boolean>(true);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    realMaturityValue: 0,
    chartData: [] as any[],
  });

  useEffect(() => {
    calculateReturns();
  }, [investmentAmount, expectedReturn, investmentPeriod, inflationRate, considerInflation]);

  const calculateReturns = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = investmentPeriod * 12;
    const totalInvestment = investmentAmount * months;
    
    // Future Value Formula for SIP
    const maturityValue = investmentAmount * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalReturns = maturityValue - totalInvestment;

    // Calculate real value considering inflation
    const realMaturityValue = considerInflation
      ? maturityValue / Math.pow(1 + inflationRate / 100, investmentPeriod)
      : maturityValue;

    // Generate chart data
    const chartData = Array.from({ length: investmentPeriod + 1 }, (_, i) => {
      const year = i;
      const yearInvestment = investmentAmount * 12 * (year + 1);
      const yearValue = investmentAmount * 
        ((Math.pow(1 + monthlyRate, (year + 1) * 12) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      const yearRealValue = considerInflation
        ? yearValue / Math.pow(1 + inflationRate / 100, year + 1)
        : yearValue;

      return {
        year,
        investment: yearInvestment,
        value: yearValue,
        realValue: yearRealValue,
      };
    });

    setResults({
      totalInvestment,
      totalReturns,
      maturityValue,
      realMaturityValue,
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
    <Box>
      <Box sx={{ mb: 4 }}>
        <StyledTextField
          fullWidth
          type="number"
          label="Monthly Investment"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon color="primary" />
              </InputAdornment>
            ),
            style: { color: theme.palette.text.primary },
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(90,107,255,0.04)' }}
        />
        <StyledSlider
          value={investmentAmount}
          onChange={(_, value) => setInvestmentAmount(value as number)}
          min={1000}
          max={100000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
          sx={{ color: theme.palette.primary.main, height: 6 }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <StyledTextField
          fullWidth
          type="number"
          label="Expected Return (p.a.)"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon color="primary" />
              </InputAdornment>
            ),
            style: { color: theme.palette.text.primary },
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(90,107,255,0.04)' }}
        />
        <StyledSlider
          value={expectedReturn}
          onChange={(_, value) => setExpectedReturn(value as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
          sx={{ color: theme.palette.primary.main, height: 6 }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <StyledTextField
          fullWidth
          type="number"
          label="Investment Period (Years)"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon color="primary" />
              </InputAdornment>
            ),
            style: { color: theme.palette.text.primary },
          }}
          sx={{ mb: 2, background: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(90,107,255,0.04)' }}
        />
        <StyledSlider
          value={investmentPeriod}
          onChange={(_, value) => setInvestmentPeriod(value as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} years`}
          sx={{ color: theme.palette.primary.main, height: 6 }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={considerInflation}
              onChange={(e) => setConsiderInflation(e.target.checked)}
              color="primary"
            />
          }
          label="Consider Inflation"
        />
        {considerInflation && (
          <Box sx={{ mt: 2 }}>
            <StyledTextField
              fullWidth
              type="number"
              label="Inflation Rate (p.a.)"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingUpIcon color="primary" />
                  </InputAdornment>
                ),
                style: { color: theme.palette.text.primary },
              }}
              sx={{ mb: 2, background: '#fff', borderRadius: 2, boxShadow: '0 2px 8px rgba(90,107,255,0.04)' }}
            />
            <StyledSlider
              value={inflationRate}
              onChange={(_, value) => setInflationRate(value as number)}
              min={1}
              max={15}
              step={0.5}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              sx={{ color: theme.palette.primary.main, height: 6 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );

  const resultSection = (
    <Box>
      <StatBar>
        <StatCard>
          <StatIcon><MonetizationOnIcon /></StatIcon>
          <StatLabel>Total Investment</StatLabel>
          <StatValue>{formatCurrency(results.totalInvestment)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><TrendingUpIcon /></StatIcon>
          <StatLabel>Total Returns</StatLabel>
          <StatValue sx={{ color: getStatColor(results.totalReturns, 0, theme) }}>{formatCurrency(results.totalReturns)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><AccountBalanceIcon /></StatIcon>
          <StatLabel>Maturity Value</StatLabel>
          <StatValue sx={{ color: getStatColor(results.maturityValue, results.totalInvestment, theme) }}>{formatCurrency(results.maturityValue)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><SpeedIcon /></StatIcon>
          <StatLabel>Real Value (After Inflation)</StatLabel>
          <StatValue sx={{ color: getStatColor(results.realMaturityValue, results.totalInvestment, theme) }}>{formatCurrency(results.realMaturityValue)}</StatValue>
        </StatCard>
      </StatBar>
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, background: 'linear-gradient(90deg, #0ea5e9 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
          Investment Growth Over Time
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={results.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="year"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            />
            <RechartsTooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="investment"
              name="Total Investment"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Maturity Value"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              dot={false}
            />
            {considerInflation && (
              <Line
                type="monotone"
                dataKey="realValue"
                name="Real Value"
                stroke={theme.palette.error.main}
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableSection = (
    <YearWiseTable>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Invested</th>
          <th>Maturity Value</th>
          {considerInflation && <th>Real Value (After Inflation)</th>}
        </tr>
      </thead>
      <tbody>
        {results.chartData.map((row, idx) => (
          <tr key={idx}>
            <td>{row.year + 1}</td>
            <td>{formatCurrency(row.investment)}</td>
            <td>{formatCurrency(row.value)}</td>
            {considerInflation && <td>{formatCurrency(row.realValue)}</td>}
          </tr>
        ))}
      </tbody>
    </YearWiseTable>
  );

  return (
    <CalculatorTemplate
      title="Mutual Fund Calculator"
      description="Calculate your mutual fund returns and plan your investments better"
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default MutualFundCalculator; 