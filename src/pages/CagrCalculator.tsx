import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  useTheme,
  styled,
  InputAdornment,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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

const getGradientColors = (mode: 'light' | 'dark') => {
  return mode === 'dark'
    ? {
        gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        titleGradient: 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)',
        colors: ['#2c3e50', '#3498db', '#2980b9', '#1abc9c', '#16a085'],
      }
    : {
        gradient: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        titleGradient: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
        colors: ['#1a237e', '#0d47a1', '#1565c0', '#1976d2', '#2196f3'],
      };
};

const StyledPaper = styled(Box)(({ theme }) => ({
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

const ResultCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)'
    : 'linear-gradient(135deg, #0A0A0A 0%, #222222 100%)',
  color: 'white',
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
}));

interface ChartData {
  year: number;
  value: number;
}

interface PieData {
  name: string;
  value: number;
}

const CagrCalculator: React.FC = () => {
  const theme = useTheme();
  const [initialValue, setInitialValue] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<{
    cagr: number;
    totalGrowth: number;
    yearlyBreakdown: Array<{
      year: number;
      startValue: number;
      endValue: number;
      growth: number;
    }>;
  } | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [error, setError] = useState<string>('');

  const { colors: COLORS } = getGradientColors(theme.palette.mode);

  const calculateCAGR = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const period = parseFloat(investmentPeriod);

    if (initial > 0 && final > 0 && period > 0) {
      const cagrValue = (Math.pow(final / initial, 1 / period) - 1) * 100;
      setResults({
        cagr: cagrValue,
        totalGrowth: final - initial,
        yearlyBreakdown: [],
      });

      // Generate chart data
      const data: ChartData[] = [];
      for (let i = 0; i <= period; i++) {
        const value = initial * Math.pow(1 + cagrValue / 100, i);
        data.push({ year: i, value: Math.round(value) });
      }
      setChartData(data);

      // Generate pie chart data
      setPieData([
        { name: 'Initial Investment', value: initial },
        { name: 'Growth', value: final - initial },
      ]);
    }
  };

  const resetForm = () => {
    setInitialValue('');
    setFinalValue('');
    setInvestmentPeriod('');
    setResults(null);
    setChartData([]);
    setPieData([]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getBackgroundGradient = (mode: 'light' | 'dark') => {
    return mode === 'light'
      ? 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
      : 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)';
  };

  const benefits = [
    {
      title: "Investment Performance Analysis",
      description: "Evaluate the true performance of your investments over time, accounting for compound growth."
    },
    {
      title: "Long-term Planning",
      description: "Make informed decisions about your investment strategy by understanding your historical returns."
    },
    {
      title: "Portfolio Comparison",
      description: "Compare different investment options on an equal footing, regardless of their time periods."
    },
    {
      title: "Risk Assessment",
      description: "Better understand the risk-adjusted returns of your investments over multiple years."
    }
  ];

  const inputFields = [
    {
      label: "Initial Investment Value",
      value: initialValue,
      onChange: setInitialValue,
      type: "number",
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
    {
      label: "Final Investment Value",
      value: finalValue,
      onChange: setFinalValue,
      type: "number",
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
    {
      label: "Investment Period (Years)",
      value: investmentPeriod,
      onChange: setInvestmentPeriod,
      type: "number",
      tooltip: "Number of years for the investment",
    },
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateCAGR}
      onReset={resetForm}
      calculateButtonText="Calculate CAGR"
      calculateButtonIcon={<TrendingUpIcon />}
    />
  );

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const resultComponent = (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        {results && (
          <ResultCard sx={{ mb: 4, background: getBackgroundGradient(theme.palette.mode) }}>
            <Typography variant="h6" gutterBottom>
              Compound Annual Growth Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {results.cagr.toFixed(2)}%
            </Typography>
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
                <YAxis label={{ value: 'Value (INR)', angle: -90, position: 'insideLeft' }} tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <RechartsTooltip formatter={(value: number) => [formatCurrency(value), 'Value']} />
                <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </Grid>
      <Grid item xs={12}>
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
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      title="CAGR Calculator"
      mainDescription="Calculate Compound Annual Growth Rate to evaluate investment performance over time"
      formComponent={formComponent}
      aboutComponent={aboutComponent}
      resultComponent={resultComponent}
    />
  );
};

export default CagrCalculator; 