import  { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PricePoint {
  date: string;
  price: number;
}

interface SkinCardProps {
  id: string;
  name: string;
  price: number; // Preço base sempre em USD
  priceHistory: PricePoint[];
  imageUrl: string;
  currency: 'USD' | 'BRL'; // Nova prop
  rate: number;            // Nova prop
}

export function SkinCard({ name, price, priceHistory, imageUrl, currency, rate }: SkinCardProps) {
  // Converte valores baseado na moeda selecionada
  const convert = (val: number) => (currency === 'BRL' ? val * rate : val);
  
  // Memoiza os dados convertidos para não recalcular a cada render
  const displayData = useMemo(() => {
    const currentPrice = convert(price);
    
    // Converte o histórico
    const history = priceHistory.map(p => ({
      ...p,
      price: Number(convert(p.price).toFixed(2))
    }));

    return { currentPrice, history };
  }, [price, priceHistory, currency, rate]);

  const { currentPrice, history } = displayData;

  // Cálculos de variação
  const firstPrice = history[0]?.price || currentPrice;
  const lastPrice = history[history.length - 1]?.price || currentPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice !== 0 ? ((priceChange / firstPrice) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;

  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  return (
    <div className="skin-card">
      <div className="card-image-container">
        <ImageWithFallback src={imageUrl} alt={name} className="card-image" />
      </div>

      <div className="card-info">
        <h3 title={name}>{name}</h3>
        
        <div className="price-row">
          <span className="price-value">
            {currencySymbol}{currentPrice.toFixed(2)}
          </span>
          
          <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{isPositive ? '+' : ''}{priceChangePercent}%</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        {history && history.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço']}
              />
              
              <YAxis domain={['dataMin', 'dataMax']} hide />
              
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#34d399" : "#f87171"}
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '20px' }}>
            Sem histórico
          </div>
        )}
      </div>
    </div>
  );
}