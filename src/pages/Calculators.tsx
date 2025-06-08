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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
}));

const CardIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: 0,
  backgroundColor: theme.palette.grey[100],
  border: '1px solid ' + theme.palette.grey[200],
  boxShadow: 'none',
  color: theme.palette.primary.main,
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    transform: 'none',
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[300],
  },
}));

const calculators = [
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate to evaluate investment performance over time',
    icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
    path: '/calculators/cagr',
  },
  {
    title: 'Mutual Fund Calculator',
    description: 'Estimate returns and analyze performance of your mutual fund investments',
    icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
    path: '/calculators/mutual-fund',
  },
  {
    title: 'SIP Calculator',
    description: 'Plan your Systematic Investment Plan and project future returns',
    icon: <SavingsIcon sx={{ fontSize: 28 }} />,
    path: '/calculators/sip',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for loans and mortgages',
    icon: <CreditCardIcon sx={{ fontSize: 28 }} />,
    path: '/calculators/emi',
  },
];

const Calculators: React.FC = () => {
  const theme = useMuiTheme();

  return (
    <Box sx={{ py: theme.spacing(10) }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: theme.spacing(8) }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: theme.typography.h3.fontSize, md: theme.typography.h1.fontSize },
              fontWeight: theme.typography.h1.fontWeight,
              mb: 2,
              letterSpacing: theme.typography.h1.letterSpacing,
              color: theme.palette.text.primary,
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
              lineHeight: theme.typography.h5.lineHeight,
              fontWeight: theme.typography.h5.fontWeight,
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
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: theme.spacing(3) }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      <CardIconWrapper>{calculator.icon}</CardIconWrapper>
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{ 
                          fontWeight: theme.typography.h6.fontWeight,
                          ml: 2,
                          fontSize: theme.typography.h6.fontSize,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {calculator.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: theme.typography.body1.lineHeight }}
                    >
                      {calculator.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: theme.spacing(3), pt: 0, justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
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

        <Box sx={{ mt: theme.spacing(10), textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: theme.typography.h4.fontWeight,
              letterSpacing: theme.typography.h4.letterSpacing,
              color: theme.palette.text.primary,
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
              lineHeight: theme.typography.body1.lineHeight,
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