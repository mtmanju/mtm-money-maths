import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors, typography } from './calculatorStyles';
import { ResultCard } from './ResultCard';

export interface ResultCardItem {
  label: string;
  value: string | number;
  variant?: 'primary' | 'secondary' | 'purple' | 'pink' | 'green';
}

export const CalculatorResultCards: React.FC<{
  items: ResultCardItem[];
  sectionTitle?: string;
}> = ({ items, sectionTitle }) => (
  <>
    {sectionTitle && (
      <Box sx={{ width: '100%', textAlign: 'center', mb: 1, mt: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.primary, fontFamily: typography.fontFamily }}>
          {sectionTitle}
        </Typography>
      </Box>
    )}
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
      {items.map((item, idx) => (
        <ResultCard
          key={idx}
          title={item.label}
          value={String(item.value)}
          variant={item.variant || 'primary'}
        />
      ))}
    </Box>
  </>
); 