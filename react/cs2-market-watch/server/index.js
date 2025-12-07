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
const STEAM_MARKET_URL = 'https://steamcommunity.com/market/pricehistory';
const CSFLOAT_API_URL = 'https://csfloat.com/api/v1';
const BITSKINS_API_URL = 'https://api.bitskins.com';
let SKIN_IMAGE_MAP = {};
let USD_TO_BRL = 5.50;


if (!BITSKINS_API_KEY || !BITSKINS_SECRET) {
    console.error("\n[ERRO CRÍTICO] As chaves BITSKINS_API_KEY ou BITSKINS_SECRET não foram encontradas no arquivo .env");
    console.error("Por favor, crie um arquivo '.env' na pasta server com suas credenciais.\n");
    process.exit(1); 
}

const generateAuthToken = (shift = 0) => {
    const now = Math.floor(Date.now() / 1000);
    const epoch = now + (shift * 30);
    return authenticator.generate(BITSKINS_SECRET, { epoch });
};

const updateExchangeRate = async () => {
    try {
        const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');
        const rate = parseFloat(response.data.USDBRL.bid);
        if (!isNaN(rate)) {
            USD_TO_BRL = rate;
            console.log(`[SYSTEM] Cotação atualizada no Backend: 1 USD = ${USD_TO_BRL} BRL`);
        }
    } catch (error) {
        console.error("[SYSTEM] Falha ao atualizar cotação (usando fallback).");
    }
};



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

const fetchSteamHistory = async (marketHashName) => {
    if (!process.env.STEAM_LOGIN_SECURE) {
        console.warn("[STEAM] Falta configurar STEAM_LOGIN_SECURE no .env");
        return [];
    }

    try {
        const encodedName = encodeURIComponent(marketHashName);
        const url = `${STEAM_MARKET_URL}?appid=730&market_hash_name=${encodedName}`;
        
        console.log(`\n--- [DEBUG STEAM] Iniciando Request ---`);
        console.log(`URL: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'Cookie': `steamLoginSecure=${process.env.STEAM_LOGIN_SECURE}`
            }
        });

        if (!response.data || !response.data.prices) return [];

        const isBRL = response.data.price_prefix?.includes('R$');

        if (isBRL) {
            console.log(`[STEAM] Detectado BRL. Convertendo com taxa: ${USD_TO_BRL}`);
        }

        const fullHistory = response.data.prices.map(item => {
            const dateStr = item[0].split(': ')[0];
            
            let rawPrice = item[1];
            
            if (isBRL) {
                rawPrice = rawPrice / USD_TO_BRL;
            }

            return {
                date: new Date(dateStr).toISOString().split('T')[0],
                price: Number(rawPrice.toFixed(2))
            };
        });

        return fullHistory.slice(-90); 

    } catch (error) {
        
        if (error.response) {
            console.error(`[DEBUG STEAM ERROR] Status: ${error.response.status}`);
            console.error(`[DEBUG STEAM ERROR] Data:`, error.response.data);
            if (error.response?.status === 429) console.warn(">>> [STEAM 429] Rate Limit.");
        } else {
            console.error(`[DEBUG STEAM ERROR]`, error.message);
        }
        return [];
    }
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
                    headers: { Authorization: CSFLOAT_API_KEY }
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
    const { source, name, forceProvider } = req.query;

    const tryBitskins = async () => {
        
        const shiftsToTry = [0, -1, 1]; // Lista de tentativas: [0 (Atual), -1 (Passado), 1 (Futuro)]

        for (const shift of shiftsToTry) {
            try {
                const authToken = generateAuthToken(shift);
                
                const response = await axios.post(
                    `${BITSKINS_API_URL}/market/pricing/list`,
                    { app_id: 730, skin_id: Number(skinId), limit: 20 },
                    { headers: { 'content-type': 'application/json', 'x-apikey': BITSKINS_API_KEY, 'x-auth-token': authToken } }
                );
                
                console.log(`[HISTORY] Sucesso no BitSkins com shift ${shift}!`);
                
                let list = [];
                if (Array.isArray(response.data)) list = response.data;
                else if (response.data?.list) list = response.data.list;
                
                if (!list || list.length === 0) return null;

                return list.map(sale => {
                    const dateObj = new Date(sale.created_at || sale.sold_at || Date.now());
                    let p = Number(sale.price || sale.amount || 0);
                    if (p > 1000) p = p / 1000;
                    return { date: dateObj.toISOString().split('T')[0], price: Number(p.toFixed(2)) };
                }).reverse();

            } catch (e) {
                // Se o erro for Token Incorreto (GLO_005) ou Rate Limit, tentamos o próximo shift
                const errorCode = e.response?.data?.code;
                if (e.response?.status === 401 || errorCode === 'GLO_005') {
                    console.warn(`[HISTORY] Shift ${shift} falhou (Token usado/inválido). Tentando próximo...`);
                    continue; // Pula para o próximo loop (próximo shift)
                }
                
                // Se for outro erro (ex: 500, 404), paramos
                console.error(`[HISTORY] Erro fatal BitSkins: ${e.message}`);
                return null;
            }
        }
        
        console.error("[HISTORY] Todas as tentativas de token falharam.");
        return null;
    };

    let historyData = [];
    let usedSource = null;

    // --- LÓGICA DE SELEÇÃO DA FONTE ---
    
    // 1. Se o usuário FORÇOU uma fonte (clicou no botão), tentamos só ela
    if (forceProvider === 'steam' && name) {
        historyData = await fetchSteamHistory(name);
        usedSource = 'steam';
    } else if (forceProvider === 'bitskins' && !String(skinId).startsWith('csfloat')) {
        historyData = await tryBitskins();
        usedSource = 'bitskins';
    } 
    // 2. Comportamento Automático (Padrão)
    else {
        // Tenta BitSkins primeiro se for compatível
        if (source === 'bitskins' && !String(skinId).startsWith('csfloat')) {
            const bsData = await tryBitskins();
            if (bsData) {
                historyData = bsData;
                usedSource = 'bitskins';
            }
        }
        
        // Se falhou ou não era bitskins, cai no Fallback da Steam
        if ((!historyData || historyData.length === 0) && name) {
            console.log("[HISTORY] Fallback para Steam...");
            historyData = await fetchSteamHistory(name);
            usedSource = 'steam';
        }
    }

    // Retorna objeto com dados E a fonte usada
    res.json({
        source: usedSource || 'none',
        history: historyData || []
    });
});

app.get('/api/skins/price/steam', async (req, res) => {
    const { name } = req.query;
    
    if (!name) return res.json({ price: null });

    try {
        const history = await fetchSteamHistory(name);
        
        if (history && history.length > 0) {
            const latest = history[history.length - 1];
            res.json({ price: latest.price });
        } else {
            res.json({ price: null });
        }
    } catch (error) {
        console.error("[STEAM PRICE ERROR]", error.message);
        res.json({ price: null });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor DEBUG rodando em http://localhost:${PORT}`);
});

updateExchangeRate();
setInterval(updateExchangeRate, 1000 * 60 * 60);