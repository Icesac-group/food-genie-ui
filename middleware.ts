import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/signup",
  "/home",
  "/verify-email",
  "/contact",
  "/about-us",
  "/weekly-menu",
  "/meals",
  "/meals/*",
  "/subscribe",
  "/admin/settings",
];

const normalizePath = (path: string) => path.replace(/\/$/, "");

function isPublic(pathname: string): boolean {
  // Check exact matches
  if (publicRoutes.includes(pathname)) {
    return true;
  }

  // Check if it matches /meals/:id pattern (any alphanumeric ID including MongoDB ObjectIds)
  if (pathname.match(/^\/meals\/[a-zA-Z0-9]+$/)) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.has("accessToken");
  // const hasRefreshToken = request.cookies.has("refreshToken");
  // const isPublicRoute = publicRoutes.includes(pathname);
  const isPublicRoute = isPublic(pathname);

  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   normalizePath(pathname).startsWith(normalizePath(route))
  // );
  const isProtectedRoute = !isPublicRoute;

  try {
    if ((isPublicRoute || pathname === "/") && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if ((isProtectedRoute || pathname === "/") && !isAuthenticated) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } catch (error) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
};
