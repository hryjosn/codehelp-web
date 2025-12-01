import { NextRequest, NextResponse } from 'next/server'
import { getMentorInfoURL } from '~/api/mentor/route'
import fetchApi from '~/utils/fetch'

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ mentorId: string }> }
) {
    const { mentorId } = (await context.params)

    if (!mentorId) {
        return NextResponse.json(
            { error: 'mentorId is required' },
            { status: 400 }
        )
    }

    const res = await fetchApi({
        url: getMentorInfoURL(mentorId),
        method: 'GET',
        req,
    })

    return NextResponse.json(res)
}
