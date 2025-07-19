import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  Paper,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  TrendingUp as TrendingUpIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { calculateRoi, RoiCalculationParams, RoiCalculationResult } from '../utils/calculatorUtils';
import { CalculatorChart } from '../components/CalculatorChart';
import { CalculatorTable } from '../components/CalculatorTable';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { ResultCard } from '../components/ResultCard';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

const RoiCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(150000);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [results, setResults] = useState<RoiCalculationResult>({
    roi: 0,
    absoluteReturns: 0,
    totalValue: 0,
    totalReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: RoiCalculationParams = {
      initialInvestment,
      finalValue,
      timePeriod,
    };
    setResults(calculateRoi(params));
  }, [initialInvestment, finalValue, timePeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const chartAxisStyle = {
    fill: colors.secondary,
    fontSize: 12,
    fontFamily: typography.fontFamily,
  };

  const chartTooltipStyle = {
    backgroundColor: '#fff',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: typography.fontFamily,
  };

  const chartTooltipItemStyle = {
    color: colors.secondary,
    fontSize: '0.9rem',
    fontFamily: typography.fontFamily,
  };

  const chartTooltipLabelStyle = {
    color: colors.primary,
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: typography.fontFamily,
    marginBottom: '4px',
  };

  const chartLegendStyle = {
    paddingTop: '20px',
    fontFamily: typography.fontFamily,
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Initial Investment"
          value={initialInvestment}
          onChange={(value) => setInitialInvestment(typeof value === 'number' ? value : 0)}
          min={1000}
          max={10000000}
          step={1000}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }}>
                  ₹
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={initialInvestment}
          onChange={(_, newValue) => setInitialInvestment(newValue as number)}
          min={1000}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Final Value"
          value={finalValue}
          onChange={(value) => setFinalValue(typeof value === 'number' ? value : 0)}
          min={1000}
          max={10000000}
          step={1000}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }}>
                  ₹
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={finalValue}
          onChange={(_, newValue) => setFinalValue(newValue as number)}
          min={1000}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Time Period (Years)"
          value={timePeriod}
          onChange={(value) => setTimePeriod(typeof value === 'number' ? value : 0)}
          min={1}
          max={30}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={timePeriod}
          onChange={(_, newValue) => setTimePeriod(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  const resultCards = [
    { label: 'Absolute Returns', value: formatCurrency(results.absoluteReturns), variant: 'primary' },
    { label: 'ROI', value: formatPercentage(results.roi), variant: 'secondary' },
    { label: 'Total Value', value: formatCurrency(results.totalValue), variant: 'purple' },
  ];

  // Modern formula and particulars section
  const particularsSection = (
    <ParticularsSection
      title="How ROI is Calculated"
      items={[
        <><b>Initial Investment:</b> The amount you originally invested.</>,
        <><b>Final Value:</b> The value of your investment at the end of the period.</>,
        <><b>Time Period:</b> The number of years the investment was held.</>,
        <><b>Absolute Returns:</b> The total profit earned (Final Value - Initial Investment).</>,
        <><b>ROI:</b> Return on Investment, expressed as a percentage of the initial investment.</>,
        <><b>Formula:</b> ROI = (Final Value - Initial Investment) / Initial Investment × 100%</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is ROI?', a: 'ROI stands for Return on Investment, a measure of the profitability of an investment.' },
    { q: 'How is ROI calculated?', a: 'ROI = (Final Value - Initial Investment) / Initial Investment × 100%' },
    { q: 'What is a good ROI?', a: 'It depends on the investment type and market conditions. Compare with benchmarks.' },
    { q: 'Is ROI the same as CAGR?', a: 'No, CAGR measures annualized growth, while ROI is total return over the period.' },
    { q: 'Can ROI be negative?', a: 'Yes, if the final value is less than the initial investment.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  // Unified result cards and chart in one container
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        <ResultCard title="Absolute Returns" value={formatCurrency(results.absoluteReturns)} variant="primary" fontSize="0.9rem" />
        <ResultCard title="ROI" value={formatPercentage(results.roi)} variant="secondary" fontSize="0.9rem" />
        <ResultCard title="Total Value" value={formatCurrency(results.totalValue)} variant="purple" fontSize="0.9rem" />
      </Box>
      <CalculatorChart
        data={results.chartData}
        lines={[
          { dataKey: 'total', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'investment', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'returns', color: colors.accent.purple, name: 'Returns' },
        ]}
        xKey="year"
        yLabel="Amount"
        tooltipFormatter={(value: number) => formatCurrency(value)}
        xAxisFormatter={(value: number) => `Year ${value}`}
        yAxisFormatter={formatCurrency}
        height={400}
      />
    </Paper>
  );

  // Helper for 2-decimal currency formatting, but no decimals if integer
  const formatCurrency2 = (value: number) => {
    const isInt = Number.isInteger(value);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: isInt ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const roiTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
  ];

  const roiTableRows = results.chartData.map((row) => ({
    year: row.year + 1,
    investment: formatCurrency2(row.investment),
    returns: formatCurrency2(row.returns),
    total: formatCurrency2(row.total),
  }));

  const tableSection = (
    <CalculatorTable columns={roiTableColumns} rows={roiTableRows} />
  );

  return (
    <CalculatorTemplate
      title="ROI Calculator"
      description="Calculate Return on Investment and analyze the profitability of your investments."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>{particularsSection}</Box>
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>{faqSection}</Box>
        </>
      }
    />
  );
};

export default RoiCalculator; 