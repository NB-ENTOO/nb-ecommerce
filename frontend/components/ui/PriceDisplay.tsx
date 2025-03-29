import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  currency?: string;
  discountedPrice?: number;
  className?: string;
}

export function PriceDisplay({
  price,
  currency = 'USD',
  discountedPrice,
  className = '',
}: PriceDisplayProps) {
  const hasDiscount = discountedPrice !== undefined && discountedPrice < price;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {hasDiscount ? (
        <>
          <span className="text-lg font-bold text-destructive line-through">
            {formatPrice(price, currency)}
          </span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(discountedPrice!, currency)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({Math.round(((price - discountedPrice!) / price) * 100)}% off)
          </span>
        </>
      ) : (
        <span className="text-lg font-bold text-primary">
          {formatPrice(price, currency)}
        </span>
      )}
    </div>
  );
} 