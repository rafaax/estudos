import { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PricePoint { date: string; price: number; }

interface SkinCardProps {
  id: string;
  name: string;
  // Recebe os objetos agrupados
  prices: { bitskins: number | null, csfloat: number | null };
  ids: { bitskins: string | null, csfloat: string | null };
  priceHistory: PricePoint[];
  imageUrl: string;
  currency: 'USD' | 'BRL';
  rate: number;
  onRemove?: () => void;
}

export function SkinCard({ name, prices, priceHistory, imageUrl, currency, rate, onRemove }: SkinCardProps) {
  const [showGraph, setShowGraph] = useState(false);

  const convert = (val: number | null) => {
    if (val === null) return null;
    return currency === 'BRL' ? val * rate : val;
  };

  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  // Lógica de Melhor Preço (Highlight)
  const bsPrice = convert(prices.bitskins);
  const csPrice = convert(prices.csfloat);
  
  // Define qual é o menor para destacar
  const bestPrice = Math.min(bsPrice || 99999, csPrice || 99999);

  // Lógica do Histórico (Baseado no BitSkins por enquanto)
  const displayHistory = useMemo(() => {
    return priceHistory.map(p => ({
      ...p,
      price: Number((currency === 'BRL' ? p.price * rate : p.price).toFixed(2))
    }));
  }, [priceHistory, currency, rate]);

  // Variação (baseada no histórico do bitskins)
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
                        <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#ef4444', color: 'white', padding: '2px 4px', borderRadius: '4px'}}>BS</span>
                        <span className="price-value" style={{fontSize: '1.1rem'}}>{currencySymbol}{bsPrice.toFixed(2)}</span>
                    </div>
                    {/* Só mostra variação se tiver histórico (bitskins) */}
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
                        <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#eab308', color: 'black', padding: '2px 4px', borderRadius: '4px'}}>CS</span>
                        <span className="price-value" style={{fontSize: '1.1rem', color: '#eab308'}}>{currencySymbol}{csPrice.toFixed(2)}</span>
                    </div>
                </div>
            )}
            
            {!bsPrice && !csPrice && <span style={{color: '#666'}}>Sem estoque</span>}

        </div>
        {/* ----------------------------- */}
      </div>

      {showGraph && (
        <div className="chart-container" onClick={(e) => e.stopPropagation()}>
            {displayHistory && displayHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayHistory} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" tickFormatter={formatDateTick} stroke="#9ca3af" tick={{ fontSize: 12 }} tickMargin={10} minTickGap={30} interval="preserveStartEnd" />
                <YAxis domain={['auto', 'auto']} stroke="#9ca3af" tickFormatter={(val) => `${currencySymbol}${val}`} tick={{ fontSize: 12 }} width={45} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', color: '#fff' }} formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço BS']} />
                <Line type="monotone" dataKey="price" stroke={isPositive ? "#34d399" : "#f87171"} strokeWidth={3} dot={{ r: 3, fill: '#1a1a1f' }} activeDot={{ r: 6, fill: '#fff' }} animationDuration={1000} />
                </LineChart>
            </ResponsiveContainer>
            ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>Sem histórico BitSkins</div>
            )}
        </div>
      )}
    </div>
  );
}