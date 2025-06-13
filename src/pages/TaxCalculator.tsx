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
  BarChart,
  Bar,
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

const TaxCalculator: React.FC = () => {
  const theme = useTheme();
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [income, setIncome] = useState<number>(1000000);
  const [deductions, setDeductions] = useState<number>(150000);
  const [results, setResults] = useState<any>(null);

  const newRegimeSlabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 0.05 },
    { min: 800000, max: 1200000, rate: 0.10 },
    { min: 1200000, max: 1600000, rate: 0.15 },
    { min: 1600000, max: 2000000, rate: 0.20 },
    { min: 2000000, max: 2400000, rate: 0.25 },
    { min: 2400000, max: Infinity, rate: 0.30 },
  ];

  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 0.05 },
    { min: 500000, max: 1000000, rate: 0.20 },
    { min: 1000000, max: Infinity, rate: 0.30 },
  ];

  const calculateTax = () => {
    const taxableIncome = regime === 'old' ? income - deductions : income;
    const slabs = regime === 'old' ? oldRegimeSlabs : newRegimeSlabs;
    
    let totalTax = 0;
    const taxBreakdown = slabs.map(slab => {
      const slabIncome = Math.min(
        Math.max(0, taxableIncome - slab.min),
        slab.max - slab.min
      );
      const slabTax = slabIncome * slab.rate;
      totalTax += slabTax;
      return {
        range: `${formatCurrency(slab.min)} - ${slab.max === Infinity ? 'Above' : formatCurrency(slab.max)}`,
        income: slabIncome,
        tax: slabTax,
        rate: slab.rate * 100,
      };
    });

    // Apply tax rebate under Section 87A
    let rebate = 0;
    if (regime === 'new' && taxableIncome <= 1200000) {
      rebate = Math.min(totalTax, 60000); // New rebate limit of Rs. 60,000
    } else if (regime === 'old' && taxableIncome <= 500000) {
      rebate = Math.min(totalTax, 12500); // Old regime rebate
    }
    totalTax -= rebate;

    // Apply standard deduction for salaried individuals
    const standardDeduction = regime === 'new' ? 75000 : 0;
    if (taxableIncome > standardDeduction) {
      totalTax = totalTax * (1 - standardDeduction / taxableIncome);
    }

    const cess = totalTax * 0.04;
    const finalTax = totalTax + cess;

    setResults({
      grossIncome: income,
      taxableIncome,
      totalTax: finalTax,
      effectiveRate: (finalTax / income) * 100,
      taxBreakdown,
      deductions: regime === 'old' ? deductions : 0,
      rebate,
      standardDeduction,
      netIncome: income - finalTax,
      monthlyNetIncome: (income - finalTax) / 12,
    });
  };

  useEffect(() => {
    calculateTax();
  }, [income, deductions, regime]);

  const formSection = (
    <StyledPaper>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Tax Regime Selection
        </Typography>
        <StyledTextField>
          <FormControl fullWidth>
            <InputLabel>Select Tax Regime</InputLabel>
            <Select
              value={regime}
              label="Select Tax Regime"
              onChange={(e) => setRegime(e.target.value as 'old' | 'new')}
            >
              <MenuItem value="new">New Regime (Default) - 2025-26</MenuItem>
              <MenuItem value="old">Old Regime (with Deductions) - 2025-26</MenuItem>
            </Select>
          </FormControl>
        </StyledTextField>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Income Details
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBalanceIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={income}
          onChange={(_, newValue) => setIncome(newValue as number)}
          min={0}
          max={10000000}
          step={100000}
          valueLabelDisplay="auto"
        />
      </Box>

      {regime === 'old' && (
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
            Deductions
          </Typography>
          <StyledTextField
            fullWidth
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledSlider
            value={deductions}
            onChange={(_, newValue) => setDeductions(newValue as number)}
            min={0}
            max={500000}
            step={10000}
            valueLabelDisplay="auto"
          />
        </Box>
      )}
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      {results && (
        <>
          <CompactSummary>
            <SummaryItem>
              <span className="label">Total Tax</span>
              <span className="value">{formatCurrency(results.totalTax)}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">Effective Tax Rate</span>
              <span className="value">{formatPercentage(results.effectiveRate)}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="label">Net Annual Income</span>
              <span className="value">{formatCurrency(results.netIncome)}</span>
            </SummaryItem>
          </CompactSummary>

          <StatBar>
            <StatCard>
              <StatIcon>
                <AccountBalanceIcon />
              </StatIcon>
              <StatLabel>Gross Income</StatLabel>
              <StatValue>{formatCurrency(results.grossIncome)}</StatValue>
            </StatCard>
            <StatCard>
              <StatIcon>
                <TrendingUpIcon />
              </StatIcon>
              <StatLabel>Taxable Income</StatLabel>
              <StatValue>{formatCurrency(results.taxableIncome)}</StatValue>
            </StatCard>
            <StatCard>
              <StatIcon>
                <AttachMoneyIcon />
              </StatIcon>
              <StatLabel>Monthly Net Income</StatLabel>
              <StatValue>{formatCurrency(results.monthlyNetIncome)}</StatValue>
            </StatCard>
          </StatBar>

          <ChartContainer>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
              Tax Breakdown by Slab
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.taxBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
                <XAxis dataKey="range" stroke="#7F8FA6" />
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
                <Bar dataKey="tax" name="Tax Amount" fill="#5A6BFF" />
                <Bar dataKey="income" name="Income in Slab" fill="#00F5FF" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </>
      )}
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Tax Calculator"
      description="Calculate your income tax and understand your tax liability"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default TaxCalculator; 