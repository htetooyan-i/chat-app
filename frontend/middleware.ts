import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isMaintenanceRoute = pathname.startsWith("/maintenance");
  const isAuthRoute = pathname === "/auth";
  const isRootRoute = pathname === "/";
  const isProtectedRoute = pathname.startsWith("/servers") || pathname.startsWith("/settings");

  if (isMaintenanceRoute) return NextResponse.next();

  if (isRootRoute && token) return NextResponse.next();

  if (isRootRoute && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/servers", req.url));
  }

  if (!token && isAuthRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, other icons, images from /public
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
