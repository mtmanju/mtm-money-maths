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
  // maxWidth: 900, // Remove this line to allow full width
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
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              mb: 1.5,
              color: '#1A1F36',
              textAlign: 'center',
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
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              fontFamily: typography.fontFamily,
              mb: 0,
              lineHeight: 1.4,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5} sx={{ flexBasis: { md: '40%' }, maxWidth: { md: '40%' } }}>
              {formSection}
            </Grid>
            <Grid item xs={12} md={7} sx={{ flexBasis: { md: '60%' }, maxWidth: { md: '60%' } }}>
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