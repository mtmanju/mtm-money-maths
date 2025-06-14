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

interface LearnMoreButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

const LearnMoreButton = (props: LearnMoreButtonProps) => (
  <Button
    variant="outlined"
    endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
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
    {...props}
  />
);

const Calculators = () => (
  <Container maxWidth="xl" sx={{ py: 8 }}>
    <Typography variant="h4" sx={{ mb: 6, textAlign: 'center', fontWeight: 700, color: '#1A1F36', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      Our Calculators
    </Typography>
    <Grid container spacing={3}>
      {calculators.map((calc, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={calc.title}>
          <Card
            sx={{
              background: pastelColors[idx % pastelColors.length],
              borderRadius: '24px',
              boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
              p: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              border: 'none',
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Box sx={{
                  background: '#fff',
                  borderRadius: '12px',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px 0 rgba(30, 34, 90, 0.06)',
                  mr: 1.5,
                }}>
                  {calc.icon}
                </Box>
                <CardTitle>{calc.title}</CardTitle>
              </Box>
              <CardDesc>{calc.description}</CardDesc>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 'auto' }}>
                <Box component={RouterLink} to={calc.path} sx={{ textDecoration: 'none', display: 'inline-block' }}>
                  <LearnMoreButton>
                    Calculate
                  </LearnMoreButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Calculators; 