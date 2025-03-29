'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { User, Package, CreditCard, LogOut, Edit2, ArrowRight, Shield } from 'lucide-react';

// Mock order history
const mockOrders = [
  {
    id: 'CFG-12345',
    date: 'April 12, 2023',
    total: 7599.97,
    status: 'Quote Sent',
    items: 2
  },
  {
    id: 'CFG-12346',
    date: 'March 8, 2023',
    total: 12499.99,
    status: 'Processing',
    items: 1
  },
  {
    id: 'CFG-12347',
    date: 'February 20, 2023',
    total: 4599.98,
    status: 'Delivered',
    items: 2
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    // Stop showing loading state once session is loaded
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const renderProfile = () => {
    if (!session?.user) return null;

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
            <p className="text-gray-800">{session.user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
            <p className="text-gray-800">{session.user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
            <p className="text-gray-800">{session.user.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Role</h3>
            <div className="flex items-center">
              <Shield size={16} className="text-blue-500 mr-2" />
              <p className="text-gray-800 capitalize">{session.user.role}</p>
            </div>
          </div>
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
            <button 
              onClick={handleSignOut}
              className="w-full text-left px-4 py-3 border border-red-300 rounded-md flex items-center justify-between hover:bg-red-50"
            >
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
          <h2 className="text-xl font-semibold text-gray-800">Configuration History</h2>
          <p className="text-gray-600 mt-1">View and track all your server configurations</p>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">Configured on {order.date}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center">
                    <Package size={18} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{order.items} server configurations</span>
                  </div>
                  <div className="mt-2 md:mt-0 flex justify-between md:justify-end items-center w-full md:w-auto">
                    <div className="md:mr-6">
                      <span className="text-sm text-gray-500 mr-1">Estimated Total:</span>
                      <span className="text-base font-medium text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                    <Link href={`/configurations/${order.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No configurations yet</h3>
            <p className="text-gray-600 mb-4">
              When you create your first server configuration, it will appear here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Configuring
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
                    <span>Configurations</span>
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