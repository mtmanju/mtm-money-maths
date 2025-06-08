import { Theme } from '@mui/material/styles';

export const globalStyles = (theme: Theme) => ({
  // Button Styles
  primaryButton: {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)'
      : 'linear-gradient(135deg, #1E3A8A 0%, #047857 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
      background: theme.palette.mode === 'light'
        ? 'linear-gradient(135deg, #1E3A8A 0%, #047857 100%)'
        : 'linear-gradient(135deg, #1E3A8A 0%, #047857 100%)',
    },
  },
  secondaryButton: {
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(17, 24, 39, 0.9)',
    color: theme.palette.mode === 'light' ? '#2563EB' : '#60A5FA',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(96, 165, 250, 0.2)'}`,
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
      background: theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(17, 24, 39, 1)',
      border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.4)' : 'rgba(96, 165, 250, 0.4)'}`,
    },
  },
  outlinedButton: {
    color: theme.palette.mode === 'light' ? '#2563EB' : '#60A5FA',
    borderColor: theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.5)' : 'rgba(96, 165, 250, 0.5)',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: theme.palette.mode === 'light' ? '#2563EB' : '#60A5FA',
      background: theme.palette.mode === 'light'
        ? 'rgba(37, 99, 235, 0.05)'
        : 'rgba(96, 165, 250, 0.05)',
    },
  },

  // Card Styles
  glassCard: {
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(17, 24, 39, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 32px rgba(0, 0, 0, 0.1)'
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.mode === 'light'
        ? '0 12px 40px rgba(0, 0, 0, 0.15)'
        : '0 12px 40px rgba(0, 0, 0, 0.4)',
    },
  },

  // Gradient Text
  gradientText: {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
      : 'linear-gradient(135deg, #60A5FA 0%, #34D399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  // Input Styles
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(17, 24, 39, 0.9)',
      backdropFilter: 'blur(10px)',
      '& fieldset': {
        borderColor: theme.palette.mode === 'light'
          ? 'rgba(37, 99, 235, 0.2)'
          : 'rgba(96, 165, 250, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.mode === 'light'
          ? 'rgba(37, 99, 235, 0.4)'
          : 'rgba(96, 165, 250, 0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.mode === 'light'
          ? '#2563EB'
          : '#60A5FA',
      },
    },
  },

  // Section Background
  sectionBackground: {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(6, 95, 70, 0.05) 100%)',
  },
}); 