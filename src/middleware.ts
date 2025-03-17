import { withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, routing } from './i18n/routing'
import { getToken } from 'next-auth/jwt'
import getCleanPathname from './utils/getCleanPathname'

const SECRET_KEY = process.env.NEXTAUTH_SECRET
// Define public accessible pages
const publicPages = [
    '/', // Root path
    '/mentor-profile/[a-zA-Z0-9-]+', // Match /mentor-profile/{id}, where {id} is a number
    '/login', // Match /login
    '/signup', // Match /signup
]

const handleI18nRouting = createMiddleware(routing)

const authMiddleware = withAuth(
    async function onAuthMiddleware(req) {
        const url = req.nextUrl
        const token = await getToken({ req, secret: SECRET_KEY })
        const cleanPathname = getCleanPathname(url.pathname)

        handleI18nRouting(req)

        if (
            cleanPathname.startsWith('/appointment') &&
            token?.user?.identity !== 'mentor'
        ) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null,
        },
        pages: {
            signIn: '/en/login',
        },
    }
)

/**
 * Convert publicPages to RegExp
 * Dynamic paths (like /mentor-profile/\\d+) will be correctly parsed
 */
function buildPublicPathRegex(
    publicPages: string[],
    locales: string[]
): RegExp {
    // Convert paths in publicPages to regular expressions
    const publicPaths = publicPages.map((path) =>
        path === '/' ? ['', '/'] : path
    )

    // Build regular expression
    return new RegExp(
        `^(/(${locales.join('|')}))?(${publicPaths
            .flatMap((path) =>
                Array.isArray(path)
                    ? path
                    : [
                          path.includes('[a-zA-Z0-9-]+')
                              ? path
                              : path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                      ]
            )
            .join('|')})/?$`,
        'i'
    )
}

// Memoize the publicPathnameRegex
const publicPathnameRegex = buildPublicPathRegex(publicPages, [...locales])

export default function middleware(req: NextRequest) {
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)
    return isPublicPage ? handleI18nRouting(req) : (authMiddleware as any)(req)
}

export const config = {
    matcher: ['/', '/(zh|en)/:path*'],
}
