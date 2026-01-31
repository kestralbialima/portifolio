const crypto = require('crypto');
const axios = require('axios');

exports.handler = async (event) => {
  // 1. Recebe os dados do Front-end
  const { phone, eventName, eventId } = JSON.parse(event.body);
  
  // LOG PARA VOCÊ VER NO NETLIFY:
  console.log(`Recebido: ${eventName} - ID: ${eventId}`);

  const hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');

  try {
    const response = await axios.post(`https://graph.facebook.com/v18.0/${process.env.VITE_FB_PIXEL_ID}/events`, {
      data: [{
        event_name: eventName || 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // O ELO COM O NAVEGADOR
        user_data: {
          ph: [hashedPhone]
        },
        action_source: 'website'
      }]
    }, { params: { access_token: process.env.FB_ACCESS_TOKEN } });

    console.log("Resposta da Meta:", response.data);
    return { statusCode: 200, body: "Sucesso" };
  } catch (err) {
    console.error("Erro na CAPI:", err.response ? err.response.data : err.message);
    return { statusCode: 500, body: "Erro" };
  }
};