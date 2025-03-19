import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getChatroomListURL } from '~/api/chatroom/route'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page')) || 1
    const count = Number(searchParams.get('count')) || 10

    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: getChatroomListURL,
            method: 'GET',
            headers: { Authorization: token },
            params: { page, count },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
