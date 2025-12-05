export const ImageWithFallback = ({ src, alt, className }: any) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={(e) => {
        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
      }}
    />
  );
};