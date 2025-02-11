import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST(req: Request) {
    const { token } = await req.json()

    if (!token) {
        return NextResponse.json({ error: 'Token is required', status: 401 })
    }

    const response = NextResponse.json({ message: 'Token stored' })

    response.headers.append(
        'Set-Cookie',
        serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        })
    )

    return response
}
