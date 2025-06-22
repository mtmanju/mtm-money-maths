import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  styled,
  InputAdornment,
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
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import {
  StyledPaper,
  StyledSlider,
  ChartContainer,
  colors,
  typography,
  StyledTableContainer,
  tableHeaderCell,
  tableCell,
  chartAxisStyle,
  chartTooltipStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartLegendStyle,
} from '../components/calculatorStyles';
import { CustomNumberField } from '../components/CustomNumberField';
import { ResultCard } from '../components/ResultCard';

const CompactSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: colors.background,
  borderRadius: '10px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  border: `1.5px solid ${colors.border}`,
  padding: theme.spacing(3, 4),
  marginBottom: theme.spacing(3),
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  '& .label': {
    color: colors.secondary,
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: 2,
    display: 'block',
  },
  '& .value': {
    color: colors.primary,
    fontWeight: typography.value.fontWeight,
    fontSize: typography.value.fontSize,
    fontFamily: typography.fontFamily,
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
  background: colors.background,
  borderRadius: '10px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  border: `1.5px solid ${colors.border}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2.5, 2),
  textAlign: 'center',
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: 28,
  marginBottom: theme.spacing(1),
  color: colors.accent.primary,
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

    for (let i = 1; i <= numberOfPayments; i++) {
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

  const handleLoanAmountChange = (value: number | string) => {
    if (typeof value === 'number') {
      setLoanAmount(value);
    }
  };

  const handleInterestRateChange = (value: number | string) => {
    if (typeof value === 'number') {
      setInterestRate(value);
    }
  };

  const handleLoanTermChange = (value: number | string) => {
    if (typeof value === 'number') {
      setLoanTerm(value);
    }
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Amount"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          min={10000}
          max={50000000}
          step={10000}
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
          value={loanAmount}
          onChange={(_, newValue) => setLoanAmount(newValue as number)}
          min={10000}
          max={50000000}
          step={10000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
          min={1}
          max={30}
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
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
          min={1}
          max={30}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Term (Years)"
          value={loanTerm}
          onChange={handleLoanTermChange}
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
          value={loanTerm}
          onChange={(_, newValue) => setLoanTerm(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Monthly EMI" value={formatCurrency(monthlyEmi)} variant="primary" />
        <ResultCard title="Total Interest" value={formatCurrency(totalInterest)} variant="secondary" />
        <ResultCard title="Total Payment" value={formatCurrency(totalPayment)} variant="purple" />
      </Box>
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Amortization Schedule
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={amortizationSchedule} style={{ fontFamily: typography.fontFamily }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis
              dataKey="month"
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
              dataKey="principalComponent"
              name="Principal"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="interestComponent"
              name="Interest"
              stroke={colors.accent.primary}
              strokeWidth={2}
              dot={{ fill: colors.accent.primary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  // Aggregate amortization schedule by year
  const yearlySchedule = [];
  if (amortizationSchedule.length > 0) {
    let year = 1;
    let emiSum = 0, principalSum = 0, interestSum = 0;
    let lastOutstanding = amortizationSchedule[0].outstandingBalance;
    for (let i = 0; i < amortizationSchedule.length; i++) {
      emiSum += amortizationSchedule[i].emi;
      principalSum += amortizationSchedule[i].principalComponent;
      interestSum += amortizationSchedule[i].interestComponent;
      lastOutstanding = amortizationSchedule[i].outstandingBalance;
      if ((i + 1) % 12 === 0 || i === amortizationSchedule.length - 1) {
        yearlySchedule.push({
          year,
          emi: emiSum,
          principalComponent: principalSum,
          interestComponent: interestSum,
          outstandingBalance: lastOutstanding,
        });
        year++;
        emiSum = 0;
        principalSum = 0;
        interestSum = 0;
      }
    }
  }

  // Table section for yearly amortization schedule
  const tableSection = yearlySchedule.length > 0 ? (
    <StyledTableContainer>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Year</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>EMI</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Principal</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Interest</th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {yearlySchedule.map((row) => (
            <tr key={row.year}>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>{row.year}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.emi)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.principalComponent)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.interestComponent)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(row.outstandingBalance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTableContainer>
  ) : null;

  return (
    <CalculatorTemplate
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installments for loans and plan your repayments."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default EmiCalculator; 