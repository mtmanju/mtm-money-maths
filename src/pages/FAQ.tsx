import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const FAQ: React.FC = () => {
  return (
    <Box sx={{ width: '100%', py: { xs: 7, md: 10 }, background: '#f4fafd' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6, lg: 10 }, textAlign: 'left' }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '2.7rem' },
            mb: 4,
            letterSpacing: '-0.02em',
            color: '#1A1F36',
            textAlign: 'left',
            pl: 0,
          }}
        >
          Frequently <Box component="span" sx={{ color: '#00bfc6', display: 'inline', fontWeight: 800 }}>asked questions.</Box>
        </Typography>
        <Box sx={{ mb: 4, maxWidth: 700 }}>
          {[{
            q: 'Are Money Maths calculators free to use?',
            a: 'Yes! All our calculators are 100% free, with no sign-up or hidden fees.'
          }, {
            q: 'Do you store any of my data?',
            a: 'No, all calculations happen instantly in your browser. We never store or share your data.'
          }, {
            q: 'How accurate are the results?',
            a: 'We use industry-standard formulas and regularly test our tools for accuracy.'
          }, {
            q: 'Can I use Money Maths on my phone?',
            a: 'Absolutely! Our site is fully responsive and works great on all devices.'
          }].map((faq, i) => (
            <Accordion
              key={faq.q}
              sx={{
                background: '#f8f9fc',
                borderRadius: '18px',
                mb: 2,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { mt: 0, mb: 2 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#00bfc6', fontSize: 32 }} />}
                sx={{
                  borderRadius: '18px',
                  minHeight: 0,
                  '& .MuiAccordionSummary-content': {
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    color: '#1A1F36',
                    py: 1.5,
                  },
                }}
              >
                {faq.q}
              </AccordionSummary>
              <AccordionDetails sx={{ color: '#4E5D78', fontSize: '1.05rem', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', pb: 2 }}>
                {faq.a}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            background: '#eaf7fa',
            color: '#00bfc6',
            fontWeight: 700,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            borderRadius: '999px',
            px: 4,
            py: 1.2,
            textTransform: 'none',
            fontSize: '1.1rem',
            boxShadow: 'none',
            '&:hover': {
              background: '#00bfc6',
              color: '#fff',
            },
          }}
        >
          See all FAQs
        </Button>
      </Container>
    </Box>
  );
};

export default FAQ; 