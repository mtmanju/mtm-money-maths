import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  ContactSupport as ContactIcon,
  Close as CloseIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Mobile App Bar with desktop-consistent styling
const MobileAppBar = styled(AppBar)(({ theme }) => ({
  background: '#fff',
  boxShadow: 'none',
  borderBottom: 'none',
  borderRadius: 0,
  '& .MuiToolbar-root': {
    minHeight: 64,
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiToolbar-root': {
      minHeight: 56,
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
}));

// Mobile Logo Container
const MobileLogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  textDecoration: 'none',
  color: 'inherit',
}));

// Mobile Money Text with desktop gradient
const MobileMoneyText = styled(Typography)(() => ({
  color: '#1A1F36',
  fontWeight: 800,
  fontSize: '1.25rem',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.02em',
  background: 'linear-gradient(180deg, #1A1F36 0%, #2A2F46 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.3s ease',
}));

// Mobile Maths Text with desktop gradient
const MobileMathsText = styled(Typography)(() => ({
  color: '#00bfc6',
  fontWeight: 800,
  fontSize: '1.25rem',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.02em',
  background: 'linear-gradient(180deg, #00bfc6 0%, #00a8af 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'all 0.3s ease',
}));

// Mobile Navigation Drawer
const MobileDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    background: '#fff',
    borderRight: '1px solid #eafafd',
    boxShadow: '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30)',
    width: 280,
    paddingTop: 24,
  },
}));

// Mobile Navigation Item
const MobileNavItem = styled(ListItem)(() => ({
  margin: '4px 16px',
  borderRadius: 20,
  minHeight: 48,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: '#eafafd',
  },
  '&.active': {
    background: '#eafafd',
    '& .MuiListItemText-primary': {
      color: '#009ca3',
    },
    '& .MuiListItemIcon-root': {
      color: '#009ca3',
    },
  },
}));

// Mobile Navigation Item Text
const MobileNavItemText = styled(ListItemText)(() => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#1A1F36',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    letterSpacing: '-0.02em',
  },
}));

// Mobile Navigation Item Icon
const MobileNavItemIcon = styled(ListItemIcon)(() => ({
  color: '#1A1F36',
  minWidth: 40,
}));

// Mobile Menu Button
const MobileMenuButton = styled(IconButton)(() => ({
  color: '#1A1F36',
  '&:hover': {
    background: '#eafafd',
  },
}));

// Mobile Header Actions
const MobileHeaderActions = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

// Mobile Action Button with desktop colors
const MobileActionButton = styled(Button)(() => ({
  borderRadius: '999px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  lineHeight: 1.43,
  letterSpacing: '-0.02em',
  minHeight: 40,
  padding: '8px 16px',
  transition: 'all 0.2s',
  background: '#1A1F36',
  color: '#fff',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  boxShadow: '0 4px 16px 0 rgba(30, 34, 90, 0.10)',
  '&:hover': {
    background: '#009ca3',
    color: '#fff',
    boxShadow: '0 8px 32px 0 rgba(0, 191, 198, 0.18)',
  },
}));

// Mobile Drawer Header
const MobileDrawerHeader = styled(Box)(() => ({
  padding: '16px 24px',
  borderBottom: '1px solid #eafafd',
  marginBottom: 8,
}));

// Mobile Drawer Title
const MobileDrawerTitle = styled(Typography)(() => ({
  color: '#1A1F36',
  fontSize: '1.25rem',
  fontWeight: 800,
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.02em',
}));

// Mobile Drawer Subtitle
const MobileDrawerSubtitle = styled(Typography)(() => ({
  color: '#1A1F36',
  fontSize: '0.875rem',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.02em',
  marginTop: 4,
}));

const MobileHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Calculators', path: '/calculators', icon: <HomeIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'FAQ', path: '/faq', icon: <HelpIcon /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Only render on mobile devices
  if (!isMobile) {
    return null;
  }

  return (
    <>
      <MobileAppBar position="sticky" elevation={0}>
        <Toolbar>
          <Box component={RouterLink} to="/" sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            outline: 'none',
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
          }}>
            <MobileLogoContainer>
              <MobileMoneyText>Money</MobileMoneyText>
              <MobileMathsText>Maths</MobileMathsText>
            </MobileLogoContainer>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <MobileHeaderActions>
            <Box component={RouterLink} to="/calculators" sx={{ textDecoration: 'none' }}>
              <MobileActionButton
                variant="contained"
                size="small"
              >
                Calculators
              </MobileActionButton>
            </Box>
            <MobileMenuButton
              edge="end"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </MobileMenuButton>
          </MobileHeaderActions>
        </Toolbar>
      </MobileAppBar>

      <MobileDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <MobileDrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: '#1A1F36',
                width: 48,
                height: 48,
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.25rem',
              }}
            >
              M
            </Avatar>
            <Box>
              <MobileDrawerTitle>MoneyMaths</MobileDrawerTitle>
              <MobileDrawerSubtitle>Financial Calculators</MobileDrawerSubtitle>
            </Box>
          </Box>
        </MobileDrawerHeader>

        <List sx={{ pt: 0 }}>
          {navigationItems.map((item) => (
            <Box
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <ListItem
                button
                selected={isActive(item.path)}
                sx={{
                  margin: '4px 16px',
                  borderRadius: 20,
                  minHeight: 48,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: '#eafafd',
                  },
                  '&.Mui-selected': {
                    background: '#eafafd',
                    '& .MuiListItemText-primary': {
                      color: '#009ca3',
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#009ca3',
                    },
                  },
                }}
                className="mobile-nav-item"
              >
                <MobileNavItemIcon>
                  {item.icon}
                </MobileNavItemIcon>
                <MobileNavItemText primary={item.text} />
              </ListItem>
            </Box>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: '#eafafd' }} />

        <List>
          <MobileNavItem>
            <MobileNavItemIcon>
              <AccountIcon />
            </MobileNavItemIcon>
            <MobileNavItemText primary="Account" />
          </MobileNavItem>
          
          <MobileNavItem>
            <MobileNavItemIcon>
              <ContactIcon />
            </MobileNavItemIcon>
            <MobileNavItemText primary="Contact" />
          </MobileNavItem>
        </List>

        <Box sx={{ p: 2, mt: 'auto' }}>
          <Typography
            variant="caption"
            sx={{
              color: '#1A1F36',
              fontSize: '0.75rem',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Version 1.0.0
          </Typography>
        </Box>
      </MobileDrawer>
    </>
  );
};

export default MobileHeader; 