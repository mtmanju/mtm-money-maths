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
import { CalculatorTemplate, StyledPaper, ResultCard, StyledTextField, StyledSlider, ChartContainer } from '../components/CalculatorTemplate';

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

const CompoundCalculator: React.FC = () => {
  const theme = useTheme();
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [years, setYears] = useState<number>(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState<'yearly' | 'monthly' | 'quarterly'>('yearly');
  const [results, setResults] = useState<{
    finalAmount: number;
    totalInterest: number;
    chartData: any[];
  }>({
    finalAmount: 0,
    totalInterest: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, interestRate, years, compoundingFrequency]);

  const calculateCompoundInterest = () => {
    const frequencyMap = {
      yearly: 1,
      quarterly: 4,
      monthly: 12,
    };

    const n = frequencyMap[compoundingFrequency];
    const r = interestRate / 100;
    const t = years;

    const finalAmount = principal * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - principal;

    // Generate chart data
    const chartData = Array.from({ length: years + 1 }, (_, i) => {
      const year = i;
      const amount = principal * Math.pow(1 + r / n, n * year);
      return {
        year,
        amount: Math.round(amount),
        interest: Math.round(amount - principal),
      };
    });

    setResults({
      finalAmount,
      totalInterest,
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
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Principal Amount
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={principal}
          onChange={(_, newValue) => setPrincipal(newValue as number)}
          min={1000}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Interest Rate (p.a.)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
          min={1}
          max={20}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Time Period (Years)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={years}
          onChange={(_, newValue) => setYears(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Compounding Frequency
        </Typography>
        <FormControl fullWidth>
          <Select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value as 'yearly' | 'monthly' | 'quarterly')}
            sx={{
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e7ef',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2563eb',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#10b981',
                borderWidth: '2px',
              },
            }}
          >
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <CompactSummary>
        <SummaryItem>
          <span className="label">Final Amount</span>
          <span className="value">{formatCurrency(results.finalAmount)}</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Total Interest</span>
          <span className="value">{formatCurrency(results.totalInterest)}</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Principal</span>
          <span className="value">{formatCurrency(principal)}</span>
        </SummaryItem>
      </CompactSummary>

      <StatBar>
        <StatCard>
          <StatIcon>
            <AttachMoneyIcon />
          </StatIcon>
          <StatLabel>Principal</StatLabel>
          <StatValue>{formatCurrency(principal)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon>
            <PercentIcon />
          </StatIcon>
          <StatLabel>Interest Rate</StatLabel>
          <StatValue>{interestRate}%</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon>
            <CalendarMonthIcon />
          </StatIcon>
          <StatLabel>Time Period</StatLabel>
          <StatValue>{years} years</StatValue>
        </StatCard>
      </StatBar>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
          Investment Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
            <XAxis dataKey="year" stroke="#7F8FA6" />
            <YAxis stroke="#7F8FA6" />
            <RechartsTooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #E0E7FF',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(90,107,255,0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              name="Total Amount"
              stroke="#5A6BFF"
              strokeWidth={2}
              dot={{ fill: '#5A6BFF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="interest"
              name="Interest Earned"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Compound Interest Calculator"
      description="Calculate how your investments grow over time with compound interest"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default CompoundCalculator; 