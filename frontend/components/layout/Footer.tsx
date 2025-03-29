import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About NET-BRIDGE</h3>
            <p className="text-gray-300 mb-4">
              NET-BRIDGE is a leading supplier of refurbished servers, storage, and networking equipment, providing high-quality, cost-effective IT solutions for businesses worldwide.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servers" className="text-gray-300 hover:text-white transition-colors">
                  Servers
                </Link>
              </li>
              <li>
                <Link href="/storage" className="text-gray-300 hover:text-white transition-colors">
                  Storage Solutions
                </Link>
              </li>
              <li>
                <Link href="/networking" className="text-gray-300 hover:text-white transition-colors">
                  Networking Equipment
                </Link>
              </li>
              <li>
                <Link href="/components" className="text-gray-300 hover:text-white transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/workstations" className="text-gray-300 hover:text-white transition-colors">
                  Workstations
                </Link>
              </li>
              <li>
                <Link href="/special-offers" className="text-gray-300 hover:text-white transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-300 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-300 hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                  Technical Support
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns & Warranty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  NET-BRIDGE Headquarters<br />
                  123 Server Avenue<br />
                  Tech Park, TP1 2BC<br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">+44 (0)1556 610167</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300">sales@net-bridge.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-10 pt-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-300">
                Stay updated with new products, special offers, and technical advice.
              </p>
            </div>
            <div className="md:w-1/2 flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow py-2 px-4 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-blue-600 py-2 px-4 rounded-r-md font-medium hover:bg-blue-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center md:justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} NET-BRIDGE. All rights reserved.
              </p>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link href="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-gray-400 text-sm hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-gray-500 text-xs">
              NET-BRIDGE is a registered trademark. All other trademarks are the property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 