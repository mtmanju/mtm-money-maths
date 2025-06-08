import { createTheme, ThemeOptions } from '@mui/material/styles';
import { globalStyles } from '../styles/globalStyles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.35rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 32px',
          fontSize: '1.1rem',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          background: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            background: '#333333',
          },
        },
        containedSecondary: {
          background: '#333333',
          color: '#FFFFFF',
          '&:hover': {
            background: '#000000',
          },
        },
        outlinedPrimary: {
          color: '#2563EB',
          borderColor: 'rgba(37, 99, 235, 0.5)',
          borderWidth: 2,
          '&:hover': {
            borderColor: '#2563EB',
            background: 'rgba(37, 99, 235, 0.05)',
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(37, 99, 235, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(37, 99, 235, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  ...lightThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
    },
  },
  components: {
    ...lightThemeOptions.components,
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 32px',
          fontSize: '0.9rem',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
          },
        },
        containedPrimary: {
          background: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            background: '#333333',
          },
        },
        containedSecondary: {
          background: '#333333',
          color: '#FFFFFF',
          '&:hover': {
            background: '#000000',
          },
        },
        outlinedPrimary: {
          color: '#60A5FA',
          borderColor: 'rgba(96, 165, 250, 0.5)',
          borderWidth: 2,
          '&:hover': {
            borderColor: '#60A5FA',
            background: 'rgba(96, 165, 250, 0.05)',
            borderWidth: 2,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(96, 165, 250, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(96, 165, 250, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60A5FA',
            },
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Add global styles to themes
lightTheme.components = {
  ...lightTheme.components,
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

darkTheme.components = {
  ...darkTheme.components,
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#1F2937',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#60A5FA',
          borderRadius: '4px',
          '&:hover': {
            background: '#3B82F6',
          },
        },
      },
    },
  },
}; 