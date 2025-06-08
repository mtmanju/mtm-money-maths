import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import MutualFundCalculator from './pages/MutualFundCalculator';
import CagrCalculator from './pages/CagrCalculator';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/calculators/sip" element={<SipCalculator />} />
        <Route path="/calculators/emi" element={<EmiCalculator />} />
        <Route path="/calculators/mutual-fund" element={<MutualFundCalculator />} />
        <Route path="/calculators/cagr" element={<CagrCalculator />} />
      </Routes>
    </Layout>
  );
}

export default App; 