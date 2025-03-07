import { withAuth } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { locales, routing } from './i18n/routing'

// Define public accessible pages
const publicPages = [
    '/', // Root path
    '/mentor-profile/\\d+', // Match /mentor-profile/{id}, where {id} is a number
    '/login', // Match /login
    '/signup', // Match /signup
]

const handleI18nRouting = createMiddleware(routing)

const authMiddleware = withAuth((req) => handleI18nRouting(req), {
    callbacks: {
        authorized: ({ token }) => token != null,
    },
    pages: {
        signIn: '/login',
    },
})

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
                          path.includes('\\d+')
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
