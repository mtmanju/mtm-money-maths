import React, { useRef, useState, useEffect } from 'react';
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

// Function to format number with commas while preserving decimal input
function formatNumberWithCommas(value: string): string {
  if (value === '' || value === '.') return value;
  
  // Handle decimal numbers properly
  const parts = value.split('.');
  const integerPart = parts[0].replace(/\D/g, ''); // Remove non-digits
  const decimalPart = parts[1] || '';
  
  // If integer part is empty, just return the decimal part with leading zero
  if (integerPart === '') {
    return decimalPart ? `0.${decimalPart}` : '0';
  }
  
  // Format integer part with commas
  const formattedInteger = new Intl.NumberFormat('en-IN').format(Number(integerPart));
  
  // Combine with decimal part
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Update input value when external value changes
  useEffect(() => {
    const formattedValue = value === '' ? '' : formatNumberWithCommas(String(value));
    setInputValue(formattedValue);
  }, [value]);

  const handleIncrement = () => {
    const currentValue = typeof value === 'number' ? value : (value === '' ? 0 : Number(value));
    if (currentValue < max) {
      // Fix floating point precision and round to 2 decimal places
      const newValue = Math.round((currentValue + step) * 100) / 100;
      onChange(newValue);
      // Ensure input maintains focus after increment
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };
  
  const handleDecrement = () => {
    const currentValue = typeof value === 'number' ? value : (value === '' ? 0 : Number(value));
    if (currentValue > min) {
      // Fix floating point precision and round to 2 decimal places
      const newValue = Math.round((currentValue - step) * 100) / 100;
      onChange(newValue);
      // Ensure input maintains focus after decrement
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
    setIsFocused(true);
    setShowArrows(true);
    // Set the formatted value for editing to maintain commas
    const formattedValue = value === '' ? '' : formatNumberWithCommas(String(value));
    setInputValue(formattedValue);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
    setShowArrows(false);
    
    // Clean the input value by removing commas
    const cleanValue = inputValue.replace(/,/g, '');
    
    // Validate and update the final value
    if (cleanValue === '' || cleanValue === '.') {
      onChange('');
    } else {
      const numValue = Number(cleanValue);
      if (isNaN(numValue)) {
        onChange('');
      } else {
        onChange(numValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    
    // Allow empty string
    if (val === '') {
      setInputValue('');
      return;
    }
    
    // Allow only numbers, decimal point, and commas
    if (/^[\d,.]*$/.test(val)) {
      // Remove all commas first
      const cleanValue = val.replace(/,/g, '');
      
      // Check if it's a valid decimal number pattern
      if (/^\d*\.?\d*$/.test(cleanValue)) {
        // Don't format if it's just a decimal point or starts with decimal
        if (cleanValue === '.' || cleanValue.startsWith('.')) {
          setInputValue(cleanValue);
        } else if (cleanValue === '') {
          setInputValue('');
        } else {
          // Format with commas only for the integer part
          const formattedValue = formatNumberWithCommas(cleanValue);
          setInputValue(formattedValue);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  // Show formatted value when not editing, formatted input value when editing
  const displayValue = isEditing ? inputValue : formatIndianNumber(value);

  return (
    <Box
      sx={{ position: 'relative', width: fullWidth ? '100%' : undefined }}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => {
        if (!isFocused) {
          setShowArrows(false);
        }
      }}
    >
      <StyledTextField
        {...props}
        type="text"
        label={label}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
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
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => {
                if (!isFocused) {
                  setShowArrows(false);
                }
              }}
            >
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleIncrement();
                }} 
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                tabIndex={-1} 
                sx={{ 
                  p: 0.5, 
                  height: 20, 
                  width: 28,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 191, 198, 0.1)',
                  },
                  '&:active': {
                    backgroundColor: 'rgba(0, 191, 198, 0.2)',
                  }
                }}
              >
                <ArrowDropUpIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDecrement();
                }} 
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                tabIndex={-1} 
                sx={{ 
                  p: 0.5, 
                  height: 20, 
                  width: 28,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 191, 198, 0.1)',
                  },
                  '&:active': {
                    backgroundColor: 'rgba(0, 191, 198, 0.2)',
                  }
                }}
              >
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