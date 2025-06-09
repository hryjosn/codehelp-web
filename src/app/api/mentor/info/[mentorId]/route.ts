import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getMentorInfoURL } from '~/api/mentor/route'

export async function GET(
    request: Request,
    context: { params: { mentorId: string } }
) {
    const { mentorId } = context.params

    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    if (!mentorId) {
        return NextResponse.json(
            { error: 'mentorId is required' },
            { status: 400 }
        )
    }

    try {
        const res = await apiHandler({
            url: getMentorInfoURL(mentorId),
            method: 'GET',
            headers: { Authorization: token },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
