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

const EmiCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateEmi = () => {
    const principal = loanAmount;
    const annualInterestRate = interestRate;
    const years = loanTerm;

    if (principal === 0 || annualInterestRate === 0 || years === 0) {
      setMonthlyEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setAmortizationSchedule([]);
      return;
    }

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;

    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPay = emi * numberOfPayments;
    const totalInt = totalPay - principal;

    setMonthlyEmi(emi);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);

    generateAmortizationSchedule(emi, principal, monthlyInterestRate, numberOfPayments);
  };

  const generateAmortizationSchedule = (
    emi: number,
    principal: number,
    monthlyInterestRate: number,
    numberOfPayments: number,
  ) => {
    const schedule = [];
    let outstandingBalance = principal;

    for (let i = 1; i <= Math.min(numberOfPayments, 12); i++) {
      const interestComponent = outstandingBalance * monthlyInterestRate;
      const principalComponent = emi - interestComponent;
      outstandingBalance -= principalComponent;

      schedule.push({
        month: i,
        emi: emi,
        principalComponent: principalComponent,
        interestComponent: interestComponent,
        outstandingBalance: outstandingBalance,
      });
    }
    setAmortizationSchedule(schedule);
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
          Loan Amount
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={loanAmount}
          onChange={(_, newValue) => setLoanAmount(newValue as number)}
          min={100000}
          max={50000000}
          step={100000}
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
          max={30}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Loan Term (Years)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={loanTerm}
          onChange={(_, newValue) => setLoanTerm(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <CompactSummary>
        <SummaryItem>
          <span className="label">Monthly EMI</span>
          <span className="value">{formatCurrency(monthlyEmi)}</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Total Interest</span>
          <span className="value">{formatCurrency(totalInterest)}</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Total Payment</span>
          <span className="value">{formatCurrency(totalPayment)}</span>
        </SummaryItem>
      </CompactSummary>

      <StatBar>
        <StatCard>
          <StatIcon>
            <AttachMoneyIcon />
          </StatIcon>
          <StatLabel>Loan Amount</StatLabel>
          <StatValue>{formatCurrency(loanAmount)}</StatValue>
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
          <StatLabel>Loan Term</StatLabel>
          <StatValue>{loanTerm} years</StatValue>
        </StatCard>
      </StatBar>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
          Amortization Schedule
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={amortizationSchedule}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
            <XAxis dataKey="month" stroke="#7F8FA6" />
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
              dataKey="principalComponent"
              name="Principal"
              stroke="#5A6BFF"
              strokeWidth={2}
              dot={{ fill: '#5A6BFF', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="interestComponent"
              name="Interest"
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
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installments and plan your loan repayment"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default EmiCalculator; 