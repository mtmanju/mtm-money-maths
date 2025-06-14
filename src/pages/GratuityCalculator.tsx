import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Slider, InputAdornment } from '@mui/material';
import { AccountBalance, Work } from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { formatCurrency } from '../utils/formatUtils';
import { StyledPaper, StyledSlider, ChartContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomNumberField } from '../components/CustomNumberField';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';

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

  useEffect(() => {
    calculateGratuity();
  }, [basicSalary, da, serviceYears]);

  const calculateGratuity = () => {
    const lastDrawnSalary = basicSalary + da;
    const gratuityAmount = Math.min(
      (lastDrawnSalary * serviceYears * 15) / 26,
      2000000 // Maximum gratuity limit
    );

    // Generate chart data
    const chartData = Array.from({ length: serviceYears + 1 }, (_, i) => {
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

    const taxableAmount = gratuityAmount - results.taxFreeAmount;

    setResults({
      gratuityAmount,
      totalServiceYears: serviceYears,
      lastDrawnSalary,
      chartData,
      taxableAmount,
      taxFreeAmount: gratuityAmount - taxableAmount,
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

  const resultSection = (
    <Box>
      <CalculatorResultCards
        items={[
          {
            label: 'Gratuity Amount',
            value: formatCurrency(results.gratuityAmount),
            variant: 'primary'
          },
          {
            label: 'Taxable Amount',
            value: formatCurrency(results.taxableAmount),
            variant: 'primary'
          },
          {
            label: 'Tax-Free Amount',
            value: formatCurrency(results.taxFreeAmount),
            variant: 'primary'
          }
        ]}
      />

      <CalculatorResultCards
        items={[
          {
            label: 'Basic Salary',
            value: formatCurrency(basicSalary),
            variant: 'primary'
          },
          {
            label: 'Years of Service',
            value: `${serviceYears} Years`,
            variant: 'primary'
          },
          {
            label: 'Last Drawn Salary',
            value: formatCurrency(results.lastDrawnSalary),
            variant: 'primary'
          }
        ]}
      />

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          Gratuity Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Tax Free', value: results.taxFreeAmount },
                { name: 'Taxable', value: results.taxableAmount }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {[
                { name: 'Tax Free', value: results.taxFreeAmount },
                { name: 'Taxable', value: results.taxableAmount }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? colors.accent.primary : colors.accent.secondary} />
              ))}
            </Pie>
            <RechartsTooltip
              contentStyle={chartTooltipStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend wrapperStyle={chartLegendStyle} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableColumns = [
    { key: 'component', id: 'component', label: 'Component', align: 'left' },
    { key: 'amount', id: 'amount', label: 'Amount', align: 'right' },
    { key: 'taxStatus', id: 'taxStatus', label: 'Tax Status', align: 'right' }
  ];

  const tableRows = [
    {
      component: 'Tax Free Gratuity',
      amount: formatCurrency(results.taxFreeAmount),
      taxStatus: 'Exempt'
    },
    {
      component: 'Taxable Gratuity',
      amount: formatCurrency(results.taxableAmount),
      taxStatus: 'Taxable'
    },
    {
      component: 'Total Gratuity',
      amount: formatCurrency(results.gratuityAmount),
      taxStatus: 'Mixed'
    }
  ];

  const tableSection = (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
        Gratuity Calculation Details
      </Typography>
      <CalculatorTable
        columns={tableColumns}
        rows={tableRows}
      />
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Gratuity Calculator"
      description="Calculate your gratuity amount and understand the tax implications."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default GratuityCalculator; 