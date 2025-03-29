import { auth } from './lib/auth';
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session;
  
  // Check if the request is for the profile page
  const isAccessingProfile = req.nextUrl.pathname.startsWith('/profile');
  
  // If user is not authenticated and trying to access profile, redirect to login
  if (!isAuthenticated && isAccessingProfile) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

// Optionally, you can configure the middleware to only run on specific paths
export const config = {
  matcher: ['/profile/:path*'],
}; 