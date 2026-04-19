import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuth = request.cookies.get('admin_auth')?.value === 'authorized';

  // Protect admin routes
  if (path.startsWith('/admin') && path !== '/admin/login' && !isAuth) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect from login if already auth
  if (path === '/admin/login' && isAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Map the proxy to specific routes if needed
export const config = {
  matcher: ['/admin/:path*'],
};
