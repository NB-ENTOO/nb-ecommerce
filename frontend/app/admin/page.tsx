'use client';

import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Package, 
  Folder, 
  Upload, 
  Users, 
  Clock,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

// Mock data for dashboard stats
const stats = [
  { name: 'Total Products', value: '124', icon: <Package size={24} />, href: '/admin/products', color: 'bg-blue-500' },
  { name: 'Categories', value: '16', icon: <Folder size={24} />, href: '/admin/categories', color: 'bg-green-500' },
  { name: 'Recent Imports', value: '3', icon: <Upload size={24} />, href: '/admin/products/import', color: 'bg-purple-500' },
  { name: 'Admin Users', value: '4', icon: <Users size={24} />, href: '/admin/users', color: 'bg-orange-500' },
];

// Mock recent activity
const recentActivity = [
  { action: 'Product added', target: 'Dell PowerEdge R740xd Server', time: '2 hours ago', user: 'admin@example.com' },
  { action: 'Category updated', target: 'Rack Servers', time: '5 hours ago', user: 'admin@example.com' },
  { action: 'Bulk import completed', target: '15 products imported', time: '1 day ago', user: 'admin@example.com' },
  { action: 'Product updated', target: 'HPE ProLiant DL380 Gen10', time: '2 days ago', user: 'admin@example.com' },
];

// Mock alerts
const alerts = [
  { message: 'Docker container connectivity issue detected', severity: 'high', time: '3 hours ago' },
  { message: 'Database backup scheduled for tonight', severity: 'info', time: '1 day ago' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link 
              href="/admin/products/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Product
            </Link>
            <Link 
              href="/admin/products/import" 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Import Products
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link 
              key={stat.name} 
              href={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">System Alerts</h2>
              <Link href="/admin/alerts" className="text-sm text-blue-600 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md flex items-start gap-3 ${
                    alert.severity === 'high' ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  <AlertTriangle size={20} />
                  <div>
                    <p>{alert.message}</p>
                    <p className="text-sm opacity-80 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Link href="/admin/activity" className="text-sm text-blue-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Clock size={16} />
                </div>
                <div>
                  <p>
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-gray-600">: {activity.target}</span>
                  </p>
                  <div className="text-sm text-gray-500 mt-1 flex gap-3">
                    <span>{activity.time}</span>
                    <span>by {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 