import { Theme } from '@mui/material/styles';

export const globalStyles = (theme: Theme) => ({
  // Button Styles
  primaryButton: {
    background: 'linear-gradient(135deg, #5A6BFF 0%, #A7BFFF 100%)',
    color: '#FFFFFF',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    fontWeight: 600,
    boxShadow: '0 4px 20px rgba(90, 107, 255, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 32px rgba(90, 107, 255, 0.12)',
      background: 'linear-gradient(135deg, #232946 0%, #5A6BFF 100%)',
    },
  },
  secondaryButton: {
    background: 'rgba(255, 255, 255, 0.7)',
    color: '#5A6BFF',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    fontWeight: 600,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(90,107,255,0.15)',
    boxShadow: '0 4px 20px rgba(90, 107, 255, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 32px rgba(90, 107, 255, 0.12)',
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1.5px solid #5A6BFF',
    },
  },
  outlinedButton: {
    color: '#5A6BFF',
    borderColor: '#5A6BFF',
    borderRadius: '30px',
    padding: '12px 32px',
    textTransform: 'none',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    fontWeight: 600,
    background: 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: '#232946',
      background: 'rgba(90,107,255,0.08)',
    },
  },

  // Card Styles
  glassCard: {
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(16px)',
    borderRadius: '28px',
    border: '1px solid rgba(90,107,255,0.08)',
    boxShadow: '0 8px 32px rgba(90, 107, 255, 0.10)',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 48px rgba(90, 107, 255, 0.16)',
    },
  },

  // Gradient Text
  gradientText: {
    background: 'linear-gradient(135deg, #5A6BFF 0%, #A7BFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    fontWeight: 700,
  },

  // Input Styles
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(8px)',
      fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
      '& fieldset': {
        borderColor: 'rgba(90,107,255,0.15)',
      },
      '&:hover fieldset': {
        borderColor: '#5A6BFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#232946',
      },
    },
  },

  // Section Background
  sectionBackground: {
    background: 'linear-gradient(135deg, #F8FAFC 0%, #E0E7FF 100%)',
  },
}); 