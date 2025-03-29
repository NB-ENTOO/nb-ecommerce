'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { fetchProductById } from '@/services/api';
import { IProduct } from '@/types/product';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProductById(id as string);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <ErrorMessage message="Product not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div>
          <ImageGallery images={product.images} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <PriceDisplay
              price={product.prices.base}
              currency={product.prices.currency}
              discountedPrice={product.prices.discounted}
            />
            {product.stock === 0 && (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
            {product.prices.discounted && (
              <Badge variant="success">Sale</Badge>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="font-medium capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-muted-foreground">{value.toString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Warranty & Support</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Warranty:</span>{' '}
                {product.warranty.duration} years {product.warranty.type}
              </p>
              <p className="text-muted-foreground">
                {product.warranty.description}
              </p>
              <p>
                <span className="font-medium">Support Level:</span>{' '}
                {product.support.level}
              </p>
              <p className="text-muted-foreground">{product.support.description}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
            >
              Configure Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              disabled={product.stock === 0}
            >
              Add to Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 