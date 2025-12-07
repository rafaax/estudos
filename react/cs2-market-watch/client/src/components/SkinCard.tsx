import { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  XAxis,
  Tooltip, 
  CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PricePoint {
  date: string;
  price: number;
}

interface SkinCardProps {
  id: string;
  name: string;
  price: number;
  priceHistory: PricePoint[];
  imageUrl: string;
  currency: 'USD' | 'BRL';
  rate: number;
  onRemove?: () => void;
}

export function SkinCard({ name, price, priceHistory, imageUrl, currency, rate, onRemove}: SkinCardProps) {
  const [showGraph, setShowGraph] = useState(false);

  const convert = (val: number) => (currency === 'BRL' ? val * rate : val);
  
  const displayData = useMemo(() => {
    const currentPrice = convert(price);
    const history = priceHistory.map(p => ({
      ...p,
      price: Number(convert(p.price).toFixed(2))
    }));

    return { currentPrice, history };
  }, [price, priceHistory, currency, rate]);

  const { currentPrice, history } = displayData;

  const firstPrice = history[0]?.price || currentPrice;
  const lastPrice = history[history.length - 1]?.price || currentPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice !== 0 ? ((priceChange / firstPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  const formatDateTick = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const formatDateTooltip = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('pt-BR');
  };

  return (
    <div 
      className="skin-card" 
      onClick={() => setShowGraph(!showGraph)}
      style={{ 
        position: 'relative', 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderColor: showGraph ? 'var(--primary)' : 'var(--border)'
      }}
    >
      {onRemove && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            position: 'absolute', top: '-8px', right: '-8px',
            background: '#ef4444', border: '2px solid #fff', color: '#ffffff',
            borderRadius: '50%', width: '26px', height: '26px', padding: 0,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
          title="Remover skin"
        >
          <X size={14} color="#ffffff" strokeWidth={3} /> 
        </button>
      )}

      <div className="card-image-container">
        <ImageWithFallback src={imageUrl} alt={name} className="card-image" />
      </div>

      <div className="card-info">
        <h3 title={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            {name}
        </h3>
        
        <div className="price-row" style={{ marginTop: 'auto' }}>
          <span className="price-value">
            {currencySymbol}{currentPrice.toFixed(2)}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{isPositive ? '+' : ''}{priceChangePercent}%</span>
            </div>
            {showGraph ? <ChevronUp size={16} color="#666"/> : <ChevronDown size={16} color="#666"/>}
          </div>
        </div>
      </div>

      {showGraph && (
        <div className="chart-container" onClick={(e) => e.stopPropagation()}>
            {history && history.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={history}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDateTick} 
                stroke="#9ca3af" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
                minTickGap={30}
              />
              
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#9ca3af"
                tickFormatter={(val) => `${currencySymbol}${val}`}
                tick={{ fontSize: 12 }}
                width={50}
                tickMargin={10}
              />
              
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                labelFormatter={formatDateTooltip} 
                formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço']}
              />
              
              <Line
                type="monotone" // ou "step"
                dataKey="price"
                stroke={isPositive ? "#34d399" : "#f87171"}
                strokeWidth={3}
                dot={{ r: 4, fill: '#1a1a1f', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#fff', strokeWidth: 0 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
            ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
                Sem histórico disponível
            </div>
            )}
        </div>
      )}
    </div>
  );
}