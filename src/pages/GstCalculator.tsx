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
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

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
    <ParticularsSection
      title="How GST is Calculated"
      items={[
        <><b>GST (Goods and Services Tax):</b> A value-added tax levied on most goods and services sold for domestic consumption.</>,
        <><b>CGST/SGST/IGST:</b> Central, State, and Integrated GST components.</>,
        <><b>Formula:</b> GST Amount = (Original Cost × GST Rate) / 100</>,
        <><b>Total Cost:</b> Original Cost + GST Amount</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is GST?', a: 'GST stands for Goods and Services Tax, a comprehensive indirect tax on manufacture, sale, and consumption of goods and services.' },
    { q: 'How is GST calculated?', a: 'GST Amount = (Original Cost × GST Rate) / 100' },
    { q: 'What is CGST, SGST, IGST?', a: 'These are components of GST: Central, State, and Integrated GST.' },
    { q: 'Is GST applicable to all products?', a: 'Most goods and services are covered, but some are exempt.' },
    { q: 'Can I claim GST input credit?', a: 'Businesses registered under GST can claim input credit for tax paid on purchases.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
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
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>{particularsSection}</Box>
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>{faqSection}</Box>
        </>
      }
    />
  );
}

export default GstCalculator; 