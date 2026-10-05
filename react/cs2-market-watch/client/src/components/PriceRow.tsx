import { type ReactNode } from 'react'; 
import { BestPriceBadge } from './BestPriceBadge';

interface PriceRowProps {
  label: string;      
  icon?: ReactNode;   
  color: string;      
  price: number;      
  bestPrice: number;  
  currencySymbol: string;
  children?: ReactNode; 
}

export function PriceRow({ label, icon, color, price, bestPrice, currencySymbol, children }: PriceRowProps) {
  const isBest = price === bestPrice;

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '6px', 
      backgroundColor: color.startsWith('#') ? `${color}1A` : `rgba(${color}, 0.1)`, 
      borderRadius: '6px', 
      border: isBest ? `1px solid ${color}` : '1px solid transparent',
      boxShadow: isBest ? `0 0 10px ${color}33` : 'none', 
      position: 'relative'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
        {/* Ícone ou Texto da Loja */}
        <span style={{ 
            fontSize: '10px', 
            fontWeight: 'bold', 
            background: color, 
            color: label === 'CS' ? 'black' : 'white', 
            padding: icon ? '4px' : '2px 4px', 
            borderRadius: '4px', 
            minWidth: '22px', 
            height: icon ? '22px' : 'auto',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon || label}
        </span>

        {/* Valor do Preço */}
        <span className="price-value" style={{fontSize: '1.1rem', color: color}}>
            {currencySymbol}{price.toFixed(2)}
        </span>
        
        {/* Badge de Melhor Preço */}
        {isBest && <BestPriceBadge />}
      </div>

      
      {children}
    </div>
  );
}