import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
  styled,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CreditCard as CreditCardIcon,
  Savings as SavingsIcon,
  ShowChart as ShowChartIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CompareArrows as CompareArrowsIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Input as InputIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: '#FFFFFF',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `
      radial-gradient(circle at 20% 20%, rgba(90, 107, 255, 0.05), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 245, 255, 0.05), transparent 50%)
    `,
    zIndex: 0,
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0, 6, 0),
  background: '#fff',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  minHeight: '85vh',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10%',
    left: '-15%',
    width: '40vw',
    height: '60vh',
    background: 'radial-gradient(circle at 30% 40%, #eafafd 60%, transparent 100%)',
    zIndex: 0,
    borderRadius: '50%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    right: '-15%',
    width: '40vw',
    height: '60vh',
    background: 'radial-gradient(circle at 70% 60%, #eafafd 60%, transparent 100%)',
    zIndex: 0,
    borderRadius: '50%',
  },
}));

const HeroAccent = styled('span')(() => ({
  color: '#00bfc6',
  fontWeight: 700,
  letterSpacing: '-0.02em',
}));

const HeroCtaButton = styled(Button)(() => ({
  background: '#1A1F36',
  color: '#fff',
  borderRadius: '999px',
  fontWeight: 600,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.1rem',
  textTransform: 'none',
  padding: '16px 40px',
  minWidth: 0,
  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
  marginTop: '2.5rem',
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
    transform: 'translateY(-2px) scale(1.04)',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #5A6BFF 0%, #00F5FF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  fontWeight: 800,
  fontFamily: theme.typography.fontFamily,
  letterSpacing: '-0.02em',
}));

const pastelColors = [
  '#fbeeee', // EMI - pink
  '#eafafd', // SIP - cyan
  '#fdfbe7', // FD - yellow
  '#f3f1fa', // Mutual Fund - purple
  '#f6faef', // Tax - green
  '#f8f9fc', // Investment - light gray
  '#fbeeee', // Loan Comparison - pink
  '#f3f1fa', // Retirement - purple
  '#eafafd', // ROI - cyan
  '#fdfbe7', // CAGR - yellow
  '#f6faef', // Compound Interest - green
];

const CardTitle = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.13rem',
  letterSpacing: '-0.01em',
  marginBottom: 0,
}));

const CardDesc = styled(Typography)(() => ({
  color: '#4E5D78',
  fontWeight: 400,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.98rem',
  lineHeight: 1.5,
  margin: '1rem 0 1.5rem 0',
}));

const LearnMoreButton = styled(Button)(() => ({
  border: '1.5px solid #1A1F36',
  color: '#1A1F36',
  borderRadius: '999px',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  textTransform: 'none',
  background: 'transparent',
  boxShadow: 'none',
  padding: '8px 22px',
  minWidth: 0,
  transition: 'background 0.2s, color 0.2s, border 0.2s',
  '&:hover': {
    background: '#eafafd',
    borderColor: '#009ca3',
    color: '#009ca3',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  borderRadius: '24px',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  padding: '2.5rem 2rem 2rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 260,
  transition: 'box-shadow 0.2s, transform 0.2s',
  animation: 'fadeIn 0.7s ease',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
    transform: 'translateY(-4px) scale(1.02)',
  },
}));

const FeatureTitle = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.35rem',
  letterSpacing: '-0.01em',
  marginBottom: '0.5rem',
}));

const FeatureDesc = styled(Typography)(() => ({
  color: '#4E5D78',
  fontWeight: 400,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.05rem',
  lineHeight: 1.5,
}));

const Home: React.FC = () => {
  const theme = useTheme();

  const calculators = [
    {
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installments for loans and plan your repayments.',
      icon: <CreditCardIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/emi'
    },
    {
      title: 'SIP Calculator',
      description: 'Plan your Systematic Investment Plan and calculate potential returns over time.',
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/sip'
    },
    {
      title: 'FD Calculator',
      description: 'Calculate returns on your Fixed Deposits and plan your investments.',
      icon: <SavingsIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/fd'
    },
    {
      title: 'Mutual Fund Calculator',
      description: 'Analyze your mutual fund investments and track their performance over time.',
      icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/mutual-fund'
    },
    {
      title: 'Tax Calculator',
      description: 'Calculate your tax liability and plan your tax-saving investments effectively.',
      icon: <AccountBalanceIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/tax'
    },
    {
      title: 'Investment Calculator',
      description: 'Plan your investments and calculate potential returns with our comprehensive tool.',
      icon: <CalculateIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/investment'
    },
    {
      title: 'Loan Comparison',
      description: 'Compare different loan options and find the best deal for your needs.',
      icon: <CompareArrowsIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/loan-comparison'
    },
    {
      title: 'Retirement Calculator',
      description: 'Plan your retirement and calculate the corpus needed for a comfortable life.',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/retirement'
    },
    {
      title: 'ROI Calculator',
      description: 'Calculate Return on Investment and analyze the profitability of your investments.',
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/roi'
    },
    {
      title: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate for your investments and analyze returns.',
      icon: <ShowChartIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/cagr'
    },
    {
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest and see how your money grows over time.',
      icon: <AttachMoneyIcon sx={{ fontSize: 28, color: '#5A6BFF' }} />,
      path: '/compound'
    }
  ];

  return (
    <GradientBackground>
      <HeroSection>
        <Container maxWidth="xl" sx={{ 
          position: 'relative', 
          zIndex: 1, 
          textAlign: 'left', 
          px: { xs: 2, md: 6, lg: 10 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '85vh',
          width: '100%'
        }}>
          <Box sx={{ 
            maxWidth: '1400px',
            width: '100%',
            mx: 'auto'
          }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5.2rem', lg: '6rem' },
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                mb: 3,
                color: '#1A1F36',
                textAlign: 'left',
                maxWidth: '1200px'
              }}
            >
              Experience{' '}
              <Box component="span" sx={{ 
                display: 'block', 
                color: '#00bfc6', 
                fontWeight: 600, 
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5.2rem', lg: '6rem' },
                mt: 1
              }}>
                Money Maths today.
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#4E5D78',
                fontWeight: 400,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                maxWidth: '900px',
                mb: 6,
                textAlign: 'left',
                lineHeight: 1.4,
              }}
            >
              Transform your financial planning with fast, accurate, and private calculators—free for everyone.
            </Typography>
            <Button
              component={RouterLink}
              to="/calculators"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 28 }} />}
              sx={{
                background: '#fff',
                color: '#00bfc6',
                borderRadius: '999px',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1.35rem',
                px: 5,
                py: 2,
                boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
                border: '2px solid #00bfc6',
                textTransform: 'none',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  background: '#00bfc6',
                  color: '#fff',
                  boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
                  transform: 'translateY(-2px) scale(1.04)',
                  border: '2px solid #00bfc6',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </HeroSection>
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', py: { xs: 6, md: 8 }, background: '#f8f9fc' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left' }}>
          <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#fbeeee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 36, color: '#e57373', mr: 1.5 }} />
                  <FeatureTitle>Accurate Results</FeatureTitle>
                </Box>
                <FeatureDesc>
                  All our calculators use industry-standard formulas and are tested for accuracy, so you can trust your results every time.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#f3f1fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 36, color: '#9575cd', mr: 1.5 }} />
                  <FeatureTitle>Privacy First</FeatureTitle>
                </Box>
                <FeatureDesc>
                  We never store your data. All calculations happen instantly in your browser for complete privacy and security.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#f6faef' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 36, color: '#81c784', mr: 1.5 }} />
                  <FeatureTitle>Free & Fast</FeatureTitle>
                </Box>
                <FeatureDesc>
                  All tools are 100% free, require no sign-up, and deliver instant results so you can make decisions quickly.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', py: { xs: 7, md: 10 }, background: '#f4fafd' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.7rem' },
              mb: 4,
              letterSpacing: '-0.02em',
              color: '#1A1F36',
              textAlign: 'left',
              pl: 0,
            }}
          >
            How <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>Money Maths</Box> Works
          </Typography>
          <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#eaf7fa', minHeight: 200, animation: 'fadeInLeft 0.7s' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InputIcon sx={{ fontSize: 36, color: '#00bfc6', mr: 1.5 }} />
                  <FeatureTitle>Enter Your Data</FeatureTitle>
                </Box>
                <FeatureDesc>
                  Fill in your numbers—like loan amount, interest rate, or investment details. No sign-up or personal info needed.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#f3f1fa', minHeight: 200, animation: 'fadeIn 0.7s' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalculateIcon sx={{ fontSize: 36, color: '#9575cd', mr: 1.5 }} />
                  <FeatureTitle>Calculate Instantly</FeatureTitle>
                </Box>
                <FeatureDesc>
                  Get instant, accurate results using industry-standard formulas—right in your browser, with no waiting.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard sx={{ background: '#f6faef', minHeight: 200, animation: 'fadeInRight 0.7s' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ fontSize: 36, color: '#81c784', mr: 1.5 }} />
                  <FeatureTitle>Make Smart Moves</FeatureTitle>
                </Box>
                <FeatureDesc>
                  Use your results to plan, compare, and make confident financial decisions—fast and free.
                </FeatureDesc>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', py: { xs: 7, md: 10 }, background: '#f8f9fc' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              borderRadius: '32px',
              background: '#f4fafd',
              boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
              overflow: 'hidden',
              animation: 'fadeIn 0.8s',
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 280,
                background: 'linear-gradient(135deg, #eaf7fa 60%, #f3f1fa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/hero-image.svg"
                alt="Calculator Illustration"
                sx={{ width: '100%', height: '100%', minHeight: 180, maxHeight: { xs: 260, md: 360 }, objectFit: 'contain', borderRadius: { xs: '0', md: '24px 0 0 24px' }, background: 'none', p: 0 }}
              />
            </Box>
            <Box sx={{ flex: 2, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ mb: 1 }}>
                <Box
                  component="span"
                  sx={{ 
                    background: '#f3f1fa',
                    color: '#9575cd',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    borderRadius: '12px',
                    px: 2,
                    py: 0.5,
                    letterSpacing: '0.04em',
                  }}
                >
                  CASE STUDY
                </Box>
              </Box>
              <Typography 
                variant="h4"
                sx={{
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  color: '#1A1F36',
                  mb: 1.5,
                }}
              >
                How Money Maths Helped Users Make Smarter Decisions
              </Typography>
              <Typography
                sx={{ 
                  color: '#4E5D78',
                  fontSize: '1.08rem',
                  mb: 3,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                "I used Money Maths to compare loan options and plan my investments. The instant results and privacy-first approach made it my go-to tool for all financial calculations."
              </Typography>
              <Button
                variant="outlined"
                sx={{ 
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  borderColor: '#1A1F36',
                  color: '#1A1F36',
                  px: 3, 
                  py: 1, 
                  textTransform: 'none',
                  width: 'fit-content',
                  mb: 2,
                  '&:hover': {
                    background: '#eaf7fa',
                    borderColor: '#00bfc6',
                    color: '#00bfc6',
                  },
                }}
              >
                Read case study
              </Button>
              <Typography sx={{ color: '#00bfc6', fontWeight: 700, fontSize: '1.3rem', mt: 1 }}>
                95% <span style={{ color: '#4E5D78', fontWeight: 400, fontSize: '1rem' }}>users found better financial clarity</span>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', py: { xs: 7, md: 10 }, background: '#f4fafd' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.7rem' },
              mb: 4,
              letterSpacing: '-0.02em',
              color: '#1A1F36',
              textAlign: 'left',
              pl: 0,
            }}
          >
            Frequently <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>asked questions.</Box>
          </Typography>
          <Box sx={{ mb: 4, maxWidth: 700 }}>
            {[{
              q: 'Are Money Maths calculators free to use?',
              a: 'Yes! All our calculators are 100% free, with no sign-up or hidden fees.'
            }, {
              q: 'Do you store any of my data?',
              a: 'No, all calculations happen instantly in your browser. We never store or share your data.'
            }, {
              q: 'How accurate are the results?',
              a: 'We use industry-standard formulas and regularly test our tools for accuracy.'
            }, {
              q: 'Can I use Money Maths on my phone?',
              a: 'Absolutely! Our site is fully responsive and works great on all devices.'
            }].map((faq, i) => (
              <Accordion
                key={faq.q}
                sx={{
                  background: '#f8f9fc',
                  borderRadius: '18px',
                  mb: 2,
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { mt: 0, mb: 2 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#00bfc6', fontSize: 32 }} />}
                  sx={{
                    borderRadius: '18px',
                    minHeight: 0,
                    '& .MuiAccordionSummary-content': {
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.15rem',
                      color: '#1A1F36',
                      py: 1.5,
                    },
                  }}
                >
                  {faq.q}
                </AccordionSummary>
                <AccordionDetails sx={{ color: '#4E5D78', fontSize: '1.05rem', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', pb: 2 }}>
                  {faq.a}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Button
            variant="contained"
            sx={{
              background: '#eaf7fa',
              color: '#00bfc6',
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              borderRadius: '999px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: 'none',
              '&:hover': {
                background: '#00bfc6',
                color: '#fff',
              },
            }}
          >
            See all FAQs
          </Button>
        </Container>
      </Box>

      <Box sx={{ width: '100vw', position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', py: { xs: 8, md: 12 }, background: '#00bfc6', overflow: 'hidden' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, position: 'relative', zIndex: 2, textAlign: 'left' }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              color: '#fff',
              mb: 2,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textAlign: 'left',
              pl: 0,
            }}
          >
            Experience <Box component="span" sx={{ color: '#1A1F36', display: 'inline', fontWeight: 800 }}>Money Maths</Box> today.
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              mb: 4,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 400,
              textAlign: 'left',
              pl: 0,
            }}
          >
            Transform your financial planning with fast, accurate, and private calculators—free for everyone.
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: '#fff',
              color: '#00bfc6',
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              borderRadius: '999px',
              px: 4,
              py: 1.5,
              fontSize: '1.15rem',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'background 0.2s, color 0.2s',
              '&:hover': {
                background: '#1A1F36',
                color: '#fff',
              },
            }}
            href="/calculators"
          >
            Get Started
          </Button>
        </Container>
        {/* Decorative circle */}
        <Box sx={{
          position: 'absolute',
          right: { xs: '-80px', md: '-160px' },
          bottom: { xs: '-80px', md: '-120px' },
          width: { xs: 200, md: 340 },
          height: { xs: 200, md: 340 },
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          zIndex: 1,
        }} />
      </Box>
    </GradientBackground>
  );
};

export default Home; 