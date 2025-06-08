import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import { globalStyles } from '../styles/globalStyles';

const FooterWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(96, 165, 250, 0.1)'}`,
  padding: theme.spacing(6, 0),
}));

const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#4B5563' : '#D1D5DB',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.mode === 'light' ? '#2563EB' : '#60A5FA',
    transform: 'translateX(4px)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  ...globalStyles(theme).gradientText,
  fontWeight: 700,
  fontSize: '1.5rem',
  marginBottom: theme.spacing(2),
}));

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LogoText>
              Money Maths
            </LogoText>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted partner for financial calculations and investment planning.
              Make informed decisions with our comprehensive suite of calculators.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <StyledRouterLink to="/about">
                About Us
              </StyledRouterLink>
              <StyledRouterLink to="/contact">
                Contact
              </StyledRouterLink>
              <StyledRouterLink to="/privacy">
                Privacy Policy
              </StyledRouterLink>
              <StyledRouterLink to="/terms">
                Terms of Service
              </StyledRouterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Calculators
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <StyledRouterLink to="/calculators/cagr">
                CAGR Calculator
              </StyledRouterLink>
              <StyledRouterLink to="/calculators/sip">
                SIP Calculator
              </StyledRouterLink>
              <StyledRouterLink to="/calculators/emi">
                EMI Calculator
              </StyledRouterLink>
              <StyledRouterLink to="/calculators/mutual-fund">
                Mutual Fund Calculator
              </StyledRouterLink>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(96, 165, 250, 0.1)'}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Money Maths. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 