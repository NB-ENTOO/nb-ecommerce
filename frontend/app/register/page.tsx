'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import { Send, Phone, Mail, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, this would send the registration request to the backend
    // For now, we'll simulate a successful submission after a delay
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  if (formSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto my-12 px-4">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Registration Request Submitted</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in NET-BRIDGE's server solutions! Our sales team will review your request and contact you shortly to set up your account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Return to Home
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Browse Server Solutions
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Request an Account</h1>
            <p className="text-gray-600 mb-6">
              Please complete the form below to request an account with NET-BRIDGE. Our sales team will contact you to discuss your server infrastructure needs and set up your account.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your server requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send size={16} className="mr-2" />
                      Submit Registration Request
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone size={18} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-600">+1 (800) 555-0123</p>
                    <p className="text-xs text-gray-500 mt-1">Monday to Friday, 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={18} className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <a href="mailto:sales@net-bridge.com" className="text-sm text-blue-600 hover:underline">sales@net-bridge.com</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Why register with NET-BRIDGE?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Access to exclusive server configuration tools</li>
                <li>• Dedicated account manager for technical support</li>
                <li>• Custom server solution recommendations</li>
                <li>• Preferential pricing on enterprise orders</li>
                <li>• Priority service and support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 