import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/auth.config';

interface ServerAuthCheckProps {
  children: React.ReactNode;
  requiredRole?: 'Administrator' | 'Editor' | 'Viewer';
}

export default async function ServerAuthCheck({ 
  children,
  requiredRole = 'Administrator'
}: ServerAuthCheckProps) {
  const session = await getServerSession(authConfig);
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || '/admin/login';

  if (!session?.user) {
    redirect(`/admin/login?callbackUrl=${encodeURIComponent(fullUrl)}`);
  }

  // Check if user has required role
  if (!session.user.role || session.user.role !== requiredRole) {
    redirect('/admin/unauthorized');
  }

  return <>{children}</>;
} 