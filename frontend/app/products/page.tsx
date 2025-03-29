'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { Filter, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';

// Mock product data
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  description: 'Short product description goes here...',
  price: 19.99 + i * 10,
  category: i % 4 === 0 ? 'Electronics' : i % 4 === 1 ? 'Clothing' : i % 4 === 2 ? 'Home & Kitchen' : 'Beauty',
  imageUrl: '/product.jpg',
  stock: 10,
}));

// Categories for filter
const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty'];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on selected criteria
  useEffect(() => {
    let filtered = [...mockProducts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you would sort by date
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }

    setProducts(filtered);
  }, [selectedCategory, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(prev => (prev === category ? '' : category));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600 mt-2">Browse our collection of high-quality products</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min-price" className="sr-only">
                      Minimum Price
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="sr-only">
                      Maximum Price
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      min="0"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={toggleMobileFilters}
          className="md:hidden flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 mb-4"
        >
          <Filter size={18} className="mr-2" />
          Filters
          <ChevronDown size={18} className="ml-2" />
        </button>

        {/* Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-category-${category}`}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`mobile-category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile-min-price" className="sr-only">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    id="mobile-min-price"
                    min="0"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="mobile-max-price" className="sr-only">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    id="mobile-max-price"
                    min="0"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="flex-1">
          {/* Sort and Filter Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">{products.length} products</p>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition duration-300 hover:shadow-lg">
                {/* Product Image */}
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Product Image
                  </div>
                </div>
                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition duration-300">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg">
              <SlidersHorizontal size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-600 text-center mt-2">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange({ min: 0, max: 200 });
                  setSortBy('featured');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 