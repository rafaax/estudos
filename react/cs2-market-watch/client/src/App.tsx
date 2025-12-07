import { useState, useEffect } from 'react';
import axios from 'axios';
import { SkinCard } from './components/SkinCard';
import { Search, Loader2, ArrowRightLeft, DollarSign } from 'lucide-react'; // Ícones novos
import './App.css';

interface PricePoint { date: string; price: number; }
interface Skin { id: string; name: string; price: number; priceHistory: PricePoint[]; imageUrl: string; }

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

  const handleSelectSkin = async (skinSuggestion: Skin) => {
    if (trackedSkins.find(s => s.id === skinSuggestion.id)) {
      setSearchQuery(''); setSuggestions([]); return;
    }
    try {
      setLoadingHistory(true);

      axios.get(`http://localhost:3001/api/skins/details/${skinSuggestion.id}`).catch(()=>{});
      
      const response = await axios.get(`http://localhost:3001/api/skins/history/${skinSuggestion.id}`);
      const realHistory = response.data;
      const newSkin: Skin = {
        ...skinSuggestion,
        priceHistory: Array.isArray(realHistory) ? realHistory : []
      };
      setTrackedSkins(prev => [...prev, newSkin]);
    } catch (error) {
      console.error(error);
      setTrackedSkins(prev => [...prev, skinSuggestion]);
    } finally {
      setLoadingHistory(false); setSearchQuery(''); setSuggestions([]);
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
                {suggestions.map((skin) => (
                  <div 
                    key={skin.id} 
                    className="suggestion-item"
                    onClick={() => handleSelectSkin(skin)}
                  >
                    <span className="suggestion-name">{skin.name}</span>
                    <span className="suggestion-price">${skin.price.toFixed(2)}</span>
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