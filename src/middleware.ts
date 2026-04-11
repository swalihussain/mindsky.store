import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we are trying to access any admin routes
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';
  
  // Apply Password Protection Middleware Logic
  if (isAdminPath && !isLoginPath) {
    const authCookie = request.cookies.get('admin_auth')?.value;
    
    // If the cookie doesn't match our secret password token, block them!
    if (authCookie !== 'authorized') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
