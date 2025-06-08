import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  position: 'fixed',
  padding: theme.spacing(2, 0),
  transition: 'background-color 0.3s ease, border-bottom 0.3s ease',
  zIndex: theme.zIndex.appBar + 100,
  borderBottom: '1px solid transparent',
  '&.scrolled': {
    background: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '1.75rem',
  letterSpacing: '-0.03em',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: theme.palette.background.default,
    padding: theme.spacing(4, 3),
    boxShadow: 'none',
    borderLeft: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: 0,
  },
}));

interface HeaderProps {
  onHeightChange: (height: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onHeightChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const appBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (appBarRef.current) {
      const height = appBarRef.current.offsetHeight;
      console.log('Header height:', height);
      onHeightChange(height);
    }
  }, [onHeightChange, isMobile, scrolled]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Calculators', path: '/calculators' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <StyledAppBar ref={appBarRef} className={scrolled ? 'scrolled' : ''}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <LogoText variant="h6">
                Money Maths
              </LogoText>
            </RouterLink>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
              <StyledDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem key={item.text}>
                      <StyledLink to={item.path} onClick={toggleDrawer}>
                        {item.text}
                      </StyledLink>
                    </ListItem>
                  ))}
                </List>
              </StyledDrawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.map((item) => (
                <StyledLink key={item.text} to={item.path}>
                  {item.text}
                </StyledLink>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </StyledAppBar>
  );
};

export default Header; 