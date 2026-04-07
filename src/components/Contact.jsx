import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Linkedin } from 'lucide-react';

const Contact = ({ theme }) => {
  return (
    <section id="contato" className="py-20 px-6 z-20 relative text-center">
      {/* Reduzido o padding de p-16 para p-10 e arredondamento para 3rem */}
      <div className="max-w-4xl mx-auto bg-white/[0.03] rounded-[3rem] p-10 md:p-14 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
        
        {/* Linha decorativa no topo do card */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Título: Reduzido de 7xl para 5xl no desktop e de 4xl para 3xl no mobile */}
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.95] text-center">
          VAMOS TIRAR A SUA <br className="hidden md:block" /> IDEIA DO PAPEL?
        </h2>

        {/* Descrição: Reduzido o texto para base/lg e margem inferior */}
        <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium text-base md:text-lg leading-relaxed text-center">
          Estou pronta para construir a ferramenta técnica que o seu negócio precisa para se destacar da concorrência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Botão WhatsApp */}
          <motion.a
            href="https://wa.me/5541984107096"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            {/* Reduzido o padding e o tamanho do texto (px-8 py-4 / text-lg) */}
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg w-full transition-colors hover:bg-slate-100">
              <MessageSquare size={22} className="text-black" strokeWidth={3} /> WhatsApp
            </button>
          </motion.a>
        
          {/* Botão LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/bianca-lima-0717832b0/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <div className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 w-full hover:bg-white/10 transition-all">
              <Linkedin size={22} strokeWidth={3} /> LinkedIn
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;