import { NextRequest, NextResponse } from "next/server";
import authService from "./services/authService";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isPath = (path: string) => pathname.startsWith(path);
  try {
    const cookie = request.cookies.get("jwt-token")?.value;
    if (!cookie || !cookie.startsWith("Bearer")) {
      throw new Error("Invalid token");
    }
    const {
      data: { user },
    } = await authService.getCurrentUser();
    console.log(user, "user");
    if (isPath("/auth/login") || isPath("/auth/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    if (isPath("/auth/login") || isPath("/auth/signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/auth/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/:path*"],
};
