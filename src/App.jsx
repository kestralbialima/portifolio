import './index.css'; // Certifique-se de que esta linha existe no topo do App.jsx ou main.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Palette, Code2, Rocket, Smartphone, 
  ShoppingCart, Building2, X, ChevronRight 
} from 'lucide-react';

// 1. Importando os dados
import { themes } from './data/themes'; 

// 2. Importando os componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import BackgroundEffects from './components/BackgroundEffects';

const App = () => {
  const [activeTheme, setActiveTheme] = useState('default');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const theme = themes[activeTheme];

  // Lógica de Scroll para a Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função de Scroll Suave
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Dados organizados para as seções
  const steps = [
    { title: "Estratégia", desc: "Mapeamos o DNA do seu negócio para criar uma rota de sucesso.", icon: <Search className="w-6 h-6" /> },
    { title: "Design", desc: "Interfaces exclusivas que comunicam valor à primeira vista.", icon: <Palette className="w-6 h-6" /> },
    { title: "Engenharia", desc: "Código performático focado em velocidade e conversão.", icon: <Code2 className="w-6 h-6" /> },
    { title: "Resultado", desc: "Entrega total com suporte para você focar no que importa.", icon: <Rocket className="w-6 h-6" /> }
  ];

  const plans = [
    { title: "Landing Page", desc: "Focada em conversão rápida e anúncios diretos.", icon: <Smartphone /> },
    { title: "Vitrine Digital", desc: "Catálogo inteligente integrado ao WhatsApp sem mensalidade.", icon: <ShoppingCart />, popular: true },
    { title: "Sistema Custom", desc: "Soluções robustas com painéis administrativos sob medida.", icon: <Building2 /> }
  ];

  const faqs = [
    { q: "Vou ficar preso a mensalidades?", a: "Não para sites padrão. Você paga apenas pelo desenvolvimento." },
    { q: "O site é otimizado para o Google?", a: "Sim. Aplicamos as melhores práticas de SEO técnico e velocidade." },
    { q: "Terei acesso aos meus dados?", a: "Com certeza. Ao final do projeto, você recebe total propriedade." }
  ];

  return (
    <div className={`min-h-screen font-sans text-slate-300 transition-colors duration-1000 overflow-x-hidden relative ${theme.bg}`}>
      
      <BackgroundEffects theme={theme} />

      <Navbar 
        theme={theme} 
        scrolled={scrolled} 
        onScrollTo={scrollTo} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '100%' }} 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-10"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
            {['processo', 'solucoes', 'catalogo'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-3xl font-black uppercase text-white">{id}</button>
            ))}
            <button onClick={() => scrollTo('contato')} className={`px-10 py-4 ${theme.button} text-white rounded-2xl font-black uppercase`}>Orçamento</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero theme={theme} activeTheme={activeTheme} />

        {/* Seção Metodologia */}
        <section id="processo" className="py-24 px-6 border-t border-white/5 bg-white/[0.01] z-20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white uppercase mb-4">Metodologia Core</h2>
            <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${theme.gradient} mb-16`}></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              {steps.map((step, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                  <div className={`${theme.accent} mb-6`}>{step.icon}</div>
                  <h4 className="text-lg font-black text-white mb-3 uppercase">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção Soluções */}
        <section id="solucoes" className="py-24 px-6 z-20 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white uppercase mb-4">Soluções Smart</h2>
            <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${theme.gradient} mb-16`}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {plans.map((plan, i) => (
                <div key={i} className={`p-10 rounded-[3rem] border transition-all ${plan.popular ? 'bg-white/[0.05] border-white/20 shadow-2xl' : 'bg-white/[0.01] border-white/5'}`}>
                  <div className={`${theme.accent} mb-8`}>{plan.icon}</div>
                  <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{plan.title}</h3>
                  <p className="text-slate-400 text-xs mb-8 leading-relaxed font-medium">{plan.desc}</p>
                  <button onClick={() => scrollTo('contato')} className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest ${plan.popular ? theme.button + ' text-white' : 'bg-white/5 text-white'}`}>Saber Mais</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Portfolio theme={theme} activeTheme={activeTheme} onSetTheme={setActiveTheme} />

        {/* Seção FAQ */}
        <section className="py-24 px-6 border-t border-white/5 z-20 relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white uppercase mb-12 text-center italic underline decoration-white/10 underline-offset-8">Dúvidas Frequentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center hover:bg-white/[0.05] transition-colors">
                    <span className="font-bold text-white uppercase text-xs tracking-tight">{faq.q}</span>
                    <ChevronRight className={`transition-transform duration-500 ${openFaq === i ? 'rotate-90' : ''} ${theme.accent}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-400 text-xs leading-relaxed font-medium">
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact theme={theme} />
      </main>

      {/* Seletor de Temas Flutuante */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] px-4 w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-3xl shadow-2xl flex justify-between items-center gap-2">
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`flex-1 py-3 rounded-2xl text-[10px] sm:text-xs font-bold transition-all uppercase ${activeTheme === t ? 'bg-white text-black shadow-lg' : 'text-white hover:bg-white/10'}`}
            >
              {themes[t].name}
            </button>
          ))}
        </div>
      </div>

      <footer className="py-16 text-center opacity-40 text-[11px] font-black uppercase tracking-[1.5em] z-20 relative">
        Core.Build 2026
      </footer>
    </div>
  );
};

export default App;