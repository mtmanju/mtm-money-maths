import React from 'react';
import { Paper } from '@mui/material';
import { colors } from '../styles/theme';

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        p: 3,
        borderRadius: 2,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background
      }}
    >
      {children}
    </Paper>
  );
}; 