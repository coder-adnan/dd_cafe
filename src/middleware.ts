import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./i18n";

function getLocale(request: NextRequest): string {
    // Simple locale negotiation: Check cookies or Accept-Language headers here.
    // For simplicity MVP we will just default to 'en'
    return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip if we are trying to load static files, images, api, etc
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/favicon.ico') ||
        pathname.startsWith('/api') ||
        pathname.match(/\.(.*)$/)
    ) {
        return;
    }

    // Check if the current pathname already has a locale
    const pathnameHasLocale = LOCALES.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
