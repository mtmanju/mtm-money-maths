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
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          HRA Exemption = Least of [Actual HRA Received, 50% (metro)/40% (non-metro) of Salary, Rent Paid - 10% of Salary]
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          HRA Exemption = Least of [₹{hraReceived.toLocaleString('en-IN')}, {metroCity ? '50%' : '40%'} of ₹{basicSalary.toLocaleString('en-IN')}, ₹{rentPaid.toLocaleString('en-IN')} - 10% of ₹{basicSalary.toLocaleString('en-IN')}] = <b>{formatCurrency2(results.hraExemption)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Actual HRA Received:</b> The HRA component of your salary.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>50%/40% of Salary:</b> 50% for metro cities, 40% for non-metro cities.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Rent Paid - 10% of Salary:</b> The excess of rent paid over 10% of salary.</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>HRA Exemption:</b> The minimum of the above three is exempt from tax.</span>
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
            q: 'What is HRA?',
            a: 'House Rent Allowance (HRA) is a component of salary provided by employers to employees to meet rental expenses.'
          },
          {
            q: 'How is HRA exemption calculated?',
            a: 'It is the minimum of actual HRA received, 50%/40% of salary, and rent paid minus 10% of salary.'
          },
          {
            q: 'Is HRA fully exempt from tax?',
            a: 'No, only the minimum of the three criteria is exempt; the rest is taxable.'
          },
          {
            q: 'Can I claim HRA if I live with parents?',
            a: 'Yes, if you pay rent to your parents and have valid proof of payment.'
          },
          {
            q: 'Is HRA available under the new tax regime?',
            a: 'No, HRA exemption is not available under the new tax regime.'
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
      title="HRA Calculator"
      description="Calculate your House Rent Allowance (HRA) exemption and tax benefits."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How HRA is Calculated
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

export default HraCalculator; 