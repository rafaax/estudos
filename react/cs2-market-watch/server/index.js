require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { authenticator } = require('otplib');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const BITSKINS_API_KEY = (process.env.BITSKINS_API_KEY || "").trim();
const BITSKINS_SECRET = (process.env.BITSKINS_SECRET || "").trim();
const BITSKINS_API_URL = 'https://api.bitskins.com';

// Verificação de Segurança ao iniciar
if (!BITSKINS_API_KEY || !BITSKINS_SECRET) {
    console.error("\n[ERRO CRÍTICO] As chaves BITSKINS_API_KEY ou BITSKINS_SECRET não foram encontradas no arquivo .env");
    console.error("Por favor, crie um arquivo '.env' na pasta server com suas credenciais.\n");
    process.exit(1); // Encerra o servidor se não tiver chaves
}

// Configura o otplib para aceitar 30s de diferença (caso seu relógio esteja levemente fora)
authenticator.options = { 
    window: [2, 2], // [Janelas passadas, Janelas futuras]
    step: 30,
    digits: 6
};

const generateAuthToken = () => {
    const token = authenticator.generate(BITSKINS_SECRET);
    return token;
};

// --- ROTA 1: BUSCA (SEARCH) ---
app.get('/api/skins/search', async (req, res) => {
    const searchQuery = req.query.q;
    
    console.log(`\n--- [DEBUG SEARCH] Iniciando busca por: "${searchQuery}" ---`);

    if (!searchQuery) return res.json([]);

    try {
        const authToken = generateAuthToken();
        const formattedQuery = `%${searchQuery}%`;

        const requestBody = {
            where: { app_id: 730, skin_name: formattedQuery },
            limit: 10
        };

        // 1. Log do que estamos enviando
        console.log(`[DEBUG SEARCH] Token Gerado: ${authToken}`);
        console.log(`[DEBUG SEARCH] Body Enviado:`, JSON.stringify(requestBody));

        const response = await axios.post(
            `${BITSKINS_API_URL}/market/search/skin_name`,
            requestBody,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': BITSKINS_API_KEY,
                    'x-auth-token': authToken
                }
            }
        );

        console.log(`[DEBUG SEARCH] Status Code: ${response.status}`);

        // console.log(`[DEBUG SEARCH] Resposta BRUTA:`, JSON.stringify(response.data, null, 2));

        let rawItems = [];
        // Tenta identificar onde está a lista no JSON retornado
        if (Array.isArray(response.data)) {
            console.log(`[DEBUG SEARCH] Retornou Array direto.`);
            rawItems = response.data;
        } else if (response.data?.data?.items) {
            console.log(`[DEBUG SEARCH] Retornou data.items.`);
            rawItems = response.data.data.items;
        } else if (response.data?.items) {
            console.log(`[DEBUG SEARCH] Retornou items.`);
            rawItems = response.data.items;
        } else {
            console.log(`[DEBUG SEARCH] Estrutura desconhecida ou vazia:`, JSON.stringify(response.data));
        }

        // console.log(`[DEBUG SEARCH] Itens encontrados: ${rawItems.length}`);


        const formattedSkins = rawItems.map(item => {
            const rawPrice = item.suggested_price || item.price || 0;
            const finalPrice = Number(rawPrice) / 1000;

            return {
                id: String(item.id),
                name: item.name || item.market_hash_name,
                price: Number(finalPrice.toFixed(2)),
                imageUrl: item.image || `https://placehold.co/600x400/1a1a1f/FFF?text=${encodeURIComponent((item.name || 'Skin').substring(0, 20))}`,
                priceHistory: []
            };
        });

        res.json(formattedSkins);

    } catch (error) {
        // 3. Log detalhado em caso de erro
        if (error.response) {
            console.error(`[DEBUG SEARCH] ERRO API (${error.response.status}):`, JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(`[DEBUG SEARCH] ERRO INTERNO:`, error.message);
        }
        res.status(500).json({ error: "Erro ao buscar sugestões" });
    }
});

// --- ROTA 2: HISTÓRICO (HISTORY) ---
app.get('/api/skins/history/:skinId', async (req, res) => {
    const { skinId } = req.params;

    // Aumentamos a tolerância para evitar GLO_005
    authenticator.options = { window: 2, step: 30 };

    console.log(`\n--- [DEBUG HISTORY] Iniciando busca ID: ${skinId} ---`);
    console.log(`[TIME CHECK] Server Time (Local): ${new Date().toISOString()}`);

    try {
        const authToken = generateAuthToken();

        // Garante que é Inteiro
        const idAsNumber = parseInt(skinId, 10);

        const requestBody = {
            app_id: 730,
            skin_id: idAsNumber, 
            limit: 20
        };

        console.log(`[DEBUG HISTORY] Token: ${authToken}`);
        console.log(`[DEBUG HISTORY] Body:`, JSON.stringify(requestBody));

        const response = await axios.post(
            `${BITSKINS_API_URL}/market/pricing/list`,
            requestBody,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-apikey': BITSKINS_API_KEY,
                    'x-auth-token': authToken
                }
            }
        );

        console.log(`[DEBUG HISTORY] SUCESSO! Status: ${response.status}`);
        console.log("\n[DEBUG HISTORY] === JSON BRUTO DO BITSKINS ===");
        console.log(JSON.stringify(response.data, null, 2));
        console.log("============================================\n");
        // ----------------------------------------------
        
        let salesList = [];
        if (Array.isArray(response.data)) salesList = response.data;
        else if (response.data?.list) salesList = response.data.list;
        else if (response.data?.sales) salesList = response.data.sales;
        else if (response.data?.prices) salesList = response.data.prices;

        if (!salesList) return res.json([]);

        const history = salesList.map(sale => {
            // Data: Já vem como string ISO ("2025-11-28T..."), o Date() aceita direto
            const dateObj = new Date(sale.created_at || new Date());
            
            // Preço: Vem como 88000. Precisamos transformar em 88.00
            // Lógica: Se for maior que 1000, divide por 1000.
            let finalPrice = Number(sale.price || 0);
            if (finalPrice > 1000) {
                finalPrice = finalPrice / 1000;
            }

            return {
                date: dateObj.toISOString().split('T')[0], // Retorna YYYY-MM-DD
                price: Number(finalPrice.toFixed(2))       // Retorna número float (88.00)
            };
        }).reverse(); // Inverte para o gráfico ficar Cronológico (Antigo -> Novo)

        res.json(history);

    } catch (error) {
        if (error.response) {
            console.error(`[DEBUG HISTORY] ERRO API (${error.response.status}):`, JSON.stringify(error.response.data, null, 2));

            if (error.response.data?.code === 'GLO_005') {
                console.error(">>> DICA: O erro GLO_005 indica que o relógio do seu PC está dessincronizado ou o token expirou.");
                console.error(">>> Tente aumentar o 'window' no authenticator.options ou sincronizar o relógio do Windows.");
            }
        } else {
            console.error(`[DEBUG HISTORY] ERRO INTERNO:`, error.message);
        }
        res.json([]);
    }
});


app.get('/api/skins/details/:id', async (req, res) => {
    const { id } = req.params;

    // console.log(`\n[DEBUG DETAILS] Buscando detalhes brutos para o ID: ${id}`);

    // Configuração de tolerância de tempo (MANTENHA ISSO)
    authenticator.options = { window: [2, 2], step: 30 };

    try {
        const authToken = generateAuthToken();

        // Schema conforme sua documentação
        const requestBody = {
            app_id: 730,
            id: String(id) // O schema diz que 'id' é string
        };

        const response = await axios.post(
            `${BITSKINS_API_URL}/market/search/get`,
            requestBody,
            {
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': BITSKINS_API_KEY,
                    'x-auth-token': authToken
                }
            }
        );

        // --- AQUI ESTÁ O QUE VOCÊ QUER ---
        console.log("↓↓↓↓↓↓ DADOS BRUTOS (/market/search/get) ↓↓↓↓↓↓");
        console.log(JSON.stringify(response.data, null, 2));
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

        res.json(response.data);

    } catch (error) {
        if (error.response) {
            console.error(`[DEBUG DETAILS ERROR] API:`, JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(`[DEBUG DETAILS ERROR] Interno:`, error.message);
        }
        res.status(500).json({ error: "Falha ao pegar detalhes" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor DEBUG rodando em http://localhost:${PORT}`);
});