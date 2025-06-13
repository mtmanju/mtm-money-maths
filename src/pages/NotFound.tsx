import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  useTheme,
  styled,
} from '@mui/material';
import {
  Home as HomeIcon,
  Calculate as CalculateIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FF 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `
      radial-gradient(circle at 20% 20%, ${theme.palette.primary.light}15, transparent 40%),
      radial-gradient(circle at 80% 80%, ${theme.palette.secondary.light}15, transparent 40%),
      radial-gradient(circle at 50% 50%, ${theme.palette.primary.light}10, transparent 60%)
    `,
    zIndex: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75, 4),
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0))',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    '&::before': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(-2px)',
  },
})) as typeof Button;

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: '#FFFFFF',
  border: 'none',
  boxShadow: `0 8px 16px ${theme.palette.primary.main}30`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    boxShadow: `0 12px 28px ${theme.palette.primary.main}40`,
  },
})) as typeof StyledButton;

const SecondaryButton = styled(StyledButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.primary.main}40`,
  color: theme.palette.primary.main,
  boxShadow: `0 8px 16px ${theme.palette.primary.main}15`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    borderColor: theme.palette.primary.main,
    color: '#FFFFFF',
    boxShadow: `0 12px 28px ${theme.palette.primary.main}30`,
  },
})) as typeof StyledButton;

const NotFound: React.FC = () => {
  const theme = useTheme();

  return (
    <GradientBackground>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', py: theme.spacing(8) }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '8rem', md: '12rem' },
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          <Box sx={{ display: 'flex', gap: theme.spacing(2), justifyContent: 'center' }}>
            <PrimaryButton
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
            >
              Go Home
            </PrimaryButton>
            <SecondaryButton
              component={RouterLink}
              to="/calculators"
              startIcon={<CalculateIcon />}
            >
              View Calculators
            </SecondaryButton>
          </Box>
        </Box>
      </Container>
    </GradientBackground>
  );
};

export default NotFound; 