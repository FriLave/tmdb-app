import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "@/lib/i18n";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'fr'
});

export async function middleware(request: NextRequest) {
  // Apply the next-intl middleware to handle locale detection
  const path = request.nextUrl.pathname;
  const response = path.includes('/api') ? NextResponse.next() : intlMiddleware(request);

  // Public paths that do not require authentication
  const publicPaths = [
    "/api/login",
    "/api/register",
  ];
  if (publicPaths.includes(path)) {
    return response;
  }

  // JWT verification and redirection logic
  const currentUser = request.cookies.get("user")?.value;
  const pathname = request.nextUrl.pathname;

  try {
    await auth.verifyJWT(currentUser ?? "");

    if (pathname.includes("/authentication")) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  } catch (e) {
    // If JWT is not valid, direct to the authentication page
    if (!pathname.includes("/authentication")) {
      return NextResponse.redirect(new URL(`/authentication`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.jpg$|favicon.ico).*)"],
};
