import React, { useState, useEffect } from 'react';
import { Box, Typography, InputAdornment } from '@mui/material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { formatCurrency } from '../utils/formatUtils';
import { StyledPaper, StyledSlider, ChartContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomNumberField } from '../components/CustomNumberField';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { CalculatorTable } from '../components/CalculatorTable';
import { Paper as MuiPaper } from '@mui/material';
import { ResultCard } from '../components/ResultCard';
import { Collapse, IconButton, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface GratuityResults {
  gratuityAmount: number;
  totalServiceYears: number;
  lastDrawnSalary: number;
  chartData: Array<{
    year: number;
    gratuity: number;
  }>;
  taxableAmount: number;
  taxFreeAmount: number;
}

const getRoundedYears = (years: number) => {
  // If years is a float, round up if > 0.5
  const intPart = Math.floor(years);
  const decimal = years - intPart;
  return decimal >= 0.5 ? intPart + 1 : intPart;
};

const GratuityCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [da, setDa] = useState<number>(10000);
  const [serviceYears, setServiceYears] = useState<number>(5);
  const [results, setResults] = useState<GratuityResults>({
    gratuityAmount: 0,
    totalServiceYears: 0,
    lastDrawnSalary: 0,
    chartData: [],
    taxableAmount: 0,
    taxFreeAmount: 0,
  });
  const [faqOpen, setFaqOpen] = useState(false);
  const [eligibility, setEligibility] = useState(true);

  useEffect(() => {
    setEligibility(serviceYears >= 5);
    calculateGratuity();
  }, [basicSalary, da, serviceYears]);

  const calculateGratuity = () => {
    const lastDrawnSalary = basicSalary + da;
    // Razorpay and others round up if > 6 months in last year
    const roundedYears = getRoundedYears(serviceYears);
    let gratuityAmount = 0;
    if (roundedYears >= 5) {
      gratuityAmount = Math.min(
        (lastDrawnSalary * roundedYears * 15) / 26,
      2000000 // Maximum gratuity limit
    );
    }
    // Generate chart data
    const chartData = Array.from({ length: roundedYears + 1 }, (_, i) => {
      const year = i;
      const gratuity = Math.min(
        (lastDrawnSalary * year * 15) / 26,
        2000000
      );
      return {
        year,
        gratuity,
      };
    });
    const taxFreeAmount = Math.min(gratuityAmount, 2000000);
    const taxableAmount = gratuityAmount - taxFreeAmount;
    setResults({
      gratuityAmount,
      totalServiceYears: roundedYears,
      lastDrawnSalary,
      chartData,
      taxableAmount,
      taxFreeAmount,
    });
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

  const summaryCards = [
    {
      title: 'Tax-Free Amount',
      value: formatCurrency2(results.taxFreeAmount),
      variant: 'purple' as const,
    },
    {
      title: 'Taxable Amount',
      value: formatCurrency2(results.taxableAmount),
      variant: 'secondary' as const,
    },
    {
      title: 'Basic Salary',
      value: formatCurrency2(basicSalary),
      variant: 'green' as const,
    },
    {
      title: 'Years of Service',
      value: `${serviceYears} Years`,
      variant: 'pink' as const,
    },
    {
      title: 'Last Drawn Salary',
      value: formatCurrency2(results.lastDrawnSalary),
      variant: 'pink' as const,
    },
  ];

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
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="DA (Dearness Allowance)"
          value={da}
          onChange={(value) => setDa(typeof value === 'number' ? value : 0)}
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
          value={da}
          onChange={(_, newValue) => setDa(newValue as number)}
          min={0}
          max={1000000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Years of Service"
          value={serviceYears}
          onChange={(value) => setServiceYears(typeof value === 'number' ? value : 0)}
          min={1}
          max={40}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={serviceYears}
          onChange={(_, newValue) => setServiceYears(newValue as number)}
          min={1}
          max={40}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>
    </StyledPaper>
  );

  const particularsSection = (
    <MuiPaper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, mt: 4, background: '#fafdff', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.primary, mb: 2, letterSpacing: 0.2, fontSize: { xs: '1.1rem', md: '1.15rem' } }}>
        How Gratuity is Calculated
      </Typography>
      {/* Modern formula and example card */}
      <Box sx={{ background: '#f4f7fa', borderRadius: 2, p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem', mb: 0.5 }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Formula:</span>
          Gratuity = (Last Drawn Salary × Years of Service × 15) / 26
        </Typography>
        <Typography variant="body2" sx={{ color: colors.accent.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.02rem' }}>
          <span style={{ color: colors.secondary, fontWeight: 400, marginRight: 8 }}>Example:</span>
          Gratuity = (₹{basicSalary.toLocaleString('en-IN')} + ₹{da.toLocaleString('en-IN')}) × {getRoundedYears(serviceYears)} × 15 / 26 = <b>{formatCurrency2(((basicSalary + da) * getRoundedYears(serviceYears) * 15) / 26)}</b>
        </Typography>
        {/* Show both theoretical and capped gratuity if formula result exceeds 20 lakh */}
        {(() => {
          const theoretical = ((basicSalary + da) * getRoundedYears(serviceYears) * 15) / 26;
          if (theoretical > 2000000) {
            return (
              <>
                <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.01rem', mt: 0.5 }}>
                  Calculated Gratuity (Formula): <b>{formatCurrency2(theoretical)}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, fontFamily: 'JetBrains Mono, Fira Mono, monospace', fontSize: '1.01rem' }}>
                  Maximum Payable (as per law): <b>₹20,00,000</b>
                </Typography>
              </>
            );
          }
          return null;
        })()}
      </Box>
      <Box component="ul" sx={{ m: 0, pl: 2, color: colors.secondary, fontSize: { xs: '0.98rem', md: '1.03rem' }, lineHeight: 1.6, listStyle: 'none' }}>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.green, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Last Drawn Salary:</b> Sum of Basic Salary and Dearness Allowance (DA).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.pink, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Years of Service:</b> Completed years of service with the employer. If you have worked more than 6 months in the last year, it is rounded up to the next full year.</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.purple, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Tax-Free Gratuity:</b> Up to ₹20,00,000 is tax-free under Section 10(10) of the Income Tax Act (lifetime limit, subject to rules).</span>
        </Box>
        <Box component="li" sx={{ mb: 1.5, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Taxable Gratuity:</b> Any amount above the exemption limit is taxable as per your income tax slab.</span>
        </Box>
        <Box component="li" sx={{ mb: 0, display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ width: 6, height: 6, bgcolor: colors.accent.secondary, borderRadius: '50%', mt: '0.6em', mr: 1.5 }} />
          <span><b>Tax Status:</b> 'Exempt' means not taxable, 'Taxable' means subject to tax, 'Mixed' means partially exempt and partially taxable.</span>
        </Box>
      </Box>
    </MuiPaper>
  );

  const faqSection = (
    <MuiPaper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 2, background: '#fafdff', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }} onClick={() => setFaqOpen((o) => !o)}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary, flex: 1, fontSize: { xs: '1.05rem', md: '1.12rem' }, letterSpacing: 0.1 }}>
          Frequently Asked Questions
        </Typography>
        <IconButton size="small" sx={{ color: colors.secondary }}>
          <ExpandMoreIcon sx={{ transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
        </IconButton>
      </Box>
      <Collapse in={faqOpen}>
        <Box sx={{ mt: 1, fontSize: { xs: '0.97rem', md: '1.01rem' }, fontFamily: typography.fontFamily }}>
          {[
            {
              q: 'Who is eligible for gratuity?',
              a: 'Employees who have completed at least 5 years of continuous service with the same employer.'
            },
            {
              q: 'How is gratuity calculated?',
              a: 'Gratuity = (Last Drawn Salary × Years of Service × 15) / 26'
            },
            {
              q: 'Is gratuity taxable?',
              a: 'Gratuity up to ₹20 lakh is tax-free. Any amount above this is taxable as per your income tax slab.'
            },
            {
              q: 'What is included in salary?',
              a: 'Basic Salary + Dearness Allowance (DA).'
            },
            {
              q: 'What if I worked less than 5 years?',
              a: 'You are not eligible for gratuity unless the reason is death or disablement.'
            },
            {
              q: 'How is the number of years calculated?',
              a: 'If you have worked more than 6 months in the last year, it is rounded up to the next full year.'
            }
          ].map((item, idx, arr) => (
            <Box key={item.q} sx={{ mb: idx !== arr.length - 1 ? 2.5 : 0 }}>
              <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 500, mb: 0.5, fontSize: '1.01rem' }}>{item.q}</Typography>
              <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 400, fontSize: '0.98rem', lineHeight: 1.7 }}>{item.a}</Typography>
              {idx !== arr.length - 1 && <Box sx={{ borderBottom: '1px solid #e5e8ee', my: 1 }} />}
            </Box>
          ))}
    </Box>
      </Collapse>
    </MuiPaper>
  );

  const eligibilityAlert = !eligibility ? (
    <Alert severity="warning" sx={{ mb: 2, fontWeight: 600, fontFamily: typography.fontFamily }}>
      You are not eligible for gratuity (minimum 5 years of service required).
    </Alert>
  ) : null;

  const resultSection = (
    <MuiPaper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 2, borderRadius: 1, background: '#fff' }}>
      <Box sx={{ width: '100%', mb: 3, fontFamily: typography.fontFamily }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2, mb: 2 }}>
          <ResultCard
            title="Gratuity Amount"
            value={formatCurrency2(results.gratuityAmount)}
            variant="primary"
            fontSize="1.1rem"
          />
          {summaryCards.slice(0, 2).map((card) => (
            <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="1.1rem" />
          ))}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
          {summaryCards.slice(2).map((card) => (
            <ResultCard key={card.title} title={card.title} value={card.value} variant={card.variant} fontSize="1.1rem" />
          ))}
        </Box>
    </Box>
    </MuiPaper>
  );

  return (
    <CalculatorTemplate
      title="Gratuity Calculator"
      description="Calculate your gratuity amount and understand the tax implications."
      formSection={formSection}
      resultSection={
        <>
          {eligibilityAlert}
          {eligibility && resultSection}
        </>
      }
      tableSection={
        eligibility ? (
          <>
            {particularsSection}
            {faqSection}
          </>
        ) : null
      }
    />
  );
};

export default GratuityCalculator; 