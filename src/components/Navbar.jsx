import React from 'react';
// IMPORTANTE: Incluímos o 'X' e o 'Menu' para a alternância do menu mobile
import { Menu, X, Code2 } from 'lucide-react'; 

/**
 * Componente Navbar
 * @param {Object} theme - Objeto de cores do tema ativo
 * @param {Boolean} scrolled - Estado que indica se a página sofreu scroll
 * @param {Function} onScrollTo - Função para navegação suave entre seções
 * @param {Boolean} isMenuOpen - Estado do menu mobile (aberto/fechado)
 * @param {Function} setIsMenuOpen - Função para alterar o estado do menu
 */
const Navbar = ({ theme, scrolled, onScrollTo, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className={`fixed w-full z-[120] transition-all duration-300 ${
      scrolled
        ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/10'
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO E BOTÃO HOME */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={`w-8 h-8 rounded-lg ${theme.lineColor} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
            <Code2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Core<span className={theme.accent}>.Build</span>
          </span>
        </div>

        {/* LINKS DESKTOP (Escondidos em telas pequenas) */}
        <div className="hidden md:flex gap-8 items-center">
          {['processo', 'solucoes', 'faq'].map(id => (
            <button
              key={id}
              onClick={() => onScrollTo(id)}
              className="text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors capitalize"
            >
              {id}
            </button>
          ))}
          
          {/* BOTÃO DE ORÇAMENTO (CTA Principal) */}
          <button
            onClick={() => onScrollTo('contato')}
            className={`${theme.button} text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all shadow-lg hover:scale-105 active:scale-95`}
          >
            Orçamento
          </button>
        </div>

        {/* BOTÃO MENU MOBILE (Aparece apenas em telas pequenas) */}
        <button
          className="md:hidden text-white p-2 relative z-[210] outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Inverte o estado atual do menu
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            // Ícone X com animação de entrada suave
            <X size={28} className="animate-in fade-in zoom-in duration-300" />
          ) : (
            // Ícone Menu Hamburguer com animação de entrada suave
            <Menu size={28} className="animate-in fade-in zoom-in duration-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;