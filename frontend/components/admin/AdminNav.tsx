'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Folder, 
  Upload, 
  Users, 
  Settings, 
  HelpCircle,
  Database
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function AdminNav() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: <Package size={20} />
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: <Folder size={20} />
    },
    {
      label: 'Import Products',
      href: '/admin/products/import',
      icon: <Upload size={20} />
    },
    {
      label: 'Database Seeding',
      href: '/admin/database-seed',
      icon: <Database size={20} />
    },
    {
      label: 'Admin Users',
      href: '/admin/users',
      icon: <Users size={20} />
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <Settings size={20} />
    },
    {
      label: 'Help',
      href: '/admin/help',
      icon: <HelpCircle size={20} />
    }
  ];
  
  return (
    <nav className="mt-5 px-2">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          
          return (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isActive 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 