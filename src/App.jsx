import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import CompanySlider from './components/CompanySlider';
import Footer from './components/Footer';
import CompanyLogin from './components/CompanyLogin'; 

const HomePage = () => {
  return (
    <>
      <HeroVideo />
      <CompanySlider />
    </>
  );
};

const PonudaPage = () => (
  <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
    <h2 className="text-4xl font-bold text-slate-800 mb-4">Ponuda poslova</h2>
    <p className="text-slate-500 text-lg">Trenutno nemamo aktivnih oglasa.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ponuda" element={<PonudaPage />} />
            <Route path="/kompanije" element={<CompanyLogin />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;