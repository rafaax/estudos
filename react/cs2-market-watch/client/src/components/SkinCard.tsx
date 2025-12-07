import { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { BestPriceBadge } from './BestPriceBadge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import axios from 'axios';

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

  const getRowStyle = (price: number | null, color: string) => {
    const isBest = price === bestPrice;
    return {
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '6px', 
      background: `rgba(${color}, 0.1)`, 
      borderRadius: '6px', 
      border: isBest ? `1px solid rgb(${color})` : '1px solid transparent',
      boxShadow: isBest ? `0 0 10px rgba(${color}, 0.2)` : 'none',
      position: 'relative' as 'relative'
    };
  };

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
          {/* --- Linha BitSkins --- */}
          {bsPrice && (
            <div style={getRowStyle(bsPrice, COLORS.bs)}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', background: '#ef4444', color: 'white', padding: '2px 4px', borderRadius: '4px', minWidth: '22px', textAlign: 'center'}}>BS</span>
                <span className="price-value" style={{fontSize: '1.1rem'}}>{currencySymbol}{bsPrice.toFixed(2)}</span>
                {bsPrice === bestPrice && <BestPriceBadge />}
              </div>
              {currentSource === 'bitskins' && trendBadge}
            </div>
          )}

          {/* --- Linha CSFloat --- */}
          {csPrice && (
            <div style={getRowStyle(csPrice, COLORS.cs)}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{ color: 'white', padding: '4px', borderRadius: '4px', minWidth: '22px', height: '22px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 400,400"><g id="svgg"><path id="path0" d="M262.190 82.395 C 258.665 82.913,248.683 86.261,244.800 88.226 C 223.642 98.938,211.960 114.610,203.225 144.000 C 199.048 158.054,200.866 156.547,187.736 156.839 C 175.847 157.105,174.857 157.280,172.722 159.495 C 169.529 162.808,167.893 170.459,169.825 173.046 C 171.867 175.781,171.865 175.780,182.928 176.000 C 188.468 176.110,193.248 176.360,193.551 176.555 C 194.253 177.008,193.953 180.188,192.810 184.400 C 192.363 186.050,191.639 189.073,191.202 191.119 C 190.765 193.164,190.246 195.144,190.047 195.519 C 189.849 195.893,189.385 197.730,189.015 199.600 C 188.645 201.470,188.004 204.170,187.591 205.600 C 187.177 207.030,186.539 209.460,186.174 211.000 C 185.809 212.540,185.094 215.510,184.586 217.600 C 184.077 219.690,183.276 223.020,182.805 225.000 C 182.335 226.980,181.520 230.310,180.995 232.400 C 179.404 238.738,178.782 241.280,178.160 244.000 C 177.526 246.775,175.671 253.723,174.423 258.000 C 174.005 259.430,173.547 261.230,173.403 262.000 C 173.150 263.361,171.963 267.306,170.335 272.200 C 169.896 273.520,169.199 275.770,168.787 277.200 C 164.283 292.843,164.894 292.527,139.000 292.590 C 119.813 292.637,119.518 292.672,116.656 295.234 C 109.910 301.272,112.948 313.870,122.212 318.270 C 126.899 320.496,138.885 321.066,144.940 319.351 C 151.001 317.634,152.438 317.163,155.000 316.053 C 160.330 313.744,161.846 312.896,168.200 308.673 C 177.416 302.547,185.436 293.951,191.870 283.304 C 197.708 273.643,202.054 261.998,206.166 245.000 C 206.538 243.460,207.282 240.490,207.818 238.400 C 209.354 232.410,209.959 229.992,210.621 227.200 C 210.960 225.770,211.598 223.250,212.039 221.600 C 212.480 219.950,213.182 217.160,213.599 215.400 C 214.951 209.699,215.615 207.057,216.465 204.000 C 216.924 202.350,217.561 199.658,217.880 198.017 C 218.199 196.377,218.629 194.719,218.836 194.333 C 219.043 193.946,219.558 191.959,219.982 189.915 C 220.406 187.872,221.010 185.478,221.325 184.595 C 221.640 183.712,222.022 182.182,222.173 181.195 C 222.980 175.943,222.813 176.000,237.309 176.000 C 253.615 176.000,254.346 175.690,256.162 167.996 C 257.818 160.982,258.079 158.780,257.382 157.716 L 256.782 156.800 243.413 156.800 C 226.946 156.800,227.658 157.170,229.843 149.745 C 230.417 147.795,231.117 145.210,231.400 144.000 C 233.089 136.764,236.116 126.234,237.150 124.000 C 237.608 123.010,237.986 121.909,237.991 121.554 C 237.996 121.199,238.331 120.479,238.736 119.954 C 239.141 119.429,239.656 118.460,239.880 117.800 C 242.610 109.779,249.417 105.823,257.142 107.769 C 258.384 108.081,261.110 108.541,263.200 108.789 C 265.290 109.037,268.960 109.608,271.355 110.057 C 281.829 112.022,289.009 106.710,288.995 97.006 C 288.980 86.151,277.863 80.092,262.190 82.395 " stroke="none" fill="#f9f9f9" fill-rule="evenodd"></path><path id="path1" d="M0.000 200.000 L 0.000 400.000 200.000 400.000 L 400.000 400.000 400.000 200.000 L 400.000 0.000 200.000 0.000 L 0.000 0.000 0.000 200.000 M274.788 82.398 C 286.357 84.592,292.266 94.243,287.606 103.330 C 284.490 109.405,279.309 111.550,271.355 110.057 C 268.960 109.608,265.290 109.037,263.200 108.789 C 261.110 108.541,258.384 108.081,257.142 107.769 C 249.417 105.823,242.610 109.779,239.880 117.800 C 239.656 118.460,239.141 119.429,238.736 119.954 C 238.331 120.479,237.996 121.199,237.991 121.554 C 237.986 121.909,237.608 123.010,237.150 124.000 C 236.116 126.234,233.089 136.764,231.400 144.000 C 231.117 145.210,230.417 147.795,229.843 149.745 C 227.658 157.170,226.946 156.800,243.413 156.800 L 256.782 156.800 257.382 157.716 C 258.079 158.780,257.818 160.982,256.162 167.996 C 254.346 175.690,253.615 176.000,237.309 176.000 C 222.813 176.000,222.980 175.943,222.173 181.195 C 222.022 182.182,221.640 183.712,221.325 184.595 C 221.010 185.478,220.406 187.872,219.982 189.915 C 219.558 191.959,219.043 193.946,218.836 194.333 C 218.629 194.719,218.199 196.377,217.880 198.017 C 217.561 199.658,216.924 202.350,216.465 204.000 C 215.615 207.057,214.951 209.699,213.599 215.400 C 213.182 217.160,212.480 219.950,212.039 221.600 C 211.598 223.250,210.960 225.770,210.621 227.200 C 209.959 229.992,209.354 232.410,207.818 238.400 C 207.282 240.490,206.538 243.460,206.166 245.000 C 202.468 260.289,199.111 269.779,193.820 279.901 C 187.963 291.108,178.300 301.960,168.200 308.673 C 161.846 312.896,160.330 313.744,155.000 316.053 C 152.438 317.163,151.001 317.634,144.940 319.351 C 138.885 321.066,126.899 320.496,122.212 318.270 C 112.948 313.870,109.910 301.272,116.656 295.234 C 119.518 292.672,119.813 292.637,139.000 292.590 C 164.894 292.527,164.283 292.843,168.787 277.200 C 169.199 275.770,169.896 273.520,170.335 272.200 C 171.963 267.306,173.150 263.361,173.403 262.000 C 173.547 261.230,174.005 259.430,174.423 258.000 C 175.671 253.723,177.526 246.775,178.160 244.000 C 178.782 241.280,179.404 238.738,180.995 232.400 C 181.520 230.310,182.335 226.980,182.805 225.000 C 183.276 223.020,184.077 219.690,184.586 217.600 C 185.094 215.510,185.809 212.540,186.174 211.000 C 186.539 209.460,187.177 207.030,187.591 205.600 C 188.004 204.170,188.645 201.470,189.015 199.600 C 189.385 197.730,189.849 195.893,190.047 195.519 C 190.246 195.144,190.765 193.164,191.202 191.119 C 191.639 189.073,192.363 186.050,192.810 184.400 C 193.953 180.188,194.253 177.008,193.551 176.555 C 193.248 176.360,188.468 176.110,182.928 176.000 C 171.865 175.780,171.867 175.781,169.825 173.046 C 167.893 170.459,169.529 162.808,172.722 159.495 C 174.857 157.280,175.847 157.105,187.736 156.839 C 200.866 156.547,199.048 158.054,203.225 144.000 C 211.281 116.892,221.060 102.556,239.000 91.549 C 245.427 87.606,247.348 86.775,257.590 83.515 C 262.146 82.065,270.255 81.538,274.788 82.398 " stroke="none" fill="#2f333e" fill-rule="evenodd"></path></g></svg></span>
                <span className="price-value" style={{fontSize: '1.1rem', color: '#eab308'}}>{currencySymbol}{csPrice.toFixed(2)}</span>
                {csPrice === bestPrice && <BestPriceBadge />}
              </div>
            </div>
          )}

          {stPrice && (
            <div style={getRowStyle(stPrice, COLORS.st)}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <span style={{ background: 'white', color: 'white', padding: '4px',borderRadius: '4px', minWidth: '22px', height: '22px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>steam</title><path d="M18.102 12.129c0-0 0-0 0-0.001 0-1.564 1.268-2.831 2.831-2.831s2.831 1.268 2.831 2.831c0 1.564-1.267 2.831-2.831 2.831-0 0-0 0-0.001 0h0c-0 0-0 0-0.001 0-1.563 0-2.83-1.267-2.83-2.83 0-0 0-0 0-0.001v0zM24.691 12.135c0-2.081-1.687-3.768-3.768-3.768s-3.768 1.687-3.768 3.768c0 2.081 1.687 3.768 3.768 3.768v0c2.080-0.003 3.765-1.688 3.768-3.767v-0zM10.427 23.76l-1.841-0.762c0.524 1.078 1.611 1.808 2.868 1.808 1.317 0 2.448-0.801 2.93-1.943l0.008-0.021c0.155-0.362 0.246-0.784 0.246-1.226 0-1.757-1.424-3.181-3.181-3.181-0.405 0-0.792 0.076-1.148 0.213l0.022-0.007 1.903 0.787c0.852 0.364 1.439 1.196 1.439 2.164 0 1.296-1.051 2.347-2.347 2.347-0.324 0-0.632-0.066-0.913-0.184l0.015 0.006zM15.974 1.004c-7.857 0.001-14.301 6.046-14.938 13.738l-0.004 0.054 8.038 3.322c0.668-0.462 1.495-0.737 2.387-0.737 0.001 0 0.002 0 0.002 0h-0c0.079 0 0.156 0.005 0.235 0.008l3.575-5.176v-0.074c0.003-3.12 2.533-5.648 5.653-5.648 3.122 0 5.653 2.531 5.653 5.653s-2.531 5.653-5.653 5.653h-0.131l-5.094 3.638c0 0.065 0.005 0.131 0.005 0.199 0 0.001 0 0.002 0 0.003 0 2.342-1.899 4.241-4.241 4.241-2.047 0-3.756-1.451-4.153-3.38l-0.005-0.027-5.755-2.383c1.841 6.345 7.601 10.905 14.425 10.905 8.281 0 14.994-6.713 14.994-14.994s-6.713-14.994-14.994-14.994c-0 0-0.001 0-0.001 0h0z"></path></svg></span>
                <span className="price-value" style={{fontSize: '1.1rem', color: '#3b82f6'}}>{currencySymbol}{stPrice.toFixed(2)}</span>
                {stPrice === bestPrice && <BestPriceBadge />}
              </div>
              {currentSource === 'steam' && trendBadge}
            </div>
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