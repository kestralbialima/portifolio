import React from 'react';
import { MessageSquare, Linkedin } from 'lucide-react';

const Contact = ({ theme }) => {
  // Esta função será o "cérebro" do clique
  const handleContact = async (platform, url) => {
    // 1. Criamos o ID único (Event ID)
    const eventId = `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 2. Avisamos o Pixel (que está no seu index.html)
    if (window.fbq) {
      window.fbq('track', 'Contact', { content_name: platform }, { eventID: eventId });
    }

    // 3. Avisamos a sua CAPI (Serverless Function)
    try {
      fetch('/.netlify/functions/fb-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Contact',
          eventId: eventId,
          sourceUrl: window.location.href
        }),
      });
    } catch (e) {
      console.error("Erro na CAPI:", e);
    }

    // 4. Finalmente, abrimos o link desejado
    window.open(url, '_blank');
  };
  return (
    <section id="contato" className="py-24 px-6 z-20 relative text-center">
      <div className="max-w-5xl mx-auto bg-white/[0.03] rounded-[4rem] p-16 border border-white/10 relative overflow-hidden shadow-3xl backdrop-blur-xl">
        {/* Linha decorativa no topo do card */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none text-center">
          VAMOS TIRAR A SUA <br />IDEIA DO PAPEL?
        </h2>

        <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-medium text-lg text-center">
          Estou pronta para construir a ferramenta técnica de que precisa para separar o seu negócio da concorrência.
        </p>

       <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  {/* Substituímos a tag <a> pelo evento onClick no botão. 
      Isso permite que a função 'handleContact' gere o ID único (deduplicação), 
      envie os dados para a CAPI/Pixel e só então abra o link externo. 
  */}
  
  {/* Botão WhatsApp */}
  <button
    onClick={() => handleContact('WhatsApp', 'https://wa.me/5541984107096')}
    className="bg-white text-black px-12 py-6 rounded-[2rem] font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-4 shadow-xl w-full sm:w-auto"
  >
    <MessageSquare size={28} className="text-black" strokeWidth={3} /> WhatsApp
  </button>

  {/* Botão LinkedIn */}
  <button
    onClick={() => handleContact('LinkedIn', 'https://www.linkedin.com/in/bianca-lima-0717832b0/?trk=opento_sprofile_goalscard')}
    className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 w-full sm:w-auto hover:bg-white/10 transition-all text-center"
  >
    <Linkedin size={28} strokeWidth={3} /> LinkedIn
  </button>
</div>
      </div>
    
    </section >
  );
};

export default Contact;