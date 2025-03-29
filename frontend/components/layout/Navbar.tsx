'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown, Server, Database, Network, Cpu, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">+44 (0)1556 610167 | Help & advice</div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="mr-2">Currency</span>
              <select className="bg-transparent border-none">
                <option>USD ($)</option>
                <option>GBP (£)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">NET-BRIDGE</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center w-1/3 relative">
            <input
              type="text"
              placeholder="Search for servers, storage and more..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-sm"
            />
            <button className="absolute right-3 text-gray-500 hover:text-blue-500 transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-6">
            <Link href="/quote" className="text-gray-700 hover:text-blue-500 transition-colors">
              <div className="flex flex-col items-center">
                <HelpCircle size={22} />
                <span className="text-xs mt-1 hidden sm:block">Quote</span>
              </div>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-500 transition-colors relative">
              <div className="flex flex-col items-center">
                <ShoppingCart size={22} />
                <span className="text-xs mt-1 hidden sm:block">Configure</span>
              </div>
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-t border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex">
              {/* Category: Configure Your Own */}
              <div 
                className="relative group py-3 px-4 cursor-pointer"
                onMouseEnter={() => handleDropdownToggle('configure')}
                onMouseLeave={closeDropdowns}
              >
                <div className="flex items-center space-x-1">
                  <span className="font-medium">Configure Your Own</span>
                  <ChevronDown size={16} />
                </div>
                
                {/* Dropdown */}
                {activeDropdown === 'configure' && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <Link href="/configure/rack-servers" className="block py-2 hover:text-blue-500">
                        Dell Rack Servers
                      </Link>
                      <Link href="/configure/tower-servers" className="block py-2 hover:text-blue-500">
                        Dell Tower Servers
                      </Link>
                      <Link href="/configure/blade-servers" className="block py-2 hover:text-blue-500">
                        Dell Blades & Nodes
                      </Link>
                      <Link href="/configure/workstations" className="block py-2 hover:text-blue-500">
                        Workstations
                      </Link>
                      <Link href="/configure/hpe-servers" className="block py-2 hover:text-blue-500">
                        HPE Servers
                      </Link>
                      <Link href="/configure/supermicro-servers" className="block py-2 hover:text-blue-500">
                        Supermicro Servers
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category: Servers */}
              <div 
                className="relative group py-3 px-4 cursor-pointer"
                onMouseEnter={() => handleDropdownToggle('servers')}
                onMouseLeave={closeDropdowns}
              >
                <div className="flex items-center space-x-1">
                  <Server size={18} className="mr-1" />
                  <span className="font-medium">Servers</span>
                  <ChevronDown size={16} />
                </div>
                
                {/* Dropdown */}
                {activeDropdown === 'servers' && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Server Form Factors</h3>
                      <Link href="/products/servers/rack" className="block py-2 hover:text-blue-500">
                        Rack Servers
                      </Link>
                      <Link href="/products/servers/tower" className="block py-2 hover:text-blue-500">
                        Tower Servers
                      </Link>
                      <Link href="/products/servers/blade" className="block py-2 hover:text-blue-500">
                        Blade Servers
                      </Link>
                      
                      <h3 className="font-semibold mt-4 mb-2">Server Brands</h3>
                      <Link href="/products/servers/dell" className="block py-2 hover:text-blue-500">
                        Dell EMC PowerEdge
                      </Link>
                      <Link href="/products/servers/hpe" className="block py-2 hover:text-blue-500">
                        HPE ProLiant
                      </Link>
                      <Link href="/products/servers/lenovo" className="block py-2 hover:text-blue-500">
                        Lenovo ThinkSystem
                      </Link>
                      <Link href="/products/servers/supermicro" className="block py-2 hover:text-blue-500">
                        Supermicro SuperServer
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category: Storage */}
              <div 
                className="relative group py-3 px-4 cursor-pointer"
                onMouseEnter={() => handleDropdownToggle('storage')}
                onMouseLeave={closeDropdowns}
              >
                <div className="flex items-center space-x-1">
                  <Database size={18} className="mr-1" />
                  <span className="font-medium">Storage</span>
                  <ChevronDown size={16} />
                </div>
                
                {/* Dropdown */}
                {activeDropdown === 'storage' && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Storage Types</h3>
                      <Link href="/products/storage/nas" className="block py-2 hover:text-blue-500">
                        NAS Storage
                      </Link>
                      <Link href="/products/storage/san" className="block py-2 hover:text-blue-500">
                        SAN Storage
                      </Link>
                      <Link href="/products/storage/das" className="block py-2 hover:text-blue-500">
                        Direct Attached Storage
                      </Link>
                      
                      <h3 className="font-semibold mt-4 mb-2">Storage Brands</h3>
                      <Link href="/products/storage/dell-emc" className="block py-2 hover:text-blue-500">
                        Dell EMC
                      </Link>
                      <Link href="/products/storage/hpe" className="block py-2 hover:text-blue-500">
                        HPE Storage
                      </Link>
                      <Link href="/products/storage/netapp" className="block py-2 hover:text-blue-500">
                        NetApp
                      </Link>
                      <Link href="/products/storage/qnap" className="block py-2 hover:text-blue-500">
                        QNAP
                      </Link>
                      <Link href="/products/storage/synology" className="block py-2 hover:text-blue-500">
                        Synology
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category: Networking */}
              <div 
                className="relative group py-3 px-4 cursor-pointer"
                onMouseEnter={() => handleDropdownToggle('networking')}
                onMouseLeave={closeDropdowns}
              >
                <div className="flex items-center space-x-1">
                  <Network size={18} className="mr-1" />
                  <span className="font-medium">Networking</span>
                  <ChevronDown size={16} />
                </div>
                
                {/* Dropdown */}
                {activeDropdown === 'networking' && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Network Equipment</h3>
                      <Link href="/products/networking/switches" className="block py-2 hover:text-blue-500">
                        Switches
                      </Link>
                      <Link href="/products/networking/routers" className="block py-2 hover:text-blue-500">
                        Routers
                      </Link>
                      <Link href="/products/networking/wireless" className="block py-2 hover:text-blue-500">
                        Wireless
                      </Link>
                      <Link href="/products/networking/firewalls" className="block py-2 hover:text-blue-500">
                        Firewalls
                      </Link>
                      
                      <h3 className="font-semibold mt-4 mb-2">Network Brands</h3>
                      <Link href="/products/networking/cisco" className="block py-2 hover:text-blue-500">
                        Cisco
                      </Link>
                      <Link href="/products/networking/juniper" className="block py-2 hover:text-blue-500">
                        Juniper Networks
                      </Link>
                      <Link href="/products/networking/arista" className="block py-2 hover:text-blue-500">
                        Arista Networks
                      </Link>
                      <Link href="/products/networking/ubiquiti" className="block py-2 hover:text-blue-500">
                        Ubiquiti
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Category: Components */}
              <div 
                className="relative group py-3 px-4 cursor-pointer"
                onMouseEnter={() => handleDropdownToggle('components')}
                onMouseLeave={closeDropdowns}
              >
                <div className="flex items-center space-x-1">
                  <Cpu size={18} className="mr-1" />
                  <span className="font-medium">Components</span>
                  <ChevronDown size={16} />
                </div>
                
                {/* Dropdown */}
                {activeDropdown === 'components' && (
                  <div className="absolute left-0 top-full w-64 bg-white shadow-lg z-50 border border-gray-200">
                    <div className="p-4">
                      <Link href="/products/components/processors" className="block py-2 hover:text-blue-500">
                        Processors
                      </Link>
                      <Link href="/products/components/memory" className="block py-2 hover:text-blue-500">
                        Memory
                      </Link>
                      <Link href="/products/components/storage-drives" className="block py-2 hover:text-blue-500">
                        Storage Drives
                      </Link>
                      <Link href="/products/components/raid-controllers" className="block py-2 hover:text-blue-500">
                        RAID Controllers
                      </Link>
                      <Link href="/products/components/network-cards" className="block py-2 hover:text-blue-500">
                        Network Cards
                      </Link>
                      <Link href="/products/components/gpus" className="block py-2 hover:text-blue-500">
                        Graphics Cards
                      </Link>
                      <Link href="/products/components/power-supplies" className="block py-2 hover:text-blue-500">
                        Power Supplies
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Corporate Links */}
            <div className="flex">
              <Link href="/about" className="py-3 px-4 hover:text-blue-500">
                About
              </Link>
              <Link href="/support" className="py-3 px-4 hover:text-blue-500">
                Support
              </Link>
              <Link href="/contact" className="py-3 px-4 hover:text-blue-500">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <Link href="/" className="block px-3 py-2 text-base font-medium hover:bg-gray-50">
              Home
            </Link>
            <div className="block px-3 py-2 text-base font-medium">
              <div className="flex justify-between items-center" onClick={() => handleDropdownToggle('mobileServers')}>
                Servers
                <ChevronDown size={16} className={activeDropdown === 'mobileServers' ? 'transform rotate-180' : ''} />
              </div>
              {activeDropdown === 'mobileServers' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link href="/products/servers/rack" className="block py-1 text-sm">
                    Rack Servers
                  </Link>
                  <Link href="/products/servers/tower" className="block py-1 text-sm">
                    Tower Servers
                  </Link>
                  <Link href="/products/servers/blade" className="block py-1 text-sm">
                    Blade Servers
                  </Link>
                </div>
              )}
            </div>
            <div className="block px-3 py-2 text-base font-medium">
              <div className="flex justify-between items-center" onClick={() => handleDropdownToggle('mobileStorage')}>
                Storage
                <ChevronDown size={16} className={activeDropdown === 'mobileStorage' ? 'transform rotate-180' : ''} />
              </div>
              {activeDropdown === 'mobileStorage' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link href="/products/storage/nas" className="block py-1 text-sm">
                    NAS Storage
                  </Link>
                  <Link href="/products/storage/san" className="block py-1 text-sm">
                    SAN Storage
                  </Link>
                  <Link href="/products/storage/das" className="block py-1 text-sm">
                    Direct Attached Storage
                  </Link>
                </div>
              )}
            </div>
            <div className="block px-3 py-2 text-base font-medium">
              <div className="flex justify-between items-center" onClick={() => handleDropdownToggle('mobileNetworking')}>
                Networking
                <ChevronDown size={16} className={activeDropdown === 'mobileNetworking' ? 'transform rotate-180' : ''} />
              </div>
              {activeDropdown === 'mobileNetworking' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link href="/products/networking/switches" className="block py-1 text-sm">
                    Switches
                  </Link>
                  <Link href="/products/networking/routers" className="block py-1 text-sm">
                    Routers
                  </Link>
                  <Link href="/products/networking/wireless" className="block py-1 text-sm">
                    Wireless
                  </Link>
                </div>
              )}
            </div>
            <Link href="/configure" className="block px-3 py-2 text-base font-medium hover:bg-gray-50">
              Configure Your Own
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium hover:bg-gray-50">
              About
            </Link>
            <Link href="/support" className="block px-3 py-2 text-base font-medium hover:bg-gray-50">
              Support
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium hover:bg-gray-50">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 