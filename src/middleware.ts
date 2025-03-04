import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { withAuth } from 'next-auth/middleware'
// This function can be marked `async` if using `await` inside

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PRIVATE_KEY)

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    async function middleware(request: NextRequest) {
        const token = request.headers
            .get('cookie')
            ?.split('token=')[1]
            ?.split(';')[0]

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        try {
            jwtVerify(token, SECRET_KEY)
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => token !== null,
        },
    }
)
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/appointment'],
}
