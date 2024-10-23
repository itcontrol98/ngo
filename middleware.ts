import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
const secret = 'garbage';
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;
  if (
    token && (
      ['/login', '/forget', '/signup', '/api/reset', '/api/verify', '/api/forget'].includes(pathname) ||
      pathname.startsWith('/reset-password')
    )
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login', 
    '/admin', 
    '/forget', 
    '/signup',
    '/reset-password/:path*', 
    '/api/reset', 
    '/api/verify', 
    '/api/forget',
  ],
};
