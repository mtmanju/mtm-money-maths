import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  styled,
} from '@mui/material';
import {
  GradientBackground,
  StyledPaper,
  StyledTextField,
  StyledSlider,
  ChartContainer,
  CalculatorHeading,
  colors,
  typography,
} from './calculatorStyles';
import { ResultCard } from './ResultCard';

const CalculatorContainer = styled(Box)(({ theme }) => ({
  background: 'transparent',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4, 2),
  margin: '0 auto',
  maxWidth: 900,
  fontFamily: typography.fontFamily,
}));

interface CalculatorTemplateProps {
  title: string;
  description: string;
  formSection: React.ReactNode;
  resultSection: React.ReactNode;
  tableSection?: React.ReactNode;
  onCalculate?: (data: any) => void;
  results?: any;
}

export const CalculatorTemplate: React.FC<CalculatorTemplateProps> = ({
  title,
  description,
  formSection,
  resultSection,
  tableSection,
  onCalculate,
  results,
}) => {
  const theme = useTheme();

  // Split the title into two parts
  const [mainTitle, subTitle] = title.split(' ');

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.2rem', lg: '2.8rem' },
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              mb: 2,
              color: '#1A1F36',
              textAlign: 'left',
            }}
          >
            {mainTitle}{' '}
            <Box component="span" sx={{ color: '#00bfc6', fontWeight: 600 }}>
              {subTitle}
            </Box>
          </Typography>
          <Typography
            component="span"
            sx={{
              color: colors.secondary,
              fontWeight: 400,
              fontSize: { xs: '0.92rem', md: '1rem' },
              fontFamily: typography.fontFamily,
              mb: 0,
              lineHeight: 1.2,
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              {formSection}
            </Grid>
            <Grid item xs={12} md={6}>
              {resultSection}
            </Grid>
          </Grid>
        </Box>
        {tableSection && (
          <Box mt={5}>
            {tableSection}
          </Box>
        )}
      </Container>
    </GradientBackground>
  );
};

export { StyledPaper, StyledTextField, StyledSlider, ChartContainer }; 