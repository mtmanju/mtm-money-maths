import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import FdCalculator from './pages/FdCalculator';
import RdCalculator from './pages/RdCalculator';
import PpfCalculator from './pages/PpfCalculator';
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
              <Route path="/fd" element={<FdCalculator />} />
              <Route path="/rd" element={<RdCalculator />} />
              <Route path="/ppf" element={<PpfCalculator />} />
              <Route path="/nps" element={<NotFound />} />
              <Route path="/gratuity" element={<NotFound />} />
              <Route path="/hra" element={<NotFound />} />
              <Route path="/income-tax" element={<NotFound />} />
              <Route path="/gst" element={<NotFound />} />
              <Route path="/mutual-fund" element={<NotFound />} />
              <Route path="/investment" element={<NotFound />} />
              <Route path="/loan-comparison" element={<NotFound />} />
              <Route path="/retirement" element={<NotFound />} />
              <Route path="/roi" element={<NotFound />} />
              <Route path="/cagr" element={<NotFound />} />
              <Route path="/compound" element={<NotFound />} />
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