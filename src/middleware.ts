import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
// This function can be marked `async` if using `await` inside

const SECRET_KEY = process.env.NEXT_PRIVATE_KEY

export async function middleware(request: NextRequest) {
    const token = request.headers
        .get('cookie')
        ?.split('token=')[1]
        ?.split(';')[0]
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
        jwt.verify(token, SECRET_KEY!)
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}
