import { useState } from 'react';
import type { FormEvent } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    console.log(`Buscando por: ${searchTerm}`);
    alert(`Preparado para buscar na API por: ${searchTerm}`);
    // Aqui entraremos com a lógica da API depois
  };

  return (
    <div className="app-container">
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
              placeholder="Ex: AK-47 | Redline" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit">
            Buscar Skin
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;