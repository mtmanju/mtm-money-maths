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
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CompareArrows as CompareArrowsIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
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

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  color: '#FFFFFF',
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #FF8E53 0%, #FF6B6B 100%)',
    boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)',
    transform: 'translateY(-2px)',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 400,
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

interface LoanOption {
  id: number;
  name: string;
  amount: number;
  interestRate: number;
  term: number;
  processingFee: number;
  prepaymentCharges: number;
}

interface AmortizationData {
  name: string;
  schedule: Array<{
    year: number;
    balance: number;
  }>;
}

const LoanComparisonCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([
    {
      id: 1,
      name: 'Bank A',
      amount: 1000000,
      interestRate: 8.5,
      term: 20,
      processingFee: 1,
      prepaymentCharges: 2,
    },
    {
      id: 2,
      name: 'Bank B',
      amount: 1000000,
      interestRate: 8.75,
      term: 20,
      processingFee: 0.5,
      prepaymentCharges: 1,
    },
  ]);
  const [comparisonResults, setComparisonResults] = useState<any[]>([]);
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>([]);

  const calculateEMI = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 12 / 100;
    const numberOfPayments = term * 12;
    return (
      (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };

  const calculateTotalCost = (loan: LoanOption) => {
    const emi = calculateEMI(loan.amount, loan.interestRate, loan.term);
    const totalPayment = emi * loan.term * 12;
    const totalInterest = totalPayment - loan.amount;
    const processingFeeAmount = (loan.amount * loan.processingFee) / 100;
    const totalCost = totalPayment + processingFeeAmount;

    return {
      emi,
      totalPayment,
      totalInterest,
      processingFeeAmount,
      totalCost,
    };
  };

  const generateAmortizationSchedule = (loan: LoanOption) => {
    const schedule = [];
    const emi = calculateEMI(loan.amount, loan.interestRate, loan.term);
    let balance = loan.amount;
    const monthlyRate = loan.interestRate / 12 / 100;

    for (let year = 1; year <= loan.term; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = emi - interest;
        balance -= principal;
        yearInterest += interest;
        yearPrincipal += principal;
      }

      schedule.push({
        year,
        interest: yearInterest,
        principal: yearPrincipal,
        balance,
      });
    }

    return schedule;
  };

  useEffect(() => {
    const results = loanOptions.map((loan) => ({
      ...loan,
      ...calculateTotalCost(loan),
    }));

    setComparisonResults(results);

    const amortizationData = loanOptions.map((loan) => ({
      name: loan.name,
      schedule: generateAmortizationSchedule(loan),
    }));

    setAmortizationData(amortizationData);
  }, [loanOptions]);

  const addLoanOption = () => {
    const newId = Math.max(...loanOptions.map((loan) => loan.id)) + 1;
    setLoanOptions([
      ...loanOptions,
      {
        id: newId,
        name: `Bank ${String.fromCharCode(65 + loanOptions.length)}`,
        amount: 1000000,
        interestRate: 8.5,
        term: 20,
        processingFee: 1,
        prepaymentCharges: 2,
      },
    ]);
  };

  const removeLoanOption = (id: number) => {
    if (loanOptions.length > 1) {
      setLoanOptions(loanOptions.filter((loan) => loan.id !== id));
    }
  };

  const updateLoanOption = (id: number, field: keyof LoanOption, value: any) => {
    setLoanOptions(
      loanOptions.map((loan) =>
        loan.id === id ? { ...loan, [field]: value } : loan
      )
    );
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: theme.palette.text.primary, 
            fontWeight: 700,
            fontSize: '1.75rem',
            letterSpacing: '-0.5px',
          }}
        >
          Loan Options
        </Typography>
        <GradientButton
          startIcon={<AddIcon />}
          onClick={addLoanOption}
        >
          Add Loan Option
        </GradientButton>
      </Box>

      <Grid container spacing={4}>
        {loanOptions.map((loan) => (
          <Grid item xs={12} key={loan.id}>
            <Box sx={{ 
              p: 3, 
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                  {loan.name}
                </Typography>
                {loanOptions.length > 1 && (
                  <IconButton 
                    onClick={() => removeLoanOption(loan.id)}
                    sx={{ 
                      color: '#FF6B6B',
                      '&:hover': { 
                        background: 'rgba(255, 107, 107, 0.1)' 
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Loan Amount
                    </Typography>
                    <StyledTextField
                      fullWidth
                      type="number"
                      value={loan.amount}
                      onChange={(e) => updateLoanOption(loan.id, 'amount', Number(e.target.value))}
                      InputProps={{
                        startAdornment: <AccountBalanceIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Interest Rate (%)
                    </Typography>
                    <StyledTextField
                      fullWidth
                      type="number"
                      value={loan.interestRate}
                      onChange={(e) => updateLoanOption(loan.id, 'interestRate', Number(e.target.value))}
                      InputProps={{
                        startAdornment: <TrendingUpIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Loan Term (Years)
                    </Typography>
                    <StyledTextField
                      fullWidth
                      type="number"
                      value={loan.term}
                      onChange={(e) => updateLoanOption(loan.id, 'term', Number(e.target.value))}
                      InputProps={{
                        startAdornment: <CalendarTodayIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Processing Fee (%)
                    </Typography>
                    <StyledTextField
                      fullWidth
                      type="number"
                      value={loan.processingFee}
                      onChange={(e) => updateLoanOption(loan.id, 'processingFee', Number(e.target.value))}
                      InputProps={{
                        startAdornment: <AttachMoneyIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </StyledPaper>
  );

  const resultSection = (
    <ResultCard>
      <Typography 
        variant="h5" 
        sx={{ 
          color: theme.palette.text.primary, 
          fontWeight: 700,
          mb: 4,
          fontSize: '1.75rem',
          letterSpacing: '-0.5px',
        }}
      >
        Comparison Results
      </Typography>

      <Grid container spacing={3}>
        {comparisonResults.map((result) => (
          <Grid item xs={12} md={6} key={result.id}>
            <Box sx={{ 
              p: 3, 
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 2 }}>
                {result.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                    Monthly EMI
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {formatCurrency(result.emi)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                    Total Interest
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {formatCurrency(result.totalInterest)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                    Processing Fee
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {formatCurrency(result.processingFeeAmount)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                    Total Cost
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                    {formatCurrency(result.totalCost)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      <ChartContainer>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
          Monthly Payment Comparison
        </Typography>
        <Line
          data={{
            labels: comparisonResults.map(result => `Loan ${result.id}`),
            datasets: [
              {
                label: 'Monthly EMI',
                data: comparisonResults.map(result => result.emi),
                borderColor: '#FF6B6B',
                borderWidth: 2,
              },
              {
                label: 'Total Interest',
                data: comparisonResults.map(result => result.totalInterest),
                borderColor: '#FF8E53',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: theme.palette.text.primary,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const dataset = context.dataset;
                    const index = context.dataIndex;
                    const value = dataset.data[index];
                    return `${dataset.label}: ${formatCurrency(value as number)}`;
                  },
                },
                bodyColor: theme.palette.text.primary,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'transparent',
                borderWidth: 1,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: theme.palette.text.primary,
                },
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: theme.palette.text.primary,
                  callback: (value) => formatCurrency(value as number),
                },
              },
            },
          }}
        />
      </ChartContainer>

      <ChartContainer>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
          Amortization Schedule
        </Typography>
        {amortizationData.length > 0 && (
          <Line
            data={{
              labels: amortizationData[0].schedule.map(data => `Year ${data.year}`),
              datasets: amortizationData.map((data: AmortizationData, index) => ({
                label: `${data.name} Balance`,
                data: data.schedule.map(data => data.balance),
                borderColor: index === 0 ? '#FF6B6B' : '#FF8E53',
                borderWidth: 2,
              })),
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: theme.palette.text.primary,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const dataset = context.dataset;
                      const index = context.dataIndex;
                      const value = dataset.data[index];
                      return `${dataset.label}: ${formatCurrency(value as number)}`;
                    },
                  },
                  bodyColor: theme.palette.text.primary,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderColor: 'transparent',
                  borderWidth: 1,
                  cornerRadius: 8,
                },
              },
              scales: {
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: theme.palette.text.primary,
                  },
                },
                y: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: theme.palette.text.primary,
                    callback: (value) => formatCurrency(value as number),
                  },
                },
              },
            }}
          />
        )}
      </ChartContainer>
    </ResultCard>
  );

  return (
    <CalculatorTemplate
      title="Loan Comparison Calculator"
      description="Compare different loan options to find the best fit for your needs"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default LoanComparisonCalculator; 