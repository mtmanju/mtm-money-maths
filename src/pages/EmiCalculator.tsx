import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import {
  StyledPaper,
  StyledSlider,
  colors,
  typography,
} from '../components/calculatorStyles';
import { CustomNumberField } from '../components/CustomNumberField';
import { ResultCard } from '../components/ResultCard';
import { CalculatorTable } from '../components/CalculatorTable';
import { calculateEmi, EmiCalculationParams, EmiCalculationResult } from '../utils/calculatorUtils';

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [results, setResults] = useState<EmiCalculationResult>({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
    amortizationSchedule: [],
  });

  useEffect(() => {
    const params: EmiCalculationParams = {
      loanAmount,
      interestRate,
      loanTerm,
    };
    setResults(calculateEmi(params));
  }, [loanAmount, interestRate, loanTerm]);

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
          label="Loan Amount"
          value={loanAmount}
          onChange={(value) => setLoanAmount(typeof value === 'number' ? value : 0)}
          min={10000}
          max={50000000}
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
          value={loanAmount}
          onChange={(_, newValue) => setLoanAmount(newValue as number)}
          min={10000}
          max={50000000}
          step={10000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>
      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={interestRate}
          onChange={(value) => setInterestRate(typeof value === 'number' ? value : 0)}
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
          value={interestRate}
          onChange={(_, newValue) => setInterestRate(newValue as number)}
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
          label="Loan Term (Years)"
          value={loanTerm}
          onChange={(value) => setLoanTerm(typeof value === 'number' ? value : 0)}
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
          value={loanTerm}
          onChange={(_, newValue) => setLoanTerm(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards in logical order
  const summaryCards = [
    {
      title: 'Monthly EMI',
      value: formatCurrency2(results.monthlyEmi),
      variant: 'primary' as const,
    },
    {
      title: 'Total Interest',
      value: formatCurrency2(results.totalInterest),
      variant: 'secondary' as const,
    },
    {
      title: 'Total Payment',
      value: formatCurrency2(results.totalPayment),
      variant: 'purple' as const,
    },
  ];

  // Result cards
  const resultSection = (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="0.9rem" />
        ))}
      </Box>
    </Paper>
  );

  // Aggregate amortization schedule by year
  const yearlySchedule = [] as Array<{
    year: number;
    emi: number;
    principalComponent: number;
    interestComponent: number;
    outstandingBalance: number;
  }>;
  if (results.amortizationSchedule.length > 0) {
    let year = 1;
    let emiSum = 0, principalSum = 0, interestSum = 0;
    let lastOutstanding = results.amortizationSchedule[0].outstandingBalance;
    for (let i = 0; i < results.amortizationSchedule.length; i++) {
      emiSum += results.amortizationSchedule[i].emi;
      principalSum += results.amortizationSchedule[i].principalComponent;
      interestSum += results.amortizationSchedule[i].interestComponent;
      lastOutstanding = results.amortizationSchedule[i].outstandingBalance;
      if ((i + 1) % 12 === 0 || i === results.amortizationSchedule.length - 1) {
        yearlySchedule.push({
          year,
          emi: emiSum,
          principalComponent: principalSum,
          interestComponent: interestSum,
          outstandingBalance: lastOutstanding,
        });
        year++;
        emiSum = 0;
        principalSum = 0;
        interestSum = 0;
      }
    }
  }

  // Table
  const emiTableColumns = [
    { label: 'Year', key: 'year' },
    { label: 'EMI', key: 'emi' },
    { label: 'Principal', key: 'principalComponent' },
    { label: 'Interest', key: 'interestComponent' },
    { label: 'Balance', key: 'outstandingBalance' },
  ];
  const emiTableRows = yearlySchedule.map(row => ({
    ...row,
    emi: formatCurrency2(row.emi),
    principalComponent: formatCurrency2(row.principalComponent),
    interestComponent: formatCurrency2(row.interestComponent),
    outstandingBalance: formatCurrency2(row.outstandingBalance),
  }));
  const tableSection = (
    <CalculatorTable columns={emiTableColumns} rows={emiTableRows} />
  );

  // Modern particulars section
  const particularsSection = (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          EMI = [₹{loanAmount.toLocaleString('en-IN')} × {interestRate / 1200} × (1 + {interestRate / 1200})^{loanTerm * 12}] / [(1 + {interestRate / 1200})^{loanTerm * 12} – 1] = <b>{formatCurrency2(results.monthlyEmi)}</b>
        </Typography>
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.primary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>P (Principal):</b> The loan amount.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>r (Rate):</b> The monthly interest rate (annual rate / 12 / 100).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>n (Tenure):</b> The total number of monthly installments.</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>EMI:</b> The fixed monthly payment amount.</span>
        </Box>
      </Box>
    </Box>
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
            { q: 'What is an EMI?', a: 'EMI stands for Equated Monthly Installment, a fixed payment amount made by a borrower to a lender at a specified date each calendar month.' },
            { q: 'How is EMI calculated?', a: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1], where P is principal, r is monthly interest rate, n is number of installments.' },
            { q: 'What factors affect EMI?', a: 'Loan amount, interest rate, and loan tenure are the main factors.' },
            { q: 'Can I prepay my loan EMI?', a: 'Yes, most loans allow prepayment, but check for any prepayment charges.' },
            { q: 'Does EMI change if interest rates change?', a: 'For floating rate loans, EMI or tenure may change if interest rates change.' },
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
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installments for loans and plan your repayments."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How EMI is Calculated
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

export default EmiCalculator; 