// This file is used to handle navigation and other middleware functionalities
// We've removed authentication requirements to make server configuration accessible to all users

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    
    // If accessing admin routes, verify role
    if (isAdminRoute) {
      if (!token?.role || !['Administrator', 'Editor'].includes(token.role)) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect all admin routes
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}; 