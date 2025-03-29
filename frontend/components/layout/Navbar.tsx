import React from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            E-Shop
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center w-1/3 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 text-gray-500">
              <Search size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-500">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-500">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-500">
              Deals
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-gray-700 hover:text-blue-500">
              <User size={24} />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-500 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 