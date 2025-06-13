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
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CalculatorTemplate, StyledPaper, ResultCard, StyledTextField, StyledSlider } from '../components/CalculatorTemplate';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LoanCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    chartData: any;
  }>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    chartData: null,
  });

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment using the loan payment formula
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Generate chart data for amortization schedule
    const labels = Array.from({ length: loanTerm + 1 }, (_, i) => i);
    const principalData = labels.map((year) => {
      const remainingPrincipal = loanAmount * (1 - year / loanTerm);
      return remainingPrincipal;
    });
    const interestData = labels.map((year) => {
      const yearInterest = (totalInterest * (loanTerm - year)) / loanTerm;
      return yearInterest;
    });

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Principal',
            data: principalData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            tension: 0.4,
          },
          {
            label: 'Interest',
            data: interestData,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
            tension: 0.4,
          },
        ],
      },
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.text.primary,
          font: {
            family: 'Montserrat',
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: 'Montserrat',
          },
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: 'Montserrat',
          },
          callback: (value: any) => `₹${value.toLocaleString()}`,
        },
      },
    },
  };

  const formSection = (
    <StyledPaper>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
          Loan Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              InputProps={{
                startAdornment: <AttachMoneyIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Interest Rate: {interestRate}%</Typography>
              <StyledSlider
                value={interestRate}
                onChange={(_, value) => setInterestRate(value as number)}
                min={1}
                max={20}
                step={0.1}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Loan Term: {loanTerm} years</Typography>
              <StyledSlider
                value={loanTerm}
                onChange={(_, value) => setLoanTerm(value as number)}
                min={1}
                max={30}
                step={1}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <ResultCard>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
          Results
        </Typography>
        <Typography variant="h4" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          ₹{Math.round(results.monthlyPayment).toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Monthly Payment
        </Typography>
      </Box>
    </ResultCard>
  );

  return (
    <CalculatorTemplate
      title="Loan Calculator"
      description="Calculate your loan details and plan your repayments"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default LoanCalculator; 