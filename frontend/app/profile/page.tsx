'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { User, Package, CreditCard, LogOut, Edit2, ArrowRight } from 'lucide-react';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  },
  joinDate: 'January 15, 2023'
};

// Mock order history
const mockOrders = [
  {
    id: 'ORD-12345',
    date: 'April 12, 2023',
    total: 179.97,
    status: 'Delivered',
    items: 3
  },
  {
    id: 'ORD-12346',
    date: 'March 8, 2023',
    total: 249.99,
    status: 'Delivered',
    items: 1
  },
  {
    id: 'ORD-12347',
    date: 'February 20, 2023',
    total: 59.98,
    status: 'Delivered',
    items: 2
  }
];

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const renderProfile = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            <Edit2 size={16} className="mr-1" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
            <p className="text-gray-800">{user.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
            <p className="text-gray-800">{user.joinDate}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <address className="not-italic">
            <p className="text-gray-800">{user.address.street}</p>
            <p className="text-gray-800">{user.address.city}, {user.address.state} {user.address.zip}</p>
            <p className="text-gray-800">{user.address.country}</p>
          </address>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <CreditCard size={20} className="text-gray-500 mr-3" />
                <span>Manage Payment Methods</span>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-3" />
                <span>Change Password</span>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-3 border border-red-300 rounded-md flex items-center justify-between hover:bg-red-50">
              <div className="flex items-center">
                <LogOut size={20} className="text-red-500 mr-3" />
                <span className="text-red-600">Sign Out</span>
              </div>
              <ArrowRight size={16} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
          <p className="text-gray-600 mt-1">View and track all your orders</p>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center">
                    <Package size={18} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{order.items} items</span>
                  </div>
                  <div className="mt-2 md:mt-0 flex justify-between md:justify-end items-center w-full md:w-auto">
                    <div className="md:mr-6">
                      <span className="text-sm text-gray-500 mr-1">Total:</span>
                      <span className="text-base font-medium text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    <Link href={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">
              When you place your first order, it will appear here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    <span>Profile</span>
                  </div>
                </button>
                <button
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'orders'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <div className="flex items-center">
                    <Package size={18} className="mr-2" />
                    <span>Orders</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Content */}
            {activeTab === 'profile' ? renderProfile() : renderOrders()}
          </div>
        )}
      </div>
    </Layout>
  );
} 