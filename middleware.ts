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
  const response = intlMiddleware(request);

  // JWT verification and redirection logic
  const currentUser = request.cookies.get("user")?.value;
  const pathname = request.nextUrl.pathname;

  try {
    await auth.verifyJWT(currentUser ?? "");

    if (pathname.includes("/authentication")) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    if (response) return response; // If intlMiddleware returns a response, return it immediately
  } catch (e) {
    // If JWT is not valid, direct to the authentication page
    if (!pathname.includes("/authentication")) {
      return NextResponse.redirect(new URL(`/authentication`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.jpg$|favicon.ico).*)"],
};
