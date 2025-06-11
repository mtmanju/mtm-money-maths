import React, { useState, useRef } from 'react';
import {
  useTheme,
  InputAdornment,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';

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
  const resultsRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setInitialValue('');
    setFinalValue('');
    setInvestmentPeriod('');
    setResults(null);
    setChartData([]);
    setPieData([]);
  };

  const calculateResults = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const period = parseFloat(investmentPeriod);

    if (isNaN(initial) || isNaN(final) || isNaN(period)) {
      return;
    }

    const cagr = Math.pow(final / initial, 1 / period) - 1;
    const totalReturn = (final - initial) / initial;
    const absoluteReturn = final - initial;

    // Generate yearly breakdown with returns
    const yearlyBreakdown = Array.from({ length: period + 1 }, (_, i) => {
      const value = initial * Math.pow(1 + cagr, i);
      const previousValue = i === 0 ? initial : initial * Math.pow(1 + cagr, i - 1);
      const returns = value - previousValue;
      return {
        year: i,
        value: Math.round(value),
        returns: Math.round(returns)
      };
    });

    setResults({
      cagr,
      totalReturn,
      absoluteReturn,
      yearlyBreakdown
    });

    // Generate chart data
    const newChartData = Array.from({ length: period + 1 }, (_, i) => ({
      year: i,
      value: initial * Math.pow(1 + cagr, i),
    }));
    setChartData(newChartData);

    // Generate pie chart data
    setPieData([
      { name: 'Initial Investment', value: initial },
      { name: 'Returns', value: absoluteReturn },
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

  const handleDownloadPDF = () => {
    if (!results) return;
    
    downloadPDF({
      title: 'CAGR Calculator Results',
      summary: [
        { label: 'Initial Investment', value: formatCurrency(Number(initialValue)) },
        { label: 'Final Value', value: formatCurrency(Number(finalValue)) },
        { label: 'Investment Period (Years)', value: investmentPeriod },
        { label: 'CAGR', value: formatPercentage(results.cagr) },
        { label: 'Total Return', value: formatPercentage(results.totalReturn) },
        { label: 'Absolute Return', value: formatPercentage(results.absoluteReturn) }
      ],
      description: 'Compound Annual Growth Rate (CAGR) is the annual rate of return on an investment, assuming the returns are reinvested and compounded over time.'
    });
  };

  const handleDownloadExcel = () => {
    if (!results) return;
    
    downloadExcel({
      title: 'CAGR Calculator Results',
      summary: [
        { label: 'Initial Investment', value: formatCurrency(Number(initialValue)) },
        { label: 'Final Value', value: formatCurrency(Number(finalValue)) },
        { label: 'Investment Period (Years)', value: investmentPeriod },
        { label: 'CAGR', value: formatPercentage(results.cagr) },
        { label: 'Total Return', value: formatPercentage(results.totalReturn) },
        { label: 'Absolute Return', value: formatPercentage(results.absoluteReturn) }
      ],
      yearlyBreakdown: chartData.map(point => ({
        Year: point.year,
        Value: formatCurrency(point.value)
      }))
    });
  };

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

  const resultComponent = results && (
    <CalculatorResults
      ref={resultsRef}
      summaryItems={[
        {
          label: 'Total Investment',
          value: formatCurrency(Number(initialValue))
        },
        {
          label: 'Total Returns',
          value: formatCurrency(results.absoluteReturn)
        },
        {
          label: 'Maturity Value',
          value: formatCurrency(Number(finalValue))
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
      title="CAGR Calculator"
      mainDescription="Calculate the Compound Annual Growth Rate (CAGR) of your investments to understand their true performance over time."
      formComponent={formComponent}
      resultComponent={resultComponent}
      aboutComponent={aboutComponent}
    />
  );
};

export default CagrCalculator; 