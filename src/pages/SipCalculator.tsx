import React, { useState, useRef } from 'react';
import {
  useTheme,
  InputAdornment,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';

interface CalculatorResult {
  maturityValue: number;
  totalInvestment: number;
  totalReturns: number;
  yearlyBreakdown: Array<{
    year: number;
    investment: number;
    returns: number;
    value: number;
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
  const resultsRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setMonthlyInvestment('');
    setExpectedReturn('');
    setInvestmentPeriod('');
    setResults(null);
    setChartData([]);
    setPieData([]);
  };

  const calculateResults = () => {
    const monthly = parseFloat(monthlyInvestment);
    const rate = parseFloat(expectedReturn) / 100 / 12; // Monthly rate
    const period = parseFloat(investmentPeriod) * 12; // Total months

    if (isNaN(monthly) || isNaN(rate) || isNaN(period)) {
      return;
    }

    const maturityValue = monthly * ((Math.pow(1 + rate, period) - 1) / rate);
    const totalInvestment = monthly * period;
    const totalReturns = maturityValue - totalInvestment;

    // Generate yearly breakdown
    const yearlyBreakdown = Array.from({ length: parseFloat(investmentPeriod) + 1 }, (_, i) => {
      const yearMonths = Math.min(12, period - i * 12);
      const yearInvestment = monthly * yearMonths;
      const yearValue = monthly * ((Math.pow(1 + rate, (i + 1) * 12) - Math.pow(1 + rate, i * 12)) / rate);
      return {
        year: i,
        investment: Math.round(yearInvestment),
        returns: Math.round(yearValue - yearInvestment),
        value: Math.round(yearValue)
      };
    });

    setResults({
      maturityValue,
      totalInvestment,
      totalReturns,
      yearlyBreakdown
    });

    // Generate chart data
    const newChartData = Array.from({ length: parseFloat(investmentPeriod) + 1 }, (_, i) => ({
      year: i,
      value: yearlyBreakdown[i].value
    }));
    setChartData(newChartData);

    // Generate pie chart data
    setPieData([
      { name: 'Total Investment', value: totalInvestment },
      { name: 'Returns', value: totalReturns }
    ]);

    // Scroll to results section after a short delay to ensure rendering
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const benefits = [
    {
      title: "Systematic Investment",
      description: "Plan your systematic investment strategy and understand potential returns."
    },
    {
      title: "Long-term Planning",
      description: "Set realistic financial goals based on your investment capacity."
    },
    {
      title: "Return Analysis",
      description: "Analyze the potential returns on your SIP investments."
    },
    {
      title: "Portfolio Growth",
      description: "Track the growth of your investment portfolio over time."
    }
  ];

  const inputFields = [
    {
      label: 'Monthly Investment',
      value: monthlyInvestment,
      onChange: setMonthlyInvestment,
      type: 'number',
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      tooltip: 'Enter your monthly investment amount'
    },
    {
      label: 'Expected Return (per annum)',
      value: expectedReturn,
      onChange: setExpectedReturn,
      type: 'number',
      endAdornment: <InputAdornment position="end">%</InputAdornment>,
      tooltip: 'Enter the expected annual return rate'
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
      calculateButtonText="Calculate Returns"
      calculateButtonIcon={<TrendingUpIcon />}
    />
  );

  const aboutComponent = (
    <CalculatorBenefits benefits={benefits} />
  );

  const handleDownloadPDF = () => {
    if (!results) return;
    
    downloadPDF({
      title: 'SIP Calculator Results',
      summary: [
        { label: 'Monthly Investment', value: formatCurrency(Number(monthlyInvestment)) },
        { label: 'Expected Return', value: `${expectedReturn}%` },
        { label: 'Investment Period (Years)', value: investmentPeriod },
        { label: 'Maturity Value', value: formatCurrency(results.maturityValue) },
        { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
        { label: 'Total Returns', value: formatCurrency(results.totalReturns) }
      ],
      description: 'SIP (Systematic Investment Plan) Calculator helps you estimate the future value of your regular investments based on the monthly investment amount, expected return rate, and investment period.'
    });
  };

  const handleDownloadExcel = () => {
    if (!results) return;
    
    downloadExcel({
      title: 'SIP Calculator Results',
      summary: [
        { label: 'Monthly Investment', value: formatCurrency(Number(monthlyInvestment)) },
        { label: 'Expected Return', value: `${expectedReturn}%` },
        { label: 'Investment Period (Years)', value: investmentPeriod },
        { label: 'Maturity Value', value: formatCurrency(results.maturityValue) },
        { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
        { label: 'Total Returns', value: formatCurrency(results.totalReturns) }
      ],
      yearlyBreakdown: chartData.map(point => ({
        Year: point.year,
        Value: formatCurrency(point.value)
      }))
    });
  };

  const resultComponent = results && (
    <CalculatorResults
      ref={resultsRef}
      summaryItems={[
        {
          label: 'Total Investment',
          value: formatCurrency(results.totalInvestment)
        },
        {
          label: 'Total Returns',
          value: formatCurrency(results.totalReturns)
        },
        {
          label: 'Maturity Value',
          value: formatCurrency(results.maturityValue)
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown}
      onDownloadPDF={handleDownloadPDF}
      onDownloadExcel={handleDownloadExcel}
      chartTitle="Investment Growth"
      pieChartTitle="Investment Distribution"
    />
  );

  return (
    <CalculatorPageTemplate
      title="SIP Calculator"
      mainDescription="Calculate potential returns on your Systematic Investment Plan (SIP) and plan your financial future."
      formComponent={formComponent}
      resultComponent={resultComponent}
      aboutComponent={aboutComponent}
    />
  );
};

export default SipCalculator; 