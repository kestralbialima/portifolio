import React from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Code2, Rocket, Smartphone, ShoppingCart, Building2, ChevronRight } from 'lucide-react';
import Hero from './Hero';
import About from './About';
import { AnimatePresence } from 'framer-motion';

// PASSO 1: Receba a função 'onScrollTo' aqui nas props
const HomeView = ({ theme, onOpenProjects, openFaq, setOpenFaq, onScrollTo }) => {
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
    <motion.div 
      key="home" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ willChange: 'opacity' }}
    >
      {/* PASSO 2: Passe a função 'onScrollTo' para dentro do componente Hero */}
      <Hero theme={theme} onScrollTo={onScrollTo} />

      {/* SEÇÃO PROCESSO */}
      <section id="processo" className="py-24 px-6 border-t border-white/5 bg-white/1 z-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Metodologia Core</h2>
          <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-16`}></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className="p-8 rounded-[2rem] bg-white/3 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <div className={`${theme.accent} mb-6`}>{step.icon}</div>
                <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{step.title}</h4>
                <p className="text-slate-300 text-base leading-relaxed font-medium"> {step.desc} </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO SOLUÇÕES */}
      <section id="solucoes" className="py-24 px-6 z-20 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Soluções Smart</h2>
          <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient} mb-16`}></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {plans.map((plan, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                className={`p-10 rounded-[3rem] border transition-all ${plan.popular ? 'bg-white/5 border-white/20 shadow-2xl' : 'bg-white/1 border-white/5'}`}
              >
                <div className={`${theme.accent} mb-8`}>{plan.icon}</div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{plan.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{plan.desc}</p>
                <button 
                  onClick={() => onOpenProjects(plan.title)} 
                  className={`w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all ${plan.popular ? theme.button + ' text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Explorar {plan.title}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <About theme={theme} />

      {/* SEÇÃO FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">Dúvidas Frequentes</h2>
            <div className={`h-1 w-20 mx-auto rounded-full bg-linear-to-r ${theme.gradient}`}></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors group">
                  <span className="font-bold text-white uppercase text-[11px] tracking-wider">{faq.q}</span>
                  <ChevronRight size={18} className={`transition-transform duration-500 ${openFaq === i ? 'rotate-90' : ''} ${theme.accent}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="px-6 pb-6 text-slate-400 text-sm leading-relaxed font-medium"
                    >
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
  );
};

export default HomeView;