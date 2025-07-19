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
  CalendarMonth as CalendarMonthIcon,
  TrendingUp as TrendingUpIcon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorChart } from '../components/CalculatorChart';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

interface CagrResults {
  cagr: number;
  absoluteReturns: number;
  totalValue: number;
  chartData: Array<{
    year: number;
    value: number;
  }>;
}

const CagrCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(150000);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [results, setResults] = useState<CagrResults>({
    cagr: 0,
    absoluteReturns: 0,
    totalValue: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateCagr();
  }, [initialInvestment, finalValue, timePeriod]);

  const calculateCagr = () => {
    const absoluteReturns = finalValue - initialInvestment;
    const cagr = (Math.pow(finalValue / initialInvestment, 1 / timePeriod) - 1) * 100;

    // Generate chart data
    const chartData = Array.from({ length: timePeriod + 1 }, (_, i) => {
      const year = i;
      const value = initialInvestment * Math.pow(1 + cagr / 100, year);

      return {
        year,
        value,
      };
    });

    setResults({
      cagr,
      absoluteReturns,
      totalValue: finalValue,
      chartData,
    });
  };

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

  // Result cards
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        <ResultCard title="Absolute Returns" value={formatCurrency(results.absoluteReturns)} variant="primary" fontSize="0.9rem" />
        <ResultCard title="CAGR" value={formatPercentage(results.cagr)} variant="secondary" fontSize="0.9rem" />
        <ResultCard title="Total Value" value={formatCurrency(results.totalValue)} variant="purple" fontSize="0.9rem" />
      </Box>
      <CalculatorChart
        data={results.chartData}
        lines={[
          { dataKey: 'value', color: colors.accent.primary, name: 'Investment Value' },
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

  // Table
  const cagrTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Value', key: 'value' },
  ];
  const cagrTableRows = results.chartData.map((row) => ({
    year: row.year + 1,
    value: formatCurrency2(row.value),
  }));
  const tableSection = (
    <CalculatorTable columns={cagrTableColumns} rows={cagrTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How CAGR is Calculated"
      items={[
        <><b>Initial Investment:</b> The amount you originally invested.</>,
        <><b>Final Value:</b> The value of your investment at the end of the period.</>,
        <><b>Time Period:</b> The number of years the investment was held.</>,
        <><b>Absolute Returns:</b> The total profit earned (Final Value - Initial Investment).</>,
        <><b>CAGR:</b> Compound Annual Growth Rate, the annual growth rate of your investment.</>,
        <><b>Formula:</b> CAGR = (Final Value / Initial Investment)^(1/Time Period) - 1</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is CAGR?', a: 'CAGR stands for Compound Annual Growth Rate, the annual growth rate of an investment over a period.' },
    { q: 'How is CAGR calculated?', a: 'CAGR = (Final Value / Initial Investment)^(1/Time Period) - 1' },
    { q: 'What is the difference between CAGR and ROI?', a: 'CAGR measures annualized growth, while ROI is total return over the period.' },
    { q: 'Can CAGR be negative?', a: 'Yes, if the final value is less than the initial investment.' },
    { q: 'Why is CAGR useful?', a: 'CAGR smooths out returns and shows the true annual growth rate.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="CAGR Calculator"
      description="Calculate Compound Annual Growth Rate for your investments and analyze returns."
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

export default CagrCalculator; 