import React from 'react';
import { Box, useTheme, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import MobileHeader from './MobileHeader';
import useMediaQuery from '@mui/material/useMediaQuery';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          color: theme.palette.text.primary,
        }}
      >
        {isMobile ? <MobileHeader /> : <Header />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '100%',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              position: 'relative',
              zIndex: 1,
              px: { xs: 2, sm: 3, md: 4 },
              py: 0,
            }}
          >
            {children}
          </Container>
        </Box>
        <Footer />
      </Box>
      <ScrollToTopButton />
    </>
  );
};

export default Layout; 