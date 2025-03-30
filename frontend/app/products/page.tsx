'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface FilterState {
  category: string[];
  priceRange: [number, number];
  inStock: boolean;
}

// Mock data for now - will be replaced with API call
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Dell PowerEdge R740',
    description: 'Dual Intel Xeon Gold 6248R, 384GB RAM, 8x 1.92TB SSD',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988',
    category: 'Servers',
    inStock: true,
  },
  {
    id: '2',
    name: 'HPE ProLiant DL380 Gen10',
    description: 'Dual Intel Xeon Gold 6230R, 256GB RAM, 4x 960GB SSD',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141',
    category: 'Servers',
    inStock: true,
  },
  {
    id: '3',
    name: 'NetApp AFF A400',
    description: '24x 3.84TB NVMe SSD, Dual Controller',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1600267204026-85c3cc8e96cd',
    category: 'Storage',
    inStock: false,
  },
  // Add more mock products as needed
];

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 100000],
    inStock: false,
  });

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesStock = !filters.inStock || product.inStock;
    return matchesCategory && matchesPrice && matchesStock;
  });

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside>
          <ProductFilter filters={filters} onFilterChange={setFilters} />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
} 