import React, { useState, useEffect } from 'react';
import { IProduct, IConfigurationGroup, IConfigurationOption, IWarrantyUpgrade, ISupportUpgrade } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calculateTotalPrice, calculateBuildTime, formatPrice, getPriceInCurrency } from '@/utils/price';
import { validateQuoteSubmission, ValidationError } from '@/utils/validation';
import CurrencySelector from '@/components/common/CurrencySelector';

interface ConfigurationBuilderProps {
  product: IProduct;
  onAddToQuote: (configuration: {
    productId: string;
    selectedOptions: Record<string, string>;
    warranty: string | null;
    support: string | null;
    totalPrice: number;
    currency: 'USD' | 'GBP' | 'EUR';
    buildTime: number;
  }) => void;
}

export default function ConfigurationBuilder({ product, onAddToQuote }: ConfigurationBuilderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'GBP' | 'EUR'>('USD');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [buildTime, setBuildTime] = useState<number>(product.customization.buildTime);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    try {
      const basePrice = getPriceInCurrency(product.prices, selectedCurrency);
      const total = calculateTotalPrice(
        basePrice,
        selectedOptions,
        product.configurationOptions,
        selectedCurrency
      );
      setTotalPrice(total);

      const time = calculateBuildTime(
        product.customization.buildTime,
        selectedOptions,
        product.configurationOptions
      );
      setBuildTime(time);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  }, [selectedOptions, selectedCurrency, product]);

  const handleOptionChange = (groupName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: value,
    }));
  };

  const handleWarrantyChange = (value: string) => {
    setSelectedWarranty(value);
  };

  const handleSupportChange = (value: string) => {
    setSelectedSupport(value);
  };

  const handleAddToQuote = () => {
    const validationErrors = validateQuoteSubmission(
      selectedOptions,
      product.configurationOptions,
      selectedWarranty,
      product.warranty.upgradeOptions || [],
      selectedSupport,
      product.support.upgradeOptions || []
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const configuration = {
      productId: product._id,
      selectedOptions,
      warranty: selectedWarranty,
      support: selectedSupport,
      totalPrice,
      currency: selectedCurrency,
      buildTime,
    };

    onAddToQuote(configuration);
  };

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Select Currency:</span>
          <CurrencySelector value={selectedCurrency} onChange={setSelectedCurrency} />
        </div>
      </Card>

      {/* Configuration Options */}
      {product.configurationOptions
        .sort((a: IConfigurationGroup, b: IConfigurationGroup) => a.sortOrder - b.sortOrder)
        .map((group: IConfigurationGroup) => (
          <Card key={group.name} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                {group.required && <Badge variant="secondary">Required</Badge>}
              </div>

              <Select
                value={selectedOptions[group.name] || ''}
                onValueChange={(value) => handleOptionChange(group.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${group.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {group.options.map((option: IConfigurationOption) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.stock === 0}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{option.value}</span>
                        <div className="flex items-center gap-2">
                          {option.price > 0 && (
                            <span className="text-sm text-muted-foreground">
                              +{formatPrice(option.price, selectedCurrency)}
                            </span>
                          )}
                          {option.stock === 0 && (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                          {option.stock > 0 && option.stock <= 5 && (
                            <Badge variant="warning">Low Stock</Badge>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}

      {/* Warranty Options */}
      {product.warranty.upgradeable && product.warranty.upgradeOptions && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Warranty Upgrade</h3>
              <p className="text-sm text-muted-foreground">
                Extend your warranty coverage
              </p>
            </div>

            <Select
              value={selectedWarranty || ''}
              onValueChange={handleWarrantyChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Warranty Upgrade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Standard Warranty</SelectItem>
                {product.warranty.upgradeOptions.map((option: IWarrantyUpgrade) => (
                  <SelectItem key={option.type} value={option.type}>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {option.duration} {option.unit} - {option.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        +{formatPrice(getPriceInCurrency(option.price, selectedCurrency), selectedCurrency)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Support Options */}
      {product.support.upgradeOptions && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Support Upgrade</h3>
              <p className="text-sm text-muted-foreground">
                Enhance your support package
              </p>
            </div>

            <Select
              value={selectedSupport || ''}
              onValueChange={handleSupportChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Support Upgrade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Standard Support</SelectItem>
                {product.support.upgradeOptions.map((option: ISupportUpgrade) => (
                  <SelectItem key={option.type} value={option.type}>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {option.hours} hours - {option.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        +{formatPrice(getPriceInCurrency(option.price, selectedCurrency), selectedCurrency)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <ul className="list-disc pl-4">
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Summary */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total Price:</span>
            <span className="text-2xl font-bold">
              {formatPrice(totalPrice, selectedCurrency)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Estimated Build Time:</span>
            <span>{buildTime} hours</span>
          </div>
          <Button
            className="w-full"
            onClick={handleAddToQuote}
            disabled={errors.length > 0}
          >
            Add to Quote
          </Button>
        </div>
      </Card>
    </div>
  );
} 