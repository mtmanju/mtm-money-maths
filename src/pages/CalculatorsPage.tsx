import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardActions, Button, Grid, Box, Container, useTheme, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { globalStyles } from '../styles/globalStyles';

const MotionCard = motion(Card);

const StyledCard = styled(MotionCard)(({ theme }) => ({
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

const CalculatorsPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
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
          Our Calculators
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Choose from our selection of powerful financial calculators to help you make informed investment decisions.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <StyledCard
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                CAGR Calculator
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Calculate the Compound Annual Growth Rate (CAGR) for your investments and understand your long-term returns.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 4, pt: 0 }}>
              <Button
                component={Link}
                to="/calculators/cagr"
                variant="contained"
                size="large"
                fullWidth
                sx={{ borderRadius: 12, textTransform: 'none', fontWeight: 500 }}
              >
                Try Calculator
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Mutual Fund Calculator
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Analyze mutual fund returns, compare different funds, and make better investment decisions.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 4, pt: 0 }}>
              <Button
                component={Link}
                to="/calculators/mutual-fund"
                variant="contained"
                size="large"
                fullWidth
                sx={{ borderRadius: 12, textTransform: 'none', fontWeight: 500 }}
              >
                Try Calculator
              </Button>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CalculatorsPage; 