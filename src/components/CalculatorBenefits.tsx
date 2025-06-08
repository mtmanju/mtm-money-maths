import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
}));

interface Benefit {
  title: string;
  description: string;
}

interface CalculatorBenefitsProps {
  benefits: Benefit[];
}

const CalculatorBenefits: React.FC<CalculatorBenefitsProps> = ({ benefits }) => {
  const theme = useTheme();

  return (
    <StyledBox>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 3,
          color: theme.palette.primary.main,
        }}
      >
        Key Benefits
      </Typography>
      <List>
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {benefit.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                }
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </StyledBox>
  );
};

export default CalculatorBenefits; 