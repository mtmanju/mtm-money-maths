import React, { useState, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Typography,
  FormControlLabel,
  Switch,
  TableContainer,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Percent as PercentIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { CustomNumberField } from '../components/CustomNumberField';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { ResultCard } from '../components/ResultCard';
import { colors, typography } from '../components/calculatorStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

interface GSTResults {
  cgst: number;
  sgst: number;
  igst: number;
  totalGST: number;
  totalAmount: number;
  chartData: Array<{
    component: string;
    amount: number;
  }>;
}

const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInterState, setIsInterState] = useState<boolean>(false);
  const [results, setResults] = useState<GSTResults>({
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalGST: 0,
    totalAmount: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, isInterState]);

  const calculateGST = () => {
    const gstAmount = (amount * gstRate) / 100;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterState) {
      igst = gstAmount;
    } else {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    }

    const totalAmount = amount + gstAmount;

    // Generate chart data
    const chartData = [
      { component: 'Base Amount', amount: amount },
      { component: 'CGST', amount: cgst },
      { component: 'SGST', amount: sgst },
      { component: 'IGST', amount: igst },
    ];

    setResults({
      cgst,
      sgst,
      igst,
      totalGST: gstAmount,
      totalAmount,
      chartData,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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

      <Box>
        <CustomNumberField
          fullWidth
          label="Calculation Type"
          value={isInterState ? 1 : 0}
          onChange={(value) => setIsInterState(value === 1)}
          min={0}
          max={1}
          step={1}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalculateIcon sx={{ color: '#00bfc6', fontWeight: 400, fontSize: 22, mr: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={isInterState ? 1 : 0}
          onChange={(_, newValue) => setIsInterState(newValue === 1)}
          min={0}
          max={1}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value === 1 ? 'Inter-State' : 'Intra-State'}
        />
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Total GST" value={formatCurrency(results.totalGST)} variant="primary" />
        <ResultCard title="CGST" value={formatCurrency(results.cgst)} variant="secondary" />
        <ResultCard title="SGST" value={formatCurrency(results.sgst)} variant="purple" />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Base Amount" value={formatCurrency(amount)} variant="primary" />
        <ResultCard title="GST Rate" value={`${gstRate}%`} variant="secondary" />
        <ResultCard title="Total Amount" value={formatCurrency(results.totalAmount)} variant="purple" />
      </Box>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          GST Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Base Amount', value: amount },
                { name: 'CGST', value: results.cgst },
                { name: 'SGST', value: results.sgst }
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
                { name: 'Base Amount', value: amount },
                { name: 'CGST', value: results.cgst },
                { name: 'SGST', value: results.sgst }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? colors.accent.primary : index === 1 ? colors.accent.secondary : colors.accent.purple} />
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

  const tableSection = (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
        GST Calculation Details
      </Typography>
      <StyledTableContainer>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Component</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Base Amount</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>-</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(amount)}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>CGST</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{gstRate / 2}%</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(results.cgst)}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>SGST</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{gstRate / 2}%</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(results.sgst)}</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0', fontWeight: 600 }}>Total Amount</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{gstRate}%</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0', fontWeight: 600 }}>{formatCurrency(results.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </StyledTableContainer>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="GST Calculator"
      description="Calculate GST, CGST, and SGST for your goods and services."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default GstCalculator; 