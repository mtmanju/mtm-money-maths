import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  styled,
  Paper,
  TextField,
  Slider,
} from '@mui/material';

// Modern glassy, gradient background
export const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(120deg, #f6f8fb 0%, #e9ecf5 100%)',
  fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

// Glassy card for forms
export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(120deg, rgba(255,255,255,0.92) 60%, rgba(33,147,176,0.10) 100%)',
  backdropFilter: 'blur(18px)',
  borderRadius: '28px',
  border: '1.5px solid #e0e7ef',
  boxShadow: '0 8px 32px rgba(33,147,176,0.10)',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  color: '#232946',
}));

// Glassy result card
export const ResultCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(120deg, rgba(255,255,255,0.92) 60%, rgba(16,185,129,0.10) 100%)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(16,185,129,0.10)',
  border: '1.5px solid #e0e7ef',
  padding: theme.spacing(4, 2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '120px',
  marginBottom: theme.spacing(2),
  color: '#232946',
}));

// Vibrant, thick slider
export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#5A6BFF',
  height: 8,
  padding: '18px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    border: '3px solid #5A6BFF',
    boxShadow: '0 0 0 8px rgba(90,107,255,0.12)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0 0 0 12px rgba(90,107,255,0.18)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 8,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: 'rgba(90,107,255,0.18)',
    height: 8,
  },
}));

// Gradient text style for teal-green
const gradientText = {
  background: 'linear-gradient(90deg, #0ea5e9 0%, #10b981 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Glassy, modern input
export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#232946',
    fontSize: '1.1rem',
    '& fieldset': {
      borderColor: '#e0e7ef',
    },
    '&:hover fieldset': {
      borderColor: '#2563eb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#10b981',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    ...gradientText,
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  '& .MuiInputBase-input': {
    fontWeight: 700,
    color: '#232946',
    fontSize: '1.1rem',
  },
}));

// Update StatLabel in result cards to gradient
const StatLabel = styled('span')(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 600,
  marginBottom: 2,
  ...gradientText,
}));

// Glassy chart container
export const ChartContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(120deg, rgba(255,255,255,0.92) 60%, rgba(33,147,176,0.10) 100%)',
  backdropFilter: 'blur(18px)',
  borderRadius: '28px',
  border: '1.5px solid #e0e7ef',
  boxShadow: '0 8px 32px rgba(33,147,176,0.10)',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  color: '#232946',
}));

const CalculatorContainer = styled(Box)(({ theme }) => ({
  background: 'transparent',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4, 2),
  margin: '0 auto',
  maxWidth: 900,
  fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
}));

interface CalculatorTemplateProps {
  title: string;
  description: string;
  formSection: React.ReactNode;
  resultSection: React.ReactNode;
  tableSection?: React.ReactNode;
}

export const CalculatorTemplate: React.FC<CalculatorTemplateProps> = ({
  title,
  description,
  formSection,
  resultSection,
  tableSection,
}) => {
  const theme = useTheme();

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', gap: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(90deg, #0ea5e9 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </Typography>
          <Typography
            component="span"
            sx={{
              color: '#232946',
              fontWeight: 400,
              fontSize: { xs: '0.92rem', md: '1.02rem' },
              fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
              display: 'inline',
              ml: 1,
            }}
          >
            {description}
          </Typography>
        </Box>
        <Grid container spacing={6} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            {formSection}
          </Grid>
          <Grid item xs={12} md={6}>
            {resultSection}
          </Grid>
        </Grid>
        {tableSection && (
          <Box sx={{ mt: 6, width: '100%' }}>
            {tableSection}
          </Box>
        )}
      </Container>
    </GradientBackground>
  );
};

export default CalculatorTemplate; 