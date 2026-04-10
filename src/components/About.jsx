import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const About = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="sobre" className="py-24 px-6 border-t border-white/5 bg-white/[0.01] z-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10"> {/* Reduzido de mb-12 para mb-10 */}
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-2">
                        Quem sou eu?
                    </h2>

                    <h3 className={`text-sm md:text-base font-bold uppercase tracking-[0.2em] bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
                        Por trás do Core.Build
                    </h3>

                    <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${theme.gradient}`}></div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">

                        {/* AREA DA FOTO */}
                        <div className="relative group">
                            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
                            <div className="relative w-44 h-56 md:w-52 md:h-64 bg-slate-800 rounded-[2rem] overflow-hidden border border-white/10">
                                <img
                                    src="bianca.jpeg"
                                    alt="Bianca Lima"
                                    className={`w-full h-full object-cover transition-all duration-700 ${isOpen ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0'}`}
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            {/* Ajuste: tracking-tight e leading-relaxed para compactar levemente a leitura */}
                            <p className="text-slate-200 text-base md:text-lg leading-relaxed tracking-tight mb-4 font-medium">
                                Me chamo Bianca, sou desenvolvedora Full Stack, com background em vendas de sistemas e forte contato com as necessidades reais dos clientes. Sempre tive curiosidade em entender como as coisas funcionam, especialmente no universo da tecnologia.
                            </p>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-4 text-slate-400 text-sm leading-relaxed tracking-tight pb-4">
                                            <p>
                                                Após um ponto de virada importante em 2024, decidi transformar essa curiosidade em ação e iniciar minha jornada no desenvolvimento de software. Hoje desenvolvo landing pages e ferramentas funcionais, unindo lógica e visão de negócio.
                                            </p>
                                            <p>
                                                Além da tecnologia, a arte faz parte da minha vida por meio da tatuagem — uma forma de expressão criativa que influencia meu olhar para soluções digitais.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Botão com o novo texto solicitado */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`flex items-center gap-2 mx-auto md:mx-0 font-black uppercase text-[10px] tracking-[0.15em] ${theme.accent} hover:brightness-125 transition-all mt-2`}
                            >
                                {isOpen ? 'Recolher' : 'Um pouco da minha história'}
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;