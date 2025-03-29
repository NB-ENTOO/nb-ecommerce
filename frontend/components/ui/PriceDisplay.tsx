import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  currency?: string;
  className?: string;
  discountedPrice?: number | null;
}

export function PriceDisplay({
  price,
  currency = 'USD',
  className,
  discountedPrice
}: PriceDisplayProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  if (discountedPrice) {
    return (
      <div className={cn('flex flex-col', className)}>
        <span className="text-lg font-bold text-green-600">
          {formatter.format(discountedPrice)}
        </span>
        <span className="text-sm text-muted-foreground line-through">
          {formatter.format(price)}
        </span>
      </div>
    );
  }

  return (
    <span className={cn('text-lg font-bold', className)}>
      {formatter.format(price)}
    </span>
  );
} 