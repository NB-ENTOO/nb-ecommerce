'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    quantity: 1,
    image: '/headphones.jpg',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    quantity: 1,
    image: '/smartwatch.jpg',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 9.99; // Adding shipping
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                              Product Image
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <Link href={`/products/${item.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                                View details
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                            >
                              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M20 12H4"></path>
                              </svg>
                            </button>
                            <input
                              className="mx-2 border text-center w-12 rounded-md px-2 py-1"
                              type="text"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) updateQuantity(item.id, val);
                              }}
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                            >
                              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 4v16m8-8H4"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800 font-medium">$9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="text-gray-800 font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="w-full bg-blue-600 text-white mt-6 py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg">
            <ShoppingBag size={64} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 text-center mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
} 