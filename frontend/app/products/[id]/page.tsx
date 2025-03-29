'use client';

import { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailProps {
  params: {
    id: string;
  };
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // In a real app, we would fetch from the API here
    // For now, we'll use a mock product
    setTimeout(() => {
      setProduct({
        id: params.id,
        name: `Product ${params.id}`,
        description: 'This is a detailed description of the product. It provides information about its features, specifications, and benefits. The product is designed to meet the needs of various customers and offers high quality and reliability.',
        price: 99.99,
        category: 'Electronics',
        imageUrl: '/product.jpg',
        stock: 10
      });
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading product details...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <div className="text-xl text-gray-600">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/products" className="text-gray-500 hover:text-blue-600">
                Products
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`/categories/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-blue-600">
                {product.category}
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-800 font-medium">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-[400px]">
          <div className="text-gray-500 text-xl">Product Image Placeholder</div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" size={20} />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(25 reviews)</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-500">In stock: {product.stock} units</span>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition duration-300">
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Tabs (simplified version) */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
              Specifications
            </a>
            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Reviews
            </a>
            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              FAQs
            </a>
          </nav>
        </div>
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="text-sm text-gray-900 col-span-2">E-Shop Brand</dd>
              </div>
              <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="text-sm text-gray-900 col-span-2">ES-{params.id}000</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                <dd className="text-sm text-gray-900 col-span-2">1 Year Limited Warranty</dd>
              </div>
              <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-gray-500">Package Contents</dt>
                <dd className="text-sm text-gray-900 col-span-2">Product, User Manual, Warranty Card</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
} 