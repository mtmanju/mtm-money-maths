import React, { useRef } from 'react';
import { StyledTextField } from './calculatorStyles';
import { InputAdornment, IconButton, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface CustomNumberFieldProps {
  value: number | string;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  fullWidth?: boolean;
  InputProps?: any;
  sx?: any;
  [key: string]: any;
}

function formatIndianNumber(value: string | number) {
  if (value === '' || isNaN(Number(value))) return '';
  return new Intl.NumberFormat('en-IN').format(Number(value));
}

export function CustomNumberField({
  value,
  onChange,
  min = 0,
  max = 100000000,
  step = 1,
  label,
  fullWidth = true,
  InputProps = {},
  sx = {},
  ...props
}: CustomNumberFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showArrows, setShowArrows] = React.useState(false);

  const handleIncrement = () => {
    if (typeof value === 'number' && value < max) onChange(value + step);
    if (typeof value === 'string' && value !== '' && Number(value) < max) onChange(Number(value) + step);
  };
  const handleDecrement = () => {
    if (typeof value === 'number' && value > min) onChange(value - step);
    if (typeof value === 'string' && value !== '' && Number(value) > min) onChange(Number(value) - step);
  };

  // Always show formatted value
  const displayValue = formatIndianNumber(value);

  return (
    <Box
      sx={{ position: 'relative', width: fullWidth ? '100%' : undefined }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      onFocus={() => setShowArrows(true)}
      onBlur={() => setShowArrows(false)}
    >
      <StyledTextField
        {...props}
        type="text"
        label={label}
        value={displayValue}
        onChange={e => {
          // Remove commas for editing
          const val = e.target.value.replace(/,/g, '').replace(/[^0-9.]/g, '');
          if (val === '') {
            onChange('');
          } else {
            onChange(Number(val));
          }
        }}
        fullWidth={fullWidth}
        sx={{ minHeight: 48, height: 56, ...sx }}
        inputRef={inputRef}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                ml: 0.5,
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: showArrows ? 1 : 0,
                pointerEvents: showArrows ? 'auto' : 'none',
                transition: 'opacity 0.2s',
                zIndex: 2,
              }}
            >
              <IconButton size="small" onClick={handleIncrement} tabIndex={-1} sx={{ p: 0.5, height: 20, width: 28 }}>
                <ArrowDropUpIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" onClick={handleDecrement} tabIndex={-1} sx={{ p: 0.5, height: 20, width: 28 }}>
                <ArrowDropDownIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          ),
          inputProps: {
            inputMode: 'numeric',
            pattern: '[0-9]*',
            style: {
              MozAppearance: 'textfield',
              '-moz-appearance': 'textfield',
              WebkitAppearance: 'none',
              appearance: 'none',
            },
          },
        }}
      />
    </Box>
  );
} 