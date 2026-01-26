const axios = require('axios');

exports.handler = async (event, context) => {
  // 1. Segurança: Apenas permite requisições POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    // 2. Extrai os dados que o seu Contact.jsx enviou
    const { eventName, eventId, sourceUrl } = JSON.parse(event.body);

    const pixelId = process.env.VITE_FB_PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN;

    // 3. Envia para a Meta
    await axios.post(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: sourceUrl,
            action_source: 'website',
            user_data: {
              // Na Netlify, pegamos o IP e User Agent assim:
              client_ip_address: event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'],
              client_user_agent: event.headers['user-agent'],
            },
          },
        ],
        access_token: accessToken,
        test_event_code:'TEST22844'
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Erro CAPI:', error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Falha ao enviar evento' }),
    };
  }
};