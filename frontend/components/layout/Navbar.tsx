import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">NovaBuy</span>
            <span className="hidden sm:inline-block text-gray-500 text-sm">| Premium Shopping</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center w-1/3 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm"
            />
            <button className="absolute right-3 text-gray-500 hover:text-blue-500 transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wide">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wide">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wide">
              Deals
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 font-medium text-sm uppercase tracking-wide">
              Contact
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-6">
            <Link href="/account" className="text-gray-700 hover:text-blue-500 transition-colors">
              <div className="flex flex-col items-center">
                <User size={22} />
                <span className="text-xs mt-1 hidden sm:block">Account</span>
              </div>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-500 transition-colors relative">
              <div className="flex flex-col items-center">
                <ShoppingCart size={22} />
                <span className="text-xs mt-1 hidden sm:block">Cart</span>
              </div>
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-blue-500 py-2 px-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-blue-500 py-2 px-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-700 hover:text-blue-500 py-2 px-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-500 py-2 px-3 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-2 text-gray-500">
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 