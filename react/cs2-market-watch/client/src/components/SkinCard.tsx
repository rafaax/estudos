import { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import axios from 'axios';


interface PricePoint { date: string; price: number; }

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

export function SkinCard({ name, prices, ids, priceHistory, imageUrl, currency, rate, onRemove, historySource: initialSource }: SkinCardProps) {
  const [graphData, setGraphData] = useState(priceHistory);
  const [currentSource, setCurrentSource] = useState(initialSource || 'none');
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const convert = (val: number | null) => {
    if (val === null) return null;
    return currency === 'BRL' ? val * rate : val;
  };

  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  const bsPrice = convert(prices.bitskins);
  const csPrice = convert(prices.csfloat);
  const stPrice = convert(prices.steam);

  const validPrices = [bsPrice, csPrice, stPrice].filter(p => p !== null) as number[];
  const bestPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

  const displayHistory = useMemo(() => {
    return graphData.map(p => ({
      ...p,
      price: Number((currency === 'BRL' ? p.price * rate : p.price).toFixed(2))
    }));
  }, [graphData, currency, rate]);



  const fetchHistory = async (provider: 'steam' | 'bitskins') => {
    // Se for BitSkins e não tivermos ID compatível, aborta
    if (provider === 'bitskins' && !ids.bitskins) return;

    setLoadingGraph(true);
    try {
        const targetId = ids.bitskins || ids.csfloat; // ID para rota
        const encodedName = encodeURIComponent(name);
        
        // Chama com forceProvider
        const res = await axios.get(`http://localhost:3001/api/skins/history/${targetId}?name=${encodedName}&forceProvider=${provider}`);
        
        setGraphData(res.data.history);
        setCurrentSource(res.data.source);
    } catch (error) {
        console.error("Erro ao trocar fonte", error);
    } finally {
        setLoadingGraph(false);
    }
  };
  
  


  const currentMainPrice = bsPrice || csPrice || 0;
  const firstPrice = displayHistory[0]?.price || currentMainPrice;
  const lastPrice = displayHistory[displayHistory.length - 1]?.price || currentMainPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice !== 0 ? ((priceChange / firstPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  const formatDateTick = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="skin-card" 
      onClick={() => setShowGraph(!showGraph)}
      style={{ 
        position: 'relative', cursor: 'pointer', transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '320px',
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
        
        {/* --- ÁREA DE PREÇOS DUPLA --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Linha BitSkins */}
            {bsPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: bsPrice === bestPrice ? '1px solid #ef4444' : '1px solid transparent' }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#ef4444', color: 'white', padding: '2px 4px', borderRadius: '4px', minWidth: '22px', textAlign: 'center'}}>BS</span>
                        <span className="price-value" style={{fontSize: '1.1rem'}}>{currencySymbol}{bsPrice.toFixed(2)}</span>
                    </div>
                    <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>{priceChangePercent}%</span>
                    </div>
                </div>
            )}

            {/* Linha CSFloat */}
            {csPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '6px', border: csPrice === bestPrice ? '1px solid #eab308' : '1px solid transparent' }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#eab308', color: 'black', padding: '2px 4px', borderRadius: '4px', minWidth: '22px', textAlign: 'center'}}>CS</span>
                        <span className="price-value" style={{fontSize: '1.1rem', color: '#eab308'}}>{currencySymbol}{csPrice.toFixed(2)}</span>
                    </div>
                </div>
            )}

            {/* --- LINHA STEAM (NOVO) --- */}
            {stPrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', border: stPrice === bestPrice ? '1px solid #3b82f6' : '1px solid transparent' }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#3b82f6', color: 'white', padding: '2px 4px', borderRadius: '4px', minWidth: '22px', textAlign: 'center'}}>ST</span>
                        <span className="price-value" style={{fontSize: '1.1rem', color: '#3b82f6'}}>{currencySymbol}{stPrice.toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>
        {/* ----------------------------- */}
      </div>
      
      {showGraph && (
        <div className="chart-container" onClick={(e) => e.stopPropagation()}>
            
            {/* --- BARRA DE FERRAMENTAS DO GRÁFICO --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '0 10px' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>
                    Fonte: <b style={{ color: currentSource === 'steam' ? '#3b82f6' : '#ef4444' }}>
                        {currentSource === 'steam' ? 'Steam Market' : 'BitSkins Sales'}
                    </b>
                </span>
                
                <div style={{ display: 'flex', gap: '5px' }}>
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
            {/* --------------------------------------- */}

            {loadingGraph ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayHistory} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatDateTick} stroke="#9ca3af" tick={{ fontSize: 12 }} tickMargin={10} minTickGap={30} interval="preserveStartEnd" />
                <YAxis domain={['auto', 'auto']} stroke="#9ca3af" tickFormatter={(val) => `${currencySymbol}${val}`} tick={{ fontSize: 12 }} width={45} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', color: '#fff' }} formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço BS']} />
                <Line type="monotone" dataKey="price" stroke={isPositive ? "#34d399" : "#f87171"} strokeWidth={3} dot={{ r: 3, fill: '#1a1a1f' }} activeDot={{ r: 6, fill: '#fff' }} animationDuration={1000} />
                </LineChart>
            </ResponsiveContainer>
            )}
        </div>
      )}
    </div>
  );
}