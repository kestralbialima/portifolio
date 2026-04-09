import React, { useMemo, useEffect, useState } from 'react'; // Adicionei useState
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MousePointer2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'; // Ícones novos
import { themes } from '../data/themes';

const Portfolio = ({ theme, activeTheme, onSetTheme, selectedCategory }) => {
  // Estado para controlar quais descrições estão expandidas (por ID)
  const [expandedId, setExpandedId] = useState(null);

  const cases = useMemo(() => [
    {
      id: "tattoo-01",
      category: "criativos",
      type: "Landing Page",
      title: "Washington Cezar Tattoo",
      demo: "kestralbialima.github.io/projeto-wcezar/",
      image: "wcezar.jpg",
      description: "Design imersivo focado em atrair leads qualificados e valorizar o trabalho do artista através de uma estética dark e exclusiva.",
      imageColor: "from-red-900/40 to-black"
    },
    {
      id: "confeitaria-01",
      category: "gastronomia",
      type: "Vitrine Digital",
      demo: "kestralbialima.github.io/confeitaria/",
      image: "cor-de-abobora.png",
      title: "Confeitaria Artesanal",
      description: "Vendas diretas via WhatsApp com catálogo dinâmico, eliminando taxas de aplicativos e facilitando a gestão de pedidos.",
      imageColor: "from-orange-900/40 to-black"
    },
    {
      id: "burger-01",
      category: "gastronomia",
      type: "Vitrine Digital",
      demo: "kestralbialima.github.io/dev-burger/", 
      image: "hamburgueria.png", 
      title: "Sua Hamburgueria",
      description: "Sistema de vitrine digital de alta performance para delivery. Disponível para licenciamento imediato: uma solução completa pronta para o seu próximo dono.",
      imageColor: "from-red-900/40 to-black"
    },
    {
      id: "juridico-01",
      category: "corporativo",
      type: "Landing Page",
      title: "Marco Alcaraz Assessoria",
      demo: "kestralbialima.github.io/marco-/",
      image: "marco.jpeg",
      description: "Portal jurídico focado em autoridade digital, projetado para transmitir confiança e converter visitantes em clientes potenciais.",
      imageColor: "from-cyan-900/40 to-black"
    },
    {
      id: "estetica-01",
      category: "estetica", 
      type: "Landing Page",
      title: "Clínica Essenza",
      demo: "kestralbialima.github.io/landing-page-estetica-essenza/",
      image: "essenza.png",
      description: "Landing page de alta conversão com foco em agendamentos diretos e apresentação de procedimentos estéticos disponível para aquisição.",
      imageColor: "from-rose-100/40 to-white"
    },
    {
      id: "psico-custom-01",
      category: "psicanalise",
      type: "Sistema Customizado",
      title: "Clínica de Psicanálise",
      demo: "project-fabi.netlify.app/", 
      image: "fabi.png", 
      description: "Plataforma personalizada com Área Administrativa protegida por autenticação multifator. Desenvolvido para gestão de prontuários e cadastro de pacientes com armazenamento blindado via Acronis. Segurança de dados em nível bancário para garantir total sigilo clínico e conformidade técnica rigorosa de acordo com a necessidade do cliente.",
      imageColor: "from-emerald-900/40 to-black"
    }
  ], []);

  const availableThemes = useMemo(() => {
    return Object.keys(themes).filter(tKey => {
      if (tKey === 'default') return false;
      const searchKey = selectedCategory.split(' ')[0].toLowerCase();
      return cases.some(c => 
        c.category === tKey && 
        c.type.toLowerCase().includes(searchKey)
      );
    });
  }, [selectedCategory, cases]);

  const filteredProjects = useMemo(() => {
    const searchKey = selectedCategory.split(' ')[0].toLowerCase();
    return cases.filter(c => 
      c.category === activeTheme && 
      c.type.toLowerCase().includes(searchKey)
    );
  }, [cases, activeTheme, selectedCategory]);

  useEffect(() => {
    if (availableThemes.length > 0 && !availableThemes.includes(activeTheme)) {
      onSetTheme(availableThemes[0]);
    }
    setExpandedId(null); // Reseta a expansão ao trocar de tema
  }, [selectedCategory, availableThemes, activeTheme, onSetTheme]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      
      {/* MENU DE SEGMENTOS */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {availableThemes.map((tKey, i) => (
          <motion.button
            key={tKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSetTheme(tKey)}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase border transition-all
              ${activeTheme === tKey ? `bg-white text-black border-white shadow-xl` : 'bg-white/5 text-white border-white/10'}`}
          >
            {themes[tKey].name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedId === project.id;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-8 w-full max-w-3xl">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                    <Sparkles size={12} className={theme.accent} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">
                      {project.type} • {themes[activeTheme].name}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white leading-tight mb-4 uppercase tracking-tighter">
                    {project.title}
                  </h3>

                  {/* DESCRIÇÃO EXPANSÍVEL */}
                  <div className="relative">
                    <p className={`text-slate-400 text-sm leading-relaxed font-medium transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-[60px]'}`}>
                      {project.description}
                    </p>
                    
                    <button 
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className={`mt-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 mx-auto transition-colors hover:brightness-125 ${theme.accent}`}
                    >
                      {isExpanded ? (
                        <>Ver menos <ChevronUp size={14} /></>
                      ) : (
                        <>Ler descrição completa <ChevronDown size={14} /></>
                      )}
                    </button>
                  </div>
                </div>

                {/* CARD COM IMAGEM E BOTÃO PULSANTE */}
                <div className="w-full relative group cursor-pointer">
                  <div className={`absolute -inset-2 bg-linear-to-r ${theme.gradient} rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`}></div>
                  <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <motion.a
                        href={project.demo.startsWith('http') ? project.demo : `https://${project.demo}`}
                        target="_blank"
                        rel="noreferrer"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 rounded-2xl font-black uppercase text-[10px] md:text-xs ${theme.button} text-white shadow-2xl z-10`}
                      >
                        Ver Demonstração Ativa <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;