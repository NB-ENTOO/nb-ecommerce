'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { submitConfiguration } from '@/services/api';

interface QuoteItem {
  productId: string;
  productName: string;
  options: Record<string, string>;
  totalPrice: number;
  currency: string;
}

export default function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });
  const [quoteItems] = useState<QuoteItem[]>([
    {
      productId: '1',
      productName: 'Dell PowerEdge R740',
      options: {
        processor: 'Intel Xeon Gold 6330 (28C/56T)',
        memory: '128GB (4x32GB) DDR4-3200',
      },
      totalPrice: 3699.99,
      currency: 'USD',
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Submit each configuration in the quote
      await Promise.all(
        quoteItems.map((item) =>
          submitConfiguration({
            productId: item.productId,
            options: item.options,
            totalPrice: item.totalPrice,
            currency: item.currency,
            customerInfo,
          })
        )
      );
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit quote. Please try again later.');
      console.error('Error submitting quote:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Quote</h1>

      {error && (
        <div className="mb-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {success ? (
        <Card>
          <CardHeader>
            <CardTitle>Quote Submitted Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Thank you for your quote request. Our team will review your configuration
              and get back to you shortly.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Submit Another Quote</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Quote Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items in Your Quote</h2>
            {quoteItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.productName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(item.options).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium capitalize">
                          {key.replace(/_/g, ' ')}:
                        </span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <PriceDisplay
                      price={item.totalPrice}
                      currency={item.currency}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <PriceDisplay
                    price={totalPrice}
                    currency={quoteItems[0]?.currency || 'USD'}
                    className="text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={customerInfo.company}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : null}
                Submit Quote Request
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 