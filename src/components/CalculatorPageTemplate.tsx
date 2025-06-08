import React from 'react';
import { Container, Typography, Box, Grid, useTheme, styled } from '@mui/material';
import { globalStyles } from '../styles/globalStyles';

interface CalculatorPageTemplateProps {
  title: string;
  mainDescription: string;
  formComponent: React.ReactNode;
  resultComponent: React.ReactNode;
  aboutComponent: React.ReactNode;
}

const CalculatorPageTemplate: React.FC<CalculatorPageTemplateProps> = ({
  title,
  mainDescription,
  formComponent,
  resultComponent,
  aboutComponent,
}) => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            mb: 2,
            ...globalStyles(theme).gradientText,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          {mainDescription}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {formComponent}
        </Grid>
        <Grid item xs={12} md={6}>
          {aboutComponent}
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        {resultComponent}
      </Box>
    </Container>
  );
};

export default CalculatorPageTemplate; 