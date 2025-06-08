import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  useTheme,
  styled,
  InputAdornment,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import { globalStyles } from '../styles/globalStyles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
}));

const ResultCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: theme.shadows[1],
  '&:hover': {
    transform: 'none',
    boxShadow: theme.shadows[3],
  },
}));

const StyledTable = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: 20,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

const EmiCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [results, setResults] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    amortizationSchedule: Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm) * 12; // Total number of months

    if (principal && rate && term && principal > 0 && rate > 0 && term > 0) {
      // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emi = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = emi * term;
      const totalInterest = totalPayment - principal;

      // Calculate amortization schedule
      const schedule = [];
      let balance = principal;
      for (let month = 1; month <= term; month++) {
        const interest = balance * rate;
        const principalPayment = emi - interest;
        balance -= principalPayment;

        schedule.push({
          month,
          payment: emi,
          principal: principalPayment,
          interest,
          balance: Math.max(0, balance),
        });
      }

      setResults({
        emi,
        totalPayment,
        totalInterest,
        amortizationSchedule: schedule,
      });
    }
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toFixed(2).toLocaleString()}`;
  };

  const inputFields = [
    {
      label: "Loan Amount",
      value: loanAmount,
      onChange: setLoanAmount,
      type: "number",
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
    {
      label: "Interest Rate (%)",
      value: interestRate,
      onChange: setInterestRate,
      type: "number",
      tooltip: "Annual interest rate",
    },
    {
      label: "Loan Term (Years)",
      value: loanTerm,
      onChange: setLoanTerm,
      type: "number",
      tooltip: "Loan duration in years",
    },
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateEMI}
      onReset={handleReset}
      calculateButtonText="Calculate EMI"
      calculateButtonIcon={<CreditCardIcon />}
    />
  );

  const benefits = [
    {
      title: "Loan Planning",
      description: "Plan your loan repayments and understand the total cost of borrowing."
    },
    {
      title: "Budget Management",
      description: "Determine affordable loan amounts based on your monthly budget."
    },
    {
      title: "Interest Analysis",
      description: "Break down your payments into principal and interest components."
    },
    {
      title: "Comparison Tool",
      description: "Compare different loan options and choose the most suitable one."
    }
  ];

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const resultComponent = (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        {results && (
          <ResultCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ mb: 4 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
                  {/* <MonetizationOnIcon sx={{ fontSize: 48, color: '#fff', mb: 1 }} /> */}
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Monthly EMI</Typography>
                  <Typography variant="body1" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.emi)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Interest</Typography>
                  <Typography variant="body1" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalInterest)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Payment</Typography>
                  <Typography variant="body1" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalPayment)}</Typography>
                </Box>
              </Grid>
            </Grid>
          </ResultCard>
        )}

        {results && results.amortizationSchedule.length > 0 && (
          <StyledTable>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">EMI</TableCell>
                  <TableCell align="right">Principal</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.amortizationSchedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{formatCurrency(row.payment)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.principal)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.interest)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTable>
        )}
      </Grid>
    </Grid>
  );

  return (
    <CalculatorPageTemplate
      title="EMI Calculator"
      mainDescription="Calculate Equated Monthly Installments for loans and mortgages"
      formComponent={formComponent}
      aboutComponent={aboutComponent}
      resultComponent={resultComponent}
    />
  );
};

export default EmiCalculator; 