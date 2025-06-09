import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  useTheme,
  styled,
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
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';

const PIE_COLORS = ['#3F51B5', '#7986CB', '#9E9E9E', '#CFD8DC'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
  height: '100%',
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  textAlign: 'center',
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '400px',
  width: '100%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  '& canvas': {
    padding: theme.spacing(2)
  }
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

const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  summaryItems,
  chartData,
  pieData,
  yearlyBreakdown,
  onDownloadPDF,
  onDownloadExcel,
  chartTitle = 'Growth Over Time',
  pieChartTitle = 'Distribution',
  yearlyBreakdownTitle = 'Yearly Breakdown',
}) => {
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'start',
        labels: {
          boxWidth: 12,
          padding: 20
        }
      },
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: {
            top: 10
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          padding: 10
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (₹)',
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: {
            bottom: 10
          }
        },
        ticks: {
          callback: (value: number) => formatCurrency(value),
          padding: 10
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
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
                {typeof item.value === 'number' ? formatCurrency(item.value) : item.value}
              </Typography>
            </SummaryCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              {chartTitle}
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Year', position: 'insideBottom', offset: 0 }}
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis 
                    label={{ value: 'Value (INR)', angle: -90, position: 'insideLeft' }} 
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    tick={{ fontSize: 12 }}
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={theme.palette.primary.main} 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              {pieChartTitle}
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    minAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Yearly Breakdown Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
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
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {yearlyBreakdown.length > 0 && Object.keys(yearlyBreakdown[0])
                      .filter(key => key !== 'year')
                      .map((key) => (
                        <th key={key} style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year}>
                      {Object.entries(row)
                        .filter(([key]) => key !== 'year')
                        .map(([key, value]) => (
                          <td key={key} style={{ padding: '8px', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>
                            {typeof value === 'number' ? formatCurrency(value) : value}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalculatorResults; 