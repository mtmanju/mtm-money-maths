import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
} from '@mui/material';
import {
  Percent as PercentIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';
import { calculateIncomeTax, IncomeTaxCalculationParams, IncomeTaxCalculationResult } from '../utils/calculatorUtils';

const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(1000000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [deductions, setDeductions] = useState<number>(0);
  const [results, setResults] = useState<IncomeTaxCalculationResult>({
    totalIncome: 0,
    taxableIncome: 0,
    totalTax: 0,
    effectiveTaxRate: 0,
    taxBreakdown: [],
  });

  useEffect(() => {
    const params: IncomeTaxCalculationParams = {
      income,
      regime,
      deductions,
    };
    setResults(calculateIncomeTax(params));
  }, [income, regime, deductions]);

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

  // Extract surcharge, cess, and rebate from calculation (recompute here for display)
  // This logic should match calculatorUtils
  const stdDeduction = regime === 'new' ? 75000 : 50000;
  const allowedDeductions = regime === 'old' ? deductions : 0;
  const taxableIncome = Math.max(0, income - stdDeduction - allowedDeductions);
  // Section 87A rebate
  let totalTax = 0;
  const newRegimeSlabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400001, max: 800000, rate: 5 },
    { min: 800001, max: 1200000, rate: 10 },
    { min: 1200001, max: 1600000, rate: 15 },
    { min: 1600001, max: 2000000, rate: 20 },
    { min: 2000001, max: 2400000, rate: 25 },
    { min: 2400001, max: Infinity, rate: 30 },
  ];
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250001, max: 500000, rate: 5 },
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: Infinity, rate: 30 },
  ];
  const slabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;
  slabs.forEach((slab) => {
    if (taxableIncome > slab.min) {
      const taxableAmount = Math.min(
        taxableIncome - slab.min,
        slab.max === Infinity ? taxableIncome - slab.min : slab.max - slab.min
      );
      const taxAmount = (taxableAmount * slab.rate) / 100;
      totalTax += taxAmount;
    }
  });
  let rebate = 0;
  if (regime === 'new' && taxableIncome <= 1200000) {
    rebate = Math.min(totalTax, 60000);
  } else if (regime === 'old' && taxableIncome <= 500000) {
    rebate = Math.min(totalTax, 12500);
  }
  let taxAfterRebate = Math.max(0, totalTax - rebate);
  let surchargeRate = 0;
  if (taxableIncome > 50000000) {
    surchargeRate = 0.37;
  } else if (taxableIncome > 20000000) {
    surchargeRate = 0.25;
  } else if (taxableIncome > 10000000) {
    surchargeRate = 0.15;
  } else if (taxableIncome > 5000000) {
    surchargeRate = 0.10;
  }
  let surcharge = taxAfterRebate * surchargeRate;
  let cess = (taxAfterRebate + surcharge) * 0.04;

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Total Income',
      value: formatCurrency2(results.totalIncome),
      variant: 'primary' as const,
    },
    {
      title: 'Taxable Income',
      value: formatCurrency2(results.taxableIncome),
      variant: 'secondary' as const,
    },
    {
      title: 'Total Tax',
      value: formatCurrency2(results.totalTax),
      variant: 'purple' as const,
    },
    {
      title: 'Effective Tax Rate',
      value: `${results.effectiveTaxRate.toFixed(2)}%`,
      variant: 'green' as const,
    },
  ];

  const deductionCards = [
    {
      title: 'Standard Deduction',
      value: formatCurrency2(stdDeduction),
      variant: 'pink' as const,
    },
    ...(regime === 'old' && allowedDeductions > 0
      ? [{ title: 'Other Deductions', value: formatCurrency2(allowedDeductions), variant: 'purple' as const }]
      : []),
    ...(rebate > 0
      ? [{ title: 'Section 87A Rebate', value: `- ${formatCurrency2(rebate)}`, variant: 'green' as const }]
      : []),
    ...(surcharge > 0
      ? [{ title: 'Surcharge', value: formatCurrency2(surcharge), variant: 'secondary' as const }]
      : []),
    ...(cess > 0
      ? [{ title: 'Cess (4%)', value: formatCurrency2(cess), variant: 'primary' as const }]
      : []),
  ];

  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3, fontFamily: typography.fontFamily }}>
        {deductionCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
    </Paper>
  );

  const particularsSection = (
    <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, mt: 4, background: '#f8f9fc', borderRadius: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
        How Your Tax is Calculated
      </Typography>
      <ul style={{ margin: 0, paddingLeft: 20, color: colors.secondary, fontSize: '1rem', lineHeight: 1.7 }}>
        <li><b>Total Income:</b> Your gross annual income before any deductions.</li>
        <li><b>Taxable Income:</b> Income after subtracting standard deduction and (if in old regime) other deductions.</li>
        <li><b>Standard Deduction:</b> Flat deduction from salary income (₹75,000 in new regime, ₹50,000 in old regime).</li>
        <li><b>Other Deductions:</b> Section 80C, 80D, HRA, etc. (only in old regime).</li>
        <li><b>Section 87A Rebate:</b> Tax relief for low/mid incomes (up to ₹60,000 for taxable income ≤ ₹12L in new regime, up to ₹12,500 for ≤ ₹5L in old regime).</li>
        <li><b>Surcharge:</b> Extra tax for high incomes (10% for &gt;₹50L, 15% for &gt;₹1Cr, 25% for &gt;₹2Cr, 37% for &gt;₹5Cr).</li>
        <li><b>Cess (4%):</b> Health & Education Cess on total tax (after rebate and surcharge).</li>
        <li><b>Total Tax:</b> Final tax payable after all deductions, rebate, surcharge, and cess.</li>
        <li><b>Regimes:</b> <b>New Regime</b> (default, lower rates, fewer deductions, higher standard deduction, higher rebate) vs <b>Old Regime</b> (higher rates, more deductions, lower standard deduction, lower rebate).</li>
      </ul>
    </Paper>
  );

  const formSection = (
    <StyledPaper>
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ color: colors.primary, fontWeight: 600, mb: 1 }}>
            Select Tax Regime
          </FormLabel>
          <RadioGroup
            row
            value={regime}
            onChange={(e) => setRegime(e.target.value as 'new' | 'old')}
          >
            <FormControlLabel value="new" control={<Radio />} label="New Regime" />
            <FormControlLabel value="old" control={<Radio />} label="Old Regime" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Annual Income"
          value={income}
          onChange={(value) => setIncome(typeof value === 'number' ? value : 0)}
          min={0}
          max={100000000}
          step={10000}
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
          value={income}
          onChange={(_, newValue) => setIncome(newValue as number)}
          min={0}
          max={10000000}
          step={10000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      {regime === 'old' && (
        <Box>
          <CustomNumberField
            fullWidth
            label="Total Deductions (80C, 80D, etc.)"
            value={deductions}
            onChange={(value) => setDeductions(typeof value === 'number' ? value : 0)}
            min={0}
            max={income}
            step={10000}
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
            value={deductions}
            onChange={(_, newValue) => setDeductions(newValue as number)}
            min={0}
            max={income}
            step={10000}
            valueLabelDisplay="auto"
            valueLabelFormat={formatCurrency2}
          />
        </Box>
      )}
    </StyledPaper>
  );

  // Table columns and rows
  const tableColumns = [
    { key: 'slab', id: 'slab', label: 'Income Slab', align: 'left' },
    { key: 'taxableAmount', id: 'taxableAmount', label: 'Taxable Amount', align: 'right' },
    { key: 'taxAmount', id: 'taxAmount', label: 'Tax Amount', align: 'right' },
  ];
  const tableRows = results.taxBreakdown.map(row => ({
    ...row,
    taxableAmount: formatCurrency2(row.taxableAmount),
    taxAmount: formatCurrency2(row.taxAmount),
  }));
  const tableSection = (
    <CalculatorTable columns={tableColumns} rows={tableRows} />
  );

  // Add FAQ section
  const [faqOpen, setFaqOpen] = React.useState(false);
  const faqSection = (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }} onClick={() => setFaqOpen((o) => !o)}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary, flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          Frequently Asked Questions
        </Typography>
        <span style={{ color: colors.secondary, fontWeight: 700 }}>{faqOpen ? '▲' : '▼'}</span>
      </Box>
      {faqOpen && (
        <Box sx={{ mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: typography.fontFamily }}>
          {[
            { q: 'What is the difference between new and old tax regime?', a: 'The new regime offers lower tax rates but fewer deductions, while the old regime allows more deductions but has higher rates.' },
            { q: 'What is the standard deduction?', a: 'A flat deduction from salary income: ₹75,000 (new regime), ₹50,000 (old regime).' },
            { q: 'What is Section 87A rebate?', a: 'A tax rebate for individuals with taxable income up to ₹12 lakh (new regime) or ₹5 lakh (old regime).' },
            { q: 'What is surcharge and cess?', a: 'Surcharge is extra tax for high incomes; cess is a 4% charge on total tax for health and education.' },
            { q: 'Can I switch between regimes every year?', a: 'Salaried individuals can choose their regime each year; business owners have restrictions.' },
          ].map((item, idx, arr) => (
            <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
              <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
              <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
              {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );

  return (
    <CalculatorTemplate
      title="Income Tax Calculator"
      description="Calculate your income tax liability under both New and Old tax regimes."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          {particularsSection}
          <Box sx={{ width: '100%', px: { xs: 0, sm: 0 }, mt: 4, mb: 2 }}>
            {faqSection}
          </Box>
        </>
      }
    />
  );
};

export default IncomeTaxCalculator; 