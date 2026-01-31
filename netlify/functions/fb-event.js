const crypto = require('crypto');
const axios = require('axios');

exports.handler = async (event) => {
  const { phone, eventName, eventId } = JSON.parse(event.body);

  // Transforma o telefone em Hash SHA256 (Exigência do Meta)
  const hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');

  try {
    await axios.post(`https://graph.facebook.com/v18.0/${process.env.VITE_FB_PIXEL_ID}/events`, {
      data: [{
        event_name: eventName || 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, 
        user_data: {
          ph: [hashedPhone] 
        },
        action_source: 'website'
      }]
    }, { params: { access_token: process.env.FB_ACCESS_TOKEN } });

    return { statusCode: 200, body: "Sucesso" };
  } catch (err) {
    return { statusCode: 500, body: "Erro" };
  }
};