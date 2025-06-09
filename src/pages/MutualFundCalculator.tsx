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
  TrendingUp as TrendingUpIcon,
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
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

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

interface PieData {
  name: string;
  value: number;
}

interface CalculatorResult {
    totalInvestment: number;
    totalReturns: number;
    maturityValue: number;
    yearlyBreakdown: Array<{
      year: number;
      investment: number;
      returns: number;
      total: number;
    }>;
}

interface ChartDataPoint {
  year: number;
  value: number;
}

const MutualFundCalculator: React.FC = () => {
  const theme = useMuiTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);

  const calculateMutualFund = () => {
    const monthlyInv = parseFloat(monthlyInvestment);
    const annualRate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (monthlyInv > 0 && annualRate > 0 && years > 0) {
      const months = years * 12;
      const monthlyRate = annualRate / 12;

      let futureValue = 0;
      const newChartData: ChartDataPoint[] = [];

      for (let i = 1; i <= months; i++) {
        futureValue = monthlyInv * (Math.pow(1 + monthlyRate, i) - 1) / monthlyRate;
        if (i % 12 === 0) {
          newChartData.push({
            year: i / 12,
            value: futureValue,
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
        yearlyBreakdown: newChartData.map(data => {
          const yearInvestment = monthlyInv * 12 * data.year;
          const yearReturns = data.value - yearInvestment;
          return {
            year: data.year,
            investment: yearInvestment,
            returns: yearReturns,
            total: data.value,
          };
        }),
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

  const resultComponent = results ? (
    <CalculatorResults
      summaryItems={[
        {
          label: 'Total Investment',
          value: results.totalInvestment,
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Returns',
          value: results.totalReturns,
          icon: <TrendingUpIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Corpus',
          value: results.maturityValue,
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown.map((row: { year: number; investment: number; returns: number; total: number }) => ({
        year: row.year,
        investment: row.investment,
        returns: row.returns,
        total: row.total
      }))}
      onDownloadPDF={() => {
        downloadPDF({
          title: 'Mutual Fund Calculator Results',
          summary: [
            { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
            { label: 'Total Returns', value: formatCurrency(results.totalReturns) },
            { label: 'Total Corpus', value: formatCurrency(results.maturityValue) }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            Investment: formatCurrency(row.investment),
            Returns: formatCurrency(row.returns),
            Total: formatCurrency(row.total)
          }))
        });
      }}
      onDownloadExcel={() => {
        downloadExcel({
          title: 'Mutual Fund Calculator Results',
          summary: [
            { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
            { label: 'Total Returns', value: formatCurrency(results.totalReturns) },
            { label: 'Total Corpus', value: formatCurrency(results.maturityValue) }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            Investment: formatCurrency(row.investment),
            Returns: formatCurrency(row.returns),
            Total: formatCurrency(row.total)
          }))
        });
      }}
      chartTitle="Investment Growth Over Time"
      pieChartTitle="Investment Distribution"
      yearlyBreakdownTitle="Yearly Investment Breakdown"
    />
  ) : null;

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