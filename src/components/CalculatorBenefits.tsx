import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const BenefitTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.h4.fontWeight,
  color: theme.palette.text.primary,
  fontSize: theme.typography.h4.fontSize,
  marginBottom: theme.spacing(3),
}));

const BenefitItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  '& .MuiListItemIcon-root': {
    minWidth: 40,
  },
  '& .MuiListItemText-primary': {
    fontWeight: theme.typography.body1.fontWeight,
    color: theme.palette.text.primary,
    fontSize: '1rem',
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    lineHeight: theme.typography.body2.lineHeight,
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
  const theme = useTheme();

  return (
    <StyledBox>
      <BenefitTitle variant="h4">
        Key Benefits
      </BenefitTitle>
      <List>
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BenefitItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText
                primary={benefit.title}
                secondary={benefit.description}
              />
            </BenefitItem>
          </motion.div>
        ))}
      </List>
    </StyledBox>
  );
};

export default CalculatorBenefits; 