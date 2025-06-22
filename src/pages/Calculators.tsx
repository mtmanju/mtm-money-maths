import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
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
  Payment as PaymentIcon,
  AccountBalanceWalletOutlined as WalletIcon,
  CalculateOutlined as CalculatorIcon,
  TrendingUpOutlined as GrowthIcon,
  AccountBalanceOutlined as BankIcon,
  CreditCardOutlined as CardIcon,
  SavingsOutlined as DepositIcon,
  ShowChartOutlined as ChartIcon,
  CompareArrowsOutlined as CompareIcon,
  AssessmentOutlined as TaxIcon,
  AttachMoneyOutlined as MoneyIcon,
  HomeOutlined as HouseIcon,
  AccountBalanceWalletRounded as PensionIcon,
  CalculateRounded as MathIcon,
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
    icon: <PaymentIcon sx={{ fontSize: 24, color: '#E53E3E' }} />,
    path: '/emi'
  },
  {
    title: 'SIP Calculator',
    description: 'Plan your Systematic Investment Plan and calculate potential returns over time.',
    icon: <GrowthIcon sx={{ fontSize: 24, color: '#38A169' }} />,
    path: '/sip'
  },
  {
    title: 'FD Calculator',
    description: 'Calculate returns on your Fixed Deposits and plan your investments.',
    icon: <DepositIcon sx={{ fontSize: 24, color: '#D69E2E' }} />,
    path: '/fd'
  },
  {
    title: 'Income Tax Calculator',
    description: 'Calculate your tax liability and plan your tax-saving investments effectively.',
    icon: <TaxIcon sx={{ fontSize: 24, color: '#805AD5' }} />,
    path: '/income-tax'
  },
  {
    title: 'Mutual Fund Calculator',
    description: 'Analyze your mutual fund investments and track their performance over time.',
    icon: <ChartIcon sx={{ fontSize: 24, color: '#3182CE' }} />,
    path: '/mutual-fund'
  },
  {
    title: 'PPF Calculator',
    description: 'Calculate returns on your Public Provident Fund investments and plan your tax savings.',
    icon: <BankIcon sx={{ fontSize: 24, color: '#2F855A' }} />,
    path: '/ppf'
  },
  {
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax for your business transactions.',
    icon: <CalculatorIcon sx={{ fontSize: 24, color: '#DD6B20' }} />,
    path: '/gst'
  },
  {
    title: 'RD Calculator',
    description: 'Calculate returns on your Recurring Deposits and plan your regular investments.',
    icon: <DepositIcon sx={{ fontSize: 24, color: '#B7791F' }} />,
    path: '/rd'
  },
  {
    title: 'HRA Calculator',
    description: 'Calculate your House Rent Allowance and tax benefits.',
    icon: <HouseIcon sx={{ fontSize: 24, color: '#C53030' }} />,
    path: '/hra'
  },
  {
    title: 'Investment Calculator',
    description: 'Plan your investments and calculate potential returns with our comprehensive tool.',
    icon: <MathIcon sx={{ fontSize: 24, color: '#2B6CB0' }} />,
    path: '/investment'
  },
  {
    title: 'Loan Comparison',
    description: 'Compare different loan options and find the best deal for your needs.',
    icon: <CompareIcon sx={{ fontSize: 24, color: '#E53E3E' }} />,
    path: '/loan-comparison'
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement and calculate the corpus needed for a comfortable life.',
    icon: <PensionIcon sx={{ fontSize: 24, color: '#744210' }} />,
    path: '/retirement'
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate Return on Investment and analyze the profitability of your investments.',
    icon: <GrowthIcon sx={{ fontSize: 24, color: '#38A169' }} />,
    path: '/roi'
  },
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate for your investments and analyze returns.',
    icon: <ChartIcon sx={{ fontSize: 24, color: '#319795' }} />,
    path: '/cagr'
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and see how your money grows over time.',
    icon: <MoneyIcon sx={{ fontSize: 24, color: '#D69E2E' }} />,
    path: '/compound'
  },
  {
    title: 'NPS Calculator',
    description: 'Plan your National Pension Scheme investments and calculate potential retirement corpus.',
    icon: <PensionIcon sx={{ fontSize: 24, color: '#553C9A' }} />,
    path: '/nps'
  },
  {
    title: 'Gratuity Calculator',
    description: 'Calculate your gratuity amount based on your salary and years of service.',
    icon: <WalletIcon sx={{ fontSize: 24, color: '#B7791F' }} />,
    path: '/gratuity'
  }
];

// New Engen style card with enhanced liquid glass effect
const StyledCard = styled(Box)<{ cardColor?: { bg: string } }>(({ cardColor }) => ({
  position: 'relative',
  borderRadius: '10px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  padding: 0,
  height: '280px',
  width: '100%',
  maxWidth: '200px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  cursor: 'pointer',
  background: cardColor?.bg || 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(16px) saturate(180%)',
  transform: 'translateY(0) scale(1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
    zIndex: 0,
    opacity: 0.8,
    transition: 'all 0.4s ease-in-out',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '2px',
    bottom: '2px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '8px',
    zIndex: 1,
    opacity: 0.6,
    transition: 'all 0.4s ease-in-out',
  },
  '&:hover': {
    transform: 'translateY(-6px) scale(1.015)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)',
    background: cardColor?.bg ? `${cardColor.bg.replace('0.8', '1.0').replace('0.9', '1.0')}` : 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    '&::before': {
      opacity: 1.0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)',
    },
    '&::after': {
      opacity: 0.8,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%)',
    },
  },
  '@media (max-width: 899px)': {
    height: '240px',
    maxWidth: 'none',
    borderRadius: '10px',
    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.08), 0 1px 6px rgba(0, 0, 0, 0.04)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
    },
  },
  '@media (max-width: 599px)': {
    height: '220px',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
    '&:hover': {
      transform: 'translateY(-6px) scale(1.01)',
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
    },
  },
}));

const CardContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  background: 'transparent',
  height: '100%',
  justifyContent: 'space-between',
  '@media (max-width: 899px)': {
    padding: '16px',
  },
  '@media (max-width: 599px)': {
    padding: '14px',
  },
});

const CardTitle = styled(Typography)({
  color: '#1A1F36',
  fontWeight: 600,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.8rem',
  lineHeight: 1.3,
  marginBottom: '6px',
  '@media (max-width: 899px)': {
    fontSize: '0.75rem',
    marginBottom: '4px',
  },
  '@media (max-width: 599px)': {
    fontSize: '0.7rem',
    marginBottom: '3px',
  },
});

const CardDesc = styled(Typography)({
  color: '#6B7280',
  fontWeight: 400,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.85rem',
  lineHeight: 1.4,
  marginBottom: '12px',
  flexGrow: 1,
  '@media (max-width: 899px)': {
    fontSize: '0.75rem',
    marginBottom: '8px',
    lineHeight: 1.3,
  },
  '@media (max-width: 599px)': {
    fontSize: '0.7rem',
    marginBottom: '6px',
    lineHeight: 1.2,
  },
});

const ActionButton = styled(Button)({
  border: '1.5px solid #1A1F36',
  color: '#1A1F36',
  borderRadius: '999px',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.85rem',
  textTransform: 'none' as const,
  background: 'transparent',
  boxShadow: 'none',
  padding: '6px 12px',
  minWidth: 0,
  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '&:hover': {
    background: 'linear-gradient(135deg, #eafafd 0%, #d1f2ff 100%)',
    borderColor: '#009ca3',
    color: '#009ca3',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 156, 163, 0.2)',
  },
  '@media (max-width: 899px)': {
    fontSize: '0.8rem',
    padding: '5px 10px',
  },
  '@media (max-width: 599px)': {
    fontSize: '0.75rem',
    padding: '4px 8px',
    gap: '3px',
  },
});

const Calculators: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Individual card colors - matching home page color schemes
  const cardColors = [
    { bg: 'linear-gradient(135deg, rgba(251, 238, 238, 0.8) 0%, rgba(251, 238, 238, 0.9) 100%)' }, // EMI - pink
    { bg: 'linear-gradient(135deg, rgba(234, 250, 253, 0.8) 0%, rgba(234, 250, 253, 0.9) 100%)' }, // SIP - cyan
    { bg: 'linear-gradient(135deg, rgba(253, 251, 231, 0.8) 0%, rgba(253, 251, 231, 0.9) 100%)' }, // FD - yellow
    { bg: 'linear-gradient(135deg, rgba(243, 241, 250, 0.8) 0%, rgba(243, 241, 250, 0.9) 100%)' }, // Income Tax - purple
    { bg: 'linear-gradient(135deg, rgba(246, 250, 239, 0.8) 0%, rgba(246, 250, 239, 0.9) 100%)' }, // Mutual Fund - green
    { bg: 'linear-gradient(135deg, rgba(248, 249, 252, 0.8) 0%, rgba(248, 249, 252, 0.9) 100%)' }, // PPF - light gray
    { bg: 'linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(255, 240, 245, 0.9) 100%)' }, // GST - lavender
    { bg: 'linear-gradient(135deg, rgba(232, 245, 233, 0.8) 0%, rgba(232, 245, 233, 0.9) 100%)' }, // RD - mint
    { bg: 'linear-gradient(135deg, rgba(255, 249, 237, 0.8) 0%, rgba(255, 249, 237, 0.9) 100%)' }, // HRA - peach
    { bg: 'linear-gradient(135deg, rgba(239, 242, 255, 0.8) 0%, rgba(239, 242, 255, 0.9) 100%)' }, // Investment - light blue
    { bg: 'linear-gradient(135deg, rgba(255, 236, 236, 0.8) 0%, rgba(255, 236, 236, 0.9) 100%)' }, // Loan Comparison - salmon
    { bg: 'linear-gradient(135deg, rgba(240, 244, 255, 0.8) 0%, rgba(240, 244, 255, 0.9) 100%)' }, // Retirement - alice blue
    { bg: 'linear-gradient(135deg, rgba(255, 245, 224, 0.8) 0%, rgba(255, 245, 224, 0.9) 100%)' }, // ROI - beige
    { bg: 'linear-gradient(135deg, rgba(236, 255, 244, 0.8) 0%, rgba(236, 255, 244, 0.9) 100%)' }, // CAGR - seafoam green
    { bg: 'linear-gradient(135deg, rgba(245, 245, 245, 0.8) 0%, rgba(245, 245, 245, 0.9) 100%)' }, // Compound Interest - light grey
    { bg: 'linear-gradient(135deg, rgba(255, 240, 230, 0.8) 0%, rgba(255, 240, 230, 0.9) 100%)' }, // NPS - apricot
    { bg: 'linear-gradient(135deg, rgba(240, 230, 255, 0.8) 0%, rgba(240, 230, 255, 0.9) 100%)' }, // Gratuity - light violet
  ];

  return (
    <GradientBackground>
      <Container maxWidth="xl" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        pt: { xs: 1, md: 2 }, 
        pb: { xs: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 4, lg: 6 },
        textAlign: 'left',
      }}>
        <Box sx={{ 
          mb: { xs: 3, md: 4 }, 
          textAlign: 'center',
          maxWidth: '1400px',
          width: '100%',
          mx: 'auto'
        }}>
          <Typography
            variant="h2"
            sx={{
              color: '#1A1F36',
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
              lineHeight: 1.1,
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
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              maxWidth: '700px',
              lineHeight: 1.4,
              mb: 0,
              mx: 'auto',
            }}
          >
            Choose from our range of calculators to plan your finances better
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {calculators.map((calc, idx) => {
            const cardColor = cardColors[idx];
            
            return (
              <Grid item xs={6} sm={6} md={4} lg={2} key={calc.title}>
              <StyledCard
                  cardColor={cardColor}
                sx={{
                    animation: `fadeInUp 0.4s ease-out`,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(10px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                    height: { xs: '220px', sm: '240px', md: '280px' },
                    maxWidth: { xs: 'none', md: '200px' },
                    margin: 0,
                }}
              >
                <CardContentWrapper>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '8px' }}>
                      <Box sx={{ 
                        fontSize: { xs: '20px', sm: '22px', md: '24px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {calc.icon}
                      </Box>
                      <CardTitle sx={{ marginLeft: '8px', marginBottom: 0, display: 'flex', alignItems: 'center' }}>{calc.title}</CardTitle>
                    </Box>
                    <CardDesc>{calc.description}</CardDesc>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end',
                      marginTop: 'auto'
                    }}>
                      <Box component={RouterLink} to={calc.path} sx={{ textDecoration: 'none' }}>
                        <ActionButton>
                          Calculate <ArrowForwardIcon sx={{ fontSize: '0.8rem' }} />
                        </ActionButton>
                      </Box>
                    </Box>
                </CardContentWrapper>
              </StyledCard>
            </Grid>
            );
          })}
        </Grid>
      </Container>
    </GradientBackground>
  );
};

export default Calculators; 