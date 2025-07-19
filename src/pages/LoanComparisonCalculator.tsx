import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

interface ComparisonResults {
  loan1: LoanDetails;
  loan2: LoanDetails;
  chartData: Array<{
    month: number;
    loan1Balance: number;
    loan2Balance: number;
  }>;
}

function LoanComparisonCalculator() {
  const [loan1Amount, setLoan1Amount] = useState<number>(1000000);
  const [loan1Rate, setLoan1Rate] = useState<number>(8.5);
  const [loan1Tenure, setLoan1Tenure] = useState<number>(20);
  const [loan2Amount, setLoan2Amount] = useState<number>(1000000);
  const [loan2Rate, setLoan2Rate] = useState<number>(9.5);
  const [loan2Tenure, setLoan2Tenure] = useState<number>(20);
  const [results, setResults] = useState<ComparisonResults>({
    loan1: {
      loanAmount: 0,
      interestRate: 0,
      tenure: 0,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
    },
    loan2: {
      loanAmount: 0,
      interestRate: 0,
      tenure: 0,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
    },
    chartData: [],
  });

  useEffect(() => {
    calculateComparison();
  }, [loan1Amount, loan1Rate, loan1Tenure, loan2Amount, loan2Rate, loan2Tenure]);

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;
    return { emi, totalInterest, totalPayment };
  };

  const calculateLoanBalance = (principal: number, rate: number, tenure: number, month: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const balance = principal * Math.pow(1 + monthlyRate, month) - emi * (Math.pow(1 + monthlyRate, month) - 1) / monthlyRate;
    return Math.max(0, balance);
  };

  const calculateComparison = () => {
    const loan1Details = calculateEMI(loan1Amount, loan1Rate, loan1Tenure);
    const loan2Details = calculateEMI(loan2Amount, loan2Rate, loan2Tenure);

    // Generate chart data
    const maxMonths = Math.max(loan1Tenure, loan2Tenure) * 12;
    const chartData = Array.from({ length: maxMonths + 1 }, (_, i) => {
      const month = i;
      const loan1Balance = calculateLoanBalance(loan1Amount, loan1Rate, loan1Tenure, month);
      const loan2Balance = calculateLoanBalance(loan2Amount, loan2Rate, loan2Tenure, month);

      return {
        month,
        loan1Balance,
        loan2Balance,
      };
    });

    setResults({
      loan1: {
        loanAmount: loan1Amount,
        interestRate: loan1Rate,
        tenure: loan1Tenure,
        emi: loan1Details.emi,
        totalInterest: loan1Details.totalInterest,
        totalPayment: loan1Details.totalPayment,
      },
      loan2: {
        loanAmount: loan2Amount,
        interestRate: loan2Rate,
        tenure: loan2Tenure,
        emi: loan2Details.emi,
        totalInterest: loan2Details.totalInterest,
        totalPayment: loan2Details.totalPayment,
      },
      chartData,
    });
  };

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
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary, fontWeight: 600 }}>
        Loan 1 Details
      </Typography>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Amount"
          value={loan1Amount}
          onChange={(value) => setLoan1Amount(typeof value === 'number' ? value : 0)}
          min={100000}
          max={10000000}
          step={100000}
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
          value={loan1Amount}
          onChange={(_, newValue) => setLoan1Amount(newValue as number)}
          min={100000}
          max={10000000}
          step={100000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={loan1Rate}
          onChange={(value) => setLoan1Rate(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
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
          value={loan1Rate}
          onChange={(_, newValue) => setLoan1Rate(newValue as number)}
          min={1}
          max={20}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Tenure (Years)"
          value={loan1Tenure}
          onChange={(value) => setLoan1Tenure(typeof value === 'number' ? value : 0)}
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
          value={loan1Tenure}
          onChange={(_, newValue) => setLoan1Tenure(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 2, mt: 4, color: colors.primary, fontWeight: 600 }}>
        Loan 2 Details
      </Typography>
      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Amount"
          value={loan2Amount}
          onChange={(value) => setLoan2Amount(typeof value === 'number' ? value : 0)}
          min={100000}
          max={10000000}
          step={100000}
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
          value={loan2Amount}
          onChange={(_, newValue) => setLoan2Amount(newValue as number)}
          min={100000}
          max={10000000}
          step={100000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency2}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Interest Rate (p.a.)"
          value={loan2Rate}
          onChange={(value) => setLoan2Rate(typeof value === 'number' ? value : 0)}
          min={1}
          max={20}
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
          value={loan2Rate}
          onChange={(_, newValue) => setLoan2Rate(newValue as number)}
          min={1}
          max={20}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Loan Tenure (Years)"
          value={loan2Tenure}
          onChange={(value) => setLoan2Tenure(typeof value === 'number' ? value : 0)}
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
          value={loan2Tenure}
          onChange={(_, newValue) => setLoan2Tenure(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
        />
      </Box>
    </StyledPaper>
  );

  // Result cards and chart
  const summaryCards = [
    {
      title: 'Loan 1 EMI',
      value: formatCurrency2(results.loan1.emi),
      variant: 'primary',
    },
    {
      title: 'Loan 1 Total Interest',
      value: formatCurrency2(results.loan1.totalInterest),
      variant: 'secondary',
    },
    {
      title: 'Loan 1 Total Payment',
      value: formatCurrency2(results.loan1.totalPayment),
      variant: 'purple',
    },
    {
      title: 'Loan 2 EMI',
      value: formatCurrency2(results.loan2.emi),
      variant: 'green',
    },
    {
      title: 'Loan 2 Total Interest',
      value: formatCurrency2(results.loan2.totalInterest),
      variant: 'pink',
    },
    {
      title: 'Loan 2 Total Payment',
      value: formatCurrency2(results.loan2.totalPayment),
      variant: 'purple',
    },
  ];
  // Helper to ensure only allowed variants
  const allowedVariants = ['primary', 'secondary', 'green', 'pink', 'purple'] as const;
  function safeVariant(variant: string | undefined): typeof allowedVariants[number] {
    return (allowedVariants.includes(variant as any) ? variant : 'primary') as typeof allowedVariants[number];
  }
  const resultSection = (
    <Box component={Paper} elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2, fontFamily: typography.fontFamily }}>
        {summaryCards.map((card) => (
          <ResultCard key={card.title} title={card.title} value={card.value} variant={safeVariant(card.variant)} fontSize="0.9rem" />
        ))}
      </Box>
      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Loan Balance Comparison
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={results.chartData.filter(row => row.month % 12 === 0)} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={v => `Year ${Math.floor(v / 12)}`} style={chartAxisStyle} />
            <YAxis tickFormatter={formatCurrency2} style={chartAxisStyle} />
            <RechartsTooltip
              contentStyle={chartTooltipStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              formatter={(value: number) => formatCurrency2(value)}
              labelFormatter={v => `Year ${Math.floor(Number(v) / 12)}`}
            />
            <Legend wrapperStyle={chartLegendStyle} />
            <Line type="monotone" dataKey="loan1Balance" stroke={colors.accent.primary} name="Loan 1 Balance" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="loan2Balance" stroke={colors.accent.secondary} name="Loan 2 Balance" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );

  // Table
  const comparisonTableColumns = [
    { label: 'Loan', key: 'loan' },
    { label: 'Amount', key: 'loanAmount' },
    { label: 'Interest Rate', key: 'interestRate' },
    { label: 'Tenure (Years)', key: 'tenure' },
    { label: 'EMI', key: 'emi' },
    { label: 'Total Interest', key: 'totalInterest' },
    { label: 'Total Payment', key: 'totalPayment' },
  ];
  const comparisonTableRows = [
    {
      loan: 'Loan 1',
      loanAmount: formatCurrency2(results.loan1.loanAmount),
      interestRate: `${results.loan1.interestRate}%`,
      tenure: results.loan1.tenure,
      emi: formatCurrency2(results.loan1.emi),
      totalInterest: formatCurrency2(results.loan1.totalInterest),
      totalPayment: formatCurrency2(results.loan1.totalPayment),
    },
    {
      loan: 'Loan 2',
      loanAmount: formatCurrency2(results.loan2.loanAmount),
      interestRate: `${results.loan2.interestRate}%`,
      tenure: results.loan2.tenure,
      emi: formatCurrency2(results.loan2.emi),
      totalInterest: formatCurrency2(results.loan2.totalInterest),
      totalPayment: formatCurrency2(results.loan2.totalPayment),
    },
  ];
  const tableSection = (
    <CalculatorTable columns={comparisonTableColumns} rows={comparisonTableRows} />
  );

  // --- Monthly breakdown for both loans ---
  // Helper to generate amortization schedule for a loan
  function getAmortizationSchedule(principal: number, rate: number, tenure: number) {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = emi - interest;
      balance = Math.max(0, balance - principalPaid);
      schedule.push({
        month,
        emi,
        principalPaid,
        interestPaid: interest,
        balance,
      });
    }
    return schedule;
  }

  // Generate schedules for both loans
  const loan1Schedule = getAmortizationSchedule(loan1Amount, loan1Rate, loan1Tenure);
  const loan2Schedule = getAmortizationSchedule(loan2Amount, loan2Rate, loan2Tenure);

  // Smart merge: up to the max months, show both loans side by side
  const maxMonths = Math.max(loan1Tenure, loan2Tenure) * 12;
  const monthlyTableColumns = [
    { label: 'Month', key: 'month' },
    { label: 'Loan 1 EMI', key: 'emi1' },
    { label: 'Loan 1 Principal', key: 'principal1' },
    { label: 'Loan 1 Interest', key: 'interest1' },
    { label: 'Loan 1 Balance', key: 'balance1' },
    { label: 'Loan 2 EMI', key: 'emi2' },
    { label: 'Loan 2 Principal', key: 'principal2' },
    { label: 'Loan 2 Interest', key: 'interest2' },
    { label: 'Loan 2 Balance', key: 'balance2' },
  ];
  const monthlyTableRows = Array.from({ length: maxMonths }, (_, i) => {
    const l1 = loan1Schedule[i] || {};
    const l2 = loan2Schedule[i] || {};
    return {
      month: i + 1,
      emi1: l1.emi !== undefined ? formatCurrency2(l1.emi) : '-',
      principal1: l1.principalPaid !== undefined ? formatCurrency2(l1.principalPaid) : '-',
      interest1: l1.interestPaid !== undefined ? formatCurrency2(l1.interestPaid) : '-',
      balance1: l1.balance !== undefined ? formatCurrency2(l1.balance) : '-',
      emi2: l2.emi !== undefined ? formatCurrency2(l2.emi) : '-',
      principal2: l2.principalPaid !== undefined ? formatCurrency2(l2.principalPaid) : '-',
      interest2: l2.interestPaid !== undefined ? formatCurrency2(l2.interestPaid) : '-',
      balance2: l2.balance !== undefined ? formatCurrency2(l2.balance) : '-',
    };
  });

  // Only toggle for full view/1 year
  const [fullView, setFullView] = React.useState(false);
  const visibleRows = fullView ? monthlyTableRows : monthlyTableRows.slice(0, 12);
  const monthlyBreakdownSection = (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, flex: 1 }}>
          Monthly Amortization Breakdown
        </Typography>
        <button
          onClick={() => setFullView((v) => !v)}
          style={{
            background: colors.accent.secondary,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 18px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            marginLeft: 8,
          }}
        >
          {fullView ? 'Show 1 Year' : 'Full View'}
        </button>
      </Box>
      <CalculatorTable columns={monthlyTableColumns} rows={visibleRows} />
    </Box>
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
          EMI = [₹{results.loan1.loanAmount.toLocaleString('en-IN')} × {results.loan1.interestRate / 1200} × (1 + {results.loan1.interestRate / 1200})^{results.loan1.tenure * 12}] / [(1 + {results.loan1.interestRate / 1200})^{results.loan1.tenure * 12} – 1] = <b>{formatCurrency2(results.loan1.emi)}</b>
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
            { q: 'What is a loan comparison calculator?', a: 'It helps you compare two loan offers side by side, showing EMIs, total interest, and total payments.' },
            { q: 'What factors should I compare?', a: 'Compare interest rates, loan amounts, tenures, EMIs, and total interest paid.' },
            { q: 'Does a lower EMI always mean a better loan?', a: 'Not always. A lower EMI may mean a longer tenure and more total interest paid.' },
            { q: 'Can I prepay either loan?', a: 'Most loans allow prepayment, but check for prepayment charges and terms.' },
            { q: 'What is the impact of tenure on total interest?', a: 'Longer tenures reduce EMI but increase total interest paid.' },
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
      title="Loan Comparison Calculator"
      description="Compare two loan offers and choose the best option for your needs."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={
        <>
          {tableSection}
          {monthlyBreakdownSection}
          <Box sx={{ mt: 4, mb: 2, width: '100%', px: { xs: 0, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '1.15rem', md: '1.18rem' }, textAlign: 'left' }}>
              How Loan Comparison is Calculated
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

export default LoanComparisonCalculator; 