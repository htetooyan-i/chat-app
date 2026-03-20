import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isMaintenanceRoute = pathname.startsWith("/maintenance");
  const isAuthRoute = pathname === "/auth";
  const isRootRoute = pathname === "/";
  const isProtectedRoute = pathname.startsWith("/channels") || pathname.startsWith("/settings");

  if (pathname === "/login") { // FIXME: find which route is causing the issue and remove this
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isMaintenanceRoute) return NextResponse.next();

  if (isRootRoute && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/channels", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ]
};
