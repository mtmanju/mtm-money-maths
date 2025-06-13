import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import CagrCalculator from './pages/CagrCalculator';
import RoiCalculator from './pages/RoiCalculator';
import CompoundCalculator from './pages/CompoundCalculator';
import LoanCalculator from './pages/LoanCalculator';
import FdCalculator from './pages/FdCalculator';
import InvestmentCalculator from './pages/InvestmentCalculator';
import LoanComparisonCalculator from './pages/LoanComparisonCalculator';
import RetirementCalculator from './pages/RetirementCalculator';
import MutualFundCalculator from './pages/MutualFundCalculator';
import TaxCalculator from './pages/TaxCalculator';
import NotFound from './pages/NotFound';
import Calculators from './pages/Calculators';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/sip" element={<SipCalculator />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/cagr" element={<CagrCalculator />} />
              <Route path="/roi" element={<RoiCalculator />} />
              <Route path="/compound" element={<CompoundCalculator />} />
              <Route path="/loan" element={<LoanCalculator />} />
              <Route path="/fd" element={<FdCalculator />} />
              <Route path="/investment" element={<InvestmentCalculator />} />
              <Route path="/loan-comparison" element={<LoanComparisonCalculator />} />
              <Route path="/retirement" element={<RetirementCalculator />} />
              <Route path="/mutual-fund" element={<MutualFundCalculator />} />
              <Route path="/tax" element={<TaxCalculator />} />
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