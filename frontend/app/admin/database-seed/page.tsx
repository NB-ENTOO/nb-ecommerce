'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Trash2,
  Server,
  Package,
  Users,
  FileText,
  Tags
} from 'lucide-react';

// Define seed data types with counts
const seedDataTypes = [
  { id: 'products', name: 'Products', icon: <Package size={18} />, count: 50 },
  { id: 'categories', name: 'Categories', icon: <Tags size={18} />, count: 10 },
  { id: 'users', name: 'Users', icon: <Users size={18} />, count: 25 },
  { id: 'orders', name: 'Orders', icon: <FileText size={18} />, count: 100 }
];

// Seeding history
const seedingHistory = [
  { timestamp: '2023-06-20 14:30:22', action: 'Seeded 50 products', status: 'success' },
  { timestamp: '2023-06-20 14:31:05', action: 'Seeded 10 categories', status: 'success' },
  { timestamp: '2023-06-20 14:32:15', action: 'Seeded 25 users', status: 'success' },
  { timestamp: '2023-06-20 14:33:40', action: 'Seeded 100 orders', status: 'success' },
  { timestamp: '2023-06-15 09:15:10', action: 'Database reset', status: 'warning' }
];

export default function DatabaseSeedPage() {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'warning', text: string} | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  
  const toggleDataType = (dataTypeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataTypeId)
        ? prev.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    );
  };
  
  const selectAll = () => {
    setSelectedDataTypes(seedDataTypes.map(dataType => dataType.id));
  };
  
  const deselectAll = () => {
    setSelectedDataTypes([]);
  };
  
  const handleSeed = () => {
    if (selectedDataTypes.length === 0) {
      setMessage({
        type: 'warning',
        text: 'Please select at least one data type to seed'
      });
      return;
    }
    
    setIsSeeding(true);
    setMessage(null);
    
    // Simulate seeding process
    setTimeout(() => {
      setIsSeeding(false);
      setMessage({
        type: 'success',
        text: `Successfully seeded ${selectedDataTypes.length} data types`
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 1500);
  };
  
  const handleResetConfirm = () => {
    setShowConfirmReset(true);
  };
  
  const handleResetCancel = () => {
    setShowConfirmReset(false);
  };
  
  const handleReset = () => {
    setIsResetting(true);
    setMessage(null);
    
    // Simulate reset process
    setTimeout(() => {
      setIsResetting(false);
      setShowConfirmReset(false);
      setMessage({
        type: 'warning',
        text: 'Database has been reset. All data has been deleted.'
      });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }, 2000);
  };
  
  // Count selected items
  const selectedCount = selectedDataTypes.reduce((total, dataTypeId) => {
    const dataType = seedDataTypes.find(dt => dt.id === dataTypeId);
    return total + (dataType?.count || 0);
  }, 0);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Database Seeding</h1>
        </div>
        
        {/* Warning Message */}
        <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start gap-3">
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">This page is for development purposes only</p>
            <p className="mt-1">
              Seeding and resetting the database will modify or delete existing data. 
              Please use with caution and only in non-production environments.
            </p>
          </div>
        </div>
        
        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-md flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800' 
              : message.type === 'warning'
                ? 'bg-amber-50 text-amber-800'
                : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            )}
            <p>{message.text}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Seed Data Options */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Seed Data</h2>
                <div className="flex gap-2">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={selectAll}
                  >
                    Select All
                  </button>
                  <button 
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={deselectAll}
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seedDataTypes.map(dataType => (
                    <div 
                      key={dataType.id}
                      className={`
                        border rounded-md p-4 cursor-pointer transition
                        ${selectedDataTypes.includes(dataType.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => toggleDataType(dataType.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {dataType.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{dataType.name}</p>
                          <p className="text-sm text-gray-500">{dataType.count} records</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className={`
                            h-5 w-5 rounded-full border 
                            ${selectedDataTypes.includes(dataType.id) 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-300'
                            } 
                            flex items-center justify-center
                          `}>
                            {selectedDataTypes.includes(dataType.id) && (
                              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {selectedDataTypes.length > 0 
                        ? `${selectedDataTypes.length} data types selected (${selectedCount} records total)`
                        : 'No data types selected'
                      }
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                      onClick={handleResetConfirm}
                    >
                      <Trash2 size={16} />
                      <span>Reset Database</span>
                    </button>
                    <button 
                      className={`
                        px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors 
                        flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                      onClick={handleSeed}
                      disabled={isSeeding || selectedDataTypes.length === 0}
                    >
                      {isSeeding ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          <span>Seeding...</span>
                        </>
                      ) : (
                        <>
                          <Database size={16} />
                          <span>Seed Database</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* History */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Seeding History</h2>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                {seedingHistory.map((entry, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-2">
                      {entry.status === 'success' ? (
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <p className="text-sm">{entry.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{entry.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-medium">Confirm Database Reset</h3>
            </div>
            <p className="mb-6">
              This will delete all data in the database and cannot be undone. 
              Are you sure you want to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                onClick={handleResetCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                onClick={handleReset}
              >
                {isResetting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Reset Database</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 