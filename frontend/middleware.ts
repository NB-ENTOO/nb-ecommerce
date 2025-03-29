// This file is used to handle navigation and other middleware functionalities
// We've removed authentication requirements to make server configuration accessible to all users

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Set security headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Check if the request is for the admin panel
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  // Skip authentication for the login page and API routes
  if (
    isAdminRoute && (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/api/')
    )
  ) {
    return response;
  }
  
  // Protect admin routes
  if (isAdminRoute) {
    try {
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      });
      
      // Check if the user is authenticated and has admin role
      if (!token || token.role !== 'Administrator') {
        // Redirect to login page with callback URL
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Middleware authentication error:', error);
      // Redirect to error page on auth failure
      return NextResponse.redirect(new URL('/admin/login?error=auth', request.url));
    }
  }
  
  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 