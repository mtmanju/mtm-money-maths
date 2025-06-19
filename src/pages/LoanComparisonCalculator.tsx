import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
  Compare as CompareIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

interface ComparisonResults {
  loan1: LoanDetails;
  loan2: LoanDetails;
  chartData: Array<{
    month: number;
    loan1Balance: number;
    loan2Balance: number;
  }>;
}

const LoanComparisonCalculator: React.FC = () => {
  const [loan1Amount, setLoan1Amount] = useState<number>(1000000);
  const [loan1Rate, setLoan1Rate] = useState<number>(8.5);
  const [loan1Tenure, setLoan1Tenure] = useState<number>(20);
  const [loan2Amount, setLoan2Amount] = useState<number>(1000000);
  const [loan2Rate, setLoan2Rate] = useState<number>(9.5);
  const [loan2Tenure, setLoan2Tenure] = useState<number>(20);
  const [results, setResults] = useState<ComparisonResults>({
    loan1: {
      loanAmount: 0,
      interestRate: 0,
      tenure: 0,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
    },
    loan2: {
      loanAmount: 0,
      interestRate: 0,
      tenure: 0,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
    },
    chartData: [],
  });

  useEffect(() => {
    calculateComparison();
  }, [loan1Amount, loan1Rate, loan1Tenure, loan2Amount, loan2Rate, loan2Tenure]);

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;
    return { emi, totalInterest, totalPayment };
  };

  const calculateLoanBalance = (principal: number, rate: number, tenure: number, month: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const balance = principal * Math.pow(1 + monthlyRate, month) - emi * (Math.pow(1 + monthlyRate, month) - 1) / monthlyRate;
    return Math.max(0, balance);
  };

  const calculateComparison = () => {
    const loan1Details = calculateEMI(loan1Amount, loan1Rate, loan1Tenure);
    const loan2Details = calculateEMI(loan2Amount, loan2Rate, loan2Tenure);

    // Generate chart data
    const maxMonths = Math.max(loan1Tenure, loan2Tenure) * 12;
    const chartData = Array.from({ length: maxMonths + 1 }, (_, i) => {
      const month = i;
      const loan1Balance = calculateLoanBalance(loan1Amount, loan1Rate, loan1Tenure, month);
      const loan2Balance = calculateLoanBalance(loan2Amount, loan2Rate, loan2Tenure, month);

      return {
        month,
        loan1Balance,
        loan2Balance,
      };
    });

    setResults({
      loan1: {
        loanAmount: loan1Amount,
        interestRate: loan1Rate,
        tenure: loan1Tenure,
        emi: loan1Details.emi,
        totalInterest: loan1Details.totalInterest,
        totalPayment: loan1Details.totalPayment,
      },
      loan2: {
        loanAmount: loan2Amount,
        interestRate: loan2Rate,
        tenure: loan2Tenure,
        emi: loan2Details.emi,
        totalInterest: loan2Details.totalInterest,
        totalPayment: loan2Details.totalPayment,
      },
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
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 600 }}>
        Loan 1 Details
      </Typography>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Amount"
          value={loan1Amount}
          onChange={(value) => setLoan1Amount(typeof value === 'number' ? value : 0)}
          min={100000}
          max={10000000}
          step={100000}
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
          value={loan1Amount}
          onChange={(_, newValue) => setLoan1Amount(newValue as number)}
          min={100000}
          max={10000000}
          step={100000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={loan1Rate}
          onChange={(value) => setLoan1Rate(typeof value === 'number' ? value : 0)}
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
          value={loan1Rate}
          onChange={(_, newValue) => setLoan1Rate(newValue as number)}
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
          label="Loan Tenure (Years)"
          value={loan1Tenure}
          onChange={(value) => setLoan1Tenure(typeof value === 'number' ? value : 0)}
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
          value={loan1Tenure}
          onChange={(_, newValue) => setLoan1Tenure(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 2, mt: 4, color: colors.primary, fontWeight: 600 }}>
        Loan 2 Details
      </Typography>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Amount"
          value={loan2Amount}
          onChange={(value) => setLoan2Amount(typeof value === 'number' ? value : 0)}
          min={100000}
          max={10000000}
          step={100000}
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
          value={loan2Amount}
          onChange={(_, newValue) => setLoan2Amount(newValue as number)}
          min={100000}
          max={10000000}
          step={100000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={loan2Rate}
          onChange={(value) => setLoan2Rate(typeof value === 'number' ? value : 0)}
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
          value={loan2Rate}
          onChange={(_, newValue) => setLoan2Rate(newValue as number)}
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
          label="Loan Tenure (Years)"
          value={loan2Tenure}
          onChange={(value) => setLoan2Tenure(typeof value === 'number' ? value : 0)}
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
          value={loan2Tenure}
          onChange={(_, newValue) => setLoan2Tenure(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  const loan1Cards = [
    { label: 'Monthly EMI', value: formatCurrency(results.loan1.emi), bgcolor: '#eafafd' },
    { label: 'Total Interest', value: formatCurrency(results.loan1.totalInterest), bgcolor: '#fbeeee' },
    { label: 'Total Payment', value: formatCurrency(results.loan1.totalPayment), bgcolor: '#f3f1fa' },
  ];

  const loan2Cards = [
    { label: 'Monthly EMI', value: formatCurrency(results.loan2.emi), bgcolor: '#eafafd' },
    { label: 'Total Interest', value: formatCurrency(results.loan2.totalInterest), bgcolor: '#fbeeee' },
    { label: 'Total Payment', value: formatCurrency(results.loan2.totalPayment), bgcolor: '#f3f1fa' },
  ];

  const resultSection = (
    <Box>
      <CalculatorResultCards items={loan1Cards} sectionTitle="Loan 1 Results" />
      <CalculatorResultCards items={loan2Cards} sectionTitle="Loan 2 Results" />
      
      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Loan Balance Comparison
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData} style={{ fontFamily: typography.fontFamily }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="month" 
              stroke={colors.secondary} 
              tick={chartAxisStyle} 
              axisLine={{ stroke: colors.border }} 
              tickLine={{ stroke: colors.border }}
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              stroke={colors.secondary} 
              tick={chartAxisStyle} 
              axisLine={{ stroke: colors.border }} 
              tickLine={{ stroke: colors.border }}
              tickFormatter={(value) => formatCurrency(value)}
              label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}
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
              dataKey="loan1Balance"
              name="Loan 1 Balance"
              stroke={colors.accent.primary}
              strokeWidth={2}
              dot={{ fill: colors.accent.primary, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="loan2Balance"
              name="Loan 2 Balance"
              stroke={colors.accent.secondary}
              strokeWidth={2}
              dot={{ fill: colors.accent.secondary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableColumns = [
    { label: 'Parameter', key: 'parameter' },
    { label: 'Loan 1', key: 'loan1' },
    { label: 'Loan 2', key: 'loan2' },
    { label: 'Difference', key: 'difference' },
  ];

  const tableRows = [
    {
      parameter: 'Loan Amount',
      loan1: formatCurrency(results.loan1.loanAmount),
      loan2: formatCurrency(results.loan2.loanAmount),
      difference: formatCurrency(results.loan2.loanAmount - results.loan1.loanAmount),
    },
    {
      parameter: 'Interest Rate',
      loan1: `${results.loan1.interestRate}%`,
      loan2: `${results.loan2.interestRate}%`,
      difference: `${(results.loan2.interestRate - results.loan1.interestRate).toFixed(2)}%`,
    },
    {
      parameter: 'Tenure',
      loan1: `${results.loan1.tenure} years`,
      loan2: `${results.loan2.tenure} years`,
      difference: `${results.loan2.tenure - results.loan1.tenure} years`,
    },
    {
      parameter: 'Monthly EMI',
      loan1: formatCurrency(results.loan1.emi),
      loan2: formatCurrency(results.loan2.emi),
      difference: formatCurrency(results.loan2.emi - results.loan1.emi),
    },
    {
      parameter: 'Total Interest',
      loan1: formatCurrency(results.loan1.totalInterest),
      loan2: formatCurrency(results.loan2.totalInterest),
      difference: formatCurrency(results.loan2.totalInterest - results.loan1.totalInterest),
    },
    {
      parameter: 'Total Payment',
      loan1: formatCurrency(results.loan1.totalPayment),
      loan2: formatCurrency(results.loan2.totalPayment),
      difference: formatCurrency(results.loan2.totalPayment - results.loan1.totalPayment),
    },
  ];

  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  return (
    <CalculatorTemplate
      title="Loan Comparison Calculator"
      description="Compare different loan options and find the best deal for your needs."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default LoanComparisonCalculator; 