import React from 'react';
import { Paper } from '@mui/material';
import { colors } from '../styles/theme';

interface StyledTableContainerProps {
  children: React.ReactNode;
}

export const StyledTableContainer: React.FC<StyledTableContainerProps> = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        fontSize: '0.95rem',
      }}
    >
      {children}
    </Paper>
  );
}; 