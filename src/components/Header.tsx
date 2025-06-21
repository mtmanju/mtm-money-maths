import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme, useMediaQuery, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  background: '#fff',
  borderBottom: '1.5px solid #eafafd',
  boxShadow: '0 1px 2px rgba(30, 34, 90, 0.04)',
  zIndex: 1200,
  borderRadius: 0,
  '& .MuiToolbar-root': {
    borderRadius: 0,
  },
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  borderRadius: 0,
}));

const LogoText = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #1A1F36 50%, #00bfc6 50%)',
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },
}));

const MoneyText = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 800,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '2rem',
  letterSpacing: '-0.02em',
  background: 'linear-gradient(180deg, #1A1F36 0%, #2A2F46 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.3s ease',
}));

const MathsText = styled(Typography)(() => ({
  color: '#00bfc6',
  fontWeight: 800,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '2rem',
  letterSpacing: '-0.02em',
  background: 'linear-gradient(180deg, #00bfc6 0%, #00a8af 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.3s ease',
}));

const Logo = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 800,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '2rem',
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
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
  fontWeight: 600,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  borderRadius: 18,
  textTransform: 'none',
  padding: '8px 18px',
  background: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  transition: 'color 0.2s, transform 0.2s',
  textDecoration: 'none',
  '&:hover': {
    color: '#009ca3',
    background: 'transparent',
    transform: 'translateY(-2px)',
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
  fontSize: '1rem',
  borderRadius: '999px',
  padding: '10px 24px',
  textTransform: 'none',
  textDecoration: 'none',
  transition: 'all 0.2s',
  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
  },
}));

const CtaButton = styled(Button)(() => ({
  border: '1.5px solid #1A1F36',
  color: '#1A1F36',
  borderRadius: '999px',
  fontWeight: 500,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '1rem',
  textTransform: 'none',
  background: 'transparent',
  boxShadow: 'none',
  padding: '8px 22px',
  minWidth: 0,
  transition: 'background 0.2s, color 0.2s, border 0.2s',
  '&:hover': {
    background: '#eafafd',
    borderColor: '#009ca3',
    color: '#009ca3',
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
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80, px: { xs: 3, sm: 6 } }}>
        <LogoLink to="/" tabIndex={0}>
          <LogoContainer>
            <LogoText>
              <MoneyText>Money</MoneyText>
              <MathsText>Maths</MathsText>
            </LogoText>
          </LogoContainer>
        </LogoLink>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navLinks.map((item) => (
            <NavLink key={item.label} to={item.path} style={{ color: location.pathname === item.path ? '#009ca3' : '#1A1F36' }}>{item.label}</NavLink>
          ))}
          <CalculatorsButton to="/calculators" style={{ color: '#fff' }}>
            Calculators
          </CalculatorsButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 