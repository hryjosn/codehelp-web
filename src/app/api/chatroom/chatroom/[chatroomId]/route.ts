import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getChatroomInfoURL } from '~/api/chatroom/route'

export async function GET(
    request: Request,
    context: { params: Promise<{ chatroomId: string }> }
) {
    const { chatroomId } = (await context.params)

    const token = (await cookies()).get('auth_token')?.value

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

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
