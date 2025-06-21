import { createTheme } from '@mui/material/styles';

// Android 15 Material Design 3 Mobile Theme
export const mobileTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
      light: '#7F67BE',
      dark: '#5A4A8C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#7A7289',
      dark: '#4F4B5C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFBFE',
      paper: '#FEF7FF',
    },
    text: {
      primary: '#1C1B1F',
      secondary: '#49454F',
    },
    error: {
      main: '#BA1A1A',
      light: '#FF5449',
      dark: '#93000A',
    },
    warning: {
      main: '#FF8F00',
      light: '#FFB74D',
      dark: '#E65100',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    // Material 3 Typography Scale - Android 15 standards
    h1: {
      fontWeight: 400,
      fontSize: '2rem', // 32px - Headline Large
      lineHeight: 1.25,
      letterSpacing: '0em',
    },
    h2: {
      fontWeight: 400,
      fontSize: '1.75rem', // 28px - Headline Medium
      lineHeight: 1.29,
      letterSpacing: '0em',
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.5rem', // 24px - Headline Small
      lineHeight: 1.33,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 400,
      fontSize: '1.375rem', // 22px - Title Large
      lineHeight: 1.27,
      letterSpacing: '0em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1rem', // 16px - Title Medium
      lineHeight: 1.5,
      letterSpacing: '0.15px',
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.875rem', // 14px - Title Small
      lineHeight: 1.43,
      letterSpacing: '0.1px',
    },
    body1: {
      fontSize: '1rem', // 16px - Body Large
      lineHeight: 1.5,
      letterSpacing: '0.5px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem', // 14px - Body Medium
      lineHeight: 1.43,
      letterSpacing: '0.25px',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem', // 14px - Label Large
      lineHeight: 1.43,
      letterSpacing: '0.1px',
    },
    caption: {
      fontSize: '0.75rem', // 12px - Body Small
      lineHeight: 1.33,
      letterSpacing: '0.4px',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem', // 12px - Label Medium
      lineHeight: 1.33,
      letterSpacing: '0.5px',
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 28, // Material 3 large corner radius
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFBFE',
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontSize: '16px', // Base font size for mobile
          lineHeight: 1.5,
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999, // Material 3 pill shape
          padding: '10px 24px',
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '0.875rem', // 14px
          lineHeight: 1.43,
          letterSpacing: '0.1px',
          minHeight: 40, // Material 3 button height
          minWidth: 64, // Material 3 minimum touch target
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'none',
          },
        },
        contained: {
          background: '#6750A4',
          color: '#FFFFFF',
          boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          '&:hover': {
            background: '#5A4A8C',
            boxShadow: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          },
          '&:active': {
            boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          },
        },
        outlined: {
          border: '1px solid #79747E',
          color: '#6750A4',
          background: 'transparent',
          '&:hover': {
            background: '#F3EDF7',
            borderColor: '#6750A4',
          },
        },
        text: {
          color: '#6750A4',
          '&:hover': {
            background: '#F3EDF7',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FEF7FF',
          borderRadius: 28,
          border: '1px solid #CAC4D0',
          boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FEF7FF',
          borderRadius: 28,
          border: '1px solid #CAC4D0',
          boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4, // Material 3 input corner radius
            background: '#FEF7FF',
            border: '1px solid #CAC4D0',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: 56, // Material 3 input height
            '&:hover': {
              borderColor: '#6750A4',
            },
            '&.Mui-focused': {
              borderColor: '#6750A4',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#49454F',
            fontSize: '0.875rem', // 14px
            fontWeight: 400,
            '&.Mui-focused': {
              color: '#6750A4',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FEF7FF',
          borderBottom: '1px solid #CAC4D0',
          boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          minHeight: 64, // Material 3 app bar height
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#6750A4',
          height: 4, // Material 3 slider height
        },
        track: {
          background: '#6750A4',
          border: 'none',
        },
        rail: {
          background: '#CAC4D0',
          opacity: 1,
        },
        thumb: {
          width: 20, // Material 3 thumb size
          height: 20,
          background: '#6750A4',
          border: '2px solid #FEF7FF',
          boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          '&:hover': {
            boxShadow: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          margin: '4px 16px',
          borderRadius: 9999, // Full radius for pill shape
          minHeight: 48, // Material 3 touch target
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: '#E7E0EC',
          },
          '&.Mui-selected': {
            background: '#EADDFF',
            '& .MuiListItemText-primary': {
              color: '#21005D',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem', // 14px
          fontWeight: 500,
          lineHeight: 1.43,
          letterSpacing: '0.1px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FEF7FF',
          borderRight: '1px solid #CAC4D0',
          boxShadow: '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)',
          width: 280, // Material 3 drawer width
          paddingTop: 24, // 24px
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: 56, // Material 3 FAB size
          height: 56,
          borderRadius: '50%',
          background: '#6750A4',
          color: '#FFFFFF',
          boxShadow: '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.30)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          background: '#FEF7FF',
          borderTop: '1px solid #CAC4D0',
          boxShadow: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
          minHeight: 80, // Material 3 bottom nav height
          padding: '8px 16px',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 64, // Material 3 minimum touch target
          minHeight: 48,
          '&.Mui-selected': {
            color: '#6750A4',
          },
        },
        label: {
          fontSize: '0.75rem', // 12px
          fontWeight: 500,
          lineHeight: 1.33,
          letterSpacing: '0.5px',
        },
      },
    },
  },
  spacing: 4, // Base spacing unit of 4px
});

// Mobile-specific breakpoints
export const mobileBreakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
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

// Mobile-specific shadows
export const mobileShadows = {
  elevation1: '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
  elevation2: '0 2px 6px 2px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.30)',
  elevation3: '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)',
  elevation4: '0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.30)',
  elevation5: '0 8px 12px 6px rgba(0, 0, 0, 0.15), 0 4px 6px 0 rgba(0, 0, 0, 0.30)',
}; 