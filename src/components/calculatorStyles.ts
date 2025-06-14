import { styled } from '@mui/material/styles';
import { Box, Paper, TextField, Slider, Button, Typography } from '@mui/material';

// Color palette matching Home page
export const colors = {
  primary: '#1A1F36', // Main heading color (matches hero)
  accent: {
    primary: '#00bfc6', // Hero accent cyan/teal
    secondary: '#5A6BFF', // Accent blue (used in gradients)
    purple: '#9575cd',
    pink: '#e57373',
    green: '#81c784',
  },
  secondary: '#4E5D78', // Subtext (matches hero)
  border: '#e0e7ef',
  background: '#fff', // White background (matches hero)
  cardBackground: '#fff', // White for calculator cards
  buttonBackground: '#eafafd', // Light button backgrounds
  gradient: {
    primary: 'linear-gradient(135deg, #5A6BFF 0%, #00F5FF 100%)',
    home: 'linear-gradient(90deg, #00bfc6 0%, #5A6BFF 100%)',
  },
};

// Typography matching Home page
export const typography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontWeight: 600,
    fontSize: '2.7rem', // Reduced for calculator headings
    letterSpacing: '-0.03em',
  },
  h2: {
    fontWeight: 800,
    fontSize: '2rem', // Reduced for subheadings
    letterSpacing: '-0.02em',
  },
  h3: {
    fontWeight: 800,
    fontSize: '1.5rem', // Reduced for section headings
    letterSpacing: '-0.02em',
  },
  h4: {
    fontWeight: 800,
    fontSize: '1.2rem', // Reduced for smaller headings
    letterSpacing: '-0.02em',
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem', // Reduced for body text
  },
  label: {
    fontWeight: 600,
    fontSize: '1.08rem', // Reduced for input labels
  },
  value: {
    fontWeight: 800,
    fontSize: '1.18rem', // Reduced for input values
  },
};

// Shadows
export const shadows = {
  card: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  button: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
};

// Border radius
export const borderRadius = {
  card: '24px',
  button: '999px',
  input: '16px',
};

// Background
export const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  background: colors.background,
  fontFamily: typography.fontFamily,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

// Card for forms
export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: colors.cardBackground,
  borderRadius: borderRadius.card,
  boxShadow: shadows.card,
  border: `1.5px solid ${colors.border}`,
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  color: colors.primary,
}));

// Modern input
export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputLabel-root': {
    color: '#7F8FA6', // Modern medium grey
    fontWeight: 400, // Not bold
    fontSize: typography.label.fontSize,
    background: colors.cardBackground,
    padding: '0 4px',
    zIndex: 1,
    left: '8px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: borderRadius.input,
    backgroundColor: colors.cardBackground,
    color: colors.primary,
    fontSize: '1.08rem',
    boxShadow: 'none',
    '& fieldset': {
      borderColor: colors.border,
    },
    '&:hover fieldset': {
      borderColor: colors.accent.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.accent.primary,
      borderWidth: '2px',
    },
    minHeight: 50,
    maxHeight: 56,
  },
  '& .MuiInputBase-input': {
    fontWeight: 500,
    color: colors.primary,
    fontSize: '1.08rem',
    padding: '16px 14px',
  },
  // Remove all browser and custom number input arrows
  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
    margin: 0,
    width: 0,
    height: 0,
    background: 'none',
    backgroundSize: '0',
    cursor: 'default',
    display: 'none',
    pointerEvents: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield', // Remove default arrows in Firefox
    '-moz-appearance': 'textfield',
    minHeight: 36,
    maxHeight: 48,
  },
}));

// Modern slider
export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: colors.accent.primary,
  height: 4,
  padding: '4px 0',
  marginTop: -theme.spacing(1),
  '& .MuiSlider-track': {
    backgroundColor: colors.accent.primary, // Solid accent color
    opacity: 1, // Fully opaque
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#E0E0E0', // Solid light grey
    opacity: 1, // Fully opaque
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: `2px solid ${colors.accent.primary}`,
    boxShadow: 'none',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'none',
    },
  },
  // Hide value label by default
  '& .MuiSlider-valueLabel': {
    display: 'none',
    background: '#fff',
    color: colors.accent.primary,
    fontWeight: 600,
    fontSize: typography.label.fontSize,
    fontFamily: typography.fontFamily,
    borderRadius: 6,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    top: 'calc(-28px)',
    transform: 'none',
    left: '50%',
    translate: '-50%',
    padding: '1px 8px',
    minWidth: 24,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Show value label only when thumb is active, focused, or hovered
  '& .MuiSlider-thumb.Mui-active + .MuiSlider-valueLabel, & .MuiSlider-thumb:focus + .MuiSlider-valueLabel, & .MuiSlider-thumb:hover + .MuiSlider-valueLabel': {
    display: 'flex',
  },
}));

// Modern button
export const GradientButton = styled(Button)(({ theme }) => ({
  background: colors.accent.primary,
  color: '#fff',
  borderRadius: borderRadius.button,
  fontWeight: 600,
  fontFamily: typography.fontFamily,
  fontSize: '1.1rem',
  textTransform: 'none',
  padding: '16px 40px',
  minWidth: 0,
  boxShadow: shadows.button,
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    background: colors.accent.secondary,
    color: '#fff',
    boxShadow: shadows.button,
    transform: 'translateY(-2px) scale(1.04)',
  },
}));

// Result card
export const ResultCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgcolor',
})<{
  bgcolor?: string;
}>(({ theme, bgcolor }) => ({
  background: bgcolor || '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 12px 0 rgba(30, 34, 90, 0.07)',
  border: `1.2px solid ${colors.border}`,
  padding: theme.spacing(2.5, 2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '72px',
  marginBottom: theme.spacing(1.5),
  color: colors.primary,
  gap: theme.spacing(0.5),
  '& .label': {
    fontWeight: 700, // Make result card titles bold
  },
}));

// Chart container
export const ChartContainer = styled(Box)(({ theme }) => ({
  background: colors.cardBackground,
  borderRadius: borderRadius.card,
  boxShadow: shadows.card,
  border: `1.5px solid ${colors.border}`,
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  color: colors.primary,
}));

// Gradient text
// GradientText removed; use CalculatorHeading or Typography instead

// Stat label/value
export const StatLabel = styled('span')(({ theme }) => ({
  fontSize: typography.label.fontSize,
  color: colors.secondary,
  fontWeight: 400,
  marginBottom: 4,
  fontFamily: typography.fontFamily,
}));

export const StatValue = styled('span')(({ theme }) => ({
  fontWeight: typography.value.fontWeight,
  fontSize: typography.value.fontSize,
  color: colors.primary,
  fontFamily: typography.fontFamily,
}));

// Calculator heading style for pages
export const CalculatorHeading = styled(Typography)(({ theme }) => ({
  color: colors.primary,
  fontWeight: 700,
  fontFamily: typography.fontFamily,
  fontSize: '2rem',
  letterSpacing: typography.h1.letterSpacing,
  marginBottom: theme.spacing(2.5),
  textAlign: 'left',
  marginTop: theme.spacing(1),
  lineHeight: 1.1,
  '& .accent': {
    color: colors.accent.primary,
    fontWeight: 700,
  },
}));

// Shared styled table container for amortization and results tables
export const StyledTableContainer = styled(Box)(({ theme }) => ({
  background: '#f8f9fc',
  borderRadius: '16px',
  boxShadow: '0 2px 12px 0 rgba(30,34,90,0.07)',
  border: `1.2px solid ${colors.border}`,
  padding: theme.spacing(2),
  overflowX: 'auto',
  marginBottom: theme.spacing(2),
  width: '100%',
  maxWidth: '100%',
}));

export const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: typography.fontFamily,
  fontSize: '0.98rem',
  color: colors.primary,
};

export const tableHeaderCell = {
  padding: '8px',
  fontWeight: 700,
  borderBottom: `1.2px solid ${colors.border}`,
  background: colors.buttonBackground,
};

export const tableCell = {
  padding: '8px',
  textAlign: 'center',
  borderBottom: `1px solid ${colors.border}`,
};

// Shared chart style objects
export const chartAxisStyle = {
  fontFamily: typography.fontFamily,
  fontWeight: 600,
  fontSize: 13,
  fill: colors.secondary,
};

export const chartTooltipStyle = {
  background: '#f8f9fc',
  border: `1.2px solid ${colors.border}`,
  borderRadius: '16px',
  boxShadow: '0 2px 12px 0 rgba(30,34,90,0.07)',
  fontFamily: typography.fontFamily,
  color: colors.primary,
  fontWeight: 600,
  fontSize: 14,
  padding: 12,
};

export const chartTooltipItemStyle = {
  color: colors.primary,
  fontWeight: 700,
  fontFamily: typography.fontFamily,
  fontSize: 14,
};

export const chartTooltipLabelStyle = {
  color: colors.secondary,
  fontWeight: 600,
  fontFamily: typography.fontFamily,
  fontSize: 13,
};

export const chartLegendStyle = {
  fontFamily: typography.fontFamily,
  color: colors.secondary,
  fontWeight: 600,
  fontSize: 14,
  paddingTop: 8,
}; 