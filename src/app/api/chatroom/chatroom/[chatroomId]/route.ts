import { NextResponse } from 'next/server'
import { getChatroomInfoURL } from '~/api/chatroom/api_url'
import apiHandler from '~/api/api'
import { cookies } from 'next/headers'

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
