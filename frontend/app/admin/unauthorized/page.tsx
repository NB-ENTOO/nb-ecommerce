'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You do not have permission to access this page.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => router.push('/admin/login')}
            className="w-full"
            variant="default"
          >
            Return to Login
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="w-full"
            variant="outline"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
} 