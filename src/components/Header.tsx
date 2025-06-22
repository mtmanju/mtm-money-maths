import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery, Button, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  zIndex: 1200,
  borderRadius: 0,
  transition: 'all 0.2s ease',
  width: '100%',
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  borderRadius: 0,
  flexShrink: 0,
}));

const LogoText = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  position: 'relative',
  transition: 'transform 0.2s ease',
  flexShrink: 0,
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

const MoneyText = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.8rem',
  letterSpacing: '-0.02em',
  transition: 'color 0.2s ease',
  flexShrink: 0,
  '@media (max-width: 1200px)': {
    fontSize: '1.6rem',
  },
  '@media (max-width: 1000px)': {
    fontSize: '1.4rem',
  },
}));

const MathsText = styled(Typography)(() => ({
  color: '#00bfc6',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.8rem',
  letterSpacing: '-0.02em',
  transition: 'color 0.2s ease',
  flexShrink: 0,
  '@media (max-width: 1200px)': {
    fontSize: '1.6rem',
  },
  '@media (max-width: 1000px)': {
    fontSize: '1.4rem',
  },
}));

const Logo = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 700,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1.8rem',
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

const LogoLink = styled(RouterLink)({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
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
  '&:active': {
    outline: 'none',
    boxShadow: 'none',
  },
});

const NavLink = styled(RouterLink)(({ theme }) => ({
  color: '#1A1F36',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.95rem',
  textTransform: 'none',
  padding: '8px 12px',
  background: 'transparent',
  outline: 'none',
  transition: 'color 0.2s ease',
  textDecoration: 'none',
  borderRadius: '8px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '@media (max-width: 1200px)': {
    fontSize: '0.9rem',
    padding: '8px 10px',
  },
  '@media (max-width: 1000px)': {
    fontSize: '0.85rem',
    padding: '6px 8px',
  },
  '&:hover': {
    color: '#00bfc6',
    background: 'rgba(0, 191, 198, 0.04)',
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

const CalculatorsButton = styled(RouterLink)(() => ({
  background: '#1A1F36',
  color: '#fff',
  fontWeight: 600,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.95rem',
  borderRadius: '999px',
  padding: '10px 18px',
  textTransform: 'none',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(26, 31, 54, 0.15)',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '@media (max-width: 1200px)': {
    fontSize: '0.9rem',
    padding: '9px 16px',
  },
  '@media (max-width: 1000px)': {
    fontSize: '0.85rem',
    padding: '8px 14px',
  },
  '&:hover': {
    background: '#00bfc6',
    color: '#fff',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 191, 198, 0.25)',
  },
}));

const CtaButton = styled(Button)(() => ({
  border: '1px solid #1A1F36',
  color: '#1A1F36',
  borderRadius: '8px',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '0.95rem',
  textTransform: 'none',
  background: 'transparent',
  boxShadow: 'none',
  padding: '9px 18px',
  minWidth: 0,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#1A1F36',
    color: '#fff',
    borderColor: '#1A1F36',
  },
}));

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Hide desktop header on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ 
        minHeight: 70,
        px: '0 !important',
      }}>
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <LogoLink to="/" tabIndex={0}>
            <LogoContainer>
              <LogoText>
                <MoneyText>Money</MoneyText>
                <MathsText>Maths</MathsText>
              </LogoText>
            </LogoContainer>
          </LogoLink>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1 }, 
            alignItems: 'center',
            flexShrink: 0,
          }}>
            {navLinks.map((item) => (
              <NavLink 
                key={item.label} 
                to={item.path} 
                style={{ 
                  color: location.pathname === item.path ? '#00bfc6' : '#1A1F36',
                  background: location.pathname === item.path 
                    ? 'rgba(0, 191, 198, 0.08)' 
                    : 'transparent',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              >
                {item.label}
              </NavLink>
            ))}
            <CalculatorsButton to="/calculators" style={{ color: '#fff' }}>
              Calculators
            </CalculatorsButton>
          </Box>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 