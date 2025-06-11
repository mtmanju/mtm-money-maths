import React, { useState } from 'react';
import {
  useTheme,
  InputAdornment,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculatorPageTemplate from '../components/CalculatorPageTemplate';
import CalculatorBenefits from '../components/CalculatorBenefits';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorResults from '../components/CalculatorResults';
import { downloadPDF, downloadExcel } from '../utils/downloadUtils';

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

      const newChartData: ChartDataPoint[] = Array.from({ length: period + 1 }, (_, i) => ({
        year: i + 1,
        value: yearlyBreakdown[i].value
      }));
      setChartData(newChartData);

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
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Absolute Return',
          value: formatCurrency(results.absoluteReturn),
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown}
      onDownloadPDF={() => downloadPDF({
        title: 'CAGR Calculator Results',
        summary: [
          { label: 'CAGR', value: `${results.cagr.toFixed(2)}%` },
          { label: 'Total Return', value: `${results.totalReturn.toFixed(2)}%` },
          { label: 'Absolute Return', value: formatCurrency(results.absoluteReturn) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Value: formatCurrency(row.value),
          Returns: formatCurrency(row.returns)
        }))
      })}
      onDownloadExcel={() => downloadExcel({
        title: 'CAGR Calculator Results',
        summary: [
          { label: 'CAGR', value: `${results.cagr.toFixed(2)}%` },
          { label: 'Total Return', value: `${results.totalReturn.toFixed(2)}%` },
          { label: 'Absolute Return', value: formatCurrency(results.absoluteReturn) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Value: formatCurrency(row.value),
          Returns: formatCurrency(row.returns)
        }))
      })}
      chartTitle="Investment Growth Over Time"
      pieChartTitle="Investment Distribution"
      yearlyBreakdownTitle="Yearly Breakdown"
    />
  ) : null;

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