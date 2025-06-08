import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#607D8B',
      light: '#90A4AE',
      dark: '#455A64',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B0BEC5',
      light: '#CFD8DC',
      dark: '#78909C',
      contrastText: '#212121',
    },
    error: {
      main: '#EF5350',
    },
    warning: {
      main: '#FFC107',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#E0F2F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#343A40',
      secondary: '#6C757D',
    },
    grey: {
      50: '#F9FAFC',
      100: '#F1F3F5',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
      A100: '#F9FAFC',
      A200: '#F1F3F5',
      A400: '#DEE2E6',
      A700: '#ADB5BD',
    },
  },
  typography: {
    fontFamily: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: '#2A2D33',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.8rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#2A2D33',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.2rem',
      lineHeight: 1.25,
      color: '#2A2D33',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
      lineHeight: 1.3,
      color: '#2A2D33',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.4rem',
      lineHeight: 1.4,
      color: '#2A2D33',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.5,
      color: '#2A2D33',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#6A737D',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#6A737D',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 24px',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 'none',
          border: '1px solid transparent',
          '&:hover': {
            transform: 'none',
            boxShadow: 'none',
          },
          '&:active': {
            transform: 'scale(0.99)',
          },
        },
        containedPrimary: {
          background: '#34495E',
          color: '#FFFFFF',
          '&:hover': {
            background: '#23303D',
            color: '#FFFFFF',
          },
        },
        containedSecondary: {
          background: '#E0E5EB',
          color: '#2A2D33',
          '&:hover': {
            background: '#C2C8D0',
            color: '#2A2D33',
          },
        },
        outlinedPrimary: {
          color: '#34495E',
          borderColor: '#34495E',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: 'rgba(52, 73, 94, 0.05)',
            borderColor: '#34495E',
            color: '#34495E',
          },
        },
        outlinedSecondary: {
          color: '#6A737D',
          borderColor: '#CED4DA',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: 'rgba(224, 229, 235, 0.5)',
            borderColor: '#ADB5BD',
            color: '#495057',
          },
        },
        textPrimary: {
          color: '#34495E',
          '&:hover': {
            backgroundColor: 'rgba(52, 73, 94, 0.03)',
            color: '#34495E',
          },
        },
        textSecondary: {
          color: '#6A737D',
          '&:hover': {
            backgroundColor: 'rgba(106, 115, 125, 0.03)',
            color: '#6A737D',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FBFDFF',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E5EB',
          transition: 'none',
          zIndex: 1100,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#FFFFFF',
          boxShadow: 'none',
          border: '1px solid #E0E5EB',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.01)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: '#CED4DA',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#ADB5BD',
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#34495E',
              borderWidth: '1px',
              boxShadow: 'none',
            },
          },
          '& .MuiInputLabel-outlined': {
            color: '#6A737D',
            transform: 'translate(14px, 16px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)',
              backgroundColor: '#FFFFFF',
              padding: '0 4px',
            },
          },
          '& .MuiInputBase-input': {
            color: '#2A2D33',
            padding: '16px 14px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        h2: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        h3: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        h4: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        h5: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
        h6: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: '#F8F9FA',
        },
        body: {
          backgroundColor: '#F8F9FA',
        },
        '#root': {
          backgroundColor: '#F8F9FA',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme; 