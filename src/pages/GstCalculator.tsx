import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Percent as PercentIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { ResultCard } from '../components/ResultCard';
import { colors, typography } from '../components/calculatorStyles';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorTable } from '../components/CalculatorTable';
import { calculateGst, GstCalculationParams, GstCalculationResult } from '../utils/calculatorUtils';

function GstCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [results, setResults] = useState<GstCalculationResult>({
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalGST: 0,
    totalAmount: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: GstCalculationParams = {
      amount,
      gstRate,
      isInterState,
    };
    setResults(calculateGst(params));
  }, [amount, gstRate, isInterState]);

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

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Base Amount"
          value={amount}
          onChange={(value) => setAmount(typeof value === 'number' ? value : 0)}
          min={0}
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
          value={amount}
          onChange={(_, newValue) => setAmount(newValue as number)}
          min={0}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="GST Rate"
          value={gstRate}
          onChange={(value) => setGstRate(typeof value === 'number' ? value : 0)}
          min={0}
          max={28}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 20, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={gstRate}
          onChange={(_, newValue) => setGstRate(newValue as number)}
          min={0}
          max={28}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isInterState}
              onChange={(_, checked) => setIsInterState(checked)}
              color="primary"
            />
          }
          label={isInterState ? 'Inter-State' : 'Intra-State'}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Total GST',
      value: formatCurrency2(results.totalGST),
      variant: 'primary' as const,
    },
    {
      title: 'CGST',
      value: formatCurrency2(results.cgst),
      variant: 'secondary' as const,
    },
    {
      title: 'SGST',
      value: formatCurrency2(results.sgst),
      variant: 'purple' as const,
    },
    {
      title: 'IGST',
      value: formatCurrency2(results.igst),
      variant: 'green' as const,
    },
    {
      title: 'Total Amount',
      value: formatCurrency2(results.totalAmount),
      variant: 'pink' as const,
    },
  ];

  // Result cards and chart
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          GST Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={results.chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="amount"
            >
              {results.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 1 ? colors.accent.primary : index === 2 ? colors.accent.secondary : index === 3 ? colors.accent.green : colors.accent.purple} />
              ))}
            </Pie>
            <RechartsTooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '12px', fontFamily: typography.fontFamily }}
              itemStyle={{ color: colors.secondary, fontSize: '0.9rem', fontFamily: typography.fontFamily }}
              labelStyle={{ color: colors.primary, fontSize: '0.9rem', fontWeight: 600, fontFamily: typography.fontFamily, marginBottom: '4px' }}
              formatter={(value: number) => formatCurrency2(value)}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: typography.fontFamily }} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );

  // Table
  const gstTableColumns = [
    { label: 'Component', key: 'component' },
    { label: 'Amount', key: 'amount' },
  ];
  const gstTableRows = results.chartData.map(row => ({
    ...row,
    amount: formatCurrency2(row.amount),
  }));
  const tableSection = (
    <CalculatorTable columns={gstTableColumns} rows={gstTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          GST = (Base Amount × GST Rate) / 100
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          GST = ₹{amount.toLocaleString('en-IN')} × {gstRate}% = <b>{formatCurrency2(results.totalGST)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>CGST:</b> Central Goods and Services Tax (for intra-state transactions).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>SGST:</b> State Goods and Services Tax (for intra-state transactions).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>IGST:</b> Integrated Goods and Services Tax (for inter-state transactions).</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Total Amount:</b> The sum of base amount and GST.</span>
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
            q: 'What is GST?',
            a: 'Goods and Services Tax (GST) is a value-added tax levied on most goods and services sold for domestic consumption.'
          },
          {
            q: 'What is the difference between CGST, SGST, and IGST?',
            a: 'CGST and SGST are levied on intra-state transactions, while IGST is levied on inter-state transactions.'
          },
          {
            q: 'How is GST calculated?',
            a: 'GST = (Base Amount × GST Rate) / 100.'
          },
          {
            q: 'Is GST applicable to all goods and services?',
            a: 'Most goods and services are covered, but some are exempt or have special rates.'
          },
          {
            q: 'Can I claim GST input credit?',
            a: 'Businesses registered under GST can claim input credit for tax paid on purchases.'
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

  return (
    <CalculatorTemplate
      title="GST Calculator"
      description="Calculate GST, CGST, and SGST for your goods and services."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How GST is Calculated
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
}

export default GstCalculator; 