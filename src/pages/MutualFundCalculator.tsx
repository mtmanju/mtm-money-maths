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

const MutualFundCalculator: React.FC = () => {
  const theme = useTheme();
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('');
  const [results, setResults] = useState<CalculatorResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number }>>([]);

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

    if (monthly > 0 && rate > 0 && period > 0) {
      const totalInvestment = monthly * period;
      const maturityValue = monthly * ((Math.pow(1 + rate, period) - 1) / rate) * (1 + rate);
      const totalReturns = maturityValue - totalInvestment;

      const yearlyBreakdown: Array<{ year: number; investment: number; returns: number; value: number }> = [];
      let currentValue = 0;

      for (let year = 1; year <= Math.ceil(period / 12); year++) {
        const monthsInYear = Math.min(12, period - (year - 1) * 12);
        let yearInvestment = 0;
        let yearReturns = 0;

        for (let month = 1; month <= monthsInYear; month++) {
          const monthInvestment = monthly;
          const monthReturns = currentValue * rate;
          currentValue = (currentValue + monthInvestment) * (1 + rate);
          yearInvestment += monthInvestment;
          yearReturns += monthReturns;
        }

        yearlyBreakdown.push({
          year,
          investment: Math.round(yearInvestment),
          returns: Math.round(yearReturns),
          value: Math.round(currentValue)
        });
      }

      const newChartData: ChartDataPoint[] = yearlyBreakdown.map(item => ({
        year: item.year,
        value: item.value
      }));
      setChartData(newChartData);

      const newPieData = [
        { name: 'Total Investment', value: totalInvestment },
        { name: 'Total Returns', value: totalReturns }
      ];
      setPieData(newPieData);

      setResults({
        maturityValue: Math.round(maturityValue),
        totalInvestment: Math.round(totalInvestment),
        totalReturns: Math.round(totalReturns),
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
      title: "Investment Planning",
      description: "Plan your mutual fund investments and understand potential returns over time."
    },
    {
      title: "Goal Setting",
      description: "Set realistic financial goals based on your investment capacity and expected returns."
    },
    {
      title: "Return Analysis",
      description: "Analyze the potential returns on your mutual fund investments."
    },
    {
      title: "Portfolio Growth",
      description: "Track the growth of your investment portfolio over the years."
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

  const resultComponent = results ? (
    <CalculatorResults
      summaryItems={[
        {
          label: 'Maturity Value',
          value: formatCurrency(results.maturityValue),
          icon: <AccountBalanceIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Investment',
          value: formatCurrency(results.totalInvestment),
          icon: <MonetizationOnIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        },
        {
          label: 'Total Returns',
          value: formatCurrency(results.totalReturns),
          icon: <TrendingUpIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
        }
      ]}
      chartData={chartData}
      pieData={pieData}
      yearlyBreakdown={results.yearlyBreakdown}
      onDownloadPDF={() => downloadPDF({
        title: 'Mutual Fund Calculator Results',
        summary: [
          { label: 'Maturity Value', value: formatCurrency(results.maturityValue) },
          { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
          { label: 'Total Returns', value: formatCurrency(results.totalReturns) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Investment: formatCurrency(row.investment),
          Returns: formatCurrency(row.returns),
          Value: formatCurrency(row.value)
        }))
      })}
      onDownloadExcel={() => downloadExcel({
        title: 'Mutual Fund Calculator Results',
        summary: [
          { label: 'Maturity Value', value: formatCurrency(results.maturityValue) },
          { label: 'Total Investment', value: formatCurrency(results.totalInvestment) },
          { label: 'Total Returns', value: formatCurrency(results.totalReturns) }
        ],
        yearlyBreakdown: results.yearlyBreakdown.map(row => ({
          Year: row.year,
          Investment: formatCurrency(row.investment),
          Returns: formatCurrency(row.returns),
          Value: formatCurrency(row.value)
        }))
      })}
      chartTitle="Investment Growth Over Time"
      pieChartTitle="Investment vs Returns"
      yearlyBreakdownTitle="Yearly Breakdown"
    />
  ) : null;

  return (
    <CalculatorPageTemplate
      title="Mutual Fund Calculator"
      mainDescription="Calculate potential returns on your mutual fund investments and plan your financial future."
      formComponent={formComponent}
      resultComponent={resultComponent}
      aboutComponent={aboutComponent}
    />
  );
};

export default MutualFundCalculator; 