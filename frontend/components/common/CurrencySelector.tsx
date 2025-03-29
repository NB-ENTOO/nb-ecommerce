import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CurrencySelectorProps {
  value: 'USD' | 'GBP' | 'EUR';
  onChange: (value: 'USD' | 'GBP' | 'EUR') => void;
}

const currencies = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
];

export default function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.value} value={currency.value}>
            <div className="flex items-center gap-2">
              <span>{currency.symbol}</span>
              <span>{currency.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 