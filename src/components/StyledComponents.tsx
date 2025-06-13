import { styled } from '@mui/material/styles';
import { Paper, Box, TextField, Slider } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255,255,255,0.7)',
  borderRadius: 28,
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(90, 107, 255, 0.10)',
  border: '1px solid rgba(90,107,255,0.08)',
  fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
  backdropFilter: 'blur(16px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 16px 48px rgba(90, 107, 255, 0.16)',
    transform: 'translateY(-2px)',
  },
}));

export const ResultCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(90, 107, 255, 0.10)',
  border: '1px solid rgba(90,107,255,0.08)',
  fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
  backdropFilter: 'blur(12px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 16px 48px rgba(90, 107, 255, 0.16)',
    transform: 'translateY(-2px)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    background: 'rgba(255,255,255,0.7)',
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: theme.palette.text.primary,
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.dark,
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 4,
  fontFamily: '"Inter", "Poppins", "Space Grotesk", sans-serif',
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: '0 2px 8px rgba(90, 107, 255, 0.10)',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 4px 16px rgba(90, 107, 255, 0.16)',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: theme.palette.primary.main,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})); 