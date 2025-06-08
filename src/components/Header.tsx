import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import { globalStyles } from '../styles/globalStyles';

interface StyledAppBarProps {
  scrolled: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})<StyledAppBarProps>(({ theme, scrolled }) => ({
  background: scrolled
    ? theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(17, 24, 39, 0.95)'
    : 'transparent',
  backdropFilter: 'blur(10px)',
  boxShadow: scrolled ? theme.shadows[4] : 'none',
  transition: 'all 0.3s ease-in-out',
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(17, 24, 39, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
  color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
  '&:hover': {
    background: theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(17, 24, 39, 0.95)',
    transform: 'translateY(-2px)',
  },
}));

const QuoteButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: '#fff',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'translateY(-2px)',
  },
}));

const LogoLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
}));

interface LogoTextProps {
  scrolled: boolean;
}

const LogoText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})<LogoTextProps>(({ theme, scrolled }) => ({
  color: 'transparent',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 700,
  fontSize: '1.8rem',
  letterSpacing: '0.5px',
  textShadow: scrolled 
    ? 'none' 
    : '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    opacity: 0.9,
  },
}));

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        background: theme.palette.mode === 'light'
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(17, 24, 39, 0.9)',
        backdropFilter: 'blur(10px)',
        height: '100%',
      }}
    >
      <List>
        <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/calculators" onClick={handleDrawerToggle}>
          <ListItemText primary="Calculators" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about" onClick={handleDrawerToggle}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={RouterLink} to="/contact" onClick={handleDrawerToggle}>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrolled}>
        <Toolbar>
          <LogoLink to="/">
            <LogoText scrolled={scrolled}>
              Money Maths
            </LogoText>
          </LogoLink>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component={RouterLink} to="/calculators" sx={{ textDecoration: 'none' }}>
                <NavButton>
                  Calculators
                </NavButton>
              </Box>
              <Box component={RouterLink} to="/about" sx={{ textDecoration: 'none' }}>
                <NavButton>
                  About
                </NavButton>
              </Box>
              <Box component={RouterLink} to="/contact" sx={{ textDecoration: 'none' }}>
                <NavButton>
                  Contact
                </NavButton>
              </Box>
              <Box component={RouterLink} to="/get-quote" sx={{ textDecoration: 'none' }}>
                <QuoteButton>
                  Get a Quote
                </QuoteButton>
              </Box>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{ ml: 2 }}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header; 