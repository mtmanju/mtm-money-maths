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
import CalculatorResults from '../components/CalculatorResults';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

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

interface CalculatorResult {
  totalInvestment: number;
  totalInterest: number;
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

const SipCalculator: React.FC = () => {
  const theme = useTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);

  const calculateSIP = () => {
    const monthlyInv = parseFloat(monthlyInvestment);
    const rate = parseFloat(expectedReturn) / 100;
    const years = parseInt(investmentPeriod);
    const months = years * 12;

    if (isNaN(monthlyInv) || isNaN(rate) || isNaN(years)) {
      return;
    }

    let totalInvestment = 0;
    let totalInterest = 0;
    let maturityValue = 0;
    const yearlyBreakdown: Array<{
      year: number;
      investment: number;
      returns: number;
      total: number;
    }> = [];

    if (monthlyInv && rate && years && monthlyInv > 0 && rate > 0 && years > 0) {
      const monthlyRate = rate / 12;
      totalInvestment = monthlyInv * months;
      
      // Calculate maturity value using SIP formula
      maturityValue = monthlyInv * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      totalInterest = maturityValue - totalInvestment;

      // Calculate yearly breakdown
      for (let year = 1; year <= years; year++) {
        const yearMonths = year * 12;
        const yearInvestment = monthlyInv * yearMonths;
        const yearValue = monthlyInv * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
        const yearInterest = yearValue - yearInvestment;
        
        yearlyBreakdown.push({
          year,
          investment: yearInvestment,
          returns: yearInterest,
          total: yearValue,
        });
      }

      // Update chart data
      const newChartData: ChartDataPoint[] = Array.from({ length: years }, (_, i) => ({
        year: i + 1,
        value: yearlyBreakdown[i].total
      }));
      setChartData(newChartData);

      // Update pie data
      const newPieData = [
        { name: 'Investment', value: totalInvestment },
        { name: 'Returns', value: totalInterest }
      ];
      setPieData(newPieData);

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
          value: results.totalInterest,
          icon: <TrendingUpIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Maturity Value',
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
          title: 'SIP Calculator Results',
          summary: [
            { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
            { label: 'Total Returns', value: formatCurrency(results.totalInterest) },
            { label: 'Maturity Value', value: formatCurrency(results.maturityValue) }
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
          title: 'SIP Calculator Results',
          summary: [
            { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
            { label: 'Total Returns', value: formatCurrency(results.totalInterest) },
            { label: 'Maturity Value', value: formatCurrency(results.maturityValue) }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            Investment: formatCurrency(row.investment),
            Returns: formatCurrency(row.returns),
            Total: formatCurrency(row.total)
          }))
        });
      }}
      chartTitle="SIP Growth Over Time"
      pieChartTitle="Investment vs Returns"
      yearlyBreakdownTitle="Yearly SIP Breakdown"
    />
  ) : null;

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