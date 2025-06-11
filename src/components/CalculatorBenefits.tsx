import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

interface Benefit {
  title: string;
  description: string;
}

interface CalculatorBenefitsProps {
  benefits: Benefit[];
}

const CalculatorBenefits: React.FC<CalculatorBenefitsProps> = ({ benefits }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Key Benefits
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} elevation={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {benefit.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {benefit.description}
            </Typography>
          </BenefitCard>
        ))}
      </Box>
    </Box>
  );
};

export default CalculatorBenefits; 