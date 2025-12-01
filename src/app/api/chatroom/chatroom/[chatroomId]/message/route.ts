import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getMessageRecordURL } from '~/api/chatroom/route'

export async function GET(
    req: Request,
    context: { params: Promise<{ chatroomId: string }> }
) {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page')) || 1
    const count = Number(searchParams.get('count')) || 15

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
            url: getMessageRecordURL(chatroomId),
            method: 'GET',
            headers: { Authorization: token },
            params: { page, count },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
