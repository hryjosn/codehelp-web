import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getChatroomInfoURL } from '~/api/chatroom/route'

export async function GET(
    request: Request,
    context: { params: { chatroomId: string } }
) {
    const { chatroomId } = context.params

    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    if (!chatroomId) {
        return NextResponse.json(
            { error: 'chatroomId is required' },
            { status: 400 }
        )
    }

    try {
        const res = await apiHandler({
            url: getChatroomInfoURL(chatroomId),
            method: 'GET',
            headers: { Authorization: token },
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
