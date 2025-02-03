import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("loggedIn")?.value;

  if (req.nextUrl.pathname.startsWith("/chat") && loggedIn !== "true") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to "/chat" and subpaths
export const config = {
  matcher: ["/chat/:path*"],
};
