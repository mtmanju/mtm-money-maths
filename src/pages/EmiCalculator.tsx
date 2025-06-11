import React, { useState } from 'react';
import {
  useTheme,
  InputAdornment,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

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
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm) * 12; // Total number of months

    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
      return;
    }

    if (principal > 0 && rate > 0 && term > 0) {
      const emi = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
      const totalPayment = emi * term;
      const totalInterest = totalPayment - principal;

      const yearlyBreakdown: Array<{ year: number; principal: number; interest: number; balance: number }> = [];
      let remainingBalance = principal;

      for (let year = 1; year <= Math.ceil(term / 12); year++) {
        let yearPrincipal = 0;
        let yearInterest = 0;
        const monthsInYear = Math.min(12, term - (year - 1) * 12);

        for (let month = 1; month <= monthsInYear; month++) {
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

      const newChartData: ChartDataPoint[] = yearlyBreakdown.map(item => ({
        year: item.year,
        value: item.principal + item.interest
      }));
      setChartData(newChartData);

      const newPieData = [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: totalInterest }
      ];
      setPieData(newPieData);

      setResults({
        emi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        yearlyBreakdown
      });
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

  const resultComponent = results ? (
    <CalculatorResults
      summaryItems={[
        {
          label: 'Monthly EMI',
          value: formatCurrency(results.emi),
          icon: <PaymentsIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Payment',
          value: formatCurrency(results.totalPayment),
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Interest',
          value: formatCurrency(results.totalInterest),
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown}
      onDownloadPDF={() => downloadPDF({
        title: 'EMI Calculator Results',
        summary: [
          { label: 'Monthly EMI', value: formatCurrency(results.emi) },
          { label: 'Total Payment', value: formatCurrency(results.totalPayment) },
          { label: 'Total Interest', value: formatCurrency(results.totalInterest) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Principal: formatCurrency(row.principal),
          Interest: formatCurrency(row.interest),
          Balance: formatCurrency(row.balance)
        }))
      })}
      onDownloadExcel={() => downloadExcel({
        title: 'EMI Calculator Results',
        summary: [
          { label: 'Monthly EMI', value: formatCurrency(results.emi) },
          { label: 'Total Payment', value: formatCurrency(results.totalPayment) },
          { label: 'Total Interest', value: formatCurrency(results.totalInterest) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Principal: formatCurrency(row.principal),
          Interest: formatCurrency(row.interest),
          Balance: formatCurrency(row.balance)
        }))
      })}
      chartTitle="Yearly Payment Breakdown"
      pieChartTitle="Principal vs Interest"
      yearlyBreakdownTitle="Yearly Breakdown"
    />
  ) : null;

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