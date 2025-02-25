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

export async function GET(req: Request) {
    const cookies = req.headers.get('cookie')
    const token = cookies?.split('token=')[1]?.split(';')[0]

    if (!token) {
        return NextResponse.json({ error: 'Token not found' }, { status: 401 })
    }

    return NextResponse.json({ token })
}

export async function DELETE() {
    const response = NextResponse.json({ message: 'Token deleted' })

    response.headers.append(
        'Set-Cookie',
        serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: -1,
        })
    )

    return response
}
