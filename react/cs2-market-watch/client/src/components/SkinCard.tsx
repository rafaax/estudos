import { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import axios from 'axios';
import { PriceRow } from './PriceRow';
import { CSFloatIcon, SteamIcon } from './StoreIcons';

interface PricePoint { 
  date: string; 
  price: number;
}

interface SkinCardProps {
  id: string;
  name: string;
  prices: { bitskins: number | null, csfloat: number | null, steam: number | null };
  ids: { bitskins: string | null, csfloat: string | null };
  priceHistory: PricePoint[];
  historySource?: string;
  imageUrl: string;
  currency: 'USD' | 'BRL';
  rate: number;
  onRemove?: () => void;
}

const TIME_RANGES = [
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'TD', days: 'all' }, // (Desde o início)
];

export function SkinCard({ name, prices, ids, priceHistory, imageUrl, currency, rate, onRemove, historySource: initialSource }: SkinCardProps) {
  const [graphData, setGraphData] = useState(priceHistory);
  const [currentSource, setCurrentSource] = useState(initialSource || 'none');
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [timeRange, setTimeRange] = useState<number | 'all'>('all');

  const convert = (val: number | null) => {
    if (val === null) return null;
    return currency === 'BRL' ? val * rate : val;
  };
  
  const displayHistory = useMemo(() => {
    let filteredData = graphData;

    // 1. Filtro de Data
    if (timeRange !== 'all') {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - (timeRange as number));
      
      filteredData = graphData.filter(p => {
        const pointDate = new Date(p.date);
        return pointDate >= cutoffDate;
      });
    }

    // 2. Conversão de Moeda
    return filteredData.map(p => ({
      ...p,
      price: Number((currency === 'BRL' ? p.price * rate : p.price).toFixed(2))
    }));
  }, [graphData, currency, rate, timeRange]);



  const COLORS = {
    bs: '239, 68, 68',   // Vermelho (BitSkins)
    cs: '234, 179, 8',   // Amarelo (CSFloat)
    st: '59, 130, 246'   // Azul (Steam)
  };

  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  // Preços Atuais
  const bsPrice = convert(prices.bitskins);
  const csPrice = convert(prices.csfloat);
  const stPrice = convert(prices.steam);

  // Melhor Preço (Highlight)
  const validPrices = [bsPrice, csPrice, stPrice].filter(p => p !== null) as number[];
  const bestPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

  // Cálculos de Tendência
  const currentMainPrice = bsPrice || csPrice || 0;
  const firstPrice = displayHistory[0]?.price || currentMainPrice;
  const lastPrice = displayHistory[displayHistory.length - 1]?.price || currentMainPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice !== 0 ? ((priceChange / firstPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  const fetchHistory = async (provider: 'steam' | 'bitskins') => {
    if (provider === 'bitskins' && !ids.bitskins) return;

    setLoadingGraph(true);
    try {
      const targetId = ids.bitskins || ids.csfloat;
      const encodedName = encodeURIComponent(name);
      
      const res = await axios.get(`http://localhost:3001/api/skins/history/${targetId}?name=${encodedName}&forceProvider=${provider}`);
      
      setGraphData(res.data.history);
      setCurrentSource(res.data.source);
    } catch (error) {
      console.error("Erro ao trocar fonte", error);
    } finally {
      setLoadingGraph(false);
    }
  };
  
  const formatDateTick = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const trendBadge = (
    <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      <span>{priceChangePercent}%</span>
    </div>
  );

  return (
    <div 
      className="skin-card" 
      onClick={() => setShowGraph(!showGraph)}
      style={{ 
        position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '340px',
        borderColor: showGraph ? 'var(--primary)' : 'var(--border)'
      }}
    >
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', border: '2px solid #fff', color: '#fff', borderRadius: '50%', width: '26px', height: '26px', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} title="Remover skin">
          <X size={14} color="#ffffff" strokeWidth={3} /> 
        </button>
      )}

      <div className="card-image-container">
        <ImageWithFallback src={imageUrl} alt={name} className="card-image" />
      </div>

      <div className="card-info">
        <h3 title={name} style={{marginBottom: '10px'}}>{name}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {bsPrice && (
            <PriceRow             
              label="BS"
              color={COLORS.bs}
              price={bsPrice}
              bestPrice={bestPrice}
              currencySymbol={currencySymbol}
            >
              {currentSource === 'bitskins' && trendBadge}
            </PriceRow>
          )}
          
          {csPrice && (
            <PriceRow
              label="CS"
              icon={<CSFloatIcon />}
              color={COLORS.cs}
              price={csPrice}
              bestPrice={bestPrice}
              currencySymbol={currencySymbol}
            />
          )}

          {stPrice && (
            <PriceRow
              label="ST"
              icon={<SteamIcon />}
              color={COLORS.st}
              price={stPrice}
              bestPrice={bestPrice}
              currencySymbol={currencySymbol}
            >
              {currentSource === 'steam' && trendBadge}
            </PriceRow>
          )}
        </div>
      </div>
      
      {showGraph && (
        <div className="chart-container" onClick={(e) => e.stopPropagation()}>
          {/* --- CABEÇALHO DO GRÁFICO (Fontes e Filtros) --- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px', padding: '0 5px' }}>  
            {/* Linha 1: Fontes */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#888' }}>
                Fonte: <b style={{ color: currentSource === 'steam' ? '#3b82f6' : '#ef4444' }}>
                  {currentSource === 'steam' ? 'Steam' : 'BitSkins'}
                </b>
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button 
                  onClick={() => fetchHistory('steam')} 
                  disabled={loadingGraph}
                  style={{ padding: '2px 8px', fontSize: '10px', background: currentSource === 'steam' ? '#3b82f6' : '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: loadingGraph ? 0.5 : 1 }}
                >
                  Steam
                </button>  
                {ids.bitskins && (
                  <button 
                    onClick={() => fetchHistory('bitskins')} 
                    disabled={loadingGraph}
                    style={{ padding: '2px 8px', fontSize: '10px', background: currentSource === 'bitskins' ? '#ef4444' : '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: loadingGraph ? 0.5 : 1 }}
                  >
                    BitSkins
                  </button>
                )}
              </div>
            </div>

            {/* Filtros de Tempo */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '6px' }}>
              {TIME_RANGES.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setTimeRange(range.days as number | 'all')}
                  style={{
                    flex: 1,
                    padding: '4px 0',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: timeRange === range.days ? '#4b5563' : 'transparent',
                    color: timeRange === range.days ? '#fff' : '#9ca3af'
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- GRÁFICO --- */}
          {loadingGraph ? (
            <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={displayHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatDateTick} stroke="#666" tick={{ fontSize: 10 }} minTickGap={30} interval="preserveStartEnd" />
                <YAxis domain={['auto', 'auto']} stroke="#666" tickFormatter={(val) => `${currencySymbol}${val}`} tick={{ fontSize: 10 }} width={45} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', color: '#fff' }} formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço']} />
                <Line type="monotone" dataKey="price" stroke={isPositive ? "#34d399" : "#f87171"} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#fff' }} animationDuration={500} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
}