import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  InputAdornment,
  Tooltip,
  IconButton,
  useTheme as useMuiTheme,
  styled,
} from '@mui/material';
import {
  Info as InfoIcon,
  Calculate as CalculateIcon,
  Refresh as RefreshIcon,
  MonetizationOn as MonetizationOnIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { globalStyles } from '../styles/globalStyles';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';

const PIE_COLORS = ['#3F51B5', '#7986CB', '#9E9E9E', '#CFD8DC'];

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

const ResultCard = styled(Box)(({ theme }) => ({
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

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
}));

interface ChartData {
  year: number;
  investment: number;
  returns: number;
  corpus: number;
}

interface PieData {
  name: string;
  value: number;
}

const MutualFundCalculator: React.FC = () => {
  const theme = useMuiTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    yearlyBreakdown: Array<{
      year: number;
      investment: number;
      returns: number;
      total: number;
    }>;
  } | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);

  const calculateMutualFund = () => {
    const monthlyInv = parseFloat(monthlyInvestment);
    const annualRate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (monthlyInv > 0 && annualRate > 0 && years > 0) {
      const months = years * 12;
      const monthlyRate = annualRate / 12;

      let futureValue = 0;
      const newChartData: ChartData[] = [];

      for (let i = 1; i <= months; i++) {
        futureValue = monthlyInv * (Math.pow(1 + monthlyRate, i) - 1) / monthlyRate;
        if (i % 12 === 0) {
          newChartData.push({
            year: i / 12,
            investment: monthlyInv * i,
            returns: futureValue - (monthlyInv * i),
            corpus: futureValue,
          });
        }
      }
      setChartData(newChartData);

      const calculatedTotalInvestment = monthlyInv * months;
      const calculatedTotalCorpus = futureValue;
      const calculatedTotalReturns = calculatedTotalCorpus - calculatedTotalInvestment;

      console.log('Calculated Total Investment:', calculatedTotalInvestment);
      console.log('Calculated Total Returns:', calculatedTotalReturns);

      setResults({
        totalInvestment: calculatedTotalInvestment,
        totalReturns: calculatedTotalReturns,
        maturityValue: calculatedTotalCorpus,
        yearlyBreakdown: newChartData.map(data => ({
          year: data.year,
          investment: data.investment,
          returns: data.returns,
          total: data.corpus,
        })),
      });

      setPieData([
        { name: 'Total Investment', value: calculatedTotalInvestment },
        { name: 'Total Returns', value: calculatedTotalReturns },
      ]);
    }
  };

  const resetForm = () => {
    setMonthlyInvestment('');
    setExpectedReturn('');
    setInvestmentPeriod('');
    setResults(null);
    setChartData([]);
    setPieData([]);
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
      tooltip: "Expected annual return rate",
    },
    {
      label: "Investment Period (Years)",
      value: investmentPeriod,
      onChange: setInvestmentPeriod,
      type: "number",
      tooltip: "Total investment duration in years",
    },
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateMutualFund}
      onReset={resetForm}
      calculateButtonText="Calculate"
      calculateButtonIcon={<AccountBalanceIcon />}
    />
  );

  const benefits = [
    {
      title: "Investment Analysis",
      description: "Analyze potential returns and risks of different mutual fund schemes."
    },
    {
      title: "Portfolio Diversification",
      description: "Plan your mutual fund investments across different categories and sectors."
    },
    {
      title: "Return Projection",
      description: "Project future returns based on historical performance and market trends."
    },
    {
      title: "Tax Planning",
      description: "Understand tax implications and optimize your mutual fund investments."
    }
  ];

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const resultComponent = (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        {results && (
          <ResultCard sx={{ mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.contrastText, mb: 1 }} /> */}
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Investment</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalInvestment)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Returns</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.totalReturns)}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>Total Corpus</Typography>
                  <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>{formatCurrency(results.maturityValue)}</Typography>
                </Box>
              </Grid>
            </Grid>
          </ResultCard>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {chartData.length > 0 && (
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: 0 }} />
                <YAxis label={{ value: 'Corpus (INR)', angle: -90, position: 'insideLeft' }} tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <RechartsTooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
                <Line type="monotone" dataKey="corpus" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {pieData.length > 0 && (
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  minAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <RechartsTooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Grid>
    </Grid>
  );

  return (
    <CalculatorPageTemplate
      title="Mutual Fund Calculator"
      mainDescription="Estimate returns and analyze performance of your mutual fund investments"
      formComponent={formComponent}
      aboutComponent={aboutComponent}
      resultComponent={resultComponent}
    />
  );
};

export default MutualFundCalculator; 