import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export interface ParticularsSectionProps {
  title: string;
  items: (string | React.ReactNode)[];
}

const ParticularsSection: React.FC<ParticularsSectionProps> = ({ title, items }) => (
  <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, mt: 4, background: '#f8f9fc', borderRadius: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, color: '#00bfc6', mb: 1 }}>
      {title}
    </Typography>
    <Box component="ul" sx={{ m: 0, pl: 2, color: '#4E5D78', fontSize: '1rem', lineHeight: 1.7 }}>
      {items.map((item, idx) => (
        <Box component="li" key={idx} sx={{ mb: idx !== items.length - 1 ? 1.5 : 0, display: 'flex', alignItems: 'flex-start' }}>
          {item}
        </Box>
      ))}
    </Box>
  </Paper>
);

export default ParticularsSection; 