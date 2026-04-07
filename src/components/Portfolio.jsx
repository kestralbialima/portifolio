import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MousePointer2, Sparkles } from 'lucide-react';
import { themes } from '../data/themes';

const Portfolio = ({ theme, activeTheme, onSetTheme, selectedCategory }) => {

  // 1. DADOS DE PROJETOS (Memorizados para estabilidade de referência)
  const cases = useMemo(() => [
    {
      category: "criativos",
      type: "Landing Page",
      title: "Washington Cezar Tattoo",
      demo: "kestralbialima.github.io/projeto-wcezar/",
      image: "/site-wcezar.jpg",
      description: "Design imersivo focado em atrair leads qualificados e valorizar o trabalho do artista através de uma estética dark e exclusiva.",
      imageColor: "from-red-900/40 to-black"
    },
    {
      category: "gastronomia",
      type: "Vitrine Digital",
      demo: "kestralbialima.github.io/confeitaria/",
      image: "/cor-de-abobora.png",
      title: "Confeitaria Artesanal",
      description: "Vendas diretas via WhatsApp com catálogo dinâmico, eliminando taxas de aplicativos e facilitando a gestão de pedidos.",
      imageColor: "from-orange-900/40 to-black"
    },
    
    {
      category: "corporativo",
      type: "Landing Page",
      title: "Marco Alcaraz Assessoria",
      demo: "kestralbialima.github.io/marco-/",
      image: "/marco.jpeg",
      description: "Portal jurídico focado em autoridade digital, projetado para transmitir confiança e converter visitantes em clientes potenciais.",
      imageColor: "from-cyan-900/40 to-black"
    },
    {
      category: "estetica", // Você precisará criar este tema no themes.js
      type: "Landing Page",
      title: "Clínica de Estética Projeto disponível",
      demo: "kestralbialima.github.io/landing-page-estetica-essenza/",
      image: "/essenza.png",
      description: "Landing page de alta conversão com foco em agendamentos diretos e apresentação de procedimentos estéticos disponível para aquisição.",
      imageColor: "from-rose-100/40 to-white"
    }
  ], []);

  // 2. FILTRAGEM DE SEGMENTOS (Inteligente)
  // Adicionamos 'themes' e 'cases' às dependências para garantir que o React rastreie tudo corretamente
  const availableThemes = useMemo(() => {
    return Object.keys(themes).filter(tKey => {
      if (tKey === 'default') return false;
      return cases.some(c => c.category === tKey && c.type === selectedCategory);
    });
  }, [selectedCategory, cases]);

  // Busca o projeto ativo baseado no tema e categoria
  const activeProject = useMemo(() => {
    return cases.find(c => c.category === activeTheme && c.type === selectedCategory);
  }, [cases, activeTheme, selectedCategory]);

  return (
    <div className="w-full max-w-5xl mx-auto px-6">

      {/* MENU DE SEGMENTOS (Seletor) */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {availableThemes.map((tKey, i) => (
          <motion.button
            key={tKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSetTheme(tKey)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black transition-all uppercase border 
              ${activeTheme === tKey
                ? `bg-white text-black border-white shadow-xl`
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
          >
            {themes[tKey].name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center text-center"
          >
            {/* TÍTULO E DESCRIÇÃO */}
            <div className="mb-12 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                <Sparkles size={12} className={theme.accent} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">
                  {selectedCategory} • {theme.name}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
                {theme.heroTitle}
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                {activeProject.description}
              </p>
            </div>

            {/* CARD DO PROJETO COM BOTÃO CENTRAL */}
            <div className="w-full relative group cursor-pointer">

              {/* Efeito de brilho externo */}
              <div className={`absolute -inset-2 bg-linear-to-r ${theme.gradient} rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`}></div>

              {/* Container da Imagem */}
              <div className="relative aspect-video md:aspect-21/9 w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">

                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">

                  <motion.a
                    href={`https://${activeProject.demo}`}
                    target="_blank"
                    rel="noreferrer"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 rounded-2xl font-black uppercase text-[10px] md:text-xs transition-all ${theme.button} text-white shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10`}
                  >
                    Ver Demonstração Ativa <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>

              {/* OBSERVAÇÃO DE INTERAÇÃO */}
              <div className="mt-6 flex items-center justify-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className={`h-px w-12 ${theme.lineColor}`}></div>
                <div className="flex items-center gap-2">
                  <MousePointer2 size={14} className={theme.accent} />
                  <span className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] text-white">
                    Clique na imagem para interagir com o protótipo
                  </span>
                </div>
                <div className={`h-px w-12 ${theme.lineColor}`}></div>
              </div>
            </div>

          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-slate-600 animate-pulse">
              Selecione um segmento acima para carregar o projeto
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;