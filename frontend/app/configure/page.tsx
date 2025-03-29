'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';

export default function ConfigurePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the cart page, which is now the server configuration page
    router.push('/cart');
  }, [router]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Redirecting to server configuration...</p>
        </div>
      </div>
    </Layout>
  );
} 