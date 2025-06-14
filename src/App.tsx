import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import NotFound from './pages/NotFound';
import Calculators from './pages/Calculators';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        'input[type="number"]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          appearance: 'none',
          margin: 0,
          display: 'none',
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          appearance: 'none',
          margin: 0,
          display: 'none',
        },
        'input[type="number"]': {
          MozAppearance: 'textfield',
          appearance: 'textfield',
        },
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none !important',
          },
          '&:hover fieldset': {
            border: 'none !important',
          },
          '&.Mui-focused fieldset': {
            border: 'none !important',
          },
          border: '1px solid #e0e7ef !important',
          '&:hover': {
            border: '1px solid #00bfc6 !important',
          },
          '&.Mui-focused': {
            border: '2px solid #00bfc6 !important',
          },
        },
      }} />
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/sip" element={<SipCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 