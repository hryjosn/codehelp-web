import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function GET(req: Request) {
    const response = NextResponse.json({ message: 'Logged out' })

    response.headers.append(
        'Set-Cookie',
        serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0), // Expire the cookie
        })
    )

    return response
}
