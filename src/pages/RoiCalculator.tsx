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
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          ROI = ((Final Value - Initial Investment) / Initial Investment) × 100
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          ROI = ((₹{finalValue.toLocaleString('en-IN')} - ₹{initialInvestment.toLocaleString('en-IN')}) / ₹{initialInvestment.toLocaleString('en-IN')}) × 100 = <b>{formatPercentage(results.roi)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Initial Investment:</b> The amount you originally invested.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Final Value:</b> The value of your investment at the end of the period.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Time Period:</b> The number of years the investment was held.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Absolute Returns:</b> The total profit earned (Final Value - Initial Investment).</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>ROI:</b> Return on Investment, expressed as a percentage of the initial investment.</span>
        </Box>
      </Box>
    </Box>
  );

  // Modern FAQ section
  const [faqOpen, setFaqOpen] = React.useState(false);
  const faqSection = (
    <Box sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }} onClick={() => setFaqOpen((o) => !o)}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary, flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          Frequently Asked Questions
        </Typography>
        <Box component="span" sx={{ color: colors.secondary, ml: 1, display: 'flex', alignItems: 'center' }}>
          <svg style={{ transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s', width: 22, height: 22 }} viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
        </Box>
      </Box>
      <Box sx={{ display: faqOpen ? 'block' : 'none', mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: typography.fontFamily }}>
        {[
          {
            q: 'What is ROI?',
            a: 'ROI (Return on Investment) measures the gain or loss generated on an investment relative to the amount invested.'
          },
          {
            q: 'How is ROI calculated?',
            a: 'ROI = ((Final Value - Initial Investment) / Initial Investment) × 100.'
          },
          {
            q: 'What does a positive ROI mean?',
            a: 'A positive ROI means your investment has grown in value.'
          },
          {
            q: 'Can ROI be negative?',
            a: 'Yes, a negative ROI means your investment has lost value.'
          },
          {
            q: 'Is ROI the same as CAGR?',
            a: 'No, ROI measures total return over a period, while CAGR measures the annual growth rate.'
          }
        ].map((item, idx, arr) => (
          <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
            <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
            {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
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
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How ROI is Calculated
            </Typography>
            {particularsSection}
          </Box>
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>
            {faqSection}
          </Box>
        </>
      }
    />
  );
};

export default RoiCalculator; 