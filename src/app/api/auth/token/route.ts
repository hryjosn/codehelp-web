import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { token } = await req.json()

    if (!token) {
        return NextResponse.json(
            { error: 'Token is required' },
            { status: 401 }
        )
    }

    (await cookies()).set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({ message: 'Token stored' })
}

export async function GET() {
    const token = (await cookies()).get('auth_token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Token not found' }, { status: 401 })
    }

    return NextResponse.json({ token })
}

export async function DELETE() {
    (await cookies()).delete('auth_token')

    return NextResponse.json({ message: 'Token deleted' })
}
