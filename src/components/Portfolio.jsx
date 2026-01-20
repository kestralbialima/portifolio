import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ArrowDown, 
  ChevronRight, 
  Palette, 
  CheckCircle2, 
  Smartphone, 
  ShoppingCart, 
  Search, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Linkedin 
} from 'lucide-react';
import { themes } from '../data/themes';

const Portfolio = ({ theme, activeTheme, onSetTheme }) => {
  const cases = [
    { 
      category: "criativos", 
      type: "Landing Page High-Visual", 
      title: "Washington Cezar Tattoo", 
      demo: "kestralbialima.github.io/projeto-wcezar/",
      image: "/site-wcezar.png",
      description: "Design imersivo focado em atrair leads qualificados e valorizar o trabalho do artista.", 
      features: [
        { label: "Galeria Imersiva", icon: <Palette size={14} /> },
        { label: "google maps integrado", icon: <CheckCircle2 size={14} /> },
        { label: "Agendamento Direto no whatsApp", icon: <Smartphone size={14} /> }
      ],
      imageColor: "from-red-900/40 to-black" 
    },
    { 
      category: "gastronomia", 
      type: "Vitrine Digital", 
      title: "Doce Requinte Bolos", 
      description: "Vendas diretas via WhatsApp com zero custo de manutenção de banco de dados.", 
      features: [
        { label: "Carrinho WhatsApp", icon: <ShoppingCart size={14} /> },
        { label: "Catálogo Dinâmico", icon: <Search size={14} /> },
        { label: "Manutenção Gratuita", icon: <CheckCircle2 size={14} /> }
      ],
      imageColor: "from-orange-900/40 to-black" 
    },
    { 
      category: "corporativo", 
      type: "Portal Business High-Authority", 
      title: "Mendes Advocacia", 
      description: "Portal jurídico focado em autoridade digital, projetado para transformar visitantes em clientes através de uma jornada clara e profissional.", 
      features: [
        { label: "Botão WhatsApp Direto", icon: <MessageSquare size={14} /> },
        { label: "Mapa Google Interativo", icon: <MapPin size={14} /> },
        { label: "Link de E-mail Smart", icon: <Mail size={14} /> },
        { label: "Redes Sociais Integradas", icon: <Linkedin size={14} /> }
      ],
      imageColor: "from-cyan-900/40 to-black" 
    }
  ];

  const filteredCases = activeTheme === 'default' ? [] : cases.filter(c => c.category === activeTheme);

  return (
    <section id="catalogo" className="py-24 px-6 border-t border-white/5 bg-black/40 z-20 relative min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTheme === 'default' ? (
            <motion.div 
              key="explorer"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20 flex flex-col items-center"
            >
              <ArrowDown className={`${theme.accent} w-10 h-10 mb-8 animate-bounce`} />
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none text-center">Explore o Portfólio</h2>
              <p className="text-slate-500 uppercase text-xs tracking-widest font-bold mb-10 text-center">Selecione uma categoria abaixo</p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {Object.keys(themes).filter(t => t !== 'default').map((t) => (
                  <button
                    key={t}
                    onClick={() => onSetTheme(t)}
                    className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase text-xs hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 group shadow-xl"
                  >
                    <span className={themes[t].accent}>●</span>
                    {themes[t].name}
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform opacity-50" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="projects"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-32"
            >
              <div className="text-center">
                <button onClick={() => onSetTheme('default')} className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">← Voltar</button>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter text-center">Projetos {theme.name}</h2>
              </div>

              {filteredCases.map((project, index) => (
                <div key={project.title} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
                  {/* ÁREA DA IMAGEM CORRIGIDA */}
                  <div className={`w-full md:w-1/2 aspect-video rounded-[3rem] bg-gradient-to-br ${project.imageColor} border border-white/10 shadow-3xl relative overflow-hidden group`}>
                     
                     {/* Mostra a imagem se ela existir no objeto */}
                     {project.image && (
                       <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-500" 
                       />
                     )}

                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                        {/* Botão com Link Real */}
                        <a href={`https://${project.demo}`} target="_blank" rel="noopener noreferrer">
                          <button className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-xs hover:scale-105 transition-transform">
                            Ver Demo
                          </button>
                        </a>
                     </div>
                  </div>

                  <div className="w-full md:w-1/2 text-left">
                    <span className={`${theme.accent} text-[11px] font-black uppercase tracking-[0.4em] mb-4 block`}>{project.type}</span>
                    <h3 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase">{project.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10">{project.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                          <div className={theme.accent}>{feature.icon}</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;