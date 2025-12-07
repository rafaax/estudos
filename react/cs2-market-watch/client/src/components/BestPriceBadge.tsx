import { Crown } from 'lucide-react';

export function BestPriceBadge() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '3px',
      marginLeft: '8px',
      background: '#fbbf24',
      color: '#000',
      padding: '2px 6px', 
      borderRadius: '10px',
      fontSize: '9px', 
      fontWeight: '800',
      boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)', // Glow 
      whiteSpace: 'nowrap'
    }}>
      <Crown size={10} strokeWidth={3} />
      <span>MENOR PREÇO</span>
    </div>
  );
}