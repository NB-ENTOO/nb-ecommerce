'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  HelpCircle, 
  Book, 
  FileText, 
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Search
} from 'lucide-react';

// FAQ items
const faqItems = [
  {
    id: 1,
    question: 'How do I add a new product?',
    answer: 'Go to the Products page and click the "Add Product" button. Fill in all required fields in the form and click Save. You can also bulk import products using the Import Products page.'
  },
  {
    id: 2,
    question: 'How do I configure server options for products?',
    answer: 'When editing a product, scroll down to the "Configurable Options" section. Here you can create option groups like Processor, Memory, etc. with various choices and price adjustments.'
  },
  {
    id: 3,
    question: 'How do I organize products into categories?',
    answer: 'Go to the Categories page to manage your product categories. You can create a hierarchy of categories and subcategories. When creating or editing a product, you can assign it to a category.'
  },
  {
    id: 4,
    question: 'How do I create admin users?',
    answer: 'Go to the Admin Users page and click the "Add User" button. Fill in the user details including name, email, password, and role. There are three roles: Administrator (full access), Editor (can manage products but not users or settings), and Viewer (read-only access).'
  },
  {
    id: 5,
    question: 'How do I back up the database?',
    answer: 'Go to the Settings page and click on the Backup tab. You can configure automatic backups or perform a manual backup by clicking the "Backup Now" button.'
  },
  {
    id: 6,
    question: 'How do I reset my password?',
    answer: 'If you\'re logged in, go to your profile page by clicking your username in the top right. If you\'re not logged in, use the "Forgot Password" link on the login page.'
  }
];

// Documentation categories
const docCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: <Book size={18} />,
    articles: [
      { id: 1, title: 'Admin Panel Overview', path: '/docs/admin-overview' },
      { id: 2, title: 'First Steps Guide', path: '/docs/first-steps' },
      { id: 3, title: 'User Roles and Permissions', path: '/docs/user-roles' }
    ]
  },
  {
    id: 'products',
    name: 'Products Management',
    icon: <FileText size={18} />,
    articles: [
      { id: 4, title: 'Adding and Editing Products', path: '/docs/managing-products' },
      { id: 5, title: 'Product Configurations', path: '/docs/product-configurations' },
      { id: 6, title: 'Bulk Import Guide', path: '/docs/bulk-import' },
      { id: 7, title: 'Managing Categories', path: '/docs/categories' }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Features',
    icon: <HelpCircle size={18} />,
    articles: [
      { id: 8, title: 'Database Seeding', path: '/docs/database-seeding' },
      { id: 9, title: 'Backup and Restore', path: '/docs/backup-restore' },
      { id: 10, title: 'System Settings', path: '/docs/system-settings' }
    ]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  
  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  
  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };
  
  // Filter FAQs based on search term
  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter documentation based on search term
  const filteredDocCategories = docCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Help & Documentation</h1>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documentation */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Documentation</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {searchTerm && filteredDocCategories.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No documentation matching your search.
                  </div>
                ) : (
                  (searchTerm ? filteredDocCategories : docCategories).map(category => (
                    <div key={category.id} className="overflow-hidden">
                      <div 
                        className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 text-blue-600">
                            {category.icon}
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        {expandedCategory === category.id ? (
                          <ChevronDown size={18} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={18} className="text-gray-400" />
                        )}
                      </div>
                      
                      {expandedCategory === category.id && (
                        <div className="pl-12 pr-4 pb-4 space-y-2">
                          {category.articles.map(article => (
                            <a 
                              key={article.id}
                              href={article.path}
                              className="block py-2 px-3 hover:bg-gray-50 rounded-md text-sm flex items-center justify-between transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>{article.title}</span>
                              <ExternalLink size={14} className="text-gray-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              
              {/* Contact Support */}
              <div className="p-4 bg-blue-50 border-t border-blue-100">
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-blue-800">Need more help?</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Contact our support team at <a href="mailto:support@example.com" className="underline">support@example.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Frequently Asked Questions</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {searchTerm && filteredFaqs.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No FAQs matching your search.
                  </div>
                ) : (
                  (searchTerm ? filteredFaqs : faqItems).map(item => (
                    <div key={item.id} className="overflow-hidden">
                      <div 
                        className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleFaq(item.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 text-blue-600">
                            <HelpCircle size={18} />
                          </div>
                          <span className="font-medium">{item.question}</span>
                        </div>
                        {expandedFaq === item.id ? (
                          <ChevronDown size={18} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={18} className="text-gray-400" />
                        )}
                      </div>
                      
                      {expandedFaq === item.id && (
                        <div className="px-4 pb-4">
                          <div className="pl-8 pr-4 py-3 bg-gray-50 rounded-md text-sm">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 