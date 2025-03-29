'use client';

import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { ArrowRight, Server, Database, Network, Cpu, ExternalLink, Play, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-6">
              <div className="col-span-1">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Servers, Storage & Networking</h3>
                <ul className="space-y-3">
                  <li>
                    <div className="font-medium">Servers</div>
                    <ul className="ml-4 text-sm text-gray-600 space-y-1 mt-1">
                      <li><Link href="/servers/finder" className="hover:text-blue-500">Server Finder</Link></li>
                      <li><Link href="/servers/dell-rack" className="hover:text-blue-500">Dell Rack Servers</Link></li>
                      <li><Link href="/servers/dell-tower" className="hover:text-blue-500">Dell Tower Servers</Link></li>
                      <li><Link href="/servers/dell-blade" className="hover:text-blue-500">Dell Blade Servers</Link></li>
                      <li><Link href="/servers/hpe" className="hover:text-blue-500">HPE Servers</Link></li>
                    </ul>
                  </li>
                  <li>
                    <div className="font-medium">Storage</div>
                    <ul className="ml-4 text-sm text-gray-600 space-y-1 mt-1">
                      <li><Link href="/storage/powervault" className="hover:text-blue-500">PowerVault Storage</Link></li>
                      <li><Link href="/storage/equallogic" className="hover:text-blue-500">EqualLogic Storage</Link></li>
                      <li><Link href="/storage/hard-drives" className="hover:text-blue-500">Hard Drives</Link></li>
                    </ul>
                  </li>
                  <li>
                    <div className="font-medium">Networking</div>
                    <ul className="ml-4 text-sm text-gray-600 space-y-1 mt-1">
                      <li><Link href="/networking/dell" className="hover:text-blue-500">Dell Switches</Link></li>
                      <li><Link href="/networking/cisco" className="hover:text-blue-500">Cisco Networking</Link></li>
                      <li><Link href="/networking/network-cards" className="hover:text-blue-500">Network Cards</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="col-span-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg overflow-hidden h-full">
                  <div className="p-8 h-full flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Leading supplier of refurbished servers</h1>
                    <p className="text-lg mb-6">Expert guidance, quality hardware, comprehensive warranty</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/servers"
                        className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-gray-100 transition duration-300"
                      >
                        Browse Servers
                        <ArrowRight className="ml-2" size={18} />
                      </Link>
                      <Link
                        href="/configure"
                        className="border border-white text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 transition duration-300"
                      >
                        Configure Your Own
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configure Online Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Configure Online</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Build today. Ship tomorrow. Tailor your product to your exact needs and our specialist engineers will build & fully test, before shipping to you the next day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Configure Your Own Dell Rack Server', icon: <Server size={40} />, href: '/configure/rack-servers' },
              { title: 'Configure Your Own Dell Tower Server', icon: <Server size={40} />, href: '/configure/tower-servers' },
              { title: 'Configure Your Own Dell Blade or Node Server', icon: <Server size={40} />, href: '/configure/blade-servers' },
              { title: 'Configure Your Own HPE ProLiant Server', icon: <Server size={40} />, href: '/configure/hpe-servers' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300 border border-gray-200"
              >
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <div className="mt-4 inline-flex items-center text-blue-600">
                  <span>Configure</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leading Supplier Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Leading supplier of refurbished hardware</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-700">If it's on our website, it's in stock</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-700">Hardware refurbished to the highest standards</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-700">Expert support and advice for your needs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-700">1 to 3 years' Warranty on all orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ETB Difference Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The ETB Difference</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2001, ETB Technologies has established itself as a leading supplier of refurbished servers, storage and network equipment, providing complete units and component parts to customers Worldwide. We've grown from a handful of staff working in a small office to a team of over 60 fantastic people, each bringing their own skills and talents to the company with a solid commitment to quality and customer care.
              </p>
              <Link
                href="/about"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium inline-flex items-center hover:bg-blue-700 transition duration-300"
              >
                About ETB
              </Link>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
              <button className="bg-white rounded-full p-4 shadow-lg flex items-center justify-center">
                <Play size={30} className="text-blue-600 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advice and Latest News Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Advice Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Advice</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gray-200 h-32 md:h-auto"></div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="font-semibold mb-2">Cloud Strategy: Time to Embrace Refurbished</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        Our Sales & Business Development Manager shares insights on evolving cloud strategy and why refurbished technology offers essential, cost-effective infrastructure.
                      </p>
                      <Link href="/blog/cloud-strategy" className="text-blue-600 hover:underline text-sm flex items-center">
                        Find out more
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Latest News Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Latest news</h2>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gray-200 h-32 md:h-auto"></div>
                    <div className="p-4 md:w-2/3">
                      <h3 className="font-semibold mb-2">ETB Technologies 2025 Predictions</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        Hear what our Sales and Business Development Manager thinks 2025 has in store for the IT industry.
                      </p>
                      <Link href="/news/2025-predictions" className="text-blue-600 hover:underline text-sm flex items-center">
                        Find out more
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <Link
                    href="/news"
                    className="inline-flex items-center bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition duration-300"
                  >
                    View All
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Reviews</h2>
          <div className="inline-flex items-center mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="text-yellow-400 fill-current" size={24} />
              ))}
            </div>
            <span className="ml-2 text-gray-700 font-medium">Rated excellent</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { title: 'Price Match Promise', text: 'We are committed to giving you the very best value for money on IT equipment.' },
              { title: 'Warranty', text: 'Everything apart from batteries comes with a minimum of 1-year warranty included.' },
              { title: 'Delivery', text: 'UK next day delivery as standard and worldwide shipping available.' },
              { title: 'Expert Advice', text: 'Our experts can answer all your questions about refurbished server equipment.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.text}</p>
                <Link href={`/about/${item.title.toLowerCase().replace(' ', '-')}`} className="text-blue-600 uppercase text-sm font-medium hover:underline">
                  Find out more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h5 className="text-lg font-medium mb-4">Sign up to our newsletter and be the first to know about new products and promotions</h5>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-grow py-3 px-4 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button className="bg-gray-800 py-3 px-6 rounded-r-md font-medium hover:bg-gray-700 transition duration-300">
              Get Updates
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
} 