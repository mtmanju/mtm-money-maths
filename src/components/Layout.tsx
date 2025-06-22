import React from 'react';
import { Box, useTheme, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#fff',
          color: theme.palette.text.primary,
        }}
      >
        <Header />
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
              py: { xs: 4, sm: 6, md: 8 },
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