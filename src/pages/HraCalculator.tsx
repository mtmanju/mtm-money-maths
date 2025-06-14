import React, { useState, useEffect, FC } from 'react';
import { Box, Typography, TextField, Slider, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import { Home, AccountBalance, LocationCity } from '@mui/icons-material';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { formatCurrency } from '../utils/formatUtils';
import { StyledPaper, StyledSlider, ChartContainer, StyledTableContainer } from '../components/calculatorStyles';
import { colors, typography } from '../components/calculatorStyles';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CustomNumberField } from '../components/CustomNumberField';
import { ResultCard } from '../components/ResultCard';

interface HRAResults {
  hraExemption: number;
  taxableHRA: number;
  totalHRA: number;
  chartData: Array<{
    component: string;
    amount: number;
  }>;
}

const HraCalculator: FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(15000);
  const [metroCity, setMetroCity] = useState<boolean>(true);
  const [results, setResults] = useState<HRAResults>({
    hraExemption: 0,
    taxableHRA: 0,
    totalHRA: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateHRA();
  }, [basicSalary, hraReceived, rentPaid, metroCity]);

  const calculateHRA = () => {
    // Calculate HRA exemption based on the three rules
    const rule1 = hraReceived;
    const rule2 = rentPaid - (0.1 * basicSalary);
    const rule3 = metroCity ? 0.5 * basicSalary : 0.4 * basicSalary;

    // HRA exemption is the minimum of the three rules
    const hraExemption = Math.min(rule1, rule2, rule3);
    const taxableHRA = hraReceived - hraExemption;

    // Generate chart data
    const chartData = [
      { component: 'HRA Received', amount: hraReceived },
      { component: 'HRA Exemption', amount: hraExemption },
      { component: 'Taxable HRA', amount: taxableHRA },
    ];

    setResults({
      hraExemption,
      taxableHRA,
      totalHRA: hraReceived,
      chartData,
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

  const handleBasicSalaryChange = (value: number | string) => {
    if (typeof value === 'number') {
      setBasicSalary(value);
    }
  };

  const handleHraReceivedChange = (value: number | string) => {
    if (typeof value === 'number') {
      setHraReceived(value);
    }
  };

  const handleRentPaidChange = (value: number | string) => {
    if (typeof value === 'number') {
      setRentPaid(value);
    }
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <CustomNumberField
          fullWidth
          label="Basic Salary"
          value={basicSalary}
          onChange={handleBasicSalaryChange}
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
          label="HRA Received"
          value={hraReceived}
          onChange={handleHraReceivedChange}
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
        />
      </Box>

      <Box>
        <CustomNumberField
          fullWidth
          label="Rent Paid"
          value={rentPaid}
          onChange={handleRentPaidChange}
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

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="HRA Exemption" value={formatCurrency(results.hraExemption)} variant="primary" />
        <ResultCard title="Taxable HRA" value={formatCurrency(results.taxableHRA)} variant="secondary" />
        <ResultCard title="Monthly HRA" value={formatCurrency(results.totalHRA / 12)} variant="purple" />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        <ResultCard title="Basic Salary" value={formatCurrency(basicSalary)} variant="primary" />
        <ResultCard title="Rent Paid" value={formatCurrency(rentPaid)} variant="secondary" />
        <ResultCard title="Metro City" value={metroCity ? 'Yes' : 'No'} variant="purple" />
      </Box>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
          HRA Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Exempt', value: results.hraExemption },
                { name: 'Taxable', value: results.taxableHRA }
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
                { name: 'Exempt', value: results.hraExemption },
                { name: 'Taxable', value: results.taxableHRA }
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

  const tableSection = (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, mb: 3 }}>
        HRA Calculation Details
      </Typography>
      <StyledTableContainer>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: typography.fontFamily, fontSize: '0.9rem', color: colors.secondary }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Component</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Amount</th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0', color: colors.secondary, fontWeight: 600 }}>Tax Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>HRA Exemption</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(results.hraExemption)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Exempt</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Taxable HRA</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(results.taxableHRA)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Taxable</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #E0E0E0' }}>Total HRA</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>{formatCurrency(results.totalHRA)}</td>
              <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #E0E0E0' }}>Mixed</td>
            </tr>
          </tbody>
        </table>
      </StyledTableContainer>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="HRA Calculator"
      description="Calculate your House Rent Allowance (HRA) exemption and tax benefits."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
    />
  );
};

export default HraCalculator; 