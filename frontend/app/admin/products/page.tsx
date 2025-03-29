'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown, 
  Filter,
  ArrowUpDown,
  Download,
  Upload
} from 'lucide-react';

// Mock product data
const mockProducts = [
  { 
    id: '1', 
    name: 'Dell PowerEdge R740 Server', 
    category: 'Rack Servers',
    price: '$3,599.99',
    stock: 15,
    sku: 'DELL-R740-01',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'HPE ProLiant DL380 Gen10', 
    category: 'Rack Servers',
    price: '$4,199.99',
    stock: 8,
    sku: 'HPE-DL380-01',
    status: 'Active'
  },
  { 
    id: '3', 
    name: 'Cisco UCS C240 M5', 
    category: 'Rack Servers',
    price: '$5,249.99',
    stock: 5,
    sku: 'CISCO-C240-01',
    status: 'Active'
  },
  { 
    id: '4', 
    name: 'Lenovo ThinkSystem SR650', 
    category: 'Rack Servers',
    price: '$3,849.99',
    stock: 12,
    sku: 'LENOVO-SR650-01',
    status: 'Active'
  },
  { 
    id: '5', 
    name: 'Dell PowerEdge T640 Tower Server', 
    category: 'Tower Servers',
    price: '$2,899.99',
    stock: 7,
    sku: 'DELL-T640-01',
    status: 'Active'
  },
  { 
    id: '6', 
    name: 'HPE ProLiant ML350 Gen10', 
    category: 'Tower Servers',
    price: '$2,499.99',
    stock: 3,
    sku: 'HPE-ML350-01',
    status: 'Low Stock'
  },
  { 
    id: '7', 
    name: 'Intel Xeon Gold 6248R Processor', 
    category: 'CPUs',
    price: '$1,699.99',
    stock: 20,
    sku: 'INTEL-6248R-01',
    status: 'Active'
  },
  { 
    id: '8', 
    name: 'AMD EPYC 7742 Processor', 
    category: 'CPUs',
    price: '$3,999.99',
    stock: 6,
    sku: 'AMD-7742-01',
    status: 'Active'
  },
  { 
    id: '9', 
    name: 'Samsung 32GB DDR4-3200 ECC RDIMM', 
    category: 'Memory',
    price: '$219.99',
    stock: 50,
    sku: 'SAM-32GB-ECC-01',
    status: 'Active'
  },
  { 
    id: '10', 
    name: 'Seagate Exos 18TB Enterprise HDD', 
    category: 'Storage',
    price: '$429.99',
    stock: 25,
    sku: 'SEAGATE-18TB-01',
    status: 'Active'
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Filter products based on search term and selected category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter dropdown
  const categories = ['All Categories', ...Array.from(new Set(mockProducts.map(product => product.category)))];
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-3">
            <Link 
              href="/admin/products/import" 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Upload size={16} />
              <span>Import</span>
            </Link>
            <Link 
              href="/admin/products/new" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </Link>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="ml-auto">
            <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Product
                      <ArrowUpDown size={14} className="text-gray-400" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Category
                      <ArrowUpDown size={14} className="text-gray-400" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Price
                      <ArrowUpDown size={14} className="text-gray-400" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Stock
                      <ArrowUpDown size={14} className="text-gray-400" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown size={14} className="text-gray-400" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Low Stock' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}`} 
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 