import React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  InputAdornment,
  Tooltip,
  IconButton,
  useTheme,
  styled,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 9999,
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 8px 16px rgba(0, 0, 0, 0.1)'
      : '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
}));

interface InputField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  tooltip?: string;
}

interface CalculatorFormProps {
  title: string;
  inputFields: InputField[];
  onCalculate: () => void;
  onReset: () => void;
  calculateButtonText?: string;
  calculateButtonIcon?: React.ReactNode;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  title,
  inputFields,
  onCalculate,
  onReset,
  calculateButtonText = 'Calculate',
  calculateButtonIcon,
}) => {
  const theme = useTheme();

  return (
    <StyledPaper>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          fontWeight: 500,
          color: theme.palette.text.primary,
          mb: 3,
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={3}>
        {inputFields.map((field, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              fullWidth
              label={field.label}
              variant="outlined"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              type={field.type || 'text'}
              InputProps={{
                startAdornment: field.startAdornment,
                endAdornment: field.endAdornment || (field.tooltip && (
                  <InputAdornment position="end">
                    <Tooltip title={field.tooltip}>
                      <IconButton size="small">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <StyledButton
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onReset}
              startIcon={<RefreshIcon />}
            >
              Reset
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              size="large"
              onClick={onCalculate}
              startIcon={calculateButtonIcon}
            >
              {calculateButtonText}
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default CalculatorForm; 