import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface PricePoint { date: string; price: number; }

interface SkinPriceChartProps {
  data: PricePoint[];
  loading: boolean;
  currentSource: string;
  onSourceChange: (provider: 'steam' | 'bitskins') => void;
  hasBitskins: boolean;
  timeRange: number | 'all';
  onTimeRangeChange: (range: number | 'all') => void;
  currencySymbol: string;
  isPositive: boolean; 
  onClose: (e: any) => void;
}

const TIME_RANGES = [
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'TD', days: 'all' },
];

export function SkinPriceChart({ 
  data, 
  loading, 
  currentSource, 
  onSourceChange, 
  hasBitskins, 
  timeRange, 
  onTimeRangeChange, 
  currencySymbol, 
  isPositive,
  onClose
}: SkinPriceChartProps) {

  const formatDateTick = (dateStr: string) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  return (
    <div className="chart-container" onClick={onClose}>
        
        {/* --- CABEÇALHO DO GRÁFICO --- */}
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
                        onClick={() => onSourceChange('steam')} 
                        disabled={loading}
                        style={{ padding: '2px 8px', fontSize: '10px', background: currentSource === 'steam' ? '#3b82f6' : '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                    >Steam</button>
                    
                    {hasBitskins && (
                        <button 
                            onClick={() => onSourceChange('bitskins')} 
                            disabled={loading}
                            style={{ padding: '2px 8px', fontSize: '10px', background: currentSource === 'bitskins' ? '#ef4444' : '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                        >BitSkins</button>
                    )}
                </div>
            </div>

            {/* Linha 2: Filtros de Tempo */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '6px' }}>
                {TIME_RANGES.map((range) => (
                    <button
                        key={range.label}
                        onClick={() => onTimeRangeChange(range.days as number | 'all')}
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

        {/* --- GRÁFICO RECHARTS --- */}
        {loading ? (
            <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>
        ) : (
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={formatDateTick} stroke="#666" tick={{ fontSize: 10 }} minTickGap={30} interval="preserveStartEnd" />
                    <YAxis domain={['auto', 'auto']} stroke="#666" tickFormatter={(val) => `${currencySymbol}${val}`} tick={{ fontSize: 10 }} width={45} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1f', borderColor: '#333', color: '#fff' }} formatter={(value: number) => [`${currencySymbol}${value}`, 'Preço']} />
                    <Line type="monotone" dataKey="price" stroke={isPositive ? "#34d399" : "#f87171"} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#fff' }} animationDuration={500} />
                </LineChart>
            </ResponsiveContainer>
        )}
    </div>
  );
}