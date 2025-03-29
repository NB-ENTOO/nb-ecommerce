import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith('/admin');

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // If trying to access a protected route without a token
  if (isProtectedRoute && !token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login page with a token
  if (path === '/login' && token) {
    // Redirect to the admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*', '/login'],
}; 