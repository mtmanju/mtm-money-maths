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
  ResultCard,
  StyledTextField,
  StyledSlider,
  ChartContainer,
  CalculatorHeading,
  colors,
  typography,
} from './calculatorStyles';

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
}

export const CalculatorTemplate: React.FC<CalculatorTemplateProps> = ({
  title,
  description,
  formSection,
  resultSection,
  tableSection,
}) => {
  const theme = useTheme();

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <CalculatorHeading variant="h1" sx={{ mb: 0 }}>
            {title}
          </CalculatorHeading>
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

export { StyledPaper, ResultCard, StyledTextField, StyledSlider, ChartContainer }; 