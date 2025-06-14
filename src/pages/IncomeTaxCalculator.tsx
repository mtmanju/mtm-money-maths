import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  TableContainer,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  Savings as SavingsIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/formatUtils';
import { CalculatorResultCards } from '../components/CalculatorResultCards';
import { CalculatorTable } from '../components/CalculatorTable';
import { ResultCard } from '../components/ResultCard';

interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

interface TaxResults {
  totalIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveTaxRate: number;
  taxBreakdown: Array<{
    slab: string;
    taxableAmount: number;
    taxAmount: number;
  }>;
}

const newRegimeSlabs: TaxSlab[] = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400001, max: 800000, rate: 5 },
  { min: 800001, max: 1200000, rate: 10 },
  { min: 1200001, max: 1600000, rate: 15 },
  { min: 1600001, max: 2000000, rate: 20 },
  { min: 2000001, max: 2400000, rate: 25 },
  { min: 2400001, max: Infinity, rate: 30 }
];

const oldRegimeSlabs: TaxSlab[] = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 5 },
  { min: 500001, max: 1000000, rate: 20 },
  { min: 1000001, max: Infinity, rate: 30 }
];

const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(1000000);
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  const [deductions, setDeductions] = useState<number>(0);
  const [results, setResults] = useState<TaxResults>({
    totalIncome: 0,
    taxableIncome: 0,
    totalTax: 0,
    effectiveTaxRate: 0,
    taxBreakdown: []
  });

  useEffect(() => {
    calculateTax();
  }, [income, regime, deductions]);

  const calculateTax = () => {
    const slabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;
    const taxableIncome = Math.max(0, income - deductions);
    let totalTax = 0;
    const taxBreakdown: Array<{
      slab: string;
      taxableAmount: number;
      taxAmount: number;
    }> = [];

    slabs.forEach((slab, index) => {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(
          taxableIncome - slab.min,
          slab.max === Infinity ? taxableIncome - slab.min : slab.max - slab.min
        );
        const taxAmount = (taxableAmount * slab.rate) / 100;
        totalTax += taxAmount;

        taxBreakdown.push({
          slab: `₹${formatCurrency(slab.min)} - ₹${slab.max === Infinity ? '∞' : formatCurrency(slab.max)}`,
          taxableAmount,
          taxAmount
        });
      }
    });

    setResults({
      totalIncome: income,
      taxableIncome,
      totalTax,
      effectiveTaxRate: (totalTax / taxableIncome) * 100,
      taxBreakdown
    });
  };

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
          valueLabelFormat={(value) => formatCurrency(value)}
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
            valueLabelFormat={(value) => formatCurrency(value)}
          />
        </Box>
      )}
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <CalculatorResultCards
        items={[
          {
            label: 'Total Income',
            value: formatCurrency(results.totalIncome),
            variant: 'primary'
          },
          {
            label: 'Taxable Income',
            value: formatCurrency(results.taxableIncome),
            variant: 'primary'
          },
          {
            label: 'Total Tax',
            value: formatCurrency(results.totalTax),
            variant: 'primary'
          },
          {
            label: 'Effective Tax Rate',
            value: `${results.effectiveTaxRate.toFixed(2)}%`,
            variant: 'primary'
          }
        ]}
      />
    </Box>
  );

  const tableColumns = [
    { key: 'slab', id: 'slab', label: 'Income Slab', align: 'left' },
    { key: 'taxableAmount', id: 'taxableAmount', label: 'Taxable Amount', align: 'right' },
    { key: 'taxAmount', id: 'taxAmount', label: 'Tax Amount', align: 'right' }
  ];

  const tableSection = (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
        Tax Slab Breakdown
      </Typography>
      <CalculatorTable
        columns={tableColumns}
        rows={results.taxBreakdown.map(row => ({
          ...row,
          taxableAmount: formatCurrency(row.taxableAmount),
          taxAmount: formatCurrency(row.taxAmount)
        }))}
      />
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Income Tax Calculator"
      description="Calculate your income tax liability under both New and Old tax regimes."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default IncomeTaxCalculator; 