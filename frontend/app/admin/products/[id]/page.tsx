'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { 
  Save, 
  ArrowLeft, 
  Trash2,
  Plus,
  X
} from 'lucide-react';
import Link from 'next/link';

interface ProductOption {
  id: string;
  name: string;
  price: string;
  [key: string]: string;
}

interface ConfigurableOption {
  id: string;
  name: string;
  options: ProductOption[];
  [key: string]: string | ProductOption[];
}

interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductFormData {
  id?: string;
  name: string;
  sku: string;
  price: string;
  stock: string;
  category: string;
  description: string;
  status: string;
  images: string[];
  specifications: ProductSpecification[];
  configurableOptions: ConfigurableOption[];
}

// Mock data for the current product
const mockProduct: ProductFormData = {
  id: '1',
  name: 'Dell PowerEdge R740 Server',
  sku: 'DELL-R740-01',
  price: '3599.99',
  stock: '15',
  category: 'Rack Servers',
  description: 'The Dell EMC PowerEdge R740 is a 2-socket, 2U rack server designed for complex workloads using highly scalable memory and network options.',
  images: ['/images/servers/dell-r740.jpg'],
  specifications: [
    { name: 'Processor', value: 'Intel Xeon Silver 4214 2.2G' },
    { name: 'Cores', value: '12' },
    { name: 'Memory', value: '32GB DDR4 RDIMM' },
    { name: 'Storage', value: '2x 480GB SSD SATA' },
    { name: 'RAID', value: 'PERC H730P' },
    { name: 'Power', value: 'Dual, Hot-plug, Redundant Power Supply (1+1), 750W' },
    { name: 'Form Factor', value: '2U Rack' },
  ],
  configurableOptions: [
    {
      id: 'processor',
      name: 'Processor',
      options: [
        { id: 'xeon-4214', name: 'Intel Xeon Silver 4214 2.2G (12 Cores)', price: '0' },
        { id: 'xeon-4216', name: 'Intel Xeon Silver 4216 2.1G (16 Cores)', price: '320' },
        { id: 'xeon-6226', name: 'Intel Xeon Gold 6226R 2.9G (16 Cores)', price: '750' },
      ]
    },
    {
      id: 'memory',
      name: 'Memory',
      options: [
        { id: 'mem-32', name: '32GB (2x16GB RDIMM, 3200MT/s)', price: '0' },
        { id: 'mem-64', name: '64GB (4x16GB RDIMM, 3200MT/s)', price: '450' },
        { id: 'mem-128', name: '128GB (4x32GB RDIMM, 3200MT/s)', price: '1200' },
      ]
    },
    {
      id: 'storage',
      name: 'Storage',
      options: [
        { id: 'stor-2ssd', name: '2x 480GB SSD SATA', price: '0' },
        { id: 'stor-4ssd', name: '4x 480GB SSD SATA', price: '560' },
        { id: 'stor-2nvme', name: '2x 1.6TB NVMe SSD', price: '1850' },
      ]
    }
  ],
  status: 'Active'
};

// Available categories for select dropdown
const categories = [
  'Rack Servers',
  'Tower Servers',
  'Blade Servers',
  'CPUs',
  'Memory',
  'Storage',
  'Networking',
  'Software'
];

// Product statuses for select dropdown
const statuses = ['Active', 'Draft', 'Out of Stock', 'Low Stock', 'Discontinued'];

export default function ProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isEditMode = params.id !== 'new';
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    status: 'Active',
    images: [],
    specifications: [],
    configurableOptions: []
  });
  
  // Mock form loading for edit mode
  useEffect(() => {
    if (isEditMode) {
      // Simulating API call to fetch product data
      setTimeout(() => {
        setFormData(mockProduct);
      }, 100);
    }
  }, [isEditMode]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSpecChange = (index: number, field: 'name' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };
  
  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };
  
  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i: number) => i !== index);
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };
  
  // Function to add a new configurable option
  const addConfigurableOption = () => {
    setFormData(prev => ({
      ...prev,
      configurableOptions: [...prev.configurableOptions, {
        id: `option-${Date.now()}`,
        name: '',
        options: [{ id: `option-item-${Date.now()}`, name: '', price: '0' }]
      }]
    }));
  };
  
  // Function to update a configurable option
  const updateConfigurableOption = (index: number, field: string, value: string) => {
    const newOptions = [...formData.configurableOptions];
    newOptions[index][field] = value;
    setFormData(prev => ({ ...prev, configurableOptions: newOptions }));
  };
  
  // Function to remove a configurable option
  const removeConfigurableOption = (index: number) => {
    const newOptions = formData.configurableOptions.filter((_, i: number) => i !== index);
    setFormData(prev => ({ ...prev, configurableOptions: newOptions }));
  };
  
  // Function to add a new option to a configurable option
  const addOptionItem = (optionIndex: number) => {
    const newOptions = [...formData.configurableOptions];
    newOptions[optionIndex].options.push({
      id: `option-item-${Date.now()}`,
      name: '',
      price: '0'
    });
    setFormData(prev => ({ ...prev, configurableOptions: newOptions }));
  };
  
  // Function to update an option item
  const updateOptionItem = (optionIndex: number, itemIndex: number, field: string, value: string) => {
    const newOptions = [...formData.configurableOptions];
    newOptions[optionIndex].options[itemIndex][field] = value;
    setFormData(prev => ({ ...prev, configurableOptions: newOptions }));
  };
  
  // Function to remove an option item
  const removeOptionItem = (optionIndex: number, itemIndex: number) => {
    const newOptions = [...formData.configurableOptions];
    newOptions[optionIndex].options = newOptions[optionIndex].options.filter((_, i: number) => i !== itemIndex);
    setFormData(prev => ({ ...prev, configurableOptions: newOptions }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log('Saving product:', formData);
    
    // Simulate saving and redirect back to products page
    setTimeout(() => {
      router.push('/admin/products');
    }, 500);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
              onClick={() => router.push('/admin/products')}
            >
              Cancel
            </button>
            {isEditMode && (
              <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            )}
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={handleSubmit}
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
        
        {/* Form */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Specifications */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-medium">Specifications</h2>
                <button
                  type="button"
                  onClick={addSpecification}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                  <span>Add Specification</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Name (e.g. Processor)"
                        value={spec.name}
                        onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Value (e.g. Intel Xeon Silver 4214)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecification(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                
                {formData.specifications.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No specifications added yet.</p>
                )}
              </div>
            </div>
            
            {/* Configurable Options */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-medium">Configurable Options</h2>
                <button
                  type="button"
                  onClick={addConfigurableOption}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                  <span>Add Option Group</span>
                </button>
              </div>
              
              <div className="space-y-8">
                {formData.configurableOptions.map((option, optionIndex) => (
                  <div key={option.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Option Group Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Processor"
                          value={option.name}
                          onChange={(e) => updateConfigurableOption(optionIndex, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeConfigurableOption(optionIndex)}
                        className="text-gray-400 hover:text-red-600 ml-2 flex-shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 gap-4 mb-2">
                        <div className="col-span-8 text-sm font-medium text-gray-700">Option Name</div>
                        <div className="col-span-3 text-sm font-medium text-gray-700">Price Adjustment</div>
                        <div className="col-span-1"></div>
                      </div>
                      
                      {option.options.map((item: ProductOption, itemIndex: number) => (
                        <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-8">
                            <input
                              type="text"
                              placeholder="e.g. Intel Xeon Silver 4214"
                              value={item.name}
                              onChange={(e) => updateOptionItem(optionIndex, itemIndex, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="col-span-3">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                              </div>
                              <input
                                type="text"
                                placeholder="0.00"
                                value={item.price}
                                onChange={(e) => updateOptionItem(optionIndex, itemIndex, 'price', e.target.value)}
                                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <button
                              type="button"
                              onClick={() => removeOptionItem(optionIndex, itemIndex)}
                              className="text-gray-400 hover:text-red-600"
                              disabled={option.options.length <= 1}
                            >
                              <X size={18} className={option.options.length <= 1 ? 'opacity-30' : ''} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => addOptionItem(optionIndex)}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Plus size={14} />
                          <span>Add Option</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {formData.configurableOptions.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No configurable options added yet.</p>
                )}
              </div>
            </div>
            
            {/* Images section would go here - simplified for now */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium border-b pb-2">Images</h2>
              <p className="text-sm text-gray-500">Image upload functionality would be implemented here.</p>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
} 