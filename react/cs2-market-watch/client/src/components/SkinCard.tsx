import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import axios from 'axios';
import { PriceRow } from './PriceRow';
import { CSFloatIcon, SteamIcon } from './StoreIcons';
import { SkinPriceChart } from './SkinPriceChart';

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
        <SkinPriceChart 
          data={displayHistory}
          loading={loadingGraph}
          currentSource={currentSource}
          onSourceChange={fetchHistory}
          hasBitskins={!!ids.bitskins}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          currencySymbol={currencySymbol}
          isPositive={isPositive}
          onClose={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}