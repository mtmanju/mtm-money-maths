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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

const PIE_COLORS = ['#3F51B5', '#7986CB', '#9E9E9E', '#CFD8DC']; // Colors from new theme palette

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
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1], // Subtle shadow
  border: `1px solid ${theme.palette.grey[200]}`, // Subtle border
}));

interface CalculatorResult {
  cagr: number;
  totalReturn: number;
  absoluteReturn: number;
  yearlyBreakdown: Array<{
    year: number;
    value: number;
    returns: number;
  }>;
}

interface ChartDataPoint {
  year: number;
  value: number;
}

const CagrCalculator: React.FC = () => {
  const theme = useTheme();
  const [initialValue, setInitialValue] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);
  const [error, setError] = useState<string>('');

  const resetForm = () => {
    setInitialValue('');
    setFinalValue('');
    setInvestmentPeriod('');
    setResults(null);
    setChartData([]);
    setPieData([]);
    setError('');
  };

  const calculateResults = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const period = parseFloat(investmentPeriod);

    if (isNaN(initial) || isNaN(final) || isNaN(period)) {
      setError('Please enter valid numbers');
      return;
    }

    if (initial > 0 && final > 0 && period > 0) {
      const cagrValue = (Math.pow(final / initial, 1 / period) - 1) * 100;
      const totalGrowth = final - initial;
      const cagr = cagrValue;
      const totalReturn = cagrValue;
      const absoluteReturn = totalGrowth;

      const yearlyBreakdown: Array<{ year: number; value: number; returns: number }> = [];
      for (let i = 0; i <= period; i++) {
        const value = initial * Math.pow(1 + cagrValue / 100, i);
        const previousValue = i === 0 ? initial : initial * Math.pow(1 + cagrValue / 100, i - 1);
        const returns = value - previousValue;
        yearlyBreakdown.push({ 
          year: i, 
          value: Math.round(value), 
          returns: Math.round(returns) 
        });
      }

      // Update chart data
      const newChartData: ChartDataPoint[] = Array.from({ length: period + 1 }, (_, i) => ({
        year: i + 1,
        value: yearlyBreakdown[i].value
      }));
      setChartData(newChartData);

      // Update pie data
      const newPieData = [
        { name: 'Initial Investment', value: initial },
        { name: 'Returns', value: final - initial }
      ];
      setPieData(newPieData);

      setResults({
        cagr,
        totalReturn,
        absoluteReturn,
        yearlyBreakdown
      });
      setError('');
    } else {
      setError('Please enter positive numbers');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
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
      label: 'Initial Value',
      value: initialValue,
      onChange: setInitialValue,
      type: 'number',
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      tooltip: 'Enter the initial investment amount'
    },
    {
      label: 'Final Value',
      value: finalValue,
      onChange: setFinalValue,
      type: 'number',
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      tooltip: 'Enter the final investment value'
    },
    {
      label: 'Investment Period (Years)',
      value: investmentPeriod,
      onChange: setInvestmentPeriod,
      type: 'number',
      tooltip: 'Enter the investment period in years'
    }
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateResults}
      onReset={resetForm}
      calculateButtonText="Calculate CAGR"
      calculateButtonIcon={<TrendingUpIcon />}
    />
  );

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const resultComponent = results ? (
    <CalculatorResults
      summaryItems={[
        {
          label: 'CAGR',
          value: `${results.cagr.toFixed(2)}%`,
          icon: <TrendingUpIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Return',
          value: `${results.totalReturn.toFixed(2)}%`,
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Absolute Return',
          value: `${results.absoluteReturn.toFixed(2)}%`,
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown.map((row: { year: number; value: number; returns: number }) => ({
        year: row.year,
        value: row.value,
        returns: row.returns
      }))}
      onDownloadPDF={() => {
        downloadPDF({
          title: 'CAGR Calculator Results',
          summary: [
            { label: 'CAGR', value: `${results.cagr.toFixed(2)}%` },
            { label: 'Total Return', value: `${results.totalReturn.toFixed(2)}%` },
            { label: 'Absolute Return', value: `${results.absoluteReturn.toFixed(2)}%` }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            Value: formatCurrency(row.value),
            Returns: formatCurrency(row.returns)
          }))
        });
      }}
      onDownloadExcel={() => {
        downloadExcel({
          title: 'CAGR Calculator Results',
          summary: [
            { label: 'CAGR', value: `${results.cagr.toFixed(2)}%` },
            { label: 'Total Return', value: `${results.totalReturn.toFixed(2)}%` },
            { label: 'Absolute Return', value: `${results.absoluteReturn.toFixed(2)}%` }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            Value: formatCurrency(row.value),
            Returns: formatCurrency(row.returns)
          }))
        });
      }}
      chartTitle="Investment Growth Over Time"
      pieChartTitle="Investment vs Returns"
      yearlyBreakdownTitle="Yearly Value Breakdown"
    />
  ) : null;

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