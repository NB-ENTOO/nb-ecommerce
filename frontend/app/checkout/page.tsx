'use client';

import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Truck, ShoppingBag } from 'lucide-react';

// Mock cart data for the order summary
const mockCartItems = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    quantity: 1,
    image: '/headphones.jpg',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    quantity: 1,
    image: '/smartwatch.jpg',
  },
];

// Checkout steps
enum CheckoutStep {
  Shipping = 'shipping',
  Payment = 'payment',
  Review = 'review'
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Shipping);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    email: '',
    phone: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  
  const calculateSubtotal = () => {
    return mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax
  };

  const calculateShipping = () => {
    return shippingMethod === 'express' ? 14.99 : 9.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Payment);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Review);
  };

  const handlePlaceOrder = () => {
    // In a real application, this would submit the order to the backend
    alert('Order placed successfully!');
    // Redirect to confirmation page or order status
  };

  const renderCheckoutProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex-1 ${currentStep === CheckoutStep.Shipping ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.Shipping ? 'bg-blue-600 text-white' : 
                currentStep === CheckoutStep.Payment || currentStep === CheckoutStep.Review ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-200 mx-2"></div>
          <div className={`flex-1 ${currentStep === CheckoutStep.Payment ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.Payment ? 'bg-blue-600 text-white' : 
                currentStep === CheckoutStep.Review ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-200 mx-2"></div>
          <div className={`flex-1 ${currentStep === CheckoutStep.Review ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.Review ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderShippingStep = () => {
    return (
      <form onSubmit={handleShippingSubmit}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.firstName}
                onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.lastName}
                onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                id="address"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                id="city"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Method</h2>
          <div className="space-y-4">
            <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shippingMethod === 'standard'}
                onChange={() => setShippingMethod('standard')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Standard Shipping</span>
                  <span className="font-medium text-gray-900">$9.99</span>
                </div>
                <p className="text-gray-500 text-sm">Delivery in 3-5 business days</p>
              </div>
            </label>
            <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={shippingMethod === 'express'}
                onChange={() => setShippingMethod('express')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Express Shipping</span>
                  <span className="font-medium text-gray-900">$14.99</span>
                </div>
                <p className="text-gray-500 text-sm">Delivery in 1-2 business days</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft size={16} className="mr-1" />
            Return to Cart
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    );
  };

  const renderPaymentStep = () => {
    return (
      <form onSubmit={handlePaymentSubmit}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={() => setPaymentMethod('credit')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-900">Credit Card</span>
              </div>
            </label>
            <label className="flex items-center p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-900">PayPal</span>
              </div>
            </label>
          </div>
        </div>

        {paymentMethod === 'credit' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Card Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  required
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    required
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    required
                    placeholder="XXX"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(CheckoutStep.Shipping)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft size={16} className="mr-1" />
            Return to Shipping
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Review Order
          </button>
        </div>
      </form>
    );
  };

  const renderReviewStep = () => {
    return (
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Order</h2>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">Shipping Information</h3>
              <button
                onClick={() => setCurrentStep(CheckoutStep.Shipping)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            </div>
            <p className="text-gray-600">{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p className="text-gray-600">{shippingInfo.address}</p>
            <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p className="text-gray-600">{shippingInfo.email}</p>
            <p className="text-gray-600">{shippingInfo.phone}</p>
            <div className="mt-2 flex items-center">
              <Truck size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-700">
                {shippingMethod === 'express' ? 'Express Shipping (1-2 business days)' : 'Standard Shipping (3-5 business days)'}
              </span>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium text-gray-700">Payment Method</h3>
              <button
                onClick={() => setCurrentStep(CheckoutStep.Payment)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center">
              <CreditCard size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-700">
                {paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Order Items</h3>
            <div className="space-y-4">
              {mockCartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex">
                    <div className="flex-shrink-0 h-16 w-16 border border-gray-200 rounded-md overflow-hidden">
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        Image
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">${calculateShipping().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800">${calculateTax().toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(CheckoutStep.Payment)}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft size={16} className="mr-1" />
            Return to Payment
          </button>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        {renderCheckoutProgress()}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {currentStep === CheckoutStep.Shipping && renderShippingStep()}
            {currentStep === CheckoutStep.Payment && renderPaymentStep()}
            {currentStep === CheckoutStep.Review && renderReviewStep()}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="mb-4">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex py-3 border-b border-gray-200">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 mr-4">
                      <ShoppingBag size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${calculateShipping().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${calculateTax().toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 