import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { colors, typography, shadows, borderRadius } from '../styles/theme';

interface ResultCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'purple' | 'pink' | 'green';
}

const cardVariants = {
  primary: {
    background: `linear-gradient(135deg, ${colors.accent.primary}15 0%, ${colors.accent.primary}30 100%)`,
    iconColor: colors.accent.primary,
    borderColor: `${colors.accent.primary}40`,
  },
  secondary: {
    background: `linear-gradient(135deg, ${colors.accent.secondary}15 0%, ${colors.accent.secondary}30 100%)`,
    iconColor: colors.accent.secondary,
    borderColor: `${colors.accent.secondary}40`,
  },
  purple: {
    background: `linear-gradient(135deg, ${colors.accent.purple}15 0%, ${colors.accent.purple}30 100%)`,
    iconColor: colors.accent.purple,
    borderColor: `${colors.accent.purple}40`,
  },
  pink: {
    background: `linear-gradient(135deg, ${colors.accent.pink}15 0%, ${colors.accent.pink}30 100%)`,
    iconColor: colors.accent.pink,
    borderColor: `${colors.accent.pink}40`,
  },
  green: {
    background: `linear-gradient(135deg, ${colors.accent.green}15 0%, ${colors.accent.green}30 100%)`,
    iconColor: colors.accent.green,
    borderColor: `${colors.accent.green}40`,
  },
};

export const ResultCard: React.FC<ResultCardProps> = ({ 
  title, 
  value, 
  icon, 
  variant = 'primary' 
}) => {
  const variantStyle = cardVariants[variant];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        flex: 1,
        borderRadius: '10px',
        border: `1.5px solid ${variantStyle.borderColor}`,
        background: variantStyle.background,
        boxShadow: shadows.card,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.12)',
          transform: 'translateY(-4px) scale(1.02)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon && <Box sx={{ mr: 1, color: variantStyle.iconColor }}>{icon}</Box>}
        <Typography variant="body1" sx={{ color: colors.secondary, fontWeight: 500, fontFamily: typography.fontFamily, fontSize: '0.95rem' }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ color: colors.primary, fontWeight: 700, fontFamily: typography.fontFamily, fontSize: '1.08rem' }}>
        {value}
      </Typography>
    </Paper>
  );
}; 