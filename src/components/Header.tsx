import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  background: '#fff',
  borderBottom: '1.5px solid #eafafd',
  boxShadow: '0 1px 2px rgba(30, 34, 90, 0.04)',
  zIndex: 1200,
}));

const Logo = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 800,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '2rem',
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#009ca3',
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
  { label: 'Calculators', path: '/calculators' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 80, px: { xs: 3, sm: 6 } }}>
        <LogoLink to="/" tabIndex={0}>
          <Logo>Money Maths</Logo>
        </LogoLink>
        {isMobile ? (
          <>
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleDrawerToggle}
              sx={{
                color: '#009ca3',
                '&:hover': {
                  background: 'rgba(94,226,230,0.15)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer 
              anchor="right" 
              open={drawerOpen} 
              onClose={handleDrawerToggle}
              PaperProps={{
                sx: {
                  background: '#fff',
                  borderLeft: '1.5px solid #eafafd',
                  boxShadow: '0 4px 20px rgba(30, 34, 90, 0.10)',
                },
              }}
            >
              <Box sx={{ width: 280, p: 3 }}>
                <List>
                  {navLinks.map((item) => (
                    <ListItem 
                      button 
                      key={item.label} 
                      component={RouterLink} 
                      to={item.path} 
                      onClick={handleDrawerToggle}
                      sx={{
                        borderRadius: 18,
                        mb: 1,
                        transition: 'all 0.2s',
                        background: location.pathname === item.path ? 'rgba(94,226,230,0.15)' : 'transparent',
                        '&:hover': {
                          background: 'rgba(94,226,230,0.25)',
                          color: '#009ca3',
                        },
                      }}
                    >
                      <ListItemText 
                        primary={item.label} 
                        primaryTypographyProps={{
                          fontWeight: 600,
                          color: location.pathname === item.path ? '#009ca3' : '#1A1F36',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {navLinks.map((item) => (
              <NavLink key={item.label} to={item.path} style={{ color: location.pathname === item.path ? '#009ca3' : '#1A1F36' }}>{item.label}</NavLink>
            ))}
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 