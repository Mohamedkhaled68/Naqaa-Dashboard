import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Get token from cookies
    const token = request.cookies.get("token")?.value;

    // Get the pathname of the request
    const { pathname } = request.nextUrl;

    // Protect dashboard routes
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect authenticated users away from login and register
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth",
        "/login",
        "/register",
        "/auth/:path*",
    ],
};
