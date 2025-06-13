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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const RetirementCalculator: React.FC = () => {
  const theme = useTheme();
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(20000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<{
    requiredCorpus: number;
    projectedCorpus: number;
    shortfall: number;
    monthlyInvestmentNeeded: number;
    chartData: any[];
    yearlyExpenses: any[];
  }>({
    requiredCorpus: 0,
    projectedCorpus: 0,
    shortfall: 0,
    monthlyInvestmentNeeded: 0,
    chartData: [],
    yearlyExpenses: [],
  });

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;
    const monthlyRate = expectedReturn / 12 / 100;
    const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Calculate required corpus
    const monthlyExpensesAtRetirement = monthlyExpenses * inflationFactor;
    const yearlyExpensesAtRetirement = monthlyExpensesAtRetirement * 12;
    const requiredCorpus = yearlyExpensesAtRetirement * retirementYears;

    // Calculate projected corpus
    const projectedCorpus = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement) +
      monthlyInvestment * 12 * ((Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1) / (expectedReturn / 100));

    const shortfall = Math.max(0, requiredCorpus - projectedCorpus);

    // Calculate required monthly investment to meet the shortfall
    const monthlyInvestmentNeeded = shortfall > 0
      ? (shortfall * (expectedReturn / 100)) / (12 * (Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1))
      : 0;

    // Generate chart data
    const chartData = [];
    for (let i = 0; i <= yearsToRetirement; i++) {
      const yearValue = currentSavings * Math.pow(1 + expectedReturn / 100, i) +
        monthlyInvestment * 12 * ((Math.pow(1 + expectedReturn / 100, i) - 1) / (expectedReturn / 100));
      chartData.push({
        year: i,
        age: currentAge + i,
        corpus: yearValue,
        required: requiredCorpus,
      });
    }

    // Generate yearly expenses data
    const yearlyExpenses = [];
    for (let i = 0; i <= retirementYears; i++) {
      const yearExpense = monthlyExpensesAtRetirement * 12 * Math.pow(1 + inflationRate / 100, i);
      yearlyExpenses.push({
        year: i,
        age: retirementAge + i,
        expense: yearExpense,
      });
    }

    setResults({
      requiredCorpus,
      projectedCorpus,
      shortfall,
      monthlyInvestmentNeeded,
      chartData,
      yearlyExpenses,
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpenses,
    currentSavings,
    monthlyInvestment,
    expectedReturn,
    inflationRate,
  ]);

  const formSection = (
    <StyledPaper>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Current Age
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
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
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Retirement Age
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
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
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Life Expectancy
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={lifeExpectancy}
          onChange={(e) => setLifeExpectancy(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
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
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Monthly Expenses
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={monthlyExpenses}
          onChange={(_, newValue) => setMonthlyExpenses(newValue as number)}
          min={10000}
          max={200000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Current Savings
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={currentSavings}
          onChange={(_, newValue) => setCurrentSavings(newValue as number)}
          min={0}
          max={10000000}
          step={10000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Monthly Investment
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={monthlyInvestment}
          onChange={(_, newValue) => setMonthlyInvestment(newValue as number)}
          min={0}
          max={200000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Expected Return (p.a.)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={expectedReturn}
          onChange={(_, newValue) => setExpectedReturn(newValue as number)}
          min={1}
          max={20}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Inflation Rate (p.a.)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={inflationRate}
          onChange={(e) => setInflationRate(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={inflationRate}
          onChange={(_, newValue) => setInflationRate(newValue as number)}
          min={1}
          max={15}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      {results && (
        <>
          <CompactSummary>
            <SummaryItem>
              <span className="label">Required Corpus</span>
              <span className="value">{formatCurrency(results.requiredCorpus)}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">Projected Corpus</span>
              <span className="value">{formatCurrency(results.projectedCorpus)}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">Shortfall</span>
              <span className="value">{formatCurrency(results.shortfall)}</span>
            </SummaryItem>
          </CompactSummary>

          <StatBar>
            <StatCard>
              <StatIcon>
                <TrendingUpIcon />
              </StatIcon>
              <StatLabel>Additional Monthly Investment Needed</StatLabel>
              <StatValue>{formatCurrency(results.monthlyInvestmentNeeded)}</StatValue>
            </StatCard>
            <StatCard>
              <StatIcon>
                <AccountBalanceIcon />
              </StatIcon>
              <StatLabel>Current Savings</StatLabel>
              <StatValue>{formatCurrency(currentSavings)}</StatValue>
            </StatCard>
            <StatCard>
              <StatIcon>
                <AttachMoneyIcon />
              </StatIcon>
              <StatLabel>Monthly Investment</StatLabel>
              <StatValue>{formatCurrency(monthlyInvestment)}</StatValue>
            </StatCard>
          </StatBar>

          <ChartContainer>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Corpus Growth Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                <XAxis dataKey="age" stroke="#7F8FA6" />
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
                  dataKey="corpus"
                  name="Projected Corpus"
                  stroke="#5A6BFF"
                  strokeWidth={2}
                  dot={{ fill: '#5A6BFF', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="required"
                  name="Required Corpus"
                  stroke="#00F5FF"
                  strokeWidth={2}
                  dot={{ fill: '#00F5FF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </>
      )}
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Retirement Calculator"
      description="Plan your retirement corpus, expenses, and investments for a secure future."
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default RetirementCalculator; 