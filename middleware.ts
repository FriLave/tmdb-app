import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";

const intlConfig = {
  locales: ['en', 'fr'],
  defaultLocale: 'en'
};

const intlMiddleware = createIntlMiddleware(intlConfig);

export async function middleware(request: NextRequest) {
  // Apply the next-intl middleware to handle locale detection
  const response = intlMiddleware(request);

  // Your custom JWT verification and redirection logic
  const locale = response.cookies.get("NEXT_LOCALE")?.value
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
      return NextResponse.redirect(new URL(`/${locale}/authentication`, request.url));
    }
  }

  return response;
}

export const config = {
  // Ensure the matcher accounts for both i18n paths and your specified paths
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)"],
};
