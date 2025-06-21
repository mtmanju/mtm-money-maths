import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { mobileColors, mobileShadows, mobileSpacing } from '../styles/mobileStyles';

// Mobile Calculator Container
const MobileCalculatorContainer = styled(Box)(({ theme }) => ({
  background: mobileColors.surface,
  minHeight: '100vh',
  padding: mobileSpacing.md,
  [theme.breakpoints.down('md')]: {
    padding: mobileSpacing.sm,
  },
}));

// Mobile Calculator Form Section
const MobileFormSection = styled(Box)(({ theme }) => ({
  background: mobileColors.surface,
  borderRadius: 28,
  border: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  padding: mobileSpacing.lg,
  marginBottom: mobileSpacing.md,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: mobileShadows.elevation2,
  },
  [theme.breakpoints.down('md')]: {
    padding: mobileSpacing.md,
    borderRadius: 20,
  },
}));

// Mobile Results Section
const MobileResultsSection = styled(Box)(({ theme }) => ({
  background: mobileColors.surface,
  borderRadius: 28,
  border: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  padding: mobileSpacing.lg,
  marginBottom: mobileSpacing.md,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: mobileShadows.elevation2,
  },
  [theme.breakpoints.down('md')]: {
    padding: mobileSpacing.md,
    borderRadius: 20,
  },
}));

// Mobile Chart Section
const MobileChartSection = styled(Box)(({ theme }) => ({
  background: mobileColors.surface,
  borderRadius: 20,
  border: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  padding: mobileSpacing.md,
  marginBottom: mobileSpacing.md,
  '& .recharts-wrapper': {
    borderRadius: 16,
  },
}));

// Mobile Typography
const MobileTypography = styled(Box)(({ theme }) => ({
  fontFamily: '"Roboto", sans-serif',
  '& .mobile-h1': {
    fontSize: '2.25rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
    marginBottom: mobileSpacing.md,
  },
  '& .mobile-h2': {
    fontSize: '1.75rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
    marginBottom: mobileSpacing.sm,
  },
  '& .mobile-h3': {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
    marginBottom: mobileSpacing.sm,
  },
  '& .mobile-body1': {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.03125em',
    color: mobileColors.onSurface,
    marginBottom: mobileSpacing.sm,
  },
  '& .mobile-body2': {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.0178571429em',
    color: mobileColors.onSurfaceVariant,
    marginBottom: mobileSpacing.xs,
  },
  [theme.breakpoints.down('md')]: {
    '& .mobile-h1': {
      fontSize: '1.875rem',
    },
    '& .mobile-h2': {
      fontSize: '1.5rem',
    },
    '& .mobile-h3': {
      fontSize: '1.25rem',
    },
  },
}));

// Mobile Result Card
const MobileResultCard = styled(Box)(() => ({
  background: mobileColors.primaryContainer,
  borderRadius: 20,
  padding: mobileSpacing.md,
  marginBottom: mobileSpacing.sm,
  border: `1px solid ${mobileColors.outlineVariant}`,
  '& .result-label': {
    color: mobileColors.onPrimaryContainer,
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: mobileSpacing.xs,
    fontFamily: '"Roboto", sans-serif',
    letterSpacing: '0.0178571429em',
  },
  '& .result-value': {
    color: mobileColors.onPrimaryContainer,
    fontSize: '1.5rem',
    fontWeight: 600,
    fontFamily: '"Roboto", sans-serif',
    letterSpacing: '0.0178571429em',
  },
}));

// Mobile Input Field
const MobileInputField = styled(Box)(() => ({
  marginBottom: mobileSpacing.md,
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    background: mobileColors.surface,
    border: `1px solid ${mobileColors.outlineVariant}`,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      borderColor: mobileColors.primary,
    },
    '&.Mui-focused': {
      borderColor: mobileColors.primary,
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: mobileColors.onSurfaceVariant,
    fontFamily: '"Roboto", sans-serif',
    '&.Mui-focused': {
      color: mobileColors.primary,
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: '"Roboto", sans-serif',
    color: mobileColors.onSurface,
  },
}));

// Mobile Slider
const MobileSlider = styled(Box)(() => ({
  marginBottom: mobileSpacing.md,
  '& .MuiSlider-root': {
    color: mobileColors.primary,
    height: 4,
    '& .MuiSlider-track': {
      background: mobileColors.primary,
      border: 'none',
    },
    '& .MuiSlider-rail': {
      background: mobileColors.outlineVariant,
      opacity: 1,
    },
    '& .MuiSlider-thumb': {
      width: 20,
      height: 20,
      background: mobileColors.primary,
      border: `2px solid ${mobileColors.surface}`,
      boxShadow: mobileShadows.elevation1,
      '&:hover': {
        boxShadow: mobileShadows.elevation2,
      },
    },
  },
  '& .MuiFormControlLabel-root': {
    marginBottom: mobileSpacing.sm,
    '& .MuiFormControlLabel-label': {
      fontFamily: '"Roboto", sans-serif',
      color: mobileColors.onSurface,
      fontSize: '0.875rem',
    },
  },
}));

// Mobile Button
const MobileButton = styled(Box)(() => ({
  '& .MuiButton-root': {
    borderRadius: 20,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.0178571429em',
    minHeight: 40,
    padding: '10px 24px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"Roboto", sans-serif',
  },
  '& .MuiButton-contained': {
    background: mobileColors.primary,
    color: mobileColors.onPrimary,
    boxShadow: mobileShadows.elevation1,
    '&:hover': {
      background: mobileColors.primary,
      boxShadow: mobileShadows.elevation2,
    },
  },
  '& .MuiButton-outlined': {
    border: `1px solid ${mobileColors.outline}`,
    color: mobileColors.primary,
    '&:hover': {
      background: mobileColors.surfaceVariant,
      borderColor: mobileColors.primary,
    },
  },
}));

interface MobileCalculatorWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const MobileCalculatorWrapper: React.FC<MobileCalculatorWrapperProps> = ({
  children,
  title,
  subtitle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--md-surface)',
        paddingTop: '64px', // Account for fixed app bar
        paddingBottom: '24px', // 24px bottom padding
      }}
      className="mobile-safe-area"
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: '16px', // 16px container padding
          maxWidth: '100%',
          margin: '0 auto',
        }}
        className="mobile-container"
      >
        {title && (
          <Typography
            variant="h1"
            sx={{
              fontSize: '1.75rem', // 28px - Headline Medium
              fontWeight: 400,
              lineHeight: 1.29,
              letterSpacing: '0em',
              color: 'var(--md-on-surface)',
              marginBottom: '8px', // 8px
              textAlign: 'center',
            }}
            className="mobile-headline-medium"
          >
            {title}
          </Typography>
        )}
        
        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem', // 16px - Body Large
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: '0.5px',
              color: 'var(--md-on-surface-variant)',
              marginBottom: '24px', // 24px
              textAlign: 'center',
            }}
            className="mobile-body-large"
          >
            {subtitle}
          </Typography>
        )}

        <Box
          sx={{
            animation: 'mobile-fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="mobile-fade-in"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MobileCalculatorWrapper;

export {
  MobileCalculatorContainer,
  MobileFormSection,
  MobileResultsSection,
  MobileChartSection,
  MobileTypography,
  MobileResultCard,
  MobileInputField,
  MobileSlider,
  MobileButton,
}; 