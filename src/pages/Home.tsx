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
  padding: theme.spacing(16, 0, 10),
  overflow: 'hidden',
  background: theme.palette.background.default,
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
  background: theme.palette.background.paper,
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
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
  marginBottom: theme.spacing(2),
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    transform: 'none',
    backgroundColor: theme.palette.grey[200],
    borderColor: theme.palette.grey[300],
  },
}));

const Home: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CalculateIcon sx={{ fontSize: 28 }} />,
      title: 'Financial Calculators',
      description: 'Comprehensive suite of financial calculators for all your investment needs.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      title: 'Investment Analysis',
      description: 'Detailed analysis tools to help you make informed investment decisions.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 28 }} />,
      title: 'Quick Results',
      description: 'Get instant results with our fast and accurate calculation engines.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28 }} />,
      title: 'Secure & Private',
      description: 'Your data is always secure and private with our advanced security measures.',
    },
  ];

  return (
    <Box>
      <HeroSection>
        <HeroContent maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: theme.typography.h3.fontSize, md: theme.typography.h1.fontSize },
              fontWeight: theme.typography.h1.fontWeight,
              mb: 3,
              letterSpacing: theme.typography.h1.letterSpacing,
              color: theme.palette.text.primary,
            }}
          >
            Smart Financial
            <br />
            Calculations Made Easy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              maxWidth: '700px',
              mx: 'auto',
              color: theme.palette.text.secondary,
              fontWeight: theme.typography.h5.fontWeight,
              lineHeight: theme.typography.h5.lineHeight,
            }}
          >
            Make informed financial decisions with our comprehensive suite of calculators
            and analysis tools.
          </Typography>
          <Box sx={{ display: 'flex', gap: theme.spacing(2), justifyContent: 'center' }}>
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
              variant="outlined"
              color="primary"
              size="large"
            >
              Learn More
            </Button>
          </Box>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: theme.spacing(10) }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: theme.spacing(3) }}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h5" component="h3" gutterBottom color="text.primary">
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
        py: theme.spacing(10),
        position: 'relative',
        background: theme.palette.background.default,
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom color="text.primary">
                Why Choose Our
                <br />
                Financial Tools?
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary"
                sx={{ lineHeight: theme.typography.body1.lineHeight }}>
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
                  filter: 'none',
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