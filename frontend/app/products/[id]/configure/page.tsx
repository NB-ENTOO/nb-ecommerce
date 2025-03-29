'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ConfigurationBuilder from '@/components/products/ConfigurationBuilder';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { fetchProductById } from '@/services/api';
import { IProduct } from '@/types/product';

export default function ConfigurePage() {
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

  const handleAddToQuote = async (configuration: any) => {
    try {
      // Here you would typically make an API call to add the configuration to the user's quote
      console.log('Adding to quote:', configuration);
    } catch (err) {
      console.error('Error adding to quote:', err);
    }
  };

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
      <h1 className="text-3xl font-bold mb-8">Configure {product.name}</h1>
      <ConfigurationBuilder product={product} onAddToQuote={handleAddToQuote} />
    </div>
  );
} 