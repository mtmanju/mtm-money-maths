import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  styled,
  Button,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Input as InputIcon,
  ArrowForward as ArrowForwardIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  TrendingUpOutlined as GrowthIcon,
  SavingsOutlined as DepositIcon,
  AssessmentOutlined as TaxIcon,
  ShowChartOutlined as ChartIcon,
  AccountBalanceOutlined as BankIcon,
} from '@mui/icons-material';
import { GradientBackground } from '../components/calculatorStyles';

// Styled components from Calculators page
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
  zIndex: 1,
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
  fontSize: '0.8rem',
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

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 2),
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '85vh',
  textAlign: 'center',
  zIndex: 1,
}));

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#e57373' }} />,
      title: 'Accurate Results',
      description: 'All our calculators use industry-standard formulas and are tested for accuracy, so you can trust your results every time.',
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#9575cd' }} />,
      title: 'Privacy First',
      description: 'We never store your data. All calculations happen instantly in your browser for complete privacy and security.',
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#81c784' }} />,
      title: 'Free & Fast',
      description: 'All tools are 100% free, require no sign-up, and deliver instant results so you can make decisions quickly.',
    },
  ];

  const howItWorks = [
    {
      icon: <InputIcon sx={{ fontSize: 36, color: '#00bfc6' }} />,
      title: 'Enter Your Data',
      description: 'Fill in your numbers—like loan amount, interest rate, or investment details. No sign-up or personal info needed.',
    },
    {
      icon: <CalculateIcon sx={{ fontSize: 36, color: '#9575cd' }} />,
      title: 'Calculate Instantly',
      description: 'Get instant, accurate results using industry-standard formulas—right in your browser, with no waiting.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 36, color: '#81c784' }} />,
      title: 'Make Smart Moves',
      description: 'Use your results to plan, compare, and make confident financial decisions—fast and free.',
    },
  ];

  // Top 6 calculators with exact same data and styling from Calculators page
  const topCalculators = [
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
    }
  ];

  // Card colors matching Calculators page
  const cardColors = [
    { bg: 'linear-gradient(135deg, rgba(251, 238, 238, 0.8) 0%, rgba(251, 238, 238, 0.9) 100%)' }, // EMI - pink
    { bg: 'linear-gradient(135deg, rgba(234, 250, 253, 0.8) 0%, rgba(234, 250, 253, 0.9) 100%)' }, // SIP - cyan
    { bg: 'linear-gradient(135deg, rgba(253, 251, 231, 0.8) 0%, rgba(253, 251, 231, 0.9) 100%)' }, // FD - yellow
    { bg: 'linear-gradient(135deg, rgba(243, 241, 250, 0.8) 0%, rgba(243, 241, 250, 0.9) 100%)' }, // Income Tax - purple
    { bg: 'linear-gradient(135deg, rgba(246, 250, 239, 0.8) 0%, rgba(246, 250, 239, 0.9) 100%)' }, // Mutual Fund - green
    { bg: 'linear-gradient(135deg, rgba(248, 249, 252, 0.8) 0%, rgba(248, 249, 252, 0.9) 100%)' }, // PPF - light gray
  ];

  return (
    <GradientBackground sx={{ paddingBottom: 0 }}>
      <HeroSection>
        <Container maxWidth="lg" sx={{ 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{ maxWidth: '900px', width: '100%' }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                mb: 3,
                color: '#1A1F36',
              }}
            >
              Smarter Financial Decisions,
              <Box component="span" sx={{ 
                display: 'block', 
                color: '#00bfc6', 
                fontWeight: 700, 
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              }}>
                Made Simple.
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#6B7280',
                fontWeight: 400,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: 'auto',
                mb: 5,
                lineHeight: 1.6,
              }}
            >
              Your one-stop destination for fast, free, and accurate financial calculators. Plan your investments, loans, and taxes with confidence.
            </Typography>
            <Box>
              <Button
                component={RouterLink}
                to="/calculators"
                variant="contained"
                sx={{
                  background: '#1A1F36',
                  color: '#fff',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '1rem',
                  textTransform: 'none',
                  padding: '12px 32px',
                  minWidth: 0,
                  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
                  '&:hover': {
                    background: '#009ca3',
                    color: '#fff',
                    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
                    transform: 'translateY(-2px) scale(1.04)',
                  },
                }}
              >
                Get Started <ArrowForwardIcon sx={{ fontSize: '1.1rem', ml: 1 }} />
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Box sx={{ 
        py: { xs: 3, md: 4 }, 
        background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1rem', md: '1.35rem' },
              mb: 2,
              letterSpacing: '-0.02em',
              color: '#1A1F36',
              textAlign: 'left',
              pl: 0,
            }}
          >
            Popular <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>Calculators</Box>
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {topCalculators.map((calc, idx) => {
              const cardColor = cardColors[idx];
              
              return (
                <Grid item xs={6} sm={6} md={4} lg={2} key={calc.title}>
                  <StyledCard
                    cardColor={cardColor}
                    sx={{
                      height: { xs: 'auto', sm: '240px', md: '280px' },
                      minHeight: { xs: '200px', sm: '220px' },
                      maxWidth: { xs: '100%', md: 'none' },
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    <CardContentWrapper>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '12px' }}>
                        <Box sx={{ 
                          fontSize: { xs: '22px', sm: '24px' },
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
                        <Box component={RouterLink} to={calc.path} sx={{ textDecoration: 'none', width: '100%' }}>
                          <ActionButton sx={{ width: '100%', justifyContent: 'center' }}>
                            Calculate <ArrowForwardIcon sx={{ fontSize: '0.9rem' }} />
                          </ActionButton>
                        </Box>
                      </Box>
                    </CardContentWrapper>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/calculators"
              variant="contained"
              sx={{ 
                background: '#1A1F36',
                color: '#fff',
                borderRadius: '999px',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1rem',
                textTransform: 'none',
                padding: '12px 32px',
                minWidth: 0,
                boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  background: '#009ca3',
                  color: '#fff',
                  boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
                  transform: 'translateY(-2px) scale(1.04)',
                },
              }}
            >
              View All Calculators <ArrowForwardIcon sx={{ fontSize: '1.1rem', ml: 1 }} />
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ 
        py: { xs: 3, md: 4 }, 
        background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left', position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1rem', md: '1.35rem' },
              mb: 2,
              letterSpacing: '-0.02em',
              color: '#1A1F36',
              textAlign: 'left',
              pl: 0,
            }}
          >
            Why Choose <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>Money Maths</Box>
          </Typography>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1.5,
                    '@media (max-width: 899px)': {
                      mb: 2,
                    }
                  }}>
                    {React.cloneElement(feature.icon, { 
                      sx: { 
                        fontSize: 36, 
                        color: '#e57373',
                        '@media (max-width: 899px)': {
                          fontSize: 28, 
                          color: '#6750A4'
                        }
                      } 
                    })}
                    <Typography
                      sx={{
                        // Desktop styles
                        color: '#1A1F36',
                        fontWeight: 700,
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '1.1rem',
                        letterSpacing: '-0.01em',
                        marginLeft: 1.5,
                        // Mobile styles
                        '@media (max-width: 899px)': {
                          color: '#1C1B1F',
                          fontWeight: 500,
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          letterSpacing: '0.15px',
                          marginLeft: 2,
                        },
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      // Desktop styles
                      color: '#4E5D78',
                      fontWeight: 400,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      // Mobile styles
                      '@media (max-width: 899px)': {
                        color: '#49454F',
                        fontSize: '0.75rem',
                        lineHeight: 1.43,
                        letterSpacing: '0.25px',
                      },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ 
        py: { xs: 3, md: 4 }, 
        background: 'transparent',
      }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left', position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1rem', md: '1.35rem' },
              mb: 2,
              letterSpacing: '-0.02em',
              color: '#1A1F36',
              textAlign: 'left',
              pl: 0,
            }}
          >
            How <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>Money Maths</Box> Works
          </Typography>
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {howItWorks.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1.5,
                    '@media (max-width: 899px)': {
                      mb: 2,
                    }
                  }}>
                    {React.cloneElement(step.icon, { 
                      sx: { 
                        fontSize: 36, 
                        color: '#00bfc6',
                        '@media (max-width: 899px)': {
                          fontSize: 28, 
                          color: '#6750A4'
                        }
                      }
                    })}
                    <Typography
                      sx={{
                        // Desktop styles
                        color: '#1A1F36',
                        fontWeight: 700,
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '1.1rem',
                        letterSpacing: '-0.01em',
                        marginLeft: 1.5,
                        // Mobile styles
                        '@media (max-width: 899px)': {
                          color: '#1C1B1F',
                          fontWeight: 500,
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: 1.5,
                          letterSpacing: '0.15px',
                          marginLeft: 2,
                        },
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      // Desktop styles
                      color: '#4E5D78',
                      fontWeight: 400,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      // Mobile styles
                      '@media (max-width: 899px)': {
                        color: '#49454F',
                        fontSize: '0.75rem',
                        lineHeight: 1.43,
                        letterSpacing: '0.25px',
                      },
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </GradientBackground>
  );
};

export default Home; 