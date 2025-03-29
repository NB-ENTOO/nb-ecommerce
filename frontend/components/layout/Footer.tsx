import React from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Signup Already in Main Page */}
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Logos */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <Link href="/" className="text-2xl font-bold inline-block mb-4">
                ETB Tech
              </Link>
              <div className="space-y-2">
                <div className="h-8 w-32 bg-gray-700 rounded flex items-center justify-center text-xs">Dell Partner Logo</div>
                <div className="h-8 w-32 bg-gray-700 rounded flex items-center justify-center text-xs">ISO 9001 Logo</div>
                <div className="h-8 w-32 bg-gray-700 rounded flex items-center justify-center text-xs">ISO 27001 Logo</div>
              </div>
            </div>
          </div>
          
          {/* Information Links */}
          <div className="md:col-span-1">
            <h6 className="text-lg font-bold mb-4">Information</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/delivery" className="hover:text-blue-400 transition duration-300">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/international" className="hover:text-blue-400 transition duration-300">
                  International Orders
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-blue-400 transition duration-300">
                  Returns Information
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/finance" className="hover:text-blue-400 transition duration-300">
                  Finance Solutions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help Links */}
          <div className="md:col-span-1">
            <h6 className="text-lg font-bold mb-4">Help</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/faqs" className="hover:text-blue-400 transition duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-blue-400 transition duration-300">
                  Warranty & Condition
                </Link>
              </li>
              <li>
                <Link href="/price-match" className="hover:text-blue-400 transition duration-300">
                  Price Match Promise
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-blue-400 transition duration-300">
                  After Sales Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About Links */}
          <div className="md:col-span-1">
            <h6 className="text-lg font-bold mb-4">About</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition duration-300">
                  About ETB
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-blue-400 transition duration-300">
                  Sell To Us
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-blue-400 transition duration-300">
                  Equipment Rentals
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-400 transition duration-300">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition duration-300">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h6 className="text-lg font-bold mb-4">Quick Links</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/servers" className="hover:text-blue-400 transition duration-300">
                  Servers
                </Link>
              </li>
              <li>
                <Link href="/storage" className="hover:text-blue-400 transition duration-300">
                  Storage
                </Link>
              </li>
              <li>
                <Link href="/networking" className="hover:text-blue-400 transition duration-300">
                  Networking
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-blue-400 transition duration-300">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/parts-by-server" className="hover:text-blue-400 transition duration-300">
                  Parts By Server
                </Link>
              </li>
              <li>
                <Link href="/special-offers" className="hover:text-blue-400 transition duration-300">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Contact and Review Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-gray-800 pt-8">
          {/* Rate ETB */}
          <div>
            <h6 className="text-sm font-bold mb-3 uppercase">Rate ETB</h6>
            <div className="h-8 bg-gray-700 rounded w-32 flex items-center justify-center text-xs">Trustpilot Logo</div>
          </div>
          
          {/* Follow Us */}
          <div>
            <h6 className="text-sm font-bold mb-3 uppercase">Follow us</h6>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <Facebook />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                <Linkedin />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span>+44 (0)1556 610167</span>
              <Phone size={16} />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <span>sales@etb-tech.com</span>
              <Mail size={16} />
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© ETB Technologies Ltd 2025. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
            <div className="h-6 w-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 