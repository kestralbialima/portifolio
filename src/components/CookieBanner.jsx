import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function CookieBanner({ theme }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('corebuild-cookie-consent');
        if (!consent) setIsVisible(true);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('corebuild-cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-2xl"
        >
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[11px] text-slate-300 font-medium leading-relaxed uppercase tracking-wider">
                            A <span className="text-white font-black">Core.Build</span> utiliza tecnologias de rastreamento para melhorar sua experiência.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                            >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            <button
                                onClick={handleAccept}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest ${theme?.button || 'bg-blue-600'} text-white shadow-lg active:scale-95 transition-all`}
                            >
                                Aceitar
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-white/5 pt-4"
                            >
                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed uppercase tracking-wider">
                                    A <span className="text-white font-black">Core.Build</span> utiliza tecnologias de personalização para oferecer uma experiência mais fluida e intuitiva em nosso ecossistema.
                                </p>

                                <div className="text-[10px] text-slate-400 leading-relaxed font-medium space-y-3">
                                    <p>
                                        <strong>1. Navegação Inteligente:</strong> Utilizamos dados de interação apenas para entender quais conteúdos são mais relevantes para você, otimizando o carregamento e a entrega das nossas soluções.
                                    </p>
                                    <p>
                                        <strong>2. Segurança de Ponta:</strong> Toda informação técnica é processada sob rigorosos protocolos de proteção. Priorizamos o sigilo absoluto e a integridade da sua conexão durante toda a visita.
                                    </p>
                                    <p>
                                        <strong>3. Compromisso com o Usuário:</strong> Nosso foco é puramente técnico e funcional. Não comercializamos dados e utilizamos essas métricas exclusivamente para elevar o padrão de qualidade dos nossos serviços digitais.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}