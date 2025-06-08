import { Theme } from '@mui/material/styles';

export const globalStyles = (theme: Theme) => ({
  // Button Styles
  primaryButton: {
    background: 'linear-gradient(135deg, #1E40AF 0%, #065F46 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(135deg, #1E3A8A 0%, #047857 100%)',
    },
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#2563EB',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(37, 99, 235, 0.2)',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 1)',
      border: '1px solid rgba(37, 99, 235, 0.4)',
    },
  },
  outlinedButton: {
    color: '#2563EB',
    borderColor: 'rgba(37, 99, 235, 0.5)',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: '#2563EB',
      background: 'rgba(37, 99, 235, 0.05)',
    },
  },

  // Card Styles
  glassCard: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
  },

  // Gradient Text
  gradientText: {
    background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  // Input Styles
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
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

  // Section Background
  sectionBackground: {
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
  },
}); 