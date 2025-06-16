import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

// Custom X (Twitter) icon component
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      fill="currentColor"
    />
  </svg>
);

const FooterRoot = styled('footer')(() => ({
  background: '#5ee2e6',
  color: '#1A1F36',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  width: '100%',
  marginTop: 0,
  borderTop: 'none',
}));

const NewsletterInput = styled('input')(() => ({
  border: '1.5px solid #eafafd',
  borderRadius: '999px',
  padding: '12px 24px',
  fontSize: '1rem',
  width: 260,
  marginRight: '1rem',
  background: '#fff',
  color: '#1A1F36',
  boxShadow: '0 2px 16px 0 rgba(30, 34, 90, 0.08)',
  outline: 'none',
  transition: 'all 0.2s',
  height: '48px',
  lineHeight: '48px',
  '&:focus': {
    borderColor: '#00bfc6',
    boxShadow: '0 4px 20px 0 rgba(0, 191, 198, 0.15)',
  },
  '&::placeholder': {
    color: '#4E5D78',
    opacity: 0.7,
  },
}));

const NewsletterButton = styled(Button)(() => ({
  background: '#1A1F36',
  color: '#fff',
  borderRadius: '999px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
  transition: 'all 0.2s',
  height: '48px',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
    transform: 'translateY(-2px)',
  },
}));

const FooterLink = styled(RouterLink)(() => ({
  color: '#1A1F36',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  marginBottom: '1.25rem',
  display: 'block',
  textDecoration: 'none',
  transition: 'color 0.2s',
  outline: 'none',
  boxShadow: 'none',
  '&:hover': {
    color: '#009ca3',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: 'none',
  },
}));

const FooterNavBox = styled(Box)(() => ({
  outline: 'none',
  boxShadow: 'none',
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: 'none',
  },
}));

const SocialStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-start',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

const SocialIcon = styled(IconButton)(() => ({
  color: '#1A1F36',
  borderRadius: '12px',
  width: 44,
  height: 44,
  transition: 'all 0.2s',
  '&:hover': {
    color: '#009ca3',
    transform: 'translateY(-2px)',
  },
}));

const LegalDivider = styled('div')(() => ({
  width: '100%',
  height: 1,
  background: 'rgba(26,31,54,0.15)',
  margin: '2.5rem 0 1.5rem 0',
}));

const footerLinks = [
  { title: 'Home', path: '/' },
  { title: 'Calculators', path: '/calculators' },
  { title: 'About', path: '/about' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Contact', path: '/contact' },
];

const Footer = () => {
  return (
    <FooterRoot>
      <Box sx={{ 
        pt: { xs: 4, md: 6 }, 
        pb: { xs: 4, md: 6 }, 
        px: { xs: 3, sm: 4, md: 6, lg: 8 }, 
        maxWidth: '100%' 
      }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Newsletter & Acknowledgement */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 3, letterSpacing: '-0.02em' }}>
              Join our newsletter<br />
              <span style={{ color: '#009ca3', fontWeight: 400 }}>to stay up to date</span>
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}>
              <NewsletterInput placeholder="Enter your email" type="email" />
              <NewsletterButton disableElevation>Subscribe</NewsletterButton>
            </Box>
            <Typography sx={{ color: '#1A1F36', fontSize: '0.95rem', mb: 4 }}>
              By subscribing, you agree to our <Link href="#" underline="always" sx={{ color: '#1A1F36', fontWeight: 500 }}>Privacy Policy</Link>.
            </Typography>
            <Typography sx={{ color: '#1A1F36', fontSize: '1rem', maxWidth: 600, mb: 3 }}>
              Money Maths is your trusted companion for financial calculations and planning. Make informed decisions with our comprehensive suite of financial calculators.
            </Typography>
          </Grid>
          {/* Links & Social */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, mb: { xs: 4, md: 0 } }}>
              {footerLinks.map(link => (
                <FooterLink key={link.title} to={link.path} tabIndex={0}>
                  {link.title}
                </FooterLink>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              mb: { xs: 4, md: 0 }
            }}>
              <Typography sx={{ 
                color: '#1A1F36', 
                fontSize: '1rem', 
                fontWeight: 600, 
                mb: 2,
                display: { xs: 'block', md: 'none' }
              }}>
                Follow Us
              </Typography>
              <SocialStack>
                <Box component="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <SocialIcon aria-label="Facebook"><FacebookIcon /></SocialIcon>
                </Box>
                <Box component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <SocialIcon aria-label="Instagram"><InstagramIcon /></SocialIcon>
                </Box>
                <Box component="a" href="https://x.com" target="_blank" rel="noopener noreferrer">
                  <SocialIcon aria-label="X"><XIcon /></SocialIcon>
                </Box>
                <Box component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <SocialIcon aria-label="LinkedIn"><LinkedInIcon /></SocialIcon>
                </Box>
              </SocialStack>
            </Box>
          </Grid>
        </Grid>
        <LegalDivider />
        <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 3, mb: { xs: 2, md: 0 } }}>
              <Link href="#" className="footer-link" underline="always">Terms of Service</Link>
              <Link href="#" className="footer-link" underline="always">Privacy Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography sx={{ color: '#1A1F36', fontSize: '0.95rem' }}>
              © {new Date().getFullYear()} Money Maths. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </FooterRoot>
  );
};

export default Footer; 