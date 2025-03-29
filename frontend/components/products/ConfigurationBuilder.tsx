import React, { useReducer, useCallback, useEffect } from 'react';
import {
  IProduct,
  // IWarrantyUpgrade, // Removed unused import
  // ISupportUpgrade, // Removed unused import
  IPrice
} from '@/types/product';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatPrice } from '@/lib/utils';
import CurrencySelector from '@/components/common/CurrencySelector';

// --- Helper Functions (Adjusted for IProduct type) ---

// Helper to get price in selected currency from an IPrice array (used by potential upgrades)
function getPriceInCurrency(prices: IPrice[], currency: 'USD' | 'GBP' | 'EUR'): number {
  const priceObj = prices.find((p) => p.currency === currency);
  return priceObj ? priceObj.amount : 0;
}

// Type for the structure within product.configurationOptions
type ProductConfigGroup = {
  name: string;
  options: Array<{ value: string; label: string; priceModifier: number; }>;
  required: boolean;
};

// Helper to calculate total price based on selected options and modifiers
function calculateTotalPriceInternal(
  basePrice: number,
  selectedOptions: Record<string, string>,
  configOptions: { [key: string]: ProductConfigGroup } // Use the object type
): number {
  let total = basePrice;
  // Iterate over the configuration *object*
  for (const groupKey in configOptions) {
    const group = configOptions[groupKey];
    const selectedValue = selectedOptions[group.name]; // Use group.name to match selectedOptions keys
    if (selectedValue) {
      const selectedOpt = group.options.find((opt) => opt.value === selectedValue);
      // Use priceModifier
      if (selectedOpt && selectedOpt.priceModifier) {
        total += selectedOpt.priceModifier;
      }
    }
  }
  return total;
}

// Validation Error Type
interface ValidationError {
  field: string;
  message: string;
}

// Helper for validation, adapted for configurationOptions object type
function validateConfigurationInternal(
  selectedOptions: Record<string, string>,
  configOptions: { [key: string]: ProductConfigGroup } // Use the object type
): ValidationError[] {
  const errors: ValidationError[] = [];
  // Iterate over the configuration *object*
  for (const groupKey in configOptions) {
      const group = configOptions[groupKey];
      if (group.required && !selectedOptions[group.name]) {
          errors.push({ field: group.name, message: `${group.name} is required.` });
      }
  }
  // TODO: Add more validation if needed (e.g., check stock, though stock isn't in this type structure)
  return errors;
}

// --- Reducer Logic (Simplified: removed buildTime, warranty/support price logic) ---

type ConfigurationState = {
  selectedCurrency: 'USD' | 'GBP' | 'EUR'; // Assuming base price currency matches this
  selectedOptions: Record<string, string>;
  totalPrice: number;
  errors: ValidationError[];
};

type ConfigurationAction =
  | { type: 'UPDATE_CURRENCY'; payload: 'USD' | 'GBP' | 'EUR' }
  | { type: 'UPDATE_OPTION'; payload: { groupName: string; value: string } }
  | { type: 'SET_ERRORS'; payload: ValidationError[] }
  | { type: 'CALCULATE_TOTALS'; payload: { product: IProduct } };

function configurationReducer(state: ConfigurationState, action: ConfigurationAction): ConfigurationState {
  switch (action.type) {
    case 'UPDATE_CURRENCY':
        // NOTE: Base price currency in IProduct isn't necessarily linked to this.
        // Recalculation needed if prices are currency-dependent.
      return { ...state, selectedCurrency: action.payload, errors: [] };
    case 'UPDATE_OPTION':
      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          [action.payload.groupName]: action.payload.value,
        },
        errors: [],
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'CALCULATE_TOTALS': {
      const { product } = action.payload;
      // Use base price directly. Assume it corresponds to selectedCurrency or handle conversion if needed.
      const basePrice = product.prices.base;

      let optionTotal = calculateTotalPriceInternal(
        basePrice,
        state.selectedOptions,
        product.configurationOptions // Pass the object
      );

      return {
        ...state,
        totalPrice: optionTotal,
      };
    }
    default:
      return state;
  }
}

// --- Component --- (Interface updated)
interface ConfigurationBuilderProps {
  product: IProduct;
  onAddToQuote: (configuration: {
    productId: string;
    selectedOptions: Record<string, string>;
    totalPrice: number;
    currency: string; // Use product's base currency or selected if conversion happens
  }) => void;
}

export default function ConfigurationBuilder({ product, onAddToQuote }: ConfigurationBuilderProps) {

  const initialState: ConfigurationState = {
    selectedCurrency: 'USD', // Default UI selector, may not match product.prices.currency
    selectedOptions: {},
    totalPrice: product.prices.base, // Initial price from product
    errors: [],
  };

  const [state, dispatch] = useReducer(configurationReducer, initialState);

  // Recalculate totals whenever options change (currency change might require more logic)
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS', payload: { product } });
  // Only re-calculate when options change, as currency/warranty/support don't affect price calculation now
  }, [state.selectedOptions, product]);

  const handleCurrencyChange = useCallback((value: 'USD' | 'GBP' | 'EUR') => {
     dispatch({ type: 'UPDATE_CURRENCY', payload: value });
     // Note: This currently only changes the display format via formatPrice,
     // it doesn't recalculate prices based on currency unless helpers are adjusted
  }, []);

  const handleOptionChange = useCallback((groupName: string, value: string) => {
    // Allow deselecting non-required options by selecting empty string
    const newValue = value === "" ? undefined : value;
    dispatch({ type: 'UPDATE_OPTION', payload: { groupName, value: newValue ?? "" } });
  }, []);

  const handleAddToQuote = useCallback(() => {
    const validationErrors = validateConfigurationInternal(
      state.selectedOptions,
      product.configurationOptions // Pass the object
    );

    if (validationErrors.length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: validationErrors });
      return;
    }

    // Updated configuration object matching the prop type
    const configuration = {
      productId: product._id,
      selectedOptions: state.selectedOptions,
      totalPrice: state.totalPrice,
      currency: product.prices.currency, // Use the currency defined in the product data
    };

    onAddToQuote(configuration);
  }, [state, product, onAddToQuote]);

  return (
    <div className="space-y-6">
      {/* Currency Selector - Note: Only affects display format currently */}
      {/* <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Display Currency:</span>
          <CurrencySelector value={state.selectedCurrency} onChange={handleCurrencyChange} />
        </div>
      </Card> */}

      {/* Configuration Options - Iterate over object */}
      {Object.entries(product.configurationOptions)
        // Removed commented-out sort logic
        .map(([groupKey, group]: [string, ProductConfigGroup]) => (
          <Card key={groupKey} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  {/* <p className="text-sm text-muted-foreground">{group.description}</p> // Description not in type */}
                </div>
                {group.required && <Badge variant="secondary">Required</Badge>}
              </div>

              <Select
                value={state.selectedOptions[group.name] || ''}
                onValueChange={(value) => handleOptionChange(group.name, value)}
                required={group.required}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${group.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {/* Add a None option if not required */}
                  {!group.required && (
                     <SelectItem value="">None</SelectItem>
                  )}
                  {group.options.map((option) => (
                    <SelectItem
                      key={option.value} // Assuming option.value is unique identifier
                      value={option.value}
                      // disabled={option.stock === 0} // Stock info not in type
                    >
                      <div className="flex items-center justify-between w-full">
                        {/* Use label from type */}
                        <span>{option.label}</span>
                        <div className="flex items-center gap-2">
                          {/* Use priceModifier */}
                          {option.priceModifier !== 0 && (
                            <span className="text-sm text-muted-foreground">
                              {option.priceModifier > 0 ? '+' : ''}{formatPrice(option.priceModifier, product.prices.currency)} {/* Use product currency */}
                            </span>
                          )}
                          {/* Stock badges removed */}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               {state.errors.find(e => e.field === group.name) && (
                 <p className="text-sm text-destructive">
                   {state.errors.find(e => e.field === group.name)?.message}
                 </p>
               )}
            </div>
          </Card>
        ))}

      {/* Warranty Options Section Removed */}
      {/* Support Options Section Removed */}

      {/* Error Messages */}
      {state.errors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc pl-4">
              {state.errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Card (Build time removed) */}
      <Card className="p-4 bg-muted/40">
        <div className="space-y-3">
          {/* Build time removed */}
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Price:</span>
            {/* Format using product's currency */}
            <span>{formatPrice(state.totalPrice, product.prices.currency)}</span>
          </div>
        </div>
      </Card>

      <Button onClick={handleAddToQuote} size="lg" className="w-full">
        Add to Quote
      </Button>
    </div>
  );
} 