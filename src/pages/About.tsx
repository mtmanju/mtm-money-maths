import React from 'react';
import { Box, Container, Typography, Grid, useTheme, styled } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import CalculateIcon from '@mui/icons-material/Calculate';
import PeopleIcon from '@mui/icons-material/People';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#fff',
  padding: theme.spacing(10, 0, 6, 0),
  textAlign: 'left',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    padding: theme.spacing(7, 0, 4, 0),
  },
}));

const HeroAccent = styled('span')(() => ({
  color: '#00bfc6',
  fontWeight: 700,
  letterSpacing: '-0.02em',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: '#eafafd',
  borderRadius: '20px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  padding: theme.spacing(4, 3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: 180,
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const About: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ background: '#fff', minHeight: '100vh', pb: 8, pt: { xs: 8, md: 10 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', pl: { xs: 2, sm: 3, md: 6 }, pr: { xs: 2, sm: 3, md: 0 } }}>
        {/* Hero Section */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.2rem' },
            letterSpacing: '-0.02em',
            color: '#1A1F36',
            mb: 2,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left',
          }}
        >
          About <HeroAccent>Money Maths Today</HeroAccent>
        </Typography>
        <Typography
          sx={{
            color: '#4E5D78',
            fontSize: { xs: '1.1rem', md: '1.35rem' },
            mb: 6,
            fontWeight: 400,
            maxWidth: 1000,
            lineHeight: 1.5,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left',
            mx: 0,
          }}
        >
          Money Maths is your trusted companion for financial clarity. We empower users to make smart, confident decisions with fast, accurate, and private financial calculators—free for everyone.
        </Typography>

        {/* Mission Section */}
        <Typography
          variant="h4"
          sx={{
            color: '#1A1F36',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left',
          }}
        >
          Our Mission
        </Typography>
        <Typography
          sx={{
            color: '#4E5D78',
            fontSize: { xs: '1.05rem', md: '1.2rem' },
            mb: 6,
            fontWeight: 400,
            lineHeight: 1.6,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left',
            mx: 0,
          }}
        >
          We believe everyone deserves access to powerful, easy-to-use financial tools. Our calculators are designed to be fast, accurate, and completely private—no sign-up, no data collection, just clear answers to your financial questions.
        </Typography>

        {/* Features Section */}
        <Typography
          variant="h4"
          sx={{
            color: '#1A1F36',
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left',
          }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent={{ xs: 'center', md: 'flex-start' }} alignItems="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#00bfc6', mb: 2 }} />
              <Typography sx={{ fontWeight: 700, color: '#1A1F36', mb: 1, fontSize: '1.1rem', textAlign: 'left' }}>Accurate Results</Typography>
              <Typography sx={{ color: '#4E5D78', fontSize: '1rem', textAlign: 'left' }}>
                Industry-standard formulas and tested logic for trustworthy answers.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <LockIcon sx={{ fontSize: 40, color: '#00bfc6', mb: 2 }} />
              <Typography sx={{ fontWeight: 700, color: '#1A1F36', mb: 1, fontSize: '1.1rem', textAlign: 'left' }}>Privacy First</Typography>
              <Typography sx={{ color: '#4E5D78', fontSize: '1rem', textAlign: 'left' }}>
                No sign-up, no data collection. All calculations happen instantly in your browser.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <CalculateIcon sx={{ fontSize: 40, color: '#00bfc6', mb: 2 }} />
              <Typography sx={{ fontWeight: 700, color: '#1A1F36', mb: 1, fontSize: '1.1rem', textAlign: 'left' }}>Comprehensive Tools</Typography>
              <Typography sx={{ color: '#4E5D78', fontSize: '1rem', textAlign: 'left' }}>
                A wide range of calculators for loans, investments, taxes, and more.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <PeopleIcon sx={{ fontSize: 40, color: '#00bfc6', mb: 2 }} />
              <Typography sx={{ fontWeight: 700, color: '#1A1F36', mb: 1, fontSize: '1.1rem', textAlign: 'left' }}>Free for Everyone</Typography>
              <Typography sx={{ color: '#4E5D78', fontSize: '1rem', textAlign: 'left' }}>
                100% free to use, forever. No hidden fees or subscriptions.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About; 