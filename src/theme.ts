import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A6BFF',
      light: '#7B8AFF',
      dark: '#3A4BCC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00F5FF',
      light: '#33F7FF',
      dark: '#00B3CC',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: 'rgba(255, 255, 255, 0.85)',
    },
    text: {
      primary: '#1A1F36',
      secondary: '#4E5D78',
    },
    divider: '#E0E7FF',
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    info: {
      main: '#5A6BFF',
      light: '#7F8FA6',
      dark: '#232946',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E0E7FF',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#7F8FA6',
      600: '#5A6BFF',
      700: '#232946',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1A1F36',
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1A1F36',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1A1F36',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#1A1F36',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      color: '#1A1F36',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
      color: '#1A1F36',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4E5D78',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#4E5D78',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #5A6BFF 0%, #00F5FF 100%)',
          boxShadow: '0 4px 20px rgba(90, 107, 255, 0.25)',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(90, 107, 255, 0.35)',
          },
        },
        outlined: {
          borderColor: 'rgba(90, 107, 255, 0.3)',
          '&:hover': {
            borderColor: '#5A6BFF',
            background: 'rgba(90, 107, 255, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(18px)',
          borderRadius: 16,
          border: '1.5px solid rgba(90, 107, 255, 0.18)',
          boxShadow: '0 4px 20px rgba(90, 107, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(18px)',
          borderRadius: 16,
          border: '1.5px solid rgba(90, 107, 255, 0.18)',
          boxShadow: '0 4px 20px rgba(90, 107, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px rgba(90, 107, 255, 0.15)',
            borderColor: 'rgba(90, 107, 255, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(18px)',
            border: '1.5px solid rgba(90, 107, 255, 0.18)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(90, 107, 255, 0.3)',
            },
            '&.Mui-focused': {
              borderColor: '#5A6BFF',
              boxShadow: '0 0 0 4px rgba(90, 107, 255, 0.1)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1.5px solid rgba(90, 107, 255, 0.18)',
          boxShadow: '0 1px 2px rgba(90, 107, 255, 0.04)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#5A6BFF',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#3A4BCC',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#5A6BFF',
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            background: 'linear-gradient(135deg, #5A6BFF 0%, #00F5FF 100%)',
            boxShadow: '0 2px 8px rgba(90, 107, 255, 0.25)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(90, 107, 255, 0.35)',
            },
          },
          '& .MuiSlider-track': {
            background: 'linear-gradient(90deg, #5A6BFF 0%, #00F5FF 100%)',
          },
          '& .MuiSlider-rail': {
            background: 'rgba(90, 107, 255, 0.1)',
          },
        },
      },
    },
  },
});

export default theme; 