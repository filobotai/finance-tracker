import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Require login for everything except NextAuth endpoints and the login page.
 *
 * Note: We use NextAuth's database session strategy (session tokens stored in DB).
 * In that mode, `next-auth/jwt`'s `getToken()` will NOT work (it expects a JWT).
 *
 * Here we do a lightweight check for the presence of a NextAuth session cookie.
 * This is sufficient to prevent redirect loops and keep the edge middleware fast.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const sessionToken =
    req.cookies.get("__Secure-next-auth.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value;

  if (!sessionToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
