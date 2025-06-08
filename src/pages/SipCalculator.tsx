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
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SavingsIcon from '@mui/icons-material/Savings';
import { motion } from 'framer-motion';
import { globalStyles } from '../styles/globalStyles';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.grey[200]}`,
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

const SipCalculator: React.FC = () => {
  const theme = useTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalInterest: number;
    maturityValue: number;
    yearlyBreakdown: Array<{
      year: number;
      investment: number;
      returns: number;
      total: number;
    }>;
  } | null>(null);

  const calculateSIP = () => {
    const monthly = parseFloat(monthlyInvestment);
    const rate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (monthly && rate && years && monthly > 0 && rate > 0 && years > 0) {
      const monthlyRate = rate / 12;
      const months = years * 12;
      const totalInvestment = monthly * months;
      
      // Calculate maturity value using SIP formula
      const maturityValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const totalInterest = maturityValue - totalInvestment;

      // Calculate yearly breakdown
      const yearlyBreakdown = [];
      for (let year = 1; year <= years; year++) {
        const yearMonths = year * 12;
        const yearInvestment = monthly * yearMonths;
        const yearValue = monthly * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        const yearInterest = yearValue - yearInvestment;
        
        yearlyBreakdown.push({
          year,
          investment: yearInvestment,
          returns: yearInterest,
          total: yearValue,
        });
      }

      setResults({
        totalInvestment,
        totalInterest,
        maturityValue,
        yearlyBreakdown,
      });
    }
  };

  const resetForm = () => {
    setMonthlyInvestment('');
    setExpectedReturn('');
    setInvestmentPeriod('');
    setResults(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const inputFields = [
    {
      label: "Monthly Investment",
      value: monthlyInvestment,
      onChange: setMonthlyInvestment,
      type: "number",
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
    {
      label: "Expected Annual Return (%)",
      value: expectedReturn,
      onChange: setExpectedReturn,
      type: "number",
      tooltip: "Enter the expected annual return rate",
    },
    {
      label: "Investment Period (Years)",
      value: investmentPeriod,
      onChange: setInvestmentPeriod,
      type: "number",
      tooltip: "Enter the number of years you plan to invest",
    },
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateSIP}
      onReset={resetForm}
      calculateButtonText="Calculate SIP"
      calculateButtonIcon={<SavingsIcon />}
    />
  );

  const benefits = [
    {
      title: "Regular Investment Planning",
      description: "Plan and visualize your systematic investment strategy with fixed monthly contributions."
    },
    {
      title: "Wealth Accumulation",
      description: "See how small, regular investments can grow into significant wealth over time."
    },
    {
      title: "Goal-based Investing",
      description: "Align your SIP investments with specific financial goals and track progress."
    },
    {
      title: "Risk Mitigation",
      description: "Benefit from rupee-cost averaging and reduce the impact of market volatility."
    }
  ];

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const resultComponent = (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        {results && (
          <ResultCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* <SavingsIcon sx={{ fontSize: 48, color: theme.palette.primary.contrastText, mb: 1 }} /> */}
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Investment</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalInvestment)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Interest</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalInterest)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Maturity Value</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.maturityValue)}</Typography>
                </Box>
              </Grid>
            </Grid>
          </ResultCard>
        )}

        {results && results.yearlyBreakdown.length > 0 && (
          <StyledTable>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Investment</TableCell>
                  <TableCell align="right">Interest</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.yearlyBreakdown.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell align="right">{formatCurrency(row.investment)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.returns)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.total)}</TableCell>
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
      title="SIP Calculator"
      mainDescription="Calculate potential returns on a Systematic Investment Plan (SIP)"
      formComponent={formComponent}
      aboutComponent={aboutComponent}
      resultComponent={resultComponent}
    />
  );
};

export default SipCalculator; 