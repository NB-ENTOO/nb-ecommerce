import React from 'react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/price';

interface PriceDisplayProps {
  amount: number;
  currency: 'USD' | 'GBP' | 'EUR';
  className?: string;
}

export default function PriceDisplay({ amount, currency, className }: PriceDisplayProps) {
  return (
    <span className={cn('font-medium', className)}>
      {formatPrice(amount, currency)}
    </span>
  );
} 