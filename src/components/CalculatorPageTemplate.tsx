import React from 'react';
import { Container, Typography, Box, Grid, useTheme, styled } from '@mui/material';

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
    <Container maxWidth="lg" sx={{ py: theme.spacing(10) }}>
      <Box sx={{ textAlign: 'center', mb: theme.spacing(6) }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', md: '1rem' },
            color: theme.palette.text.secondary,
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

      <Box sx={{ mt: theme.spacing(6) }}>
        {resultComponent}
      </Box>
    </Container>
  );
};

export default CalculatorPageTemplate; 