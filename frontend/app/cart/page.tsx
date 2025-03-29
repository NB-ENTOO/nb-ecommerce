'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { Trash2, ArrowLeft, ShoppingBag, FileText, Send, Check, AlertTriangle, InfoIcon } from 'lucide-react';
import { generateConfigurationPDF, sendConfigurationEmail, validateConfiguration } from '../../lib/pdf';

// Mock server configuration data
const initialServerConfigs = [
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

// Company info for PDF branding
const companyInfo = {
  name: 'NET-BRIDGE Server Solutions',
  logo: '/logo.png',
  address: '123 Tech Park, Business District',
  phone: '+44 (0)1556 610167',
  email: 'sales@net-bridge.example.com',
  website: 'www.net-bridge.example.com'
};

export default function ServerConfigurationPage() {
  const [serverConfigs, setServerConfigs] = useState(initialServerConfigs);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [validationStatus, setValidationStatus] = useState<{valid: boolean, issues?: string[]}>({valid: true});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    comments: '',
    termsAccepted: false
  });

  useEffect(() => {
    // Simulate loading configuration data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Validate configuration whenever it changes
    const validateConfig = async () => {
      if (serverConfigs.length > 0) {
        const result = await validateConfiguration(serverConfigs);
        setValidationStatus(result);
      }
    };
    
    validateConfig();
  }, [serverConfigs]);

  useEffect(() => {
    // Validate form data
    const isFormValid = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone.trim() !== '' &&
      formData.termsAccepted;
    
    setFormValidated(isFormValid);
  }, [formData]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setServerConfigs(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    
    // Reset PDF generation status when configuration changes
    setPdfGenerated(false);
    setPdfUrl('');
  };

  const removeItem = (id: string) => {
    setServerConfigs(prevItems => prevItems.filter(item => item.id !== id));
    
    // Reset PDF generation status when configuration changes
    setPdfGenerated(false);
    setPdfUrl('');
  };

  const calculateSubtotal = () => {
    return serverConfigs.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGeneratePDF = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate PDF with the configuration and company branding
      const pdfData = await generateConfigurationPDF(
        serverConfigs, 
        { ...formData, companyInfo }
      );
      
      // Set PDF URL and generation status
      setPdfUrl(pdfData);
      setPdfGenerated(true);
      
      // Scroll to the email form section
      document.getElementById('emailFormSection')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValidated) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate PDF if not already generated
      let pdfDataUrl = pdfUrl;
      if (!pdfGenerated) {
        pdfDataUrl = await generateConfigurationPDF(
          serverConfigs, 
          { ...formData, companyInfo }
        );
        setPdfUrl(pdfDataUrl);
        setPdfGenerated(true);
      }
      
      // Send the configuration email
      const emailResult = await sendConfigurationEmail(
        pdfDataUrl, 
        formData.email, 
        { ...formData, serverConfigs, totalCost: calculateSubtotal().toFixed(2) }
      );
      
      if (emailResult) {
        setEmailSent(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            comments: '',
            termsAccepted: false
          });
        }, 500);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Server Configuration</h1>
          <div className="flex items-center text-sm text-gray-600">
            <InfoIcon size={16} className="mr-1" />
            <span>Configure your server and request a quote</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : serverConfigs.length > 0 ? (
          <div className="flex flex-col gap-8">
            {/* Server Configurations */}
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
                    {serverConfigs.map((item) => (
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
                              disabled={isSubmitting}
                            >
                              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M20 12H4"></path>
                              </svg>
                            </button>
                            <input
                              className="mx-2 border text-center w-12 rounded-md px-2 py-1"
                              type="text"
                              value={item.quantity}
                              disabled={isSubmitting}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) updateQuantity(item.id, val);
                              }}
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                              disabled={isSubmitting}
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
                            disabled={isSubmitting}
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

            {/* Validation Status */}
            {!validationStatus.valid && (
              <div className="w-full">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Configuration Issues</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {validationStatus.issues?.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Configuration Summary & Generate PDF Button */}
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
                
                {pdfGenerated ? (
                  <div className="mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                      <div className="flex">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-green-800">PDF Generated Successfully!</p>
                          <p className="text-xs text-green-700 mt-1">You can now proceed to send your configuration</p>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={pdfUrl}
                      download="NET-BRIDGE-server-configuration.pdf"
                      className="w-full bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition duration-200 flex items-center justify-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText size={18} className="mr-2" />
                      Download Configuration PDF
                    </a>
                  </div>
                ) : (
                  <button 
                    onClick={handleGeneratePDF}
                    disabled={isSubmitting || !validationStatus.valid}
                    className={`w-full ${
                      validationStatus.valid 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    } text-white mt-6 py-3 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></div>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <FileText size={18} className="mr-2" />
                        Generate Configuration PDF
                      </>
                    )}
                  </button>
                )}
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
                  <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded mb-4">
                    <div className="flex">
                      <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"/></svg></div>
                      <div>
                        <p className="font-bold text-lg">Thank You! Your Configuration Has Been Sent</p>
                        <p className="text-sm mt-2">Our team will contact you shortly to discuss your requirements.</p>
                        <p className="text-sm mt-1">We typically respond within 24 business hours.</p>
                        <p className="text-sm mt-4">
                          <strong>NET-BRIDGE Server Solutions</strong><br />
                          {companyInfo.phone} | {companyInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please provide any additional information or requirements for your server configuration."
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="termsAccepted" 
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                        disabled={isSubmitting}
                      />
                      <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                        I agree to the <Link href="/terms" className="text-blue-600 hover:underline">privacy policy</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">terms of service</Link>
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting || !formValidated}
                        className={`${
                          formValidated 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white py-2 px-4 rounded-md font-medium transition duration-200 flex items-center`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Configuration
                          </>
                        )}
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