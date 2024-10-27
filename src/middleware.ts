import { type NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPath = (path: string) => pathname.startsWith(path);
  try {
    const cookie = request.cookies.get("jwt-token")?.value;
    if (!cookie || !cookie.startsWith("Bearer")) {
      throw new Error("Invalid token");
    }
    console.log("user logged in");
    if (isPath("/auth/login") || isPath("/auth/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch {
    if (isPath("/auth/login") || isPath("/auth/signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/auth/login?redirectUrl=${pathname}`, request.url));
  }
};

export const config = {
  matcher: ["/", "/auth/:path*"],
};
