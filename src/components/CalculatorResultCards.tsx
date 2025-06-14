import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResultCard, colors, typography } from './calculatorStyles';

export interface ResultCardItem {
  label: string;
  value: string | number;
  bgcolor?: string;
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
        <ResultCard key={idx} bgcolor={item.bgcolor}>
          <span className="label">{item.label}</span>
          <span className="value">{item.value}</span>
        </ResultCard>
      ))}
    </Box>
  </>
); 