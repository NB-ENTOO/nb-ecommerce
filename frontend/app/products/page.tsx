'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { fetchProducts } from '@/services/api';
import { IProduct } from '@/types/product';
import { useEffect } from 'react';

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories] = useState([
    'Servers',
    'Storage',
    'Networking',
    'Components',
    'Accessories',
  ]);

  const loadProducts = async (filters: {
    search?: string;
    category?: string;
    sort?: string;
  }) => {
    try {
      setLoading(true);
      setError('');
      const { products } = await fetchProducts(filters);
      setProducts(products);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const sort = searchParams.get('sort') || undefined;
    loadProducts({ search, category, sort });
  }, [searchParams]);

  const handleFilterChange = (filters: {
    search?: string;
    category?: string;
    sort?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.sort) params.set('sort', filters.sort);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductFilter
        onFilterChange={handleFilterChange}
        categories={categories}
      />
      {error && (
        <div className="mt-8">
          <ErrorMessage message={error} />
        </div>
      )}
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
} 