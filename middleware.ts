import {NextRequest, NextResponse} from 'next/server'
import {auth} from "@/lib/auth";


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

export async function middleware(request: NextRequest) {
    //jwt verify
    const currentUser = request.cookies.get('user')?.value
    const pathname = request.nextUrl.pathname;

    try {
        await auth.verifyJWT(currentUser ?? '');

        if (pathname.startsWith('/authentication')) {
            return Response.redirect(new URL('/', request.url))
        }

        return NextResponse.next() // continue to the next middleware
    } catch (e) {
        // if jwt is not valid, remove the cookie
        // cookies().delete('user')
        if (!pathname.startsWith('/authentication')) {
            return Response.redirect(new URL('/authentication', request.url))
        }
    }
}
