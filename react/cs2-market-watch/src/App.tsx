import { useState, useEffect, type FormEvent } from 'react';
import { Search, TrendingUp, Star, X } from 'lucide-react';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSkins, setSavedSkins] = useState<string[]>(() => {
    const saved = Cookies.get('cs2-tracked-skins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao ler cookie inicial", e);
        return [];
      }
    }
    return [];
  });
  
  useEffect(() => {
    Cookies.set('cs2-tracked-skins', JSON.stringify(savedSkins), { expires: 365 });
  }, [savedSkins]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    if (!savedSkins.includes(searchTerm)) {
      setSavedSkins([...savedSkins, searchTerm]);
    }

    setSearchTerm('');
  };

  const removeSkin = (skinToRemove: string) => {
    setSavedSkins(savedSkins.filter(skin => skin !== skinToRemove));
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="search-box">
          <div className="header">
            <TrendingUp size={48} className="logo-icon" />
            <h1>CS2 Market Watch</h1>
            <p>Monitore preços e histórico de skins em tempo real</p>
          </div>

          <form onSubmit={handleSearch} className="input-group">
            <div className="input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Digite para adicionar (Ex: AK-47 | Redline)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="submit">Adicionar</button>
          </form>
        </div>

        {savedSkins.length > 0 && (
          <div className="saved-list">
            <h2><Star size={20} fill="#fbbf24" stroke="#fbbf24" /> Skins Monitoradas</h2>
            <div className="skins-grid">
              {savedSkins.map((skin) => (
                <div key={skin} className="skin-card">
                  <span>{skin}</span>
                  <button onClick={() => removeSkin(skin)} className="delete-btn">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;