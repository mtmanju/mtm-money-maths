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
          boxShadow: 'none',
          background: vibrantBlue,
          color: '#fff',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: vibrantTeal,
            boxShadow: 'none',
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
          background: '#fff',
          boxShadow: 'none',
          border: '1px solid rgba(90,107,255,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#fff',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(90,107,255,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: '#fff',
          boxShadow: 'none',
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            background: '#fff',
            color: navy,
            '& fieldset': {
              borderColor: '#e0e7ef',
              boxShadow: 'none',
              backgroundImage: 'none',
            },
            '&:hover fieldset': {
              borderColor: '#00bfc6',
              boxShadow: 'none',
              backgroundImage: 'none',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00bfc6',
              borderWidth: 2,
              boxShadow: 'none',
              backgroundImage: 'none',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 32,
          boxShadow: 'none',
          background: '#fff',
          border: '1px solid rgba(90,107,255,0.08)',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: vibrantBlue,
          height: 4,
          padding: '12px 0',
          '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            backgroundColor: '#fff',
            border: `2px solid ${vibrantBlue}`,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            '&.Mui-active': {
              boxShadow: 'none',
            },
          },
          '& .MuiSlider-track': {
            height: 4,
            borderRadius: 2,
            background: vibrantBlue,
            border: 'none',
          },
          '& .MuiSlider-rail': {
            height: 4,
            borderRadius: 2,
            opacity: 0.3,
            backgroundColor: '#e0e7ef',
          },
          '& .MuiSlider-valueLabel': {
            background: '#fff',
            color: vibrantBlue,
            border: `1px solid ${vibrantBlue}`,
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#fff',
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