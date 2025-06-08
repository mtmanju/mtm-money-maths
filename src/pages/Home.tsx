import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  useTheme,
  styled,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
    : 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)',
  color: 'white',
  padding: theme.spacing(15, 0),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
    zIndex: 1,
  },
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
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

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
    : 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)',
  color: 'white',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CalculateIcon />,
      title: 'Financial Calculators',
      description: 'Comprehensive suite of financial calculators for all your investment needs.',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Investment Analysis',
      description: 'Detailed analysis tools to help you make informed investment decisions.',
    },
    {
      icon: <SpeedIcon />,
      title: 'Quick Results',
      description: 'Get instant results with our fast and accurate calculation engines.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure & Private',
      description: 'Your data is always secure and private with our advanced security measures.',
    },
  ];

  return (
    <Box>
      <HeroSection>
        <HeroContent maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Smart Financial
            <br />
            Calculations Made Easy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              opacity: 0.9,
            }}
          >
            Make informed financial decisions with our comprehensive suite of calculators
            and analysis tools.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/calculators"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Get Started
            </Button>
            <Button
              component={RouterLink}
              to="/about"
              variant="contained"
              color="secondary"
              size="large"
            >
              Learn More
            </Button>
          </Box>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ 
        bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
        py: 8,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(6, 95, 70, 0.05) 100%)',
          zIndex: 0,
        },
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom>
                Why Choose Our
                <br />
                <Box component="span" sx={{ 
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
                    : 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Financial Tools?
                </Box>
              </Typography>
              <Typography variant="body1" paragraph>
                Our financial calculators are designed to help you make better investment
                decisions. Whether you're planning for retirement, calculating loan
                payments, or analyzing investment returns, our tools provide accurate
                and easy-to-understand results.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/calculators"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Explore Calculators
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/calculator-illustration.svg"
                alt="Financial Calculator"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 