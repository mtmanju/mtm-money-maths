import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, typography } from '../styles/theme';
import { StyledTableContainer } from '../components/StyledTableContainer';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { ResultCard } from '../components/ResultCard';
import { PaymentsIcon, PercentIcon, TrendingUpIcon } from '../components/icons';
import { ChartContainer } from '../components/ChartContainer';

interface ChartData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Results {
  totalInterest: number;
  totalPayment: number;
  interestRate: number;
  chartData: ChartData[];
}

const LoanComparison: React.FC = () => {
  const [results, setResults] = useState<Results>({
    totalInterest: 0,
    totalPayment: 0,
    interestRate: 0,
    chartData: [],
  });

  const calculateLoanComparison = (data: any) => {
    // Implementation of calculateLoanComparison
  };

  const formSection = (
    <Box>
      {/* Add your form fields here */}
    </Box>
  );

  const resultSection = (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <ResultCard title="Total Interest" value={formatCurrency(results.totalInterest)} icon={<TrendingUpIcon />} variant="primary" />
        <ResultCard title="Total Payment" value={formatCurrency(results.totalPayment)} icon={<PaymentsIcon />} variant="secondary" />
        <ResultCard title="Interest Rate" value={`${results.interestRate}%`} icon={<PercentIcon />} variant="purple" />
      </Box>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={results.chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="month" 
              stroke={colors.primary}
              tick={{ fill: colors.primary }}
            />
            <YAxis 
              stroke={colors.primary}
              tick={{ fill: colors.primary }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                fontFamily: typography.fontFamily
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="principal"
              name="Principal"
              stroke={colors.primary}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="interest"
              name="Interest"
              stroke={colors.secondary}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  const tableSection = (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: colors.primary }}>
        Monthly Payment Breakdown
      </Typography>
      <StyledTableContainer>
        <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' as const, borderBottom: `1px solid ${colors.border}`, color: colors.secondary }}>Month</th>
              <th style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.secondary }}>Principal</th>
              <th style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.secondary }}>Interest</th>
              <th style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.secondary }}>Total Payment</th>
              <th style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.secondary }}>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.chartData.map((row) => (
              <tr key={row.month}>
                <td style={{ padding: '12px', textAlign: 'left' as const, borderBottom: `1px solid ${colors.border}`, color: colors.primary }}>{row.month}</td>
                <td style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.primary }}>{formatCurrency(row.principal)}</td>
                <td style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.primary }}>{formatCurrency(row.interest)}</td>
                <td style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.primary }}>{formatCurrency(row.principal + row.interest)}</td>
                <td style={{ padding: '12px', textAlign: 'right' as const, borderBottom: `1px solid ${colors.border}`, color: colors.primary }}>{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableContainer>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="Loan Comparison"
      description="Compare different loan options and understand the total cost of borrowing."
      formSection={formSection}
      resultSection={resultSection}
      tableSection={tableSection}
      onCalculate={calculateLoanComparison}
      results={results}
    />
  );
};

export default LoanComparison; 