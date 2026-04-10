import './index.css';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

import { themes } from './data/themes';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView'; // O novo componente
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import BackgroundEffects from './components/BackgroundEffects';
import Footer from './components/Footer';

const App = () => {
  // --- ESTADOS GLOBAIS ---
  const [activeTheme, setActiveTheme] = useState('default');
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- ESTADOS DE UI ---
  const theme = themes[activeTheme];
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // --- LÓGICA DE NAVEGAÇÃO E HISTÓRICO ---
  useEffect(() => {
    // Garante que o estado inicial seja a Home para o botão 'voltar' não sair do site
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, "");
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (state?.view === 'catalogo') {
        setView('catalogo');
        setSelectedCategory(state.cat);
      } else {
        setView('home');
        setActiveTheme('default');
        setSelectedCategory(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Monitor de scroll (Navbar glassmorphism)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProjects = useCallback((categoryName) => {
    setSelectedCategory(categoryName);
    setView('catalogo');
    window.history.pushState({ view: 'catalogo', cat: categoryName }, "");
    window.scrollTo({ top: 0, behavior: 'instant' }); 
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    setActiveTheme('default');
    setSelectedCategory(null);
    
    // Se estivermos no catálogo, o botão volta um passo na história
    if (window.history.state?.view === 'catalogo') {
      window.history.back();
    }

    setTimeout(() => {
      const element = document.getElementById('solucoes');
      if (element) {
        const offset = element.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const scrollTo = useCallback((id) => {
    if (view === 'catalogo') {
      handleBackToHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 350);
    } else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, [view, handleBackToHome]);

  return (
    <div className={`min-h-screen font-sans text-slate-300 overflow-x-hidden relative transition-colors duration-1000 ${theme.bg}`}>
      <BackgroundEffects theme={theme} />
      <Navbar theme={theme} scrolled={scrolled} onScrollTo={scrollTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="relative pt-20">
        <AnimatePresence mode="wait">
          
          {/* ROTA DA HOME */}
          {view === 'home' && (
            <HomeView 
              theme={theme} 
              onOpenProjects={handleOpenProjects} 
              openFaq={openFaq} 
              setOpenFaq={setOpenFaq} 
              onScrollTo={scrollTo} // <--- ADICIONE ESTA LINHA AQUI
            />
          )}

          {/* ROTA DO CATÁLOGO */}
          {view === 'catalogo' && (
            <motion.div 
              key="catalogo" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="min-h-screen pb-24"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="max-w-7xl mx-auto px-6 pt-8 text-center">
                <motion.button
                  onClick={handleBackToHome}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-3 mx-auto mb-10 px-8 py-3 rounded-full border border-white/10 bg-white/5 overflow-hidden"
                >
                  <div className={`absolute inset-0 opacity-15 blur-xl bg-linear-to-r ${theme.gradient}`}></div>
                  <ArrowLeft size={16} className={`relative z-10 ${theme.accent}`} />
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Voltar para Home</span>
                </motion.button>

                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">{selectedCategory}</h2>
                <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-8`}></div>
              </div>
              
              <Portfolio 
                theme={theme} 
                activeTheme={activeTheme} 
                onSetTheme={setActiveTheme} 
                selectedCategory={selectedCategory} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* OVERLAY DO MENU MOBILE */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
            >
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white p-2">
                <X size={32} />
              </button>
              {['processo', 'solucoes', 'faq'].map(id => (
                <button key={id} onClick={() => scrollTo(id)} className="text-3xl font-black uppercase text-white hover:brightness-125 transition-all">{id}</button>
              ))}
              <button onClick={() => scrollTo('contato')} className={`px-10 py-4 ${theme.button} text-white rounded-2xl font-black uppercase shadow-2xl`}>Orçamento</button>
            </motion.div>
          )}
        </AnimatePresence>

        <Contact theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default App;