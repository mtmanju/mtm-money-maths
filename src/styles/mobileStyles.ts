import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Typography, AppBar, Toolbar, Drawer, ListItem, ListItemText } from '@mui/material';

// Mobile-specific color palette (Material Design 3)
export const mobileColors = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  surface: '#FFFBFE',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#D0BCFF',
  surfaceDim: '#DED8E1',
  surfaceBright: '#FFFBFE',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',
};

// Mobile-specific shadows (Material Design 3 elevation system)
export const mobileShadows = {
  elevation1: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
  elevation2: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
  elevation3: '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)',
  elevation4: '0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.30)',
  elevation5: '0 8px 12px 6px rgba(0, 0, 0, 0.15), 0 4px 6px 0 rgba(0, 0, 0, 0.30)',
};

// Mobile-specific spacing
export const mobileSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Mobile App Bar with Material Design 3 styling
export const MobileAppBar = styled(AppBar)(({ theme }) => ({
  background: mobileColors.surface,
  borderBottom: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  '& .MuiToolbar-root': {
    minHeight: 64,
    paddingLeft: mobileSpacing.md,
    paddingRight: mobileSpacing.md,
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiToolbar-root': {
      minHeight: 56,
      paddingLeft: mobileSpacing.sm,
      paddingRight: mobileSpacing.sm,
    },
  },
}));

// Mobile Navigation Drawer
export const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: mobileColors.surface,
    borderRight: `1px solid ${mobileColors.outlineVariant}`,
    boxShadow: mobileShadows.elevation3,
    width: 280,
    paddingTop: mobileSpacing.lg,
  },
}));

// Mobile Navigation Item
export const MobileNavItem = styled(ListItem)(({ theme }) => ({
  margin: `${mobileSpacing.xs} ${mobileSpacing.md}`,
  borderRadius: 20,
  minHeight: 48,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: mobileColors.surfaceContainerHigh,
  },
  '&.active': {
    background: mobileColors.primaryContainer,
    '& .MuiListItemText-primary': {
      color: mobileColors.onPrimaryContainer,
    },
  },
}));

// Mobile Card with Material Design 3 styling
export const MobileCard = styled(Paper)(({ theme }) => ({
  background: mobileColors.surface,
  borderRadius: 28,
  border: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  padding: mobileSpacing.lg,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: mobileShadows.elevation2,
  },
  [theme.breakpoints.down('md')]: {
    padding: mobileSpacing.md,
    borderRadius: 20,
  },
}));

// Mobile Button with Material Design 3 styling
export const MobileButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: '10px 24px',
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '0.875rem',
  lineHeight: 1.43,
  letterSpacing: '0.0178571429em',
  minHeight: 40,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.MuiButton-contained': {
    background: mobileColors.primary,
    color: mobileColors.onPrimary,
    boxShadow: mobileShadows.elevation1,
    '&:hover': {
      background: mobileColors.primary,
      boxShadow: mobileShadows.elevation2,
    },
  },
  '&.MuiButton-outlined': {
    border: `1px solid ${mobileColors.outline}`,
    color: mobileColors.primary,
    '&:hover': {
      background: mobileColors.surfaceContainerHigh,
      borderColor: mobileColors.primary,
    },
  },
  '&.MuiButton-text': {
    color: mobileColors.primary,
    '&:hover': {
      background: mobileColors.surfaceContainerHigh,
    },
  },
}));

// Mobile Container with proper spacing
export const MobileContainer = styled(Box)(({ theme }) => ({
  padding: mobileSpacing.md,
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    padding: mobileSpacing.sm,
  },
}));

// Mobile Grid Container
export const MobileGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: mobileSpacing.md,
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: mobileSpacing.sm,
  },
}));

// Mobile Typography variants
export const MobileTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  '&.mobile-h1': {
    fontSize: '2.25rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
  },
  '&.mobile-h2': {
    fontSize: '1.75rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
  },
  '&.mobile-h3': {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '0em',
    color: mobileColors.onSurface,
  },
  '&.mobile-body1': {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.03125em',
    color: mobileColors.onSurface,
  },
  '&.mobile-body2': {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.0178571429em',
    color: mobileColors.onSurfaceVariant,
  },
  '&.mobile-caption': {
    fontSize: '0.75rem',
    lineHeight: 1.33,
    letterSpacing: '0.0333333333em',
    color: mobileColors.onSurfaceVariant,
  },
  [theme.breakpoints.down('md')]: {
    '&.mobile-h1': {
      fontSize: '1.875rem',
    },
    '&.mobile-h2': {
      fontSize: '1.5rem',
    },
    '&.mobile-h3': {
      fontSize: '1.25rem',
    },
  },
}));

// Mobile FAB (Floating Action Button)
export const MobileFab = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: mobileSpacing.lg,
  right: mobileSpacing.lg,
  width: 56,
  height: 56,
  borderRadius: '50%',
  background: mobileColors.primary,
  color: mobileColors.onPrimary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: mobileShadows.elevation3,
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1000,
  '&:hover': {
    boxShadow: mobileShadows.elevation4,
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    bottom: mobileSpacing.md,
    right: mobileSpacing.md,
    width: 48,
    height: 48,
  },
}));

// Mobile Bottom Navigation
export const MobileBottomNav = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: mobileColors.surface,
  borderTop: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation2,
  padding: `${mobileSpacing.sm} ${mobileSpacing.md}`,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  minHeight: 80,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

// Mobile Safe Area Container
export const MobileSafeArea = styled(Box)(({ theme }) => ({
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)',
  paddingLeft: 'env(safe-area-inset-left)',
  paddingRight: 'env(safe-area-inset-right)',
  minHeight: '100vh',
  background: mobileColors.surface,
}));

// Mobile Calculator Card
export const MobileCalculatorCard = styled(Box)(({ theme }) => ({
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

// Mobile Input Field
export const MobileInput = styled(Box)(({ theme }) => ({
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
    '&.Mui-focused': {
      color: mobileColors.primary,
    },
  },
}));

// Mobile Slider
export const MobileSlider = styled(Box)(({ theme }) => ({
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
}));

// Mobile Result Card
export const MobileResultCard = styled(Box)(({ theme }) => ({
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
  },
  '& .result-value': {
    color: mobileColors.onPrimaryContainer,
    fontSize: '1.5rem',
    fontWeight: 600,
    fontFamily: '"Roboto", sans-serif',
  },
}));

// Mobile Chart Container
export const MobileChartContainer = styled(Box)(({ theme }) => ({
  background: mobileColors.surface,
  borderRadius: 20,
  padding: mobileSpacing.md,
  border: `1px solid ${mobileColors.outlineVariant}`,
  boxShadow: mobileShadows.elevation1,
  marginBottom: mobileSpacing.md,
  '& .recharts-wrapper': {
    borderRadius: 16,
  },
}));

// Mobile Responsive Utilities
export const mobileResponsive = {
  hideOnMobile: {
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
  showOnMobile: {
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  mobileOnly: {
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  desktopOnly: {
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
}; 