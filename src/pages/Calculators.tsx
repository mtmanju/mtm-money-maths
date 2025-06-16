import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  Savings as SavingsIcon,
  ShowChart as ShowChartIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CompareArrows as CompareArrowsIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { GradientBackground, colors, typography } from '../components/calculatorStyles';
import styled from '@emotion/styled';

const pastelColors = [
  '#fbeeee', // EMI - pink
  '#eafafd', // SIP - cyan
  '#fdfbe7', // FD - yellow
  '#f3f1fa', // Mutual Fund - purple
  '#f6faef', // Tax - green
  '#f8f9fc', // Investment - light gray
  '#fbeeee', // Loan Comparison - pink
  '#f3f1fa', // Retirement - purple
  '#eafafd', // ROI - cyan
  '#fdfbe7', // CAGR - yellow
  '#f6faef', // Compound Interest - green
];

// Add corresponding dark colors for icons
const iconColors = [
  '#e57373', // EMI - dark pink
  '#00bfc6', // SIP - dark cyan
  '#ffb74d', // FD - dark yellow
  '#9575cd', // Mutual Fund - dark purple
  '#81c784', // Tax - dark green
  '#78909c', // Investment - dark gray
  '#e57373', // Loan Comparison - dark pink
  '#9575cd', // Retirement - dark purple
  '#00bfc6', // ROI - dark cyan
  '#ffb74d', // CAGR - dark yellow
  '#81c784', // Compound Interest - dark green
];

const calculators = [
  {
    title: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installments for loans and plan your repayments.',
    icon: <CreditCardIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/emi'
  },
  {
    title: 'SIP Calculator',
    description: 'Plan your Systematic Investment Plan and calculate potential returns over time.',
    icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/sip'
  },
  {
    title: 'FD Calculator',
    description: 'Calculate returns on your Fixed Deposits and plan your investments.',
    icon: <SavingsIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/fd'
  },
  {
    title: 'RD Calculator',
    description: 'Calculate returns on your Recurring Deposits and plan your regular investments.',
    icon: <SavingsIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/rd'
  },
  {
    title: 'PPF Calculator',
    description: 'Calculate returns on your Public Provident Fund investments and plan your tax savings.',
    icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/ppf'
  },
  {
    title: 'NPS Calculator',
    description: 'Plan your National Pension Scheme investments and calculate potential retirement corpus.',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/nps'
  },
  {
    title: 'Gratuity Calculator',
    description: 'Calculate your gratuity amount based on your salary and years of service.',
    icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/gratuity'
  },
  {
    title: 'HRA Calculator',
    description: 'Calculate your House Rent Allowance and tax benefits.',
    icon: <HomeIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/hra'
  },
  {
    title: 'Income Tax Calculator',
    description: 'Calculate your tax liability and plan your tax-saving investments effectively.',
    icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/income-tax'
  },
  {
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax for your business transactions.',
    icon: <CalculateIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/gst'
  },
  {
    title: 'Mutual Fund Calculator',
    description: 'Analyze your mutual fund investments and track their performance over time.',
    icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/mutual-fund'
  },
  {
    title: 'Investment Calculator',
    description: 'Plan your investments and calculate potential returns with our comprehensive tool.',
    icon: <CalculateIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/investment'
  },
  {
    title: 'Loan Comparison',
    description: 'Compare different loan options and find the best deal for your needs.',
    icon: <CompareArrowsIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/loan-comparison'
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and calculate the corpus needed for a comfortable life.',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/retirement'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate Return on Investment and analyze the profitability of your investments.',
    icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/roi'
  },
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate for your investments and analyze returns.',
    icon: <ShowChartIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/cagr'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and see how your money grows over time.',
    icon: <AttachMoneyIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
    path: '/compound'
  }
];

interface CardTitleProps {
  children: React.ReactNode;
  [key: string]: any;
}

const CardTitle = (props: CardTitleProps) => (
  <Typography
    sx={{
      color: '#1A1F36',
      fontWeight: 700,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '1.13rem',
      letterSpacing: '-0.01em',
      marginBottom: 0,
    }}
    {...props}
  />
);

interface CardDescProps {
  children: React.ReactNode;
  [key: string]: any;
}

const CardDesc = (props: CardDescProps) => (
  <Typography
    sx={{
      color: '#4E5D78',
      fontWeight: 400,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '0.98rem',
      lineHeight: 1.5,
      margin: '1rem 0 1.5rem 0',
    }}
    {...props}
  />
);

const LearnMoreButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant',
})({
  border: '1.5px solid #1A1F36',
  color: '#1A1F36',
  borderRadius: '999px',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  textTransform: 'none',
  background: 'transparent',
  boxShadow: 'none',
  padding: '8px 22px',
  minWidth: 0,
  transition: 'background 0.2s, color 0.2s, border 0.2s',
  '&:hover': {
    background: '#eafafd',
    borderColor: '#009ca3',
    color: '#009ca3',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  p: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: 'none',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(90, 107, 255, 0.05), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 245, 255, 0.05), transparent 50%),
      repeating-linear-gradient(45deg, rgba(0, 191, 198, 0.01) 0px, rgba(0, 191, 198, 0.01) 1px, transparent 1px, transparent 10px),
      repeating-linear-gradient(-45deg, rgba(90, 107, 255, 0.01) 0px, rgba(90, 107, 255, 0.01) 1px, transparent 1px, transparent 10px)
    `,
    backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
    backgroundPosition: '0 0, 0 0, 0 0, 0 0',
    zIndex: 0,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  background: 'transparent',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mr: 1.5,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

const Calculators: React.FC = () => {
  return (
    <GradientBackground>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: '#1A1F36',
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Financial{' '}
            <Box component="span" sx={{ color: '#00bfc6', fontWeight: 700 }}>
              Calculators
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#4E5D78',
              fontWeight: 400,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            Choose from our range of calculators to plan your finances better
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {calculators.map((calc, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={calc.title}>
              <StyledCard
                sx={{
                  background: pastelColors[idx % pastelColors.length],
                }}
              >
                <CardContentWrapper>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <IconWrapper>
                      {React.cloneElement(calc.icon, {
                        sx: { 
                          fontSize: 28,
                          color: iconColors[idx % iconColors.length]
                        }
                      })}
                    </IconWrapper>
                    <CardTitle>{calc.title}</CardTitle>
                  </Box>
                  <CardDesc>{calc.description}</CardDesc>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 'auto' }}>
                    <Button
                      component={RouterLink}
                      to={calc.path}
                      sx={{
                        border: '1.5px solid #1A1F36',
                        color: '#1A1F36',
                        borderRadius: '999px',
                        fontWeight: 500,
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '1rem',
                        textTransform: 'none',
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: '8px 22px',
                        minWidth: 0,
                        transition: 'background 0.2s, color 0.2s, border 0.2s',
                        '&:hover': {
                          background: '#eafafd',
                          borderColor: '#009ca3',
                          color: '#009ca3',
                        },
                      }}
                    >
                      Calculate
                    </Button>
                  </Box>
                </CardContentWrapper>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GradientBackground>
  );
};

export default Calculators; 