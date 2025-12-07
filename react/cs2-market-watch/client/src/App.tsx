import { useState, useEffect } from 'react';
import axios from 'axios';
import { SkinCard } from './components/SkinCard';
import { Search, Loader2, ArrowRightLeft, DollarSign } from 'lucide-react'; // Ícones novos
import './App.css';

interface PricePoint { date: string; price: number; }

interface Skin { 
  id: string; 
  name: string; 
  prices: { 
    bitskins: number | null, 
    csfloat: number | null, 
    steam: number | null
  };
  ids: { 
    bitskins: string | null, 
    csfloat: string | null
  };
  priceHistory: PricePoint[]; 
  historySource?: string;
  imageUrl: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedSkins, setTrackedSkins] = useState<Skin[]>(() => {
    const saved = localStorage.getItem('cs2-monitor-skins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao ler cache", e);
        return [];
      }
    }
    return [];
  });
  const [suggestions, setSuggestions] = useState<Skin[]>([]);
  
  const [currency, setCurrency] = useState<'USD' | 'BRL'>('USD');
  const [brlRate, setBrlRate] = useState<number>(5.50);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  
  useEffect(() => {
    // cotação do Dólar
    axios.get('https://economia.awesomeapi.com.br/last/USD-BRL')
      .then(res => {
        const rate = parseFloat(res.data.USDBRL.bid);
        setBrlRate(rate);
        console.log("Cotação USD atualizada:", rate);
      })
      .catch(err => console.error("Erro ao buscar cotação:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem('cs2-monitor-skins', JSON.stringify(trackedSkins));
  }, [trackedSkins]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'BRL' : 'USD');
  };


  const searchSkins = async (query: string) => {
    if (!query || query.length < 3) { setSuggestions([]); return; }
    try {
      setLoadingSearch(true);
      const response = await axios.get(`http://localhost:3001/api/skins/search?q=${query}`);
      setSuggestions(response.data);
    } catch (error) { console.error(error); } finally { setLoadingSearch(false); }
  };

  useEffect(() => {
    const timer = setTimeout(() => searchSkins(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSkin = async (skinSuggestion: any) => {
    const bitskinsId = skinSuggestion.ids.bitskins;
    const csfloatId = skinSuggestion.ids.csfloat;
    const primaryId = bitskinsId || csfloatId;
    const source = bitskinsId ? 'bitskins' : 'csfloat';

    const isDuplicate = trackedSkins.find(s => s.id === primaryId);
    if (isDuplicate) { setSearchQuery(''); setSuggestions([]); return; }

    try {
      setLoadingHistory(true);
      const encodedName = encodeURIComponent(skinSuggestion.name);
      
      // 1. Busca Histórico (BitSkins)
      const historyPromise = axios.get(
        `http://localhost:3001/api/skins/history/${primaryId}?source=${source}&name=${encodedName}`
      );

      // 2. Busca Preço da Steam
      const steamPricePromise = axios.get(
        `http://localhost:3001/api/skins/price/steam?name=${encodedName}`
      );

      const [historyRes, steamRes] = await Promise.all([historyPromise, steamPricePromise]);
      
      const { history: realHistory, source: historySource } = historyRes.data;
      const steamPrice = steamRes.data.price; 

      const newSkin: Skin = {
        id: primaryId, 
        name: skinSuggestion.name,
        imageUrl: skinSuggestion.imageUrl,
        
        prices: { 
          bitskins: skinSuggestion.prices.bitskins, 
          csfloat: skinSuggestion.prices.csfloat,
          steam: steamPrice 
        },
        // ------------------------------
        
        ids: skinSuggestion.ids,      
        priceHistory: Array.isArray(realHistory) ? realHistory : [],
        historySource: historySource 
      };

      setTrackedSkins(prev => [...prev, newSkin]);

    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      
      const fallbackSkin: Skin = {
        id: primaryId,
        name: skinSuggestion.name,
        imageUrl: skinSuggestion.imageUrl,
        prices: skinSuggestion.prices,
        ids: skinSuggestion.ids,
        priceHistory: []
      };
      setTrackedSkins(prev => [...prev, fallbackSkin]);

    } finally {
      setLoadingHistory(false); 
      setSearchQuery(''); 
      setSuggestions([]);
    }
  };

  const handleRemoveSkin = (skinId: string) => {
    setTrackedSkins(prev => prev.filter(s => s.id !== skinId));
  };

  return (
    <div className="app-container">
      <div className="main-content">
        
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <button 
            onClick={toggleCurrency}
            className="btn"
            style={{ 
              backgroundColor: 'var(--card)', 
              border: '1px solid var(--border)',
              color: currency === 'USD' ? 'var(--success)' : 'var(--primary)',
              minWidth: '140px'
            }}
          >
            {currency === 'USD' ? <DollarSign size={18} /> : <span style={{fontWeight: 'bold'}}>R$</span>}
            <ArrowRightLeft size={14} style={{ margin: '0 8px', color: 'var(--muted-foreground)' }} />
            <span>{currency}</span>
            <span style={{ fontSize: '10px', marginLeft: '6px', color: 'var(--muted-foreground)' }}>
              ({currency === 'BRL' ? brlRate.toFixed(2) : '1.00'})
            </span>
          </button>
        </div>

        <div className="search-area">
          <div className="search-container">
            <div className="input-group">
              <Search className="search-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="Digite o nome da skin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loadingHistory}
              />
              {(loadingSearch || loadingHistory) && (
                <Loader2 className="animate-spin" style={{ marginLeft: '-30px', color: '#06b6d4', width: 20 }} />
              )}
            </div>

            {suggestions.length > 0 && searchQuery.length > 0 && !loadingHistory && (
              <div className="suggestions-list">
                {suggestions.map((skin: any) => (
                  <div 
                    key={skin.name}
                    className="suggestion-item"
                    onClick={() => handleSelectSkin(skin)}
                  >
                    <span className="suggestion-name">{skin.name}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                      {skin.prices.bitskins && <span className="suggestion-price" style={{color: '#ef4444'}}>BS: ${skin.prices.bitskins}</span>}
                      {skin.prices.csfloat && <span className="suggestion-price" style={{color: '#eab308'}}>CS: ${skin.prices.csfloat}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {trackedSkins.length > 0 ? (
          <div className="skins-grid">
            {trackedSkins.map((skin) => (
              <SkinCard 
                key={skin.id} 
                {...skin} 
                currency={currency} 
                rate={brlRate} 
                onRemove={() => handleRemoveSkin(skin.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><Search size={32} color="#9ca3af" /></div>
            <h3>Sua lista está vazia</h3>
            <p className="text-muted">Busque uma skin acima e clique para ver o gráfico real.</p>
          </div>
        )}
      </div>
    </div>
  );
}