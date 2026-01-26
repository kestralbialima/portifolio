import axios from 'axios';

export default async function handler(req, res) {
    // 1. Segurança: Apenas permite requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // 2. Extrai os dados enviados pelo seu React (Contact.jsx)
    const { eventName, eventId, sourceUrl } = req.body;

    // 3. Pega as chaves que você vai cadastrar no painel da Netlify
    const pixelId = process.env.VITE_FB_PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN;

    try {
        // 4. Envia o "pacote" de dados para a Meta
        await axios.post(
            `https://graph.facebook.com/v18.0/${pixelId}/events`,
            {
                data: [
                    {
                        event_name: eventName,
                        event_time: Math.floor(Date.now() / 1000),
                        event_id: eventId, // O "RG" para evitar duplicidade com o Pixel
                        event_source_url: sourceUrl,
                        action_source: 'website',
                        user_data: {
                            // Pega o IP e o Navegador do usuário para melhor identificação
                            client_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                            client_user_agent: req.headers['user-agent'],
                        },
                    },
                ],
                access_token: accessToken,
            }
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro na CAPI:', error.response?.data || error.message);
        return res.status(500).json({ error: 'Falha ao enviar evento para a Meta' });
    }
}