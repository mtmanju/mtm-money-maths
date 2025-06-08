import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme as useMuiTheme,
  styled,
  CardActions,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Savings as SavingsIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { globalStyles } from '../styles/globalStyles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: 24,
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 20px 40px rgba(0, 0, 0, 0.1)'
      : '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
}));

const CardIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: 16,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
  },
}));

const calculators = [
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate to evaluate investment performance over time',
    icon: <TrendingUpIcon />,
    path: '/calculators/cagr',
  },
  {
    title: 'Mutual Fund Calculator',
    description: 'Estimate returns and analyze performance of your mutual fund investments',
    icon: <AccountBalanceIcon />,
    path: '/calculators/mutual-fund',
  },
  {
    title: 'SIP Calculator',
    description: 'Plan your Systematic Investment Plan and project future returns',
    icon: <SavingsIcon />,
    path: '/calculators/sip',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for loans and mortgages',
    icon: <CreditCardIcon />,
    path: '/calculators/emi',
  },
];

const Calculators: React.FC = () => {
  const theme = useMuiTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              ...globalStyles(theme).gradientText,
              letterSpacing: '-0.02em',
            }}
          >
            Financial Calculators
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Make informed financial decisions with our suite of powerful calculators
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {calculators.map((calculator) => (
            <Grid item xs={12} sm={6} md={3} key={calculator.title}>
              <RouterLink
                to={calculator.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <StyledCard>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      <CardIconWrapper>{calculator.icon}</CardIconWrapper>
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{ 
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                          ml: 2,
                        }}
                      >
                        {calculator.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {calculator.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        borderRadius: 12,
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                      startIcon={calculator.icon}
                    >
                      Calculate
                    </Button>
                  </CardActions>
                </StyledCard>
              </RouterLink>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              ...globalStyles(theme).gradientText,
              letterSpacing: '-0.01em',
            }}
          >
            Why Use Our Calculators?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Our financial calculators help you make informed decisions about your investments and loans.
            Whether you're planning for retirement, investing in mutual funds, or taking out a loan,
            our tools provide accurate calculations and insights to guide your financial journey.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Calculators; 