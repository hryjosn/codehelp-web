import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'

export async function GET(
    req: Request,
    context: { params: { chatroomId: string } }
) {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page')) || 1
    const count = Number(searchParams.get('count')) || 10

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
            url: '123', //temporary
            method: 'GET',
            headers: { Authorization: token },
            params: { pageParam: page, pageSize: count },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
