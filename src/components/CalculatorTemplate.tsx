import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  useTheme,
  styled,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 600,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                mb: 1.5,
                color: '#1A1F36',
                textAlign: { xs: 'center', sm: 'left' },
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
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                fontFamily: typography.fontFamily,
                mb: 0,
                lineHeight: 1.4,
                maxWidth: '700px',
                mx: { xs: 'auto', sm: 0 },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              {description}
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/calculators"
            variant="outlined"
            sx={{
              borderRadius: '999px',
              fontWeight: 600,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '0.95rem',
              textTransform: 'none',
              px: 3,
              py: 1.2,
              minWidth: 0,
              whiteSpace: 'nowrap',
              alignSelf: { xs: 'stretch', sm: 'center' },
              ml: { sm: 3 },
              mt: { xs: 2, sm: 0 },
              border: '2px solid #00bfc6',
              color: '#00bfc6',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0, 191, 198, 0.08)',
              '&:hover': {
                background: '#00bfc6',
                color: '#fff',
                border: '2px solid #00bfc6',
                boxShadow: '0 4px 16px rgba(0, 191, 198, 0.12)',
              },
            }}
          >
            Back to Calculators
          </Button>
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