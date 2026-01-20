import React from 'react';
import { Menu, Code2 } from 'lucide-react';

const Navbar = ({ theme, scrolled, onScrollTo, setIsMenuOpen }) => {
  return (
    <nav className={`fixed w-full z-[120] transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/10' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className={`w-8 h-8 rounded-lg ${theme.lineColor} flex items-center justify-center shadow-lg`}>
            <Code2 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Core<span className={theme.accent}>.Build</span>
          </span>
        </div>

        {/* Links Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {['processo', 'solucoes', 'catalogo'].map(id => (
            <button 
              key={id} 
              onClick={() => onScrollTo(id)} 
              className="text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors capitalize"
            >
              {id}
            </button>
          ))}
          <button 
            onClick={() => onScrollTo('contato')} 
            className={`${theme.button} text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all shadow-lg`}
          >
            Orçamento
          </button>
        </div>

        {/* Botão Menu Mobile */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;