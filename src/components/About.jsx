import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const About = ({ theme }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="sobre" className="py-24 px-6 border-t border-white/5 bg-white/[0.01] z-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    {/* Título Principal */}
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-2">
                        Quem sou eu?
                    </h2>

                    {/* Subtítulo dinâmico que segue a paleta do site */}
                    <h3 className={`text-sm md:text-base font-bold uppercase tracking-[0.3em] bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
                        Por trás do Core.Build
                    </h3>

                    {/* Linha decorativa */}
                    <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${theme.gradient}`}></div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

                        {/* AREA DA FOTO */}
                        <div className="relative group">
                            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
                            <div className="relative w-48 h-60 md:w-56 md:h-72 bg-slate-800 rounded-[2rem] overflow-hidden border border-white/10">
                                <img
                                    src="bianca.jpeg" // Substitua pelo nome exato do arquivo na pasta public
                                    alt="Sua Foto de Perfil"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <p className="text-slate-200 text-lg leading-relaxed mb-6 font-medium">
                                Me chamo Bianca, sou desenvolvedora em formação Full Stack, com background em vendas de sistemas e forte contato com as necessidades reais dos clientes. Sempre tive curiosidade em entender como as coisas funcionam, especialmente no universo da tecnologia.
                            </p>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-4 text-slate-400 text-sm leading-relaxed pb-6">
                                            <p>
                                                Após um ponto de virada importante em 2024, decidi transformar essa curiosidade em ação e iniciar minha jornada no desenvolvimento de software. Hoje desenvolvo landing pages e ferramentas funcionais, unindo lógica, experiência do usuário e visão de negócio.
                                            </p>
                                            <p>
                                                Além da tecnologia, a arte faz parte da minha vida por meio da tatuagem, que pratico como hobby — uma forma de expressão criativa que também influencia meu olhar para soluções digitais.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`flex items-center gap-2 mx-auto md:mx-0 font-black uppercase text-[10px] tracking-[0.2em] ${theme.accent} hover:brightness-125 transition-all`}
                            >
                                {isOpen ? 'Recolher' : 'Conhecer trajetória'}
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