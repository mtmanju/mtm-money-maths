import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import SipCalculator from './pages/SipCalculator';
import EmiCalculator from './pages/EmiCalculator';
import FdCalculator from './pages/FdCalculator';
import RdCalculator from './pages/RdCalculator';
import PpfCalculator from './pages/PpfCalculator';
import NpsCalculator from './pages/NpsCalculator';
import GratuityCalculator from './pages/GratuityCalculator';
import HraCalculator from './pages/HraCalculator';
import IncomeTaxCalculator from './pages/IncomeTaxCalculator';
import GstCalculator from './pages/GstCalculator';
import MutualFundCalculator from './pages/MutualFundCalculator';
import InvestmentCalculator from './pages/InvestmentCalculator';
import LoanComparisonCalculator from './pages/LoanComparisonCalculator';
import RetirementCalculator from './pages/RetirementCalculator';
import RoiCalculator from './pages/RoiCalculator';
import CagrCalculator from './pages/CagrCalculator';
import CompoundCalculator from './pages/CompoundCalculator';
import NotFound from './pages/NotFound';
import Calculators from './pages/Calculators';
import ScrollToTop from './components/ScrollToTop';
import About from './pages/About';
import FAQ from './pages/FAQ';
import { globalStyles } from './styles/globalStyles';
import './styles/global.css';
import './styles/mobile.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles(theme)} />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/sip" element={<SipCalculator />} />
              <Route path="/fd" element={<FdCalculator />} />
              <Route path="/rd" element={<RdCalculator />} />
              <Route path="/ppf" element={<PpfCalculator />} />
              <Route path="/nps" element={<NpsCalculator />} />
              <Route path="/gratuity" element={<GratuityCalculator />} />
              <Route path="/hra" element={<HraCalculator />} />
              <Route path="/income-tax" element={<IncomeTaxCalculator />} />
              <Route path="/gst" element={<GstCalculator />} />
              <Route path="/mutual-fund" element={<MutualFundCalculator />} />
              <Route path="/investment" element={<InvestmentCalculator />} />
              <Route path="/loan-comparison" element={<LoanComparisonCalculator />} />
              <Route path="/retirement" element={<RetirementCalculator />} />
              <Route path="/roi" element={<RoiCalculator />} />
              <Route path="/cagr" element={<CagrCalculator />} />
              <Route path="/compound" element={<CompoundCalculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 