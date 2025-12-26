import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoutes = ['/private', '/dashboard', '/secret'];

export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);
  const isUser = token?.role === 'user';
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  if (!isAuthenticated && isPrivate) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/private/:path*',
}