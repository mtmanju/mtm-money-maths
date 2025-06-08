import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';

const MainContent = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.default,
}));

interface ContentWrapperProps {
  // headerHeight: number; // No longer needed as paddingTop is fixed
}

const ContentWrapper = styled(Box)<ContentWrapperProps>(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(12), // Consistent top padding, adjusted for header
  paddingBottom: theme.spacing(10), // Generous bottom padding
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const theme = useTheme(); // Use useTheme hook here

  // console.log('Layout received header height:', headerHeight); // Console log for debugging, can be removed

  return (
    <MainContent>
      <Header onHeightChange={setHeaderHeight} />
      <ContentWrapper> {/* headerHeight is no longer needed as a prop for ContentWrapper */}
        <Container maxWidth="lg"> {/* Set a specific maxWidth for content containment */}
          {children}
        </Container>
      </ContentWrapper>
      <Footer />
    </MainContent>
  );
};

export default Layout; 