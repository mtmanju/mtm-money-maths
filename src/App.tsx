import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import CagrCalculator from './pages/CagrCalculator';
import MutualFundCalculator from './pages/MutualFundCalculator';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/cagr" element={<CagrCalculator />} />
            <Route path="/calculators/mutual-fund" element={<MutualFundCalculator />} />
            <Route path="/calculators/sip" element={<SipCalculator />} />
            <Route path="/calculators/emi" element={<EmiCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App; 