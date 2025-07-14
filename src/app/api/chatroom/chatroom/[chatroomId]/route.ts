import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getChatroomInfoURL } from '~/api/chatroom/route'
import fetchApi from '~/utils/fetch'

export async function GET(
    req: NextRequest,
    context: { params: { chatroomId: string } }
) {
    const { chatroomId } = context.params

    if (!chatroomId) {
        return NextResponse.json(
            { error: 'chatroomId is required' },
            { status: 400 }
        )
    }

    const res = await fetchApi({
        url: getChatroomInfoURL(chatroomId),
        method: 'GET',
        req,
    })

    return NextResponse.json(res)
}
