import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Server, Database, Network, Cpu, HelpCircle } from 'lucide-react';

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
            <Link href="/account" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">
              Account Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">ETB Tech</span>
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
                <span className="text-xs mt-1 hidden sm:block">Cart</span>
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
                      <Link href="/servers/dell-rack" className="block py-2 hover:text-blue-500">
                        Dell Rack Servers
                      </Link>
                      <Link href="/servers/dell-tower" className="block py-2 hover:text-blue-500">
                        Dell Tower Servers
                      </Link>
                      <Link href="/servers/dell-blade" className="block py-2 hover:text-blue-500">
                        Dell Blade Servers
                      </Link>
                      <Link href="/servers/dell-c-class" className="block py-2 hover:text-blue-500">
                        Dell C Class Servers
                      </Link>
                      <Link href="/servers/hpe" className="block py-2 hover:text-blue-500">
                        HPE Servers
                      </Link>
                      <Link href="/servers/supermicro" className="block py-2 hover:text-blue-500">
                        Supermicro Servers
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
                      <Link href="/storage/powervault" className="block py-2 hover:text-blue-500">
                        PowerVault Storage
                      </Link>
                      <Link href="/storage/powerstore" className="block py-2 hover:text-blue-500">
                        PowerStore Storage
                      </Link>
                      <Link href="/storage/equallogic" className="block py-2 hover:text-blue-500">
                        EqualLogic Storage Arrays
                      </Link>
                      <Link href="/storage/compellent" className="block py-2 hover:text-blue-500">
                        Compellent Storage
                      </Link>
                      <Link href="/storage/hpe" className="block py-2 hover:text-blue-500">
                        HPE Storage
                      </Link>
                      <Link href="/storage/hard-drives" className="block py-2 hover:text-blue-500">
                        Hard Drives
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
                      <Link href="/networking/dell" className="block py-2 hover:text-blue-500">
                        Dell Switches
                      </Link>
                      <Link href="/networking/cisco" className="block py-2 hover:text-blue-500">
                        Cisco Networking
                      </Link>
                      <Link href="/networking/network-cards" className="block py-2 hover:text-blue-500">
                        Network Cards
                      </Link>
                      <Link href="/networking/transceivers" className="block py-2 hover:text-blue-500">
                        Transceivers & Cables
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
                      <Link href="/components/processors" className="block py-2 hover:text-blue-500">
                        Processors / CPUs
                      </Link>
                      <Link href="/components/memory" className="block py-2 hover:text-blue-500">
                        Memory (RAM)
                      </Link>
                      <Link href="/components/graphics-cards" className="block py-2 hover:text-blue-500">
                        Graphics Cards
                      </Link>
                      <Link href="/components/controllers" className="block py-2 hover:text-blue-500">
                        Controllers & Cards
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Special Offers */}
              <Link href="/special-offers" className="py-3 px-4">
                <span className="font-medium text-red-600">Special Offers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <div className="font-medium mb-2">Configure Your Own</div>
                <div className="ml-4 flex flex-col space-y-2">
                  <Link href="/configure/rack-servers" className="text-gray-600 hover:text-blue-500">
                    Dell Rack Servers
                  </Link>
                  <Link href="/configure/tower-servers" className="text-gray-600 hover:text-blue-500">
                    Dell Tower Servers
                  </Link>
                  <Link href="/configure/blade-servers" className="text-gray-600 hover:text-blue-500">
                    Dell Blades & Nodes
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <div className="font-medium mb-2">Servers</div>
                <div className="ml-4 flex flex-col space-y-2">
                  <Link href="/servers/dell-rack" className="text-gray-600 hover:text-blue-500">
                    Dell Rack Servers
                  </Link>
                  <Link href="/servers/dell-tower" className="text-gray-600 hover:text-blue-500">
                    Dell Tower Servers
                  </Link>
                  <Link href="/servers/dell-blade" className="text-gray-600 hover:text-blue-500">
                    Dell Blade Servers
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <div className="font-medium mb-2">Storage</div>
                <div className="ml-4 flex flex-col space-y-2">
                  <Link href="/storage/powervault" className="text-gray-600 hover:text-blue-500">
                    PowerVault Storage
                  </Link>
                  <Link href="/storage/powerstore" className="text-gray-600 hover:text-blue-500">
                    PowerStore Storage
                  </Link>
                  <Link href="/storage/hard-drives" className="text-gray-600 hover:text-blue-500">
                    Hard Drives
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <div className="font-medium mb-2">Networking</div>
                <div className="ml-4 flex flex-col space-y-2">
                  <Link href="/networking/dell" className="text-gray-600 hover:text-blue-500">
                    Dell Switches
                  </Link>
                  <Link href="/networking/cisco" className="text-gray-600 hover:text-blue-500">
                    Cisco Networking
                  </Link>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-2">
                <div className="font-medium mb-2">Components</div>
                <div className="ml-4 flex flex-col space-y-2">
                  <Link href="/components/processors" className="text-gray-600 hover:text-blue-500">
                    Processors / CPUs
                  </Link>
                  <Link href="/components/memory" className="text-gray-600 hover:text-blue-500">
                    Memory (RAM)
                  </Link>
                </div>
              </div>
              
              <Link href="/special-offers" className="font-medium text-red-600">
                Special Offers
              </Link>
              
              <div className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for servers, storage and more..."
                    className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-3 top-2 text-gray-500">
                    <Search size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 