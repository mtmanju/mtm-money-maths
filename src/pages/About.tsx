import React from 'react';
import { Box, Container, Typography, Grid, useTheme, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GradientBackground } from '../components/calculatorStyles';

const AboutSection = styled(Box)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(3, 0),
  minHeight: '100vh',
}));

const AboutContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1400px',
  width: '100%',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  border: '1.5px solid #e0e7ef',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
  },
}));

const FeatureTitle = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.1rem',
  letterSpacing: '-0.01em',
  marginBottom: '1rem',
}));

const FeatureDesc = styled(Typography)(() => ({
  color: '#4E5D78',
  fontWeight: 400,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  lineHeight: 1.6,
}));

const About: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#e57373' }} />,
      title: 'Accurate Results',
      description: 'All our calculators use industry-standard formulas and are tested for accuracy, so you can trust your results every time.',
      bgColor: '#fbeeee'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#9575cd' }} />,
      title: 'Privacy First',
      description: 'We never store your data. All calculations happen instantly in your browser for complete privacy and security.',
      bgColor: '#f3f1fa'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#81c784' }} />,
      title: 'Free & Fast',
      description: 'All tools are 100% free, require no sign-up, and deliver instant results so you can make decisions quickly.',
      bgColor: '#f6faef'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 36, color: '#64b5f6' }} />,
      title: 'Comprehensive Tools',
      description: 'A wide range of calculators for loans, investments, taxes, and more to cover all your financial needs.',
      bgColor: '#eafafd'
    }
  ];

  return (
    <GradientBackground>
      <AboutSection>
        <AboutContainer maxWidth="xl" sx={{ px: { xs: 2, md: 4, lg: 6 } }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1A1F36',
                fontWeight: 700,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                letterSpacing: '-0.02em',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}
            >
              About <Box component="span" sx={{ color: '#00bfc6', fontWeight: 700 }}>Money Maths</Box>
            </Typography>
            <Typography
              sx={{
                color: '#4E5D78',
                fontWeight: 400,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.4,
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto 3rem auto',
              }}
            >
              Money Maths is your trusted companion for financial clarity. We empower users to make smart, confident decisions with fast, accurate, and private financial calculators—free for everyone.
            </Typography>
          </Box>

          {/* Mission Section */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              sx={{
                color: '#1A1F36',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                marginBottom: '2rem',
                textAlign: 'left',
              }}
            >
              Our Mission
            </Typography>
            <Typography
              sx={{
                color: '#4E5D78',
                fontWeight: 400,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.5,
                marginBottom: '3rem',
                textAlign: 'left',
              }}
            >
              We believe everyone deserves access to powerful, easy-to-use financial tools. Our calculators are designed to be fast, accurate, and completely private—no sign-up, no data collection, just clear answers to your financial questions.
            </Typography>
          </Box>

          {/* Features Section */}
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: '#1A1F36',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                marginBottom: '2rem',
                textAlign: 'left',
              }}
            >
              Why Choose Us?
            </Typography>
            <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch">
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard sx={{ background: feature.bgColor }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {feature.icon}
                      <FeatureTitle sx={{ marginBottom: 0, marginLeft: 1.5 }}>
                        {feature.title}
                      </FeatureTitle>
                    </Box>
                    <FeatureDesc>
                      {feature.description}
                    </FeatureDesc>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AboutContainer>
      </AboutSection>
    </GradientBackground>
  );
};

export default About; 