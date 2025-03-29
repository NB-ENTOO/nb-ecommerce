'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight, 
  FolderOpen,
  Search
} from 'lucide-react';
import Link from 'next/link';

// Mock categories data with hierarchy
const mockCategories = [
  {
    id: '1',
    name: 'Servers',
    slug: 'servers',
    description: 'Enterprise servers for businesses of all sizes',
    productCount: 125,
    children: [
      {
        id: '2',
        name: 'Rack Servers',
        slug: 'rack-servers',
        description: 'High-density compute in standard rack form factors',
        productCount: 48,
        children: []
      },
      {
        id: '3',
        name: 'Tower Servers',
        slug: 'tower-servers',
        description: 'Standalone servers for small business and branch offices',
        productCount: 23,
        children: []
      },
      {
        id: '4',
        name: 'Blade Servers',
        slug: 'blade-servers',
        description: 'High-density modular servers for data centers',
        productCount: 15,
        children: []
      },
      {
        id: '5',
        name: 'Composable Infrastructure',
        slug: 'composable-infrastructure',
        description: 'Software-defined server infrastructure',
        productCount: 12,
        children: []
      }
    ]
  },
  {
    id: '6',
    name: 'Storage',
    slug: 'storage',
    description: 'Enterprise storage solutions',
    productCount: 78,
    children: [
      {
        id: '7',
        name: 'SAN Storage',
        slug: 'san-storage',
        description: 'Storage Area Network solutions',
        productCount: 18,
        children: []
      },
      {
        id: '8',
        name: 'NAS Storage',
        slug: 'nas-storage',
        description: 'Network Attached Storage devices',
        productCount: 24,
        children: []
      },
      {
        id: '9',
        name: 'Hard Drives & SSDs',
        slug: 'hard-drives-ssds',
        description: 'Individual storage devices and components',
        productCount: 36,
        children: []
      }
    ]
  },
  {
    id: '10',
    name: 'Networking',
    slug: 'networking',
    description: 'Enterprise networking equipment',
    productCount: 92,
    children: [
      {
        id: '11',
        name: 'Switches',
        slug: 'switches',
        description: 'Network switches for data centers and offices',
        productCount: 29,
        children: []
      },
      {
        id: '12',
        name: 'Routers',
        slug: 'routers',
        description: 'Enterprise routing solutions',
        productCount: 17,
        children: []
      },
      {
        id: '13',
        name: 'Wireless',
        slug: 'wireless',
        description: 'Wireless networking solutions',
        productCount: 31,
        children: []
      },
      {
        id: '14',
        name: 'Security Appliances',
        slug: 'security-appliances',
        description: 'Network security devices',
        productCount: 15,
        children: []
      }
    ]
  },
  {
    id: '15',
    name: 'Components',
    slug: 'components',
    description: 'Server and workstation components',
    productCount: 156,
    children: [
      {
        id: '16',
        name: 'Processors',
        slug: 'processors',
        description: 'CPUs for servers and workstations',
        productCount: 42,
        children: []
      },
      {
        id: '17',
        name: 'Memory',
        slug: 'memory',
        description: 'RAM modules for servers and workstations',
        productCount: 37,
        children: []
      },
      {
        id: '18',
        name: 'Graphics Cards',
        slug: 'graphics-cards',
        description: 'GPUs for workstations and rendering',
        productCount: 28,
        children: []
      },
      {
        id: '19',
        name: 'Power Supplies',
        slug: 'power-supplies',
        description: 'Power supply units for servers',
        productCount: 24,
        children: []
      },
      {
        id: '20',
        name: 'Server Accessories',
        slug: 'server-accessories',
        description: 'Rails, cables, and other accessories',
        productCount: 25,
        children: []
      }
    ]
  },
  {
    id: '21',
    name: 'Software',
    slug: 'software',
    description: 'Enterprise software solutions',
    productCount: 83,
    children: [
      {
        id: '22',
        name: 'Operating Systems',
        slug: 'operating-systems',
        description: 'Server operating systems',
        productCount: 15,
        children: []
      },
      {
        id: '23',
        name: 'Virtualization',
        slug: 'virtualization',
        description: 'Virtualization platforms and tools',
        productCount: 18,
        children: []
      },
      {
        id: '24',
        name: 'Backup & Recovery',
        slug: 'backup-recovery',
        description: 'Data protection solutions',
        productCount: 24,
        children: []
      },
      {
        id: '25',
        name: 'Security Software',
        slug: 'security-software',
        description: 'Enterprise security solutions',
        productCount: 26,
        children: []
      }
    ]
  }
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  children: Category[];
}

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Recursive function to filter categories based on search term
  const filterCategories = (categories: Category[], term: string): Category[] => {
    if (!term) return categories;
    
    return categories
      .map(category => {
        // Check if current category matches search term
        const matchesSearch = 
          category.name.toLowerCase().includes(term.toLowerCase()) ||
          category.description.toLowerCase().includes(term.toLowerCase());
        
        // Filter children recursively
        const filteredChildren = filterCategories(category.children, term);
        
        // Include category if it matches or has matching children
        if (matchesSearch || filteredChildren.length > 0) {
          return {
            ...category,
            children: filteredChildren
          };
        }
        
        return null;
      })
      .filter(Boolean) as Category[]; // Filter out null results
  };
  
  const filteredCategories = filterCategories(mockCategories, searchTerm);
  
  // Recursive function to render categories with their children
  const renderCategories = (categories: Category[], level = 0) => {
    return categories.map(category => {
      const hasChildren = category.children.length > 0;
      const isExpanded = expandedCategories.includes(category.id);
      
      return (
        <div key={category.id}>
          <div 
            className={`
              flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-200
              ${level > 0 ? 'pl-' + (4 + level * 6) : ''}
            `}
          >
            {hasChildren && (
              <button 
                onClick={() => toggleCategory(category.id)}
                className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <ChevronRight 
                  size={18} 
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                />
              </button>
            )}
            
            {!hasChildren && <div className="w-[18px] mr-2" />}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <FolderOpen size={18} className="text-amber-500 mr-2 flex-shrink-0" />
                <span className="font-medium truncate">{category.name}</span>
                <span className="ml-2 text-xs text-gray-500">({category.productCount})</span>
              </div>
              <p className="text-sm text-gray-500 truncate mt-0.5">{category.description}</p>
            </div>
            
            <div className="flex items-center ml-4 space-x-2">
              <Link
                href={`/admin/categories/${category.id}`}
                className="p-1 text-blue-600 hover:text-blue-800"
              >
                <Edit size={16} />
              </Link>
              <button className="p-1 text-red-600 hover:text-red-800">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {hasChildren && isExpanded && renderCategories(category.children, level + 1)}
        </div>
      );
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link
            href="/admin/categories/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </Link>
        </div>
        
        {/* Search bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>
        
        {/* Categories list */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="font-medium">Category Name</div>
            <div className="font-medium">Actions</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredCategories.length > 0 ? (
              renderCategories(filteredCategories)
            ) : (
              <div className="p-4 text-center text-gray-500">
                No categories found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 