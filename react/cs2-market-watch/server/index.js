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
const CSFLOAT_API_KEY = process.env.CSFLOAT_API_KEY;
const CSFLOAT_API_URL = 'https://csfloat.com/api/v1';
const BITSKINS_API_URL = 'https://api.bitskins.com';

if (!BITSKINS_API_KEY || !BITSKINS_SECRET) {
    console.error("\n[ERRO CRÍTICO] As chaves BITSKINS_API_KEY ou BITSKINS_SECRET não foram encontradas no arquivo .env");
    console.error("Por favor, crie um arquivo '.env' na pasta server com suas credenciais.\n");
    process.exit(1); 
}

authenticator.options = { 
    window: [2, 2],
    step: 30,
    digits: 6
};

const generateAuthToken = () => {
    return authenticator.generate(BITSKINS_SECRET);
};

let SKIN_IMAGE_MAP = {};

const loadSkinDatabase = async () => {
    console.log("[SYSTEM] Baixando banco de imagens atualizado do CS2...");
    try {
        
        const response = await axios.get('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json');
        
        const items = response.data;
        items.forEach(item => {
            if (item.name && item.image) {
                SKIN_IMAGE_MAP[item.name] = item.image;
            }
        });
        console.log(`[SYSTEM] Banco de imagens carregado! ${Object.keys(SKIN_IMAGE_MAP).length} skins mapeadas.`);
    } catch (error) {
        console.error("[SYSTEM] Erro ao baixar banco de imagens:", error.message);
        console.log("[SYSTEM] O servidor vai rodar, mas as imagens podem falhar.");
    }
};

loadSkinDatabase();

const getSkinImage = (skinName) => {
    if (SKIN_IMAGE_MAP[skinName]) return SKIN_IMAGE_MAP[skinName];
    
    let baseName = skinName.split('(')[0].trim();
    if (SKIN_IMAGE_MAP[baseName]) return SKIN_IMAGE_MAP[baseName];

    const cleanName = baseName
        .replace(/★/g, '')          // Remove estrelas
        .replace(/StatTrak™/g, '')  // Remove StatTrak
        .replace(/Souvenir/g, '')   // Remove Souvenir
        .replace(/\s\s+/g, ' ')     // Remove espaços duplos que sobraram
        .trim();                    // Remove espaços nas pontas

    if (SKIN_IMAGE_MAP[cleanName]) return SKIN_IMAGE_MAP[cleanName];

    const fuzzyKey = Object.keys(SKIN_IMAGE_MAP).find(k => k.includes(cleanName));
    if (fuzzyKey) return SKIN_IMAGE_MAP[fuzzyKey];

    return `https://placehold.co/600x400/1a1a1f/FFF?text=${encodeURIComponent(skinName.substring(0, 20))}`;
};

app.get('/api/skins/search', async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) return res.json([]);

    console.log(`\n[SEARCH] Buscando e Agrupando: "${searchQuery}"...`);

    try {
        const authToken = generateAuthToken();
        const formattedQuery = `%${searchQuery.replace(/[^\w\s]/gi, '').split(' ').join('%')}%`;

        // 1. Busca Base no BitSkins
        const bitSkinsResponse = await axios.post(
            `${BITSKINS_API_URL}/market/search/skin_name`,
            { where: { app_id: 730, skin_name: formattedQuery }, limit: 10 },
            { headers: { 'content-type': 'application/json', 'x-api-key': BITSKINS_API_KEY, 'x-auth-token': authToken } }
        );

        let bitskinsItems = [];
        if (Array.isArray(bitSkinsResponse.data)) bitskinsItems = bitSkinsResponse.data;
        else if (bitSkinsResponse.data?.data?.items) bitskinsItems = bitSkinsResponse.data.data.items;
        else if (bitSkinsResponse.data?.items) bitskinsItems = bitSkinsResponse.data.items;

        // --- LÓGICA DE AGRUPAMENTO ---
        // Usaremos um objeto onde a CHAVE é o nome da skin
        const skinsMap = {};

        // 2. Processa BitSkins e coloca no Mapa
        bitskinsItems.forEach(item => {
            const name = item.name || item.market_hash_name;
            const rawPrice = item.suggested_price || item.price || item.lowest_price || 0;
            const finalPrice = Number(rawPrice) / 1000;

            if (finalPrice <= 0) return; // Pula itens sem preço

            skinsMap[name] = {
                name: name,
                imageUrl: getSkinImage(name),
                // Guardamos IDs e Preços separados por loja
                ids: { bitskins: String(item.id), csfloat: null },
                prices: { bitskins: Number(finalPrice.toFixed(2)), csfloat: null }
            };
        });

        // 3. Busca Preços no CSFloat (Para cada item encontrado no BitSkins)
        const namesToSearch = Object.keys(skinsMap);
        
        await Promise.all(namesToSearch.map(async (name) => {
            try {
                const response = await axios.get(`${CSFLOAT_API_URL}/listings`, {
                    params: { market_hash_name: name, limit: 1, sort_by: 'lowest_price' },
                    headers: { Authorization: process.env.CSFLOAT_API_KEY }
                });

                const listings = response.data.data || response.data || [];
                const cheapest = listings[0];

                if (cheapest) {
                    // Se achou no CSFloat, atualiza o objeto existente no Mapa
                    skinsMap[name].ids.csfloat = `csfloat_${cheapest.id}`;
                    skinsMap[name].prices.csfloat = Number((cheapest.price / 100).toFixed(2));
                }
            } catch (err) {
                // Silencia erro do CSFloat
            }
        }));

        // 4. Converte o Mapa de volta para Array
        const groupedSkins = Object.values(skinsMap);

        // Ordena pelo menor preço encontrado (seja bit ou float)
        groupedSkins.sort((a, b) => {
            const minA = Math.min(a.prices.bitskins || 99999, a.prices.csfloat || 99999);
            const minB = Math.min(b.prices.bitskins || 99999, b.prices.csfloat || 99999);
            return minA - minB;
        });

        console.log(`[SEARCH] Retornando ${groupedSkins.length} skins agrupadas.`);
        res.json(groupedSkins);

    } catch (error) {
        console.error("[SEARCH ERROR]", error.message);
        res.status(500).json([]);
    }
});

app.get('/api/skins/history/:skinId', async (req, res) => {
    const { skinId } = req.params;
    const { source } = req.query; 

    if (source === 'csfloat') {
        console.log("[HISTORY] Histórico CSFloat ainda não implementado (API pública limitada).");
        return res.json([]); 
    }

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

    // --- CORREÇÃO AQUI ---
    // Se o ID começar com 'csfloat_', não tentamos chamar a API do BitSkins
    if (String(id).startsWith('csfloat_')) {
        console.log(`[DEBUG DETAILS] Ignorando item CSFloat (ID: ${id})`);
        return res.json({ info: "Item do CSFloat - Detalhes BitSkins não disponíveis." });
    }
    // ---------------------

    console.log(`\n[DEBUG DETAILS] Buscando detalhes brutos para o ID: ${id}`);
    authenticator.options = { window: [2, 2], step: 30 };

    try {
        const authToken = generateAuthToken();
        const requestBody = { app_id: 730, id: String(id) };

        const response = await axios.post(
            `${BITSKINS_API_URL}/market/search/get`,
            requestBody,
            { headers: { 'content-type': 'application/json', 'x-api-key': BITSKINS_API_KEY, 'x-auth-token': authToken } }
        );

        console.log("↓↓↓↓↓↓ DADOS BRUTOS BITSKINS ↓↓↓↓↓↓");
        console.log(JSON.stringify(response.data, null, 2));
        console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

        res.json(response.data);

    } catch (error) {
        // Log simplificado para evitar poluição
        if (error.response?.data?.code === 'GLO_003') {
            console.warn(`[DEBUG DETAILS] ID inválido para BitSkins: ${id}`);
        } else {
            console.error(`[DEBUG DETAILS ERROR]`, error.message);
        }
        res.status(500).json({ error: "Falha ao pegar detalhes" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor DEBUG rodando em http://localhost:${PORT}`);
});