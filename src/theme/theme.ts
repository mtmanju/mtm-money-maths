import { createTheme, ThemeOptions } from '@mui/material/styles';
import { globalStyles } from '../styles/globalStyles';

const vibrantBlue = '#2563eb';
const vibrantTeal = '#10b981';
const navy = '#232946';
const gradientBg = 'linear-gradient(120deg, #2193b0 0%, #6dd5ed 100%)';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: vibrantBlue,
      contrastText: '#fff',
    },
    secondary: {
      main: vibrantTeal,
      contrastText: '#fff',
    },
    background: {
      default: gradientBg,
      paper: '#fff',
    },
    text: {
      primary: navy,
      secondary: vibrantBlue,
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e42',
    },
    info: {
      main: '#38bdf8',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F5F7FA',
      200: '#E0E7FF',
      300: '#A7BFFF',
      400: '#5A6BFF',
      500: '#232946',
      600: '#1A1A2E',
      700: '#15151F',
      800: '#10101A',
      900: '#0B0B13',
    },
  },
  typography: {
    fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      color: navy,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      color: navy,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: navy,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: navy,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: navy,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: navy,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    button: {
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 32, // pill shape
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '12px 32px',
          fontWeight: 700,
          fontSize: '1.1rem',
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
          background: `linear-gradient(120deg, ${vibrantBlue} 0%, ${vibrantTeal} 100%)`,
          color: '#fff',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: `linear-gradient(120deg, ${vibrantTeal} 0%, ${vibrantBlue} 100%)`,
            boxShadow: '0 4px 16px rgba(37,99,235,0.15)',
          },
        },
        outlined: {
          borderColor: vibrantBlue,
          color: vibrantBlue,
          background: '#fff',
          '&:hover': {
            background: '#f3f4f8',
            borderColor: vibrantTeal,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 8px 32px rgba(90, 107, 255, 0.10)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(90,107,255,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 16px 48px rgba(90, 107, 255, 0.16)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 4px 24px rgba(90, 107, 255, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: '#fff',
          boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            background: '#fff',
            color: navy,
            '& fieldset': {
              borderColor: '#e0e7ef',
            },
            '&:hover fieldset': {
              borderColor: vibrantBlue,
            },
            '&.Mui-focused fieldset': {
              borderColor: vibrantTeal,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 32,
          boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
          background: '#fff',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: vibrantBlue,
          height: 8,
          borderRadius: 4,
        },
        thumb: {
          height: 28,
          width: 28,
          backgroundColor: '#fff',
          border: `3px solid ${vibrantBlue}`,
          boxShadow: '0 0 0 8px rgba(37,99,235,0.12)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
          opacity: 0.5,
          backgroundColor: '#e0e7ef',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: gradientBg,
          minHeight: '100vh',
          fontFamily: 'Inter, Poppins, Space Grotesk, sans-serif',
          color: navy,
        },
      },
    },
  },
});

export default theme;

// Add global styles to themes
theme.components = {
  ...theme.components,
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#F3F4F6',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#2563EB',
          borderRadius: '4px',
          '&:hover': {
            background: '#1E40AF',
          },
        },
      },
    },
  },
};

theme.components = {
  ...theme.components,
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#F3F4F6',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#2563EB',
          borderRadius: '4px',
          '&:hover': {
            background: '#1E40AF',
          },
        },
      },
    },
  },
}; 