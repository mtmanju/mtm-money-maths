import React, { useState, useEffect } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // Show button after scrolling 100px
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="large"
        onClick={scrollToTop}
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          background: '#1A1F36',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 1300, // Ensure it's above other elements like Header
          '&:hover': {
            background: '#00bfc6',
            transform: 'scale(1.05)',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: '2rem' }} />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTopButton; 