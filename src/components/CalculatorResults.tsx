import React, { forwardRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  useTheme,
  styled,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import DownloadIcon from '@mui/icons-material/Download';
import { formatCurrency, formatPercentage } from '../utils/formatUtils';

const PIE_COLORS = ['#3F51B5', '#7986CB', '#9E9E9E', '#CFD8DC'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
  height: '100%',
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
}));

interface SummaryItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface ChartData {
  year: number;
  value: number;
  [key: string]: any;
}

interface PieData {
  name: string;
  value: number;
}

interface YearlyBreakdown {
  year: number;
  [key: string]: any;
}

interface CalculatorResultsProps {
  summaryItems: SummaryItem[];
  chartData: ChartData[];
  pieData: PieData[];
  yearlyBreakdown: YearlyBreakdown[];
  onDownloadPDF?: () => void;
  onDownloadExcel?: () => void;
  chartTitle?: string;
  pieChartTitle?: string;
  yearlyBreakdownTitle?: string;
}

const CalculatorResults = forwardRef<HTMLDivElement, CalculatorResultsProps>(({
  summaryItems,
  chartData,
  pieData,
  yearlyBreakdown,
  onDownloadPDF,
  onDownloadExcel,
  chartTitle = 'Growth Over Time',
  pieChartTitle = 'Distribution',
  yearlyBreakdownTitle = 'Yearly Breakdown',
}, ref) => {
  const theme = useTheme();

  const renderValue = (value: string | number) => {
    if (typeof value === 'number') {
      return formatCurrency(value);
    }
    return value;
  };

  const renderChart = () => {
    if (!chartData || chartData.length === 0) return null;

    // Calculate domain for Y-axis
    const values = chartData.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.1; // 10% padding

    return (
      <Box sx={{ width: '100%', height: 300, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toString()}
              padding={{ left: 10, right: 10 }}
              label={{ 
                value: 'Year', 
                position: 'bottom',
                offset: 0,
                style: { fontSize: 12, fontWeight: 500 }
              }}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
              domain={[Math.max(0, minValue - padding), maxValue + padding]}
              width={80}
              tickCount={6}
              allowDecimals={false}
              label={{ 
                value: 'Amount', 
                angle: -90, 
                position: 'left',
                offset: 0,
                style: { fontSize: 12, fontWeight: 500 }
              }}
            />
            <RechartsTooltip 
              formatter={(value: number) => [formatCurrency(value), 'Amount']}
              contentStyle={{ 
                fontSize: '12px',
                padding: '8px',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: '4px'
              }}
              labelFormatter={(label) => `Year ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderPieChart = () => {
    if (!pieData || pieData.length === 0) return null;

    const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

    return (
      <Box sx={{ width: '100%', height: 300, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                const percentage = (percent * 100).toFixed(0);
                return `${percentage}%`;
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => value}
            />
            <RechartsTooltip 
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                `${name} (${((value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}% of total)`
              ]}
              contentStyle={{ 
                fontSize: '12px',
                padding: '8px',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: '4px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderYearlyBreakdown = () => {
    if (!yearlyBreakdown || yearlyBreakdown.length === 0) return null;

    return (
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(yearlyBreakdown[0]).map((key) => (
                  <TableCell key={key} sx={{ fontWeight: 'bold' }}>
                    {key.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {yearlyBreakdown.map((row, index) => (
                <TableRow key={index}>
                  {Object.entries(row).map(([key, value], i) => (
                    <TableCell key={i}>
                      {key === 'year' ? value : (typeof value === 'number' ? formatCurrency(value) : value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box ref={ref} sx={{ mt: 4 }}>
      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SummaryCard>
              {item.icon && (
                <Box sx={{ mb: 1 }}>{item.icon}</Box>
              )}
              <Typography variant="h6" color="inherit" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
              <Typography variant="h4" color="inherit" sx={{ fontWeight: 700 }}>
                {renderValue(item.value)}
              </Typography>
            </SummaryCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <StyledPaper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {chartTitle}
            </Typography>
            {renderChart()}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {pieChartTitle}
            </Typography>
            {renderPieChart()}
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Yearly Breakdown Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {yearlyBreakdownTitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {onDownloadExcel && (
                  <Button
                    variant="outlined"
                    startIcon={<TableChartIcon />}
                    onClick={onDownloadExcel}
                  >
                    Excel
                  </Button>
                )}
                {onDownloadPDF && (
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={onDownloadPDF}
                  >
                    PDF
                  </Button>
                )}
              </Box>
            </Box>
            {renderYearlyBreakdown()}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
});

CalculatorResults.displayName = 'CalculatorResults';

export default CalculatorResults; 