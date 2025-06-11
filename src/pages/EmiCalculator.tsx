import React, { useState, useRef } from 'react';
import {
  useTheme,
  InputAdornment,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';

interface CalculatorResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface ChartDataPoint {
  year: number;
  value: number;
}

const EmiCalculator: React.FC = () => {
  const theme = useTheme();
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setResults(null);
    setChartData([]);
    setPieData([]);
  };

  const calculateResults = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const time = parseFloat(loanTerm) * 12; // Total months

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      return;
    }

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let remainingBalance = principal;
    
    for (let year = 0; year <= parseFloat(loanTerm); year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      const monthsInYear = Math.min(12, time - year * 12);

      for (let month = 0; month < monthsInYear; month++) {
        const interestPayment = remainingBalance * rate;
        const principalPayment = emi - interestPayment;
        remainingBalance -= principalPayment;
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
      }

      yearlyBreakdown.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.round(remainingBalance)
      });
    }

    setResults({
      emi,
      totalPayment,
      totalInterest,
      yearlyBreakdown
    });

    // Generate chart data
    const newChartData = yearlyBreakdown.map(item => ({
      year: item.year,
      value: item.balance
    }));
    setChartData(newChartData);

    // Generate pie chart data
    setPieData([
      { name: 'Principal', value: principal },
      { name: 'Interest', value: totalInterest }
    ]);

    // Scroll to results section after a short delay to ensure rendering
    setTimeout(() => {
      if (resultsRef.current) {
        const yOffset = -100; // Offset to show cards from the beginning
        const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const benefits = [
    {
      title: "Loan Planning",
      description: "Plan your loan payments effectively by understanding your monthly EMI obligations."
    },
    {
      title: "Budget Management",
      description: "Better manage your monthly budget by knowing exactly how much you need to pay."
    },
    {
      title: "Interest Analysis",
      description: "Understand the total interest you'll pay over the loan term and make informed decisions."
    },
    {
      title: "Loan Comparison",
      description: "Compare different loan options to find the most suitable one for your needs."
    }
  ];

  const inputFields = [
    {
      label: 'Loan Amount',
      value: loanAmount,
      onChange: setLoanAmount,
      type: 'number',
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      tooltip: 'Enter the loan amount'
    },
    {
      label: 'Interest Rate (per annum)',
      value: interestRate,
      onChange: setInterestRate,
      type: 'number',
      endAdornment: <InputAdornment position="end">%</InputAdornment>,
      tooltip: 'Enter the annual interest rate'
    },
    {
      label: 'Loan Term (Years)',
      value: loanTerm,
      onChange: setLoanTerm,
      type: 'number',
      tooltip: 'Enter the loan term in years'
    }
  ];

  const formComponent = (
    <CalculatorForm
      title="Input Values"
      inputFields={inputFields}
      onCalculate={calculateResults}
      onReset={resetForm}
      calculateButtonText="Calculate EMI"
      calculateButtonIcon={<PaymentsIcon />}
    />
  );

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const handleDownloadPDF = () => {
    if (!results) return;
    
    downloadPDF({
      title: 'EMI Calculator Results',
      summary: [
        { label: 'Loan Amount', value: formatCurrency(Number(loanAmount)) },
        { label: 'Interest Rate', value: `${interestRate}%` },
        { label: 'Loan Term (Years)', value: loanTerm.toString() },
        { label: 'Monthly EMI', value: formatCurrency(results.emi) },
        { label: 'Total Payment', value: formatCurrency(results.totalPayment) },
        { label: 'Total Interest', value: formatCurrency(results.totalInterest) }
      ],
      description: 'EMI (Equated Monthly Installment) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month.'
    });
  };

  const handleDownloadExcel = () => {
    if (!results) return;
    
    downloadExcel({
      title: 'EMI Calculator Results',
      summary: [
        { label: 'Loan Amount', value: formatCurrency(Number(loanAmount)) },
        { label: 'Interest Rate', value: `${interestRate}%` },
        { label: 'Loan Term (Years)', value: loanTerm.toString() },
        { label: 'Monthly EMI', value: formatCurrency(results.emi) },
        { label: 'Total Payment', value: formatCurrency(results.totalPayment) },
        { label: 'Total Interest', value: formatCurrency(results.totalInterest) }
      ],
      yearlyBreakdown: results.yearlyBreakdown.map(item => ({
        Year: item.year,
        'Principal Paid': formatCurrency(item.principal),
        'Interest Paid': formatCurrency(item.interest),
        'Remaining Balance': formatCurrency(item.balance)
      }))
    });
  };

  const resultComponent = results && (
    <CalculatorResults
      ref={resultsRef}
      summaryItems={[
        {
          label: 'Monthly EMI',
          value: formatCurrency(results.emi),
          icon: <PaymentsIcon />
        },
        {
          label: 'Total Payment',
          value: formatCurrency(results.totalPayment),
          icon: <AccountBalanceIcon />
        },
        {
          label: 'Total Interest',
          value: formatCurrency(results.totalInterest),
          icon: <TrendingUpIcon />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown}
      onDownloadPDF={handleDownloadPDF}
      onDownloadExcel={handleDownloadExcel}
      chartTitle="Payment Schedule"
      pieChartTitle="Payment Distribution"
    />
  );

  return (
    <CalculatorPageTemplate
      title="EMI Calculator"
      mainDescription="Calculate your Equated Monthly Installment (EMI) to plan your loan payments effectively."
      formComponent={formComponent}
      resultComponent={resultComponent}
      aboutComponent={aboutComponent}
    />
  );
};

export default EmiCalculator; 