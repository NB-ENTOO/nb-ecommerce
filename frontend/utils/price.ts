import { IPrice } from '@/types/product';

export const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getPriceInCurrency = (prices: IPrice[], targetCurrency: string): number => {
  const price = prices.find((p) => p.currency === targetCurrency);
  if (!price) {
    throw new Error(`Price not available in ${targetCurrency}`);
  }
  return price.amount;
};

export const calculateTotalPrice = (
  basePrice: number,
  selectedOptions: Record<string, string>,
  configurationOptions: any[],
  currency: string
): number => {
  let total = basePrice;

  // Add prices from selected configuration options
  Object.entries(selectedOptions).forEach(([groupName, selectedValue]) => {
    const group = configurationOptions.find((g) => g.name === groupName);
    if (group) {
      const option = group.options.find((o: any) => o.value === selectedValue);
      if (option) {
        total += option.price;
      }
    }
  });

  return total;
};

export const calculateBuildTime = (
  baseBuildTime: number,
  selectedOptions: Record<string, string>,
  configurationOptions: any[]
): number => {
  let totalBuildTime = baseBuildTime;

  // Add build time for complex configurations (example logic)
  const complexConfigCount = Object.values(selectedOptions).filter(Boolean).length;
  totalBuildTime += complexConfigCount * 4; // Add 4 hours per complex configuration

  return totalBuildTime;
}; 