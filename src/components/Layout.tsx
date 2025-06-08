import React from 'react';
import { Box, styled } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const MainContent = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #0A0B0D 0%, #1A1B1E 100%)'
    : 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
  paddingTop: theme.spacing(8), // Account for fixed header
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <MainContent>
      <Header />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
    </MainContent>
  );
};

export default Layout; 