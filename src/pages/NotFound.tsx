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

const NotFoundBackground = styled(Box)(() => ({
  minHeight: '100vh',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NotFoundCtaButton = styled(Button)(() => ({
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
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
    transform: 'translateY(-2px) scale(1.04)',
  },
}));

const NotFoundOutlinedButton = styled(Button)(() => ({
  background: '#fff',
  color: '#00bfc6',
  borderRadius: '999px',
  fontWeight: 600,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.1rem',
  textTransform: 'none',
  padding: '16px 40px',
  minWidth: 0,
  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
  border: '2px solid #00bfc6',
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    background: '#00bfc6',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
    transform: 'translateY(-2px) scale(1.04)',
    border: '2px solid #00bfc6',
  },
}));

const NotFound: React.FC = () => {
  const theme = useTheme();

  return (
    <NotFoundBackground>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', py: theme.spacing(8) }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '7rem', md: '10rem' },
              fontWeight: 800,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: '#00bfc6',
              mb: 2,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            404
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 800,
              color: '#1A1F36',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '2rem', md: '2.7rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: '#4E5D78',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
              lineHeight: 1.4,
            }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          <Box sx={{ display: 'flex', gap: theme.spacing(2), justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
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
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  background: '#009ca3',
                  color: '#fff',
                  boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
                  transform: 'translateY(-2px) scale(1.04)',
                },
              }}
            >
              Go Home
            </Button>
            <Button
              component={RouterLink}
              to="/calculators"
              startIcon={<CalculateIcon />}
              sx={{
                background: '#fff',
                color: '#00bfc6',
                borderRadius: '999px',
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '1.1rem',
                textTransform: 'none',
                padding: '16px 40px',
                minWidth: 0,
                boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
                border: '2px solid #00bfc6',
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
              View Calculators
            </Button>
          </Box>
        </Box>
      </Container>
    </NotFoundBackground>
  );
};

export default NotFound; 