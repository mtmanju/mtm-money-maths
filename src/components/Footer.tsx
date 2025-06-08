import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  styled,
  IconButton,
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

const FooterWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.grey[100]}`,
  padding: theme.spacing(6, 0),
}));

const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  fontSize: '0.875rem',
  fontWeight: 400,
  padding: theme.spacing(0.5, 0),
  display: 'block',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '-0.02em',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'color 0.2s ease',
  padding: theme.spacing(1),
  borderRadius: 0,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    transform: 'none',
  },
}));

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <LogoText variant="h6">
              Money Maths
            </LogoText>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                fontSize: '0.875rem',
                lineHeight: 1.5,
                maxWidth: '280px',
              }}
            >
              Your trusted partner for financial calculations and investment planning.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              <SocialIconButton aria-label="Twitter">
                <TwitterIcon sx={{ fontSize: '1.5rem' }} />
              </SocialIconButton>
              <SocialIconButton aria-label="LinkedIn">
                <LinkedInIcon sx={{ fontSize: '1.5rem' }} />
              </SocialIconButton>
              <SocialIconButton aria-label="GitHub">
                <GitHubIcon sx={{ fontSize: '1.5rem' }} />
              </SocialIconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="body1"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
            <Typography 
              variant="body1"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Calculators
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${theme.palette.grey[100]}`,
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 400,
            }}
          >
            © {new Date().getFullYear()} Money Maths. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 