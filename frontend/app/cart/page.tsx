'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { Trash2, ArrowLeft, ShoppingBag, FileText, Send, LogIn } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Dell PowerEdge R740 Server',
    price: 3599.99,
    quantity: 1,
    specs: '2x Intel Xeon Silver 4210, 64GB RAM, 4x 1.2TB SAS',
  },
  {
    id: '2',
    name: 'HPE ProLiant DL380 Gen10',
    price: 4199.99,
    quantity: 1,
    specs: '2x Intel Xeon Gold 5218, 128GB RAM, 8x 900GB SAS',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    comments: ''
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setLoading(false);
    }, 500);

    // Pre-fill form with user data if authenticated
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [session]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneratePDF = () => {
    // In a real implementation, this would generate a PDF with the configuration
    console.log('Generating PDF with configuration');
    
    // Simulate PDF generation and show the email form
    document.getElementById('emailFormSection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to login if not authenticated
    if (status !== 'authenticated') {
      router.push('/login?redirect=/cart');
      return;
    }
    
    // In a real implementation, this would send the form data and PDF to the company email
    console.log('Sending configuration to company with form data:', formData);
    
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => {
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        comments: ''
      });
    }, 500);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Server Configuration</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="flex flex-col gap-8">
            {/* Cart Items */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Server
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specifications
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
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <Link href={`/products/${item.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                                View details
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{item.specs}</div>
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

            {/* Order Summary & Generate PDF Button */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuration Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total Configuration Cost</span>
                      <span className="text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Note: Final price may vary based on additional customization and availability</p>
                  </div>
                </div>
                <button 
                  onClick={handleGeneratePDF}
                  className="w-full bg-blue-600 text-white mt-6 py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                >
                  <FileText size={18} className="mr-2" />
                  Generate Configuration PDF
                </button>
              </div>
            </div>

            {/* Email Form Section */}
            <div id="emailFormSection" className="w-full mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Send Your Configuration</h2>
                <p className="text-gray-600 mb-6">
                  Please fill in your contact information, and we'll reach out to you to discuss your server configuration and provide a detailed quote.
                </p>

                {emailSent ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    <div className="flex">
                      <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/></svg></div>
                      <div>
                        <p className="font-bold">Configuration Sent Successfully!</p>
                        <p className="text-sm">Our team will contact you shortly to discuss your requirements.</p>
                      </div>
                    </div>
                  </div>
                ) : status !== 'authenticated' ? (
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
                    <div className="flex items-center">
                      <LogIn className="h-6 w-6 text-blue-500 mr-4" />
                      <div>
                        <p className="font-bold">Please log in to send your configuration</p>
                        <p className="text-sm">You need to be logged in to send your server configuration to our team.</p>
                        <Link 
                          href="/login?redirect=/cart" 
                          className="mt-2 inline-flex items-center text-blue-700 hover:text-blue-900 font-medium"
                        >
                          Log in now
                          <ArrowLeft className="ml-2 rotate-180" size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please provide any additional information or requirements for your server configuration."
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 flex items-center"
                      >
                        <Send size={18} className="mr-2" />
                        Send Configuration
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-lg">
            <ShoppingBag size={64} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your configuration is empty</h3>
            <p className="text-gray-600 text-center mb-6">
              You haven't configured any servers yet.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Configuring
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
} 