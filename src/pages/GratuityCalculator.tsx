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
import FAQSection, { FAQItem } from '../components/common/FAQSection';
import ParticularsSection from '../components/common/ParticularsSection';
import EligibilityAlert from '../components/common/EligibilityAlert';

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
    <ParticularsSection
      title="How Gratuity is Calculated"
      items={[
        <><b>Last Drawn Salary:</b> The last monthly salary (basic + dearness allowance).</>,
        <><b>Years of Service:</b> Number of years you have worked for the employer.</>,
        <><b>Formula:</b> Gratuity = Last Drawn Salary × 15 × Years of Service / 26</>,
        <><b>Maximum Limit:</b> As per law, the maximum gratuity payable is ₹20 lakh.</>,
      ]}
    />
  );
  const faqItems: FAQItem[] = [
    { q: 'Who is eligible for gratuity?', a: 'Employees who have completed at least 5 years of continuous service with the same employer.' },
    { q: 'Is gratuity taxable?', a: 'Gratuity up to ₹20 lakh is tax-free for private sector employees under the Payment of Gratuity Act.' },
    { q: 'Can gratuity be paid before 5 years?', a: 'Generally, no. But in case of death or disability, it may be paid before 5 years.' },
    { q: 'How is gratuity calculated for seasonal employees?', a: 'For seasonal employees, gratuity is calculated at 7 days’ wages for each season.' },
    { q: 'Is there a maximum limit for gratuity?', a: 'Yes, the maximum gratuity payable is ₹20 lakh as per current law.' },
  ];
  const faqSection = (
    <FAQSection faqs={faqItems} collapsible={true} />
  );

  const eligibilityAlert = !eligibility ? (
    <EligibilityAlert message="You are not eligible for gratuity (minimum 5 years of service required)." severity="warning" />
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