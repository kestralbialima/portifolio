import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../data/socialLinks';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = ({ theme }) => {
  if (!theme) return null;

  // Filtramos para exibir apenas Instagram e Facebook
  const filteredLinks = socialLinks.filter(link => 
    ['instagram', 'facebook'].includes(link.name.toLowerCase())
  );

  return (
    <footer className={`w-full pt-20 pb-44 flex flex-col items-center justify-center relative border-t border-white/5 transition-colors duration-1000 ${theme.bg}`}>
      
      {/* Frase de Destaque com animação de entrada */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4"
      >
        <h3 className="text-white/30 uppercase tracking-[0.3em] text-[10px] mb-3 font-black">
          Conecte-se com a Core.Build
        </h3>
        <h2 className={`text-4xl md:text-6xl font-black bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent uppercase tracking-tighter`}>
          Me siga nas redes
        </h2>
      </motion.div>

      {/* Grid de Redes Sociais com Movimento Corrigido */}
      <div className="flex gap-6 z-10">
        {filteredLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl transition-all ${theme.accent}`}
            
            // CONFIGURAÇÃO DE MOVIMENTO (UX MELHORADO)
            whileHover={{ 
              y: -12, // Sobe o ícone
              scale: 1.15, // Aumenta levemente
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              // Brilho intenso usando a cor do tema
              boxShadow: `0px 15px 45px ${theme.glow}`, 
            }}
            // Física de mola para o movimento não ser "duro"
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {link.name.toLowerCase().includes('instagram') ? <FaInstagram /> : <FaFacebook />}
          </motion.a>
        ))}
      </div>

      {/* Assinatura Final */}
      <div className="mt-20 opacity-30">
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">
          Core.Build <span className={theme.accent}>Since 2026</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;