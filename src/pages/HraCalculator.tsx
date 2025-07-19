import React, { useState, useEffect } from 'react';
import { Box, Typography, InputAdornment, Paper } from '@mui/material';
import { LocationCity } from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { StyledPaper, StyledSlider } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomNumberField } from '../components/CustomNumberField';
import { ResultCard } from '../components/ResultCard';
import { CalculatorTable } from '../components/CalculatorTable';
import { calculateHra, HraCalculationParams, HraCalculationResult } from '../utils/calculatorUtils';
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';

function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(15000);
  const [metroCity, setMetroCity] = useState<boolean>(true);
  const [results, setResults] = useState<HraCalculationResult>({
    hraExemption: 0,
    taxableHRA: 0,
    totalHRA: 0,
    chartData: [],
  });

  useEffect(() => {
    const params: HraCalculationParams = {
      basicSalary,
      hraReceived,
      rentPaid,
      metroCity,
    };
    setResults(calculateHra(params));
  }, [basicSalary, hraReceived, rentPaid, metroCity]);

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
          label="Basic Salary"
          value={basicSalary}
          onChange={(value) => setBasicSalary(typeof value === 'number' ? value : 0)}
          min={10000}
          max={1000000}
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
          value={basicSalary}
          onChange={(_, newValue) => setBasicSalary(newValue as number)}
          min={10000}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="HRA Received"
          value={hraReceived}
          onChange={(value) => setHraReceived(typeof value === 'number' ? value : 0)}
          min={0}
          max={1000000}
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
          value={hraReceived}
          onChange={(_, newValue) => setHraReceived(newValue as number)}
          min={0}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Rent Paid"
          value={rentPaid}
          onChange={(value) => setRentPaid(typeof value === 'number' ? value : 0)}
          min={0}
          max={1000000}
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
          value={rentPaid}
          onChange={(_, newValue) => setRentPaid(newValue as number)}
          min={0}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Metro City"
          value={metroCity ? 1 : 0}
          onChange={(value) => setMetroCity(value === 1)}
          min={0}
          max={1}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCity sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={metroCity ? 1 : 0}
          onChange={(_, newValue) => setMetroCity(newValue === 1)}
          min={0}
          max={1}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value === 1 ? 'Yes' : 'No'}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'HRA Exemption',
      value: formatCurrency2(results.hraExemption),
      variant: 'primary' as const,
    },
    {
      title: 'Taxable HRA',
      value: formatCurrency2(results.taxableHRA),
      variant: 'secondary' as const,
    },
    {
      title: 'Monthly HRA',
      value: formatCurrency2(results.totalHRA / 12),
      variant: 'purple' as const,
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
          HRA Breakdown
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
                <Cell key={`cell-${index}`} fill={index === 1 ? colors.accent.primary : (index === 2 ? colors.accent.secondary : colors.accent.purple)} />
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
  const hraTableColumns = [
    { label: 'Component', key: 'component' },
    { label: 'Amount', key: 'amount' },
  ];
  const hraTableRows = results.chartData.map(row => ({
    ...row,
    amount: formatCurrency2(row.amount),
  }));
  const tableSection = (
    <CalculatorTable columns={hraTableColumns} rows={hraTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <ParticularsSection
      title="How HRA is Calculated"
      items={[
        <><b>Basic Salary:</b> The basic component of your salary.</>,
        <><b>HRA Received:</b> The actual HRA received from your employer.</>,
        <><b>Rent Paid:</b> The rent you pay for your accommodation.</>,
        <><b>Formula:</b> HRA Exemption = Least of (Actual HRA received, 50%/40% of salary, Rent paid - 10% of salary)</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'What is HRA?', a: 'HRA stands for House Rent Allowance, a component of salary given by employers to employees to meet house rent expenses.' },
    { q: 'Is HRA fully exempt from tax?', a: 'No, HRA exemption is calculated as the least of three values as per Income Tax rules.' },
    { q: 'Can I claim HRA if I live with parents?', a: 'Yes, if you pay rent to your parents and have rent receipts.' },
    { q: 'Is HRA available for self-employed?', a: 'No, HRA exemption is only for salaried individuals.' },
    { q: 'What documents are required for HRA exemption?', a: 'Rent receipts, PAN of landlord (if rent > ₹1 lakh/year), and rental agreement if available.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  return (
    <CalculatorTemplate
      title="HRA Calculator"
      description="Calculate your House Rent Allowance (HRA) exemption and tax benefits."
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

export default HraCalculator; 