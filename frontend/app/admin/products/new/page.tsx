'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../../components/admin/AdminLayout';

export default function NewProductPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/products/new');
  }, [router]);

  return (
    <AdminLayout>
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">
          Redirecting to product form...
        </div>
      </div>
    </AdminLayout>
  );
} 