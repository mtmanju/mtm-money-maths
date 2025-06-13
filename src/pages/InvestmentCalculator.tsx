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

const InvestmentCalculator: React.FC = () => {
  const theme = useTheme();
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    chartData: any;
  }>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    chartData: null,
  });

  useEffect(() => {
    calculateInvestment();
  }, [initialInvestment, monthlyContribution, expectedReturn, timePeriod]);

  const calculateInvestment = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = timePeriod * 12;
    const totalInvestment = initialInvestment + (monthlyContribution * months);

    // Calculate maturity value using compound interest formula
    const maturityValue = initialInvestment * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const totalReturns = maturityValue - totalInvestment;

    // Generate chart data
    const labels = Array.from({ length: timePeriod + 1 }, (_, i) => i);
    const investmentData = labels.map((year) => {
      return initialInvestment + (monthlyContribution * 12 * (year + 1));
    });
    const returnsData = labels.map((year) => {
      const months = (year + 1) * 12;
      const value = initialInvestment * Math.pow(1 + monthlyRate, months) +
        monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      return Math.round(value);
    });

    setResults({
      totalInvestment,
      totalReturns,
      maturityValue,
      chartData: {
        labels,
        datasets: [
          {
            label: 'Investment',
            data: investmentData,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            tension: 0.4,
          },
          {
            label: 'Returns',
            data: returnsData,
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
          Investment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Initial Investment"
              type="number"
              value={initialInvestment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialInvestment(Number(e.target.value))}
              InputProps={{
                startAdornment: <AttachMoneyIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Monthly Contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyContribution(Number(e.target.value))}
              InputProps={{
                startAdornment: <AttachMoneyIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Expected Return: {expectedReturn}%</Typography>
              <StyledSlider
                value={expectedReturn}
                onChange={(_, value) => setExpectedReturn(value as number)}
                min={1}
                max={20}
                step={0.1}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Time Period: {timePeriod} years</Typography>
              <StyledSlider
                value={timePeriod}
                onChange={(_, value) => setTimePeriod(value as number)}
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
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          Maturity Value
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          ₹{Math.round(results.maturityValue).toLocaleString()}
        </Typography>
      </Box>
    </ResultCard>
  );

  return (
    <CalculatorTemplate
      title="Investment Calculator"
      description="Calculate your investment returns and plan your financial future"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default InvestmentCalculator; 