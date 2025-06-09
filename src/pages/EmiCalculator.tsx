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
import CalculatorResults from '../components/CalculatorResults';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

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

interface CalculatorResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  yearlyBreakdown: Array<{
    year: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface ChartDataPoint {
  year: number;
  value: number;
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const EmiCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);

  const calculateResults = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseInt(loanTerm) * 12; // Convert years to months

    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
      return;
    }

    if (principal > 0 && rate > 0 && term > 0) {
      // Calculate EMI using the formula
      const emi = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = emi * term;
      const totalInterest = totalPayment - principal;

      // Calculate amortization schedule
      const amortizationSchedule: AmortizationEntry[] = [];
      let balance = principal;

      for (let month = 1; month <= term; month++) {
        const interest = balance * rate;
        const principalPayment = emi - interest;
        balance -= principalPayment;

        amortizationSchedule.push({
          month,
          payment: emi,
          principal: principalPayment,
          interest,
          balance: Math.max(0, balance)
        });
      }

      // Update chart data
      const newChartData: ChartDataPoint[] = Array.from({ length: term }, (_, i) => ({
        year: i + 1,
        value: amortizationSchedule[i].balance
      }));
      setChartData(newChartData);

      // Update pie data
      const newPieData = [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: totalInterest }
      ];
      setPieData(newPieData);

      // Calculate yearly breakdown
      const yearlyBreakdown = [];
      for (let year = 1; year <= Math.ceil(term / 12); year++) {
        const yearStart = (year - 1) * 12;
        const yearEnd = Math.min(year * 12, term);
        const yearEntries = amortizationSchedule.slice(yearStart, yearEnd);

        const yearlyEMI = yearEntries.reduce((sum, entry) => sum + entry.payment, 0);
        const yearlyPrincipal = yearEntries.reduce((sum, entry) => sum + entry.principal, 0);
        const yearlyInterest = yearEntries.reduce((sum, entry) => sum + entry.interest, 0);
        const yearEndBalance = yearEntries[yearEntries.length - 1].balance;

        yearlyBreakdown.push({
          year,
          emi: yearlyEMI,
          principal: yearlyPrincipal,
          interest: yearlyInterest,
          balance: yearEndBalance
        });
      }

      setResults({
        emi,
        totalInterest,
        totalPayment,
        yearlyBreakdown
      });
    }
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
    setChartData([]);
    setPieData([]);
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
      onCalculate={calculateResults}
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

  const resultComponent = results ? (
    <CalculatorResults
      summaryItems={[
        {
          label: 'Monthly EMI',
          value: results.emi,
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Interest',
          value: results.totalInterest,
          icon: <TrendingUpIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Payment',
          value: results.totalPayment,
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown.map((row: { year: number; emi: number; principal: number; interest: number; balance: number }) => ({
        year: row.year,
        emi: row.emi,
        principal: row.principal,
        interest: row.interest,
        balance: row.balance
      }))}
      onDownloadPDF={() => {
        downloadPDF({
          title: 'EMI Calculator Results',
          summary: [
            { label: 'Monthly EMI', value: formatCurrency(results.emi) },
            { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
            { label: 'Total Payment', value: formatCurrency(results.totalPayment) }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            'Yearly EMI': formatCurrency(row.emi),
            'Principal Paid': formatCurrency(row.principal),
            'Interest Paid': formatCurrency(row.interest),
            'Remaining Balance': formatCurrency(row.balance)
          }))
        });
      }}
      onDownloadExcel={() => {
        downloadExcel({
          title: 'EMI Calculator Results',
          summary: [
            { label: 'Monthly EMI', value: formatCurrency(results.emi) },
            { label: 'Total Interest', value: formatCurrency(results.totalInterest) },
            { label: 'Total Payment', value: formatCurrency(results.totalPayment) }
          ],
          yearlyBreakdown: results.yearlyBreakdown.map(row => ({
            Year: row.year,
            'Yearly EMI': formatCurrency(row.emi),
            'Principal Paid': formatCurrency(row.principal),
            'Interest Paid': formatCurrency(row.interest),
            'Remaining Balance': formatCurrency(row.balance)
          }))
        });
      }}
      chartTitle="Loan Balance Over Time"
      pieChartTitle="Principal vs Interest"
      yearlyBreakdownTitle="Yearly EMI Breakdown"
    />
  ) : null;

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