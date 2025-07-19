import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { CalculatorChart } from '../components/CalculatorChart';
import { calculateInvestment, InvestmentCalculationParams, InvestmentCalculationResult } from '../utils/calculatorUtils';

const InvestmentCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<'lumpsum' | 'sip'>('lumpsum');
  const [principal, setPrincipal] = useState<number>(100000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [considerInflation, setConsiderInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [results, setResults] = useState<InvestmentCalculationResult>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityValue: 0,
    absoluteReturns: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: InvestmentCalculationParams = {
      investmentType,
      principal,
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      considerInflation,
      inflationRate,
    };
    setResults(calculateInvestment(params));
  }, [investmentType, principal, monthlyInvestment, expectedReturn, timePeriod, considerInflation, inflationRate]);

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

  // Helper to ensure only allowed variants
  const allowedVariants = ['primary', 'secondary', 'green', 'pink', 'purple'] as const;
  function safeVariant(variant: string | undefined): typeof allowedVariants[number] {
    return (allowedVariants.includes(variant as any) ? variant : 'primary') as typeof allowedVariants[number];
  }

  const formSection = (
    <StyledPaper>
      <FormControl
        fullWidth
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            background: colors.cardBackground,
            border: `1.5px solid ${colors.border}`,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.accent.primary,
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.secondary,
            fontFamily: typography.fontFamily,
            '&.Mui-focused': {
              color: colors.accent.primary,
            },
          },
        }}
        variant="outlined"
      >
        <InputLabel>Investment Type</InputLabel>
        <Select
          value={investmentType}
          label="Investment Type"
          onChange={(e) => setInvestmentType(e.target.value as 'lumpsum' | 'sip')}
        >
          <MenuItem value="lumpsum">Lump Sum</MenuItem>
          <MenuItem value="sip">SIP</MenuItem>
        </Select>
      </FormControl>
      {investmentType === 'lumpsum' ? (
        <Box>
          <CustomNumberField
            fullWidth
            label="Principal Amount"
            value={principal}
            onChange={(value) => setPrincipal(typeof value === 'number' ? value : 0)}
            min={1000}
            max={10000000}
            step={1000}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledSlider
            value={principal}
            onChange={(_, newValue) => setPrincipal(newValue as number)}
            min={1000}
            max={10000000}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency2}
          />
        </Box>
      ) : (
        <Box>
          <CustomNumberField
            fullWidth
            label="Monthly Investment"
            value={monthlyInvestment}
            onChange={(value) => setMonthlyInvestment(typeof value === 'number' ? value : 0)}
            min={500}
            max={100000}
            step={500}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledSlider
            value={monthlyInvestment}
            onChange={(_, newValue) => setMonthlyInvestment(newValue as number)}
            min={500}
            max={100000}
            step={500}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency2}
          />
        </Box>
      )}
      <Box>
        <CustomNumberField
          fullWidth
          label="Expected Return (p.a.)"
          value={expectedReturn}
          onChange={(value) => setExpectedReturn(typeof value === 'number' ? value : 0)}
          min={1}
          max={30}
          step={0.05}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={expectedReturn}
          onChange={(_, newValue) => setExpectedReturn(newValue as number)}
          min={1}
          max={30}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
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
              <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400 }} />
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={considerInflation}
              onChange={(e) => setConsiderInflation(e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: colors.accent.primary,
                  '& + .MuiSwitch-track': {
                    backgroundColor: colors.accent.primary,
                  },
                },
              }}
            />
          }
          label="Consider Inflation"
        />
        {considerInflation && (
          <CustomNumberField
            label="Inflation Rate"
            value={inflationRate}
            onChange={(value) => setInflationRate(typeof value === 'number' ? value : 0)}
            min={1}
            max={15}
            step={0.1}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }}>
                    %
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>
    </StyledPaper>
  );

  // Result cards and chart
  const summaryCards = [
    {
      title: 'Total Investment',
      value: formatCurrency2(results.totalInvestment),
      variant: 'secondary',
    },
    {
      title: 'Total Returns',
      value: formatCurrency2(results.totalReturns),
      variant: 'purple',
    },
    {
      title: 'Maturity Value',
      value: formatCurrency2(results.maturityValue),
      variant: 'primary',
    },
  ];
  const inflationCards = considerInflation
    ? [
        {
          title: 'Inflation Adjusted Returns',
          value: formatCurrency2(results.inflationAdjustedReturns ?? 0),
          variant: 'green',
        },
        {
          title: 'Inflation Adjusted Maturity',
          value: formatCurrency2(results.inflationAdjustedMaturity ?? 0),
          variant: 'pink',
        },
      ]
    : [];
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.12rem', md: '1.18rem' }, textAlign: 'center', letterSpacing: 0.1 }}>
        {investmentType === 'sip' ? 'SIP Investment Results' : 'Lump Sum Investment Results'}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={safeVariant(card.variant)} fontSize="0.9rem" />
        ))}
        {considerInflation && inflationCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={safeVariant(card.variant)} fontSize="0.9rem" />
        ))}
      </Box>
      <CalculatorChart
        data={results.chartData.map(row => ({
          ...row,
          inflationAdjustedReturns: considerInflation ? (row.inflationAdjusted !== undefined ? row.inflationAdjusted - results.totalInvestment : undefined) : undefined,
          inflationAdjustedMaturity: considerInflation ? row.inflationAdjusted : undefined,
        }))}
        lines={[
          { dataKey: 'total', color: colors.accent.secondary, name: 'Total Value' },
          { dataKey: 'investment', color: colors.accent.primary, name: 'Investment' },
          { dataKey: 'returns', color: colors.accent.purple, name: 'Returns' },
          ...(considerInflation ? [
            { dataKey: 'inflationAdjustedReturns', color: colors.accent.green || '#81c784', name: 'Inflation Adjusted Returns' },
            { dataKey: 'inflationAdjustedMaturity', color: colors.accent.pink || '#e57373', name: 'Inflation Adjusted Maturity' },
          ] : []),
        ]}
        xKey="year"
        yLabel="Amount"
        tooltipFormatter={(value: number) => formatCurrency2(value)}
        xAxisFormatter={(value: number) => `Year ${value}`}
        yAxisFormatter={formatCurrency2}
        height={400}
      />
    </Paper>
  );

  // Table
  const investmentTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'Investment', key: 'investment' },
    { label: 'Returns', key: 'returns' },
    { label: 'Total Value', key: 'total' },
    ...(considerInflation ? [{ label: 'Inflation Adjusted Value', key: 'inflationAdjusted' }] : []),
  ];
  const investmentTableRows = results.chartData.map(row => {
    const formattedRow = {
      ...row,
      investment: formatCurrency2(row.investment),
      returns: formatCurrency2(row.returns),
      total: formatCurrency2(row.total),
    };
    if (considerInflation) {
      return {
        ...formattedRow,
        inflationAdjusted: formatCurrency2(row.inflationAdjusted ?? 0),
      };
    }
    return formattedRow;
  });
  const tableSection = (
    <CalculatorTable columns={investmentTableColumns} rows={investmentTableRows} />
  );

  // Modern particulars section (switches based on investmentType)
  const particularsSection = (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          {investmentType === 'sip'
            ? 'A = P × [ (1 + r)^n – 1 ] / r × (1 + r)'
            : 'A = P × (1 + r)^n'}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          {investmentType === 'sip'
            ? `A = ₹${monthlyInvestment.toLocaleString('en-IN')} × [ (1 + ${expectedReturn / 1200})^${timePeriod * 12} – 1 ] / ${expectedReturn / 1200} × (1 + ${expectedReturn / 1200}) = `
            : `A = ₹${principal.toLocaleString('en-IN')} × (1 + ${expectedReturn / 100})^${timePeriod} = `}
          <b>{formatCurrency2(results.maturityValue)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        {investmentType === 'sip' ? (
          <>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>P (Installment):</b> The monthly deposit amount.</span>
            </Box>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>r (Rate):</b> The monthly interest rate (annual rate / 12 / 100).</span>
            </Box>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>n (Months):</b> The total number of monthly installments.</span>
            </Box>
            <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>A (Amount):</b> The maturity value after compounding.</span>
            </Box>
          </>
        ) : (
          <>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>P (Principal):</b> The initial amount invested.</span>
            </Box>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>r (Rate):</b> The annual interest rate (as a decimal).</span>
            </Box>
            <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>n (Years):</b> Number of years the money is invested for.</span>
            </Box>
            <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
              <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
              <span><b>A (Amount):</b> The maturity value after compounding.</span>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

  // Modern FAQ section (switches based on investmentType)
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
        {(investmentType === 'sip'
          ? [
              { q: 'What is a SIP?', a: 'A Systematic Investment Plan (SIP) is a way to invest a fixed amount regularly in mutual funds or other investment vehicles.' },
              { q: 'How is SIP maturity calculated?', a: 'A = P × [ (1 + r)^n – 1 ] / r × (1 + r), where A is maturity value, P is monthly investment, r is monthly rate, n is number of months.' },
              { q: 'What are the benefits of SIP?', a: 'SIP allows rupee cost averaging, compounding, and disciplined investing.' },
              { q: 'Can I change my SIP amount?', a: 'Yes, you can increase or decrease your SIP amount as per your financial goals.' },
              { q: 'Is SIP safe?', a: 'SIP is a method of investing, not a product. The safety depends on the underlying investment.' },
            ]
          : [
              { q: 'What is a Lump Sum investment?', a: 'A Lump Sum investment is a one-time investment of a large amount in a financial instrument.' },
              { q: 'How is Lump Sum maturity calculated?', a: 'A = P × (1 + r)^n, where A is maturity value, P is principal, r is rate, n is years.' },
              { q: 'What are the benefits of Lump Sum?', a: 'Lump Sum can be beneficial when you have a large amount to invest and want to take advantage of market timing.' },
              { q: 'Is Lump Sum better than SIP?', a: 'It depends on market conditions and your financial goals. SIP is better for disciplined, long-term investing.' },
              { q: 'Is Lump Sum safe?', a: 'The safety depends on the underlying investment product.' },
            ]
        ).map((item, idx, arr) => (
          <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
            <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
            {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Investment Calculator"
      description="Plan your investments and calculate potential returns with our comprehensive tool."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.primary, mb: 2, fontSize: { xs: '1.05rem', md: '1.10rem' }, textAlign: 'center', letterSpacing: 0.1 }}>
            {investmentType === 'sip' ? 'SIP Particulars & FAQ' : 'Lump Sum Particulars & FAQ'}
          </Typography>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How Investment is Calculated
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

export default InvestmentCalculator; 