'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

// Mock import history
const importHistory = [
  { 
    id: '1',
    date: '2023-06-15 14:30',
    filename: 'server-products-june-2023.csv',
    status: 'Completed',
    totalRecords: 54,
    imported: 52,
    errors: 2
  },
  { 
    id: '2',
    date: '2023-05-22 10:15',
    filename: 'dell-servers-batch.csv',
    status: 'Completed',
    totalRecords: 28,
    imported: 28,
    errors: 0
  },
  { 
    id: '3',
    date: '2023-05-10 09:45',
    filename: 'new-hp-products.csv',
    status: 'Failed',
    totalRecords: 15,
    imported: 0,
    errors: 15
  }
];

export default function ProductImportPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    details?: {
      totalRecords: number;
      imported: number;
      errors: number;
    }
  } | null>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImportResult(null);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) return;
    
    setImporting(true);
    
    // Simulate import process (in a real app, this would send the file to the server)
    setTimeout(() => {
      // Simulate success with occasional random failure
      const success = Math.random() > 0.2;
      
      if (success) {
        const importCount = Math.floor(Math.random() * 50) + 20;
        const errorCount = Math.floor(Math.random() * 5);
        
        setImportResult({
          success: true,
          message: 'Products imported successfully',
          details: {
            totalRecords: importCount + errorCount,
            imported: importCount,
            errors: errorCount
          }
        });
      } else {
        setImportResult({
          success: false,
          message: 'Failed to import products. Please check your CSV format and try again.'
        });
      }
      
      setImporting(false);
    }, 2000);
  };
  
  // Download template
  const downloadTemplate = () => {
    // In a real app, this would download an actual CSV template
    alert('Template download would start here');
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Import Products</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Import Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-medium">Upload CSV File</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Import multiple products at once using a CSV file. Make sure to follow the required format.
                  </p>
                </div>
                
                {/* Template download */}
                <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-start gap-3">
                  <FileText size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Need a template?</p>
                    <p className="text-sm mt-1">
                      Download our CSV template with the correct headers and example data to get started.
                    </p>
                    <button 
                      onClick={downloadTemplate}
                      className="mt-2 inline-flex items-center text-blue-700 hover:text-blue-900 font-medium text-sm"
                    >
                      <Download size={16} className="mr-1" />
                      Download Template
                    </button>
                  </div>
                </div>
                
                {/* File upload form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      id="fileUpload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {selectedFile ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <FileText size={24} className="text-blue-600" />
                          <span className="font-medium">{selectedFile.name}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB - {selectedFile.type}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                          <Upload size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-700 font-medium">
                          Drag and drop your CSV file here
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          or
                        </p>
                        <label
                          htmlFor="fileUpload"
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        >
                          <Upload size={16} className="mr-2" />
                          Browse Files
                        </label>
                      </>
                    )}
                  </div>
                  
                  {/* Import result feedback */}
                  {importResult && (
                    <div className={`p-4 rounded-md ${
                      importResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                      <div className="flex items-start gap-3">
                        {importResult.success ? (
                          <CheckCircle size={20} className="flex-shrink-0 mt-1" />
                        ) : (
                          <AlertCircle size={20} className="flex-shrink-0 mt-1" />
                        )}
                        <div>
                          <p className="font-medium">{importResult.message}</p>
                          {importResult.details && (
                            <div className="mt-2 text-sm">
                              <p>Total records: {importResult.details.totalRecords}</p>
                              <p>Successfully imported: {importResult.details.imported}</p>
                              <p>Failed: {importResult.details.errors}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => router.push('/admin/products')}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedFile || importing}
                      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 flex items-center ${
                        (!selectedFile || importing) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {importing ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload size={16} className="mr-2" />
                          Import Products
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Import History */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Import History</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {importHistory.map((entry) => (
                  <div key={entry.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate max-w-[180px]">{entry.filename}</p>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        entry.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                    
                    <div className="flex items-center gap-1 mt-2">
                      <div className="text-xs">
                        <span className="font-medium">{entry.imported}</span>
                        <span className="text-gray-500"> of {entry.totalRecords} imported</span>
                      </div>
                      
                      {entry.errors > 0 && (
                        <div className="ml-auto flex items-center text-amber-600">
                          <AlertTriangle size={12} className="mr-1" />
                          <span className="text-xs">{entry.errors} errors</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {importHistory.length === 0 && (
                  <div className="p-4 text-center text-gray-500 text-sm italic">
                    No import history available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 