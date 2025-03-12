import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { createChatroomURL } from '~/api/chatroom/route'

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

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
