import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
  styled,
  InputAdornment,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarTodayIcon,
  AttachMoney as AttachMoneyIcon,
  Percent as PercentIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CalculatorTemplate, StyledPaper, ResultCard, StyledTextField, StyledSlider, ChartContainer } from '../components/CalculatorTemplate';

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#FFFFFF',
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const CompactSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(34, 40, 70, 0.92)',
  borderRadius: '18px',
  boxShadow: '0 4px 16px rgba(90, 107, 255, 0.12)',
  border: '1.5px solid #5A6BFF',
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  gap: theme.spacing(2),
}));

const SummaryItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  '& .label': {
    color: '#A7BFFF',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: 2,
    display: 'block',
  },
  '& .value': {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1.25rem',
  },
}));

const StatBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  justifyContent: 'space-between',
}));

const StatCard = styled(Box)(({ theme }) => ({
  flex: '1 1 180px',
  minWidth: 150,
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(90,107,255,0.08)',
  border: '1.5px solid #e0e7ef',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2, 1.5),
  textAlign: 'center',
  color: '#232946',
  position: 'relative',
}));

const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: 28,
  marginBottom: theme.spacing(0.5),
  color: '#5A6BFF',
}));

const StatLabel = styled('span')(({ theme }) => ({
  fontSize: '0.95rem',
  color: '#7F8FA6',
  fontWeight: 500,
  marginBottom: 2,
}));

const StatValue = styled('span')(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.25rem',
  color: '#232946',
}));

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const RoiCalculator: React.FC = () => {
  const theme = useTheme();
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(150000);
  const [years, setYears] = useState<number>(5);
  const [results, setResults] = useState<{
    roi: number;
    annualizedRoi: number;
    chartData: any[];
  }>({
    roi: 0,
    annualizedRoi: 0,
    chartData: [],
  });

  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue, years]);

  const calculateROI = () => {
    const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;

    // Generate chart data
    const chartData = Array.from({ length: years + 1 }, (_, i) => {
      const year = i;
      const value = initialInvestment * (1 + roi / 100 * year);
      return {
        year,
        value: Math.round(value),
      };
    });

    setResults({
      roi,
      annualizedRoi,
      chartData,
    });
  };

  const formSection = (
    <StyledPaper>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Initial Investment
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={initialInvestment}
          onChange={(_, newValue) => setInitialInvestment(newValue as number)}
          min={1000}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Final Value
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={finalValue}
          onChange={(e) => setFinalValue(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={finalValue}
          onChange={(_, newValue) => setFinalValue(newValue as number)}
          min={1000}
          max={10000000}
          step={1000}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Time Period (Years)
        </Typography>
        <StyledTextField
          fullWidth
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }}
        />
        <StyledSlider
          value={years}
          onChange={(_, newValue) => setYears(newValue as number)}
          min={1}
          max={30}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>
    </StyledPaper>
  );

  const resultSection = (
    <Box>
      <CompactSummary>
        <SummaryItem>
          <span className="label">ROI</span>
          <span className="value">{results.roi.toFixed(2)}%</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Annualized ROI</span>
          <span className="value">{results.annualizedRoi.toFixed(2)}%</span>
        </SummaryItem>
        <SummaryItem>
          <span className="label">Total Return</span>
          <span className="value">{formatCurrency(finalValue - initialInvestment)}</span>
        </SummaryItem>
      </CompactSummary>

      <StatBar>
        <StatCard>
          <StatIcon>
            <AttachMoneyIcon />
          </StatIcon>
          <StatLabel>Initial Investment</StatLabel>
          <StatValue>{formatCurrency(initialInvestment)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon>
            <AttachMoneyIcon />
          </StatIcon>
          <StatLabel>Final Value</StatLabel>
          <StatValue>{formatCurrency(finalValue)}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon>
            <CalendarMonthIcon />
          </StatIcon>
          <StatLabel>Time Period</StatLabel>
          <StatValue>{years} years</StatValue>
        </StatCard>
      </StatBar>

      <ChartContainer>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 3 }}>
          Investment Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
            <XAxis dataKey="year" stroke="#7F8FA6" />
            <YAxis stroke="#7F8FA6" />
            <RechartsTooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #E0E7FF',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(90,107,255,0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Investment Value"
              stroke="#5A6BFF"
              strokeWidth={2}
              dot={{ fill: '#5A6BFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Box>
  );

  return (
    <CalculatorTemplate
      title="ROI Calculator"
      description="Calculate Return on Investment and analyze the profitability of your investments"
      formSection={formSection}
      resultSection={resultSection}
    />
  );
};

export default RoiCalculator; 