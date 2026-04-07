import './index.css';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// CORREÇÃO: Adicionados 'X', 'ChevronRight' e 'Menu' aos imports
import {
  Search, Palette, Code2, Rocket, Smartphone,
  ShoppingCart, Building2, ArrowLeft, X, ChevronRight, Menu
} from 'lucide-react';

import { themes } from './data/themes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import BackgroundEffects from './components/BackgroundEffects';
import About from './components/About';
import Footer from './components/Footer';

/**
 * Componente Principal (App)
 * Gerencia o estado de temas, navegação Home/Catálogo e scroll suave.
 */
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

  // Monitor de scroll para estilização da Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * handleOpenProjects
   * Ativa a visão de catálogo para uma categoria específica.
   */
  const handleOpenProjects = useCallback((categoryName) => {
    setSelectedCategory(categoryName);
    setView('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /**
   * handleBackToHome
   * Retorna à Home e ancora na seção de Soluções com delay para renderização.
   */
  const handleBackToHome = useCallback(() => {
    setView('home');
    setActiveTheme('default');
    setSelectedCategory(null);

    setTimeout(() => {
      const element = document.getElementById('solucoes');
      if (element) {
        const offsetPosition = element.offsetTop - 80;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 300); // Delay de 300ms para estabilidade do DOM
  }, []);

  /**
   * scrollTo
   * Gerencia navegação suave entre seções, lidando com trocas de view.
   */
  const scrollTo = useCallback((id) => {
    if (view === 'catalogo' && ['processo', 'solucoes', 'faq', 'sobre'].includes(id)) {
      handleBackToHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }, 350);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  }, [view, handleBackToHome]);

  // --- CONTEÚDO ESTÁTICO ---
  const steps = [
    { title: "Estratégia", desc: "Imersão profunda no DNA do seu negócio para traçar rotas estratégicas focadas em conversão.", icon: <Search className="w-6 h-6" /> },
    { title: "Design", desc: "Interfaces exclusivas (UI/UX) que guiam o usuário intuitivamente até a compra.", icon: <Palette className="w-6 h-6" /> },
    { title: "Engenharia", desc: "Código limpo e ultraperformático para garantir carregamento instantâneo.", icon: <Code2 className="w-6 h-6" /> },
    { title: "Resultado", desc: "Suporte técnico dedicado para sua presença digital escalar vendas.", icon: <Rocket className="w-6 h-6" /> }
  ];

  const plans = [
    { title: "Landing Page", desc: "Páginas de alta conversão focadas em transformar cliques em vendas reais.", icon: <Smartphone /> },
    { title: "Vitrine Digital", desc: "Catálogo inteligente integrado ao WhatsApp, permitindo vendas 24h.", icon: <ShoppingCart />, popular: true },
    { title: "Sistema Custom", desc: "Painéis administrativos sob medida para processos complexos e seguros.", icon: <Building2 /> }
  ];

  const faqs = [
    { q: "Vou ficar preso a mensalidades?", a: "Pague apenas pelo desenvolvimento. Mensalidades só para sistemas que exigem servidores robustos." },
    { q: "O site funciona bem em celulares?", a: "Sim, usamos metodologia Mobile-First para velocidade e usabilidade impecáveis." },
    { q: "O site é otimizado para o Google?", a: "Sim, aplicamos SEO técnico para máxima visibilidade nos motores de busca." },
    { q: "Terei acesso aos meus dados?", a: "Sim, você recebe total propriedade do código-fonte e acesso aos dados." },
    { q: "Quanto tempo demora?", a: "Landing Pages em até 7 dias; sistemas complexos variam conforme o escopo." }
  ];

  return (
    <div className={`min-h-screen font-sans text-slate-300 overflow-x-hidden relative transition-colors duration-1000 ${theme.bg}`}>
      <BackgroundEffects theme={theme} />
      <Navbar theme={theme} scrolled={scrolled} onScrollTo={scrollTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="relative pt-20">
        <AnimatePresence mode="wait">

          {/* VIEW 1: HOME */}
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero theme={theme} />

              <section id="processo" className="py-24 px-6 border-t border-white/5 bg-white/1 z-20">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-3xl font-black text-white uppercase mb-4">Metodologia Core</h2>
                  <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-16`}></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                    {steps.map((step, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-[2rem] bg-white/3 border border-white/10 backdrop-blur-sm">
                        <div className={`${theme.accent} mb-6`}>{step.icon}</div>
                        <h4 className="text-lg font-black text-white mb-3 uppercase">{step.title}</h4>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium"> {step.desc} </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="solucoes" className="py-24 px-6 z-20 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-3xl font-black text-white uppercase mb-4">Soluções Smart</h2>
                  <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-16`}></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {plans.map((plan, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`p-10 rounded-[3rem] border transition-all ${plan.popular ? 'bg-white/5 border-white/20 shadow-2xl' : 'bg-white/1 border-white/5'}`}>
                        <div className={`${theme.accent} mb-8`}>{plan.icon}</div>
                        <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{plan.title}</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{plan.desc}</p>
                        <button onClick={() => handleOpenProjects(plan.title)} className={`w-full py-4 rounded-xl font-black text-[15px] uppercase tracking-widest transition-all ${plan.popular ? theme.button + ' text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}>Explorar {plan.title}</button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              <About theme={theme} />

              <section id="faq" className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-white uppercase mb-4">Dúvidas Frequentes</h2>
                    <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient}`}></div>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors group">
                          <span className="font-bold text-white uppercase text-sm">{faq.q}</span>
                          <ChevronRight className={`transition-transform duration-500 ${openFaq === i ? 'rotate-90' : ''} ${theme.accent}`} />
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-400 text-sm leading-relaxed font-medium">
                              <div className="pt-2 border-t border-white/5">{faq.a}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* VIEW 2: CATÁLOGO */}
          {view === 'catalogo' && (
            <motion.div key="catalogo" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-screen pb-24">
              <div className="max-w-7xl mx-auto px-6 pt-8 text-center">
                <motion.button
                  onClick={handleBackToHome}
                  whileHover={{ scale: 1.05 }}
                  className="group relative flex items-center gap-3 mx-auto mb-10 px-8 py-3 rounded-full border border-white/10 bg-white/5"
                >
                  <div className={`absolute inset-0 opacity-15 blur-xl bg-linear-to-r ${theme.gradient}`}></div>
                  <ArrowLeft size={16} className={`relative z-10 ${theme.accent}`} />
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Voltar para Home</span>
                </motion.button>

                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">{selectedCategory}</h2>
                <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-8`}></div>
              </div>
              <Portfolio theme={theme} activeTheme={activeTheme} onSetTheme={setActiveTheme} selectedCategory={selectedCategory} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* MENU MOBILE OVERLAY - CORREÇÃO DO X */}
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
                <button key={id} onClick={() => scrollTo(id)} className="text-3xl font-black uppercase text-white">{id}</button>
              ))}
              <button onClick={() => scrollTo('contato')} className={`px-10 py-4 ${theme.button} text-white rounded-2xl font-black uppercase`}>Orçamento</button>
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