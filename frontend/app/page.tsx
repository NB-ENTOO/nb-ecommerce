'use client';

import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Discover Amazing Products for Your Needs
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Shop our wide selection of high-quality products at competitive prices. 
              From electronics to fashion, we have everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition duration-300"
              >
                Shop Now
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                href="/categories"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-gray-50 transition duration-300"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            {/* Placeholder for now - would use real image in production */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty'].map((category) => (
            <div key={category} className="bg-gray-100 rounded-lg p-6 hover:shadow-md transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <Link href={`/categories/${category.toLowerCase()}`} className="text-blue-600 hover:underline flex items-center">
                View Products
                <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition duration-300 hover:shadow-lg">
              {/* Product Image */}
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Product Image {product}
                </div>
              </div>
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product Name {product}</h3>
                <p className="text-gray-600 text-sm mb-3">Short product description goes here...</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">${(19.99 * product).toFixed(2)}</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition duration-300"
          >
            View All Products
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
} 