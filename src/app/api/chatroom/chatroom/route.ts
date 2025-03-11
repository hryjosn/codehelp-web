import { NextResponse } from 'next/server'
import { createChatroomURL } from '~/api/chatroom/api_url'
import apiHandler from '~/api/api'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { data } = await req.json()
    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: createChatroomURL,
            method: 'POST',
            headers: { Authorization: token },
            data,
        })

        if (!res) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
