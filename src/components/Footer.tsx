import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterRoot = styled('footer')(() => ({
  background: '#5ee2e6',
  color: '#1A1F36',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  width: '100%',
  marginTop: 0,
  borderTop: 'none',
}));

const NewsletterInput = styled('input')(() => ({
  border: 'none',
  borderRadius: '18px',
  padding: '12px 20px',
  fontSize: '1rem',
  width: 260,
  marginRight: '1rem',
  background: '#fff',
  color: '#1A1F36',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  outline: 'none',
}));

const NewsletterButton = styled(Button)(() => ({
  background: '#1A1F36',
  color: '#fff',
  borderRadius: '18px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    background: '#009ca3',
  },
}));

const FooterLink = styled(Link)(() => ({
  color: '#1A1F36',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  marginBottom: '1.25rem',
  display: 'block',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#009ca3',
  },
}));

const SocialStack = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-end',
}));

const SocialIcon = styled(IconButton)(() => ({
  background: '#1A1F36',
  color: '#fff',
  borderRadius: '12px',
  width: 44,
  height: 44,
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
  },
}));

const LegalDivider = styled('div')(() => ({
  width: '100%',
  height: 1,
  background: 'rgba(26,31,54,0.15)',
  margin: '2.5rem 0 1.5rem 0',
}));

const calculatorLinks1 = [
  { title: 'Home', path: '/' },
  { title: 'EMI Calculator', path: '/emi-calculator' },
  { title: 'SIP Calculator', path: '/sip-calculator' },
  { title: 'FD Calculator', path: '/fd-calculator' },
  { title: 'RD Calculator', path: '/rd-calculator' },
  { title: 'PPF Calculator', path: '/ppf-calculator' },
];
const calculatorLinks2 = [
  { title: 'NPS Calculator', path: '/nps-calculator' },
  { title: 'Gratuity Calculator', path: '/gratuity-calculator' },
  { title: 'HRA Calculator', path: '/hra-calculator' },
  { title: 'Income Tax Calculator', path: '/income-tax-calculator' },
  { title: 'GST Calculator', path: '/gst-calculator' },
  { title: 'About', path: '/about' },
];

const Footer = () => {
  return (
    <FooterRoot>
      <Box sx={{ pt: 2, pb: 2, px: { xs: 3, sm: 6 }, maxWidth: '100%' }}>
        <Grid container spacing={6}>
          {/* Newsletter & Acknowledgement */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 2, letterSpacing: '-0.02em' }}>
              Join our newsletter<br />
              <span style={{ color: '#009ca3', fontWeight: 400 }}>to stay up to date</span>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NewsletterInput placeholder="Enter your email" type="email" />
              <NewsletterButton disableElevation>Subscribe</NewsletterButton>
            </Box>
            <Typography sx={{ color: '#1A1F36', fontSize: '0.95rem', mb: 3 }}>
              By subscribing, you agree to our <Link href="#" underline="always" sx={{ color: '#1A1F36', fontWeight: 500 }}>Privacy Policy</Link>.
            </Typography>
            <Typography sx={{ color: '#1A1F36', fontSize: '1rem', maxWidth: 600, mb: 2 }}>
              MTM Money Maths is your trusted companion for financial calculations and planning. Make informed decisions with our comprehensive suite of financial calculators.
            </Typography>
            <Typography sx={{ color: '#1A1F36', fontSize: '1rem', maxWidth: 600, mb: 2 }}>
              We acknowledge the Traditional Owners of the land where we work and live, and pay our respects to Elders past, present, and emerging. We celebrate the stories, culture and traditions of all communities who also work and live on this land.
            </Typography>
          </Grid>
          {/* Links & Social */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {calculatorLinks1.map(link => (
                <Box key={link.title} component={RouterLink} to={link.path} sx={{ textDecoration: 'none' }}>
                  <FooterLink>{link.title}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {calculatorLinks2.map(link => (
                <Box key={link.title} component={RouterLink} to={link.path} sx={{ textDecoration: 'none' }}>
                  <FooterLink>{link.title}</FooterLink>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <SocialStack>
              <Box component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon aria-label="Facebook"><FacebookIcon /></SocialIcon>
              </Box>
              <Box component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon aria-label="Instagram"><InstagramIcon /></SocialIcon>
              </Box>
              <Box component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon aria-label="Twitter"><TwitterIcon /></SocialIcon>
              </Box>
              <Box component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon aria-label="LinkedIn"><LinkedInIcon /></SocialIcon>
              </Box>
            </SocialStack>
          </Grid>
        </Grid>
        <LegalDivider />
        <Grid container alignItems="center" justifyContent="space-between" sx={{ pb: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 3, mb: { xs: 1, md: 0 } }}>
              <Link href="#" className="footer-link" underline="always">Terms of Service</Link>
              <Link href="#" className="footer-link" underline="always">Privacy Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography sx={{ color: '#1A1F36', fontSize: '0.95rem' }}>
              © {new Date().getFullYear()} MTM Money Maths. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </FooterRoot>
  );
};

export default Footer; 