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
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: theme.shadows[6],
  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
  '&:hover': {
    boxShadow: theme.shadows[10],
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
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 4,
          fontSize: '1.25rem',
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
              type={field.type || 'text'}
              InputProps={{
                startAdornment: field.startAdornment,
                endAdornment: field.endAdornment || (field.tooltip && (
                  <InputAdornment position="end">
                    <Tooltip title={field.tooltip}>
                      <IconButton size="small">
                        <InfoIcon sx={{ color: theme.palette.text.secondary }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )),
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={onReset}
              startIcon={<RefreshIcon />}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onCalculate}
              startIcon={calculateButtonIcon}
            >
              {calculateButtonText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default CalculatorForm; 