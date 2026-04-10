import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Adicionada a prop onScrollTo para permitir o clique no ícone
const Hero = ({ theme, activeTheme, onScrollTo }) => {
  return (
    <section className="relative pt-44 pb-20 px-6 text-center z-20 min-h-[85vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTheme} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }} 
          transition={{ duration: 0.5 }}
        >
          <h1 className={`${theme.fontSize} font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase text-center`}>
            {theme.heroTitle.split(' ').map((word, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <React.Fragment key={i}>
                  <span 
                    className={`relative inline-block ${isLast ? `bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent pr-[0.1em]` : ""}`} 
                    style={isLast ? { filter: `drop-shadow(0 0 25px ${theme.glow})` } : {}}
                  >
                    {word}
                    {isLast && (
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '100%' }} 
                        transition={{ delay: 0.8, duration: 1 }} 
                        className={`absolute -bottom-2 left-0 h-[4px] md:h-[8px] rounded-full ${theme.lineColor} opacity-80`} 
                      />
                    )}
                  </span>
                  {i < arr.length - 1 && "\u00A0"}
                </React.Fragment>
              );
            })}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm uppercase tracking-[0.4em] font-black italic max-w-xl mx-auto text-center">
            {theme.subTitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Ícone de scroll convertido em BOTÃO com evento de clique */}
      <motion.button 
        onClick={() => onScrollTo('processo')} // Ancoragem para a seção de Metodologia
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 3, repeat: Infinity }} 
        className="mt-20 opacity-20 hover:opacity-100 transition-opacity cursor-pointer mx-auto block group"
      >
        <ChevronDown 
          className="mx-auto text-white group-hover:scale-125 transition-transform" 
          size={32} 
        />
        <span className="sr-only">Rolar para Metodologia</span>
      </motion.button>
    </section>
  );
};

export default Hero;