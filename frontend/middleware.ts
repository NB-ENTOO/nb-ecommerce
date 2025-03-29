// This file is used to handle navigation and other middleware functionalities
// We've removed authentication requirements to make server configuration accessible to all users

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Set security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Check if the request is for the admin panel
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  // Skip authentication for the login page
  if (isAdminRoute && request.nextUrl.pathname === '/admin/login') {
    return response;
  }
  
  // Protect admin routes
  if (isAdminRoute) {
    const session = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // Check if the user is authenticated and has admin role
    if (!session || session.role !== 'Administrator') {
      // Redirect to login page
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
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