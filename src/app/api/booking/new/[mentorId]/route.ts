import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getNewBookingURL } from '~/api/booking/route'

export async function POST(
    request: Request,
    context: { params: { mentorId: string } }
) {
    const { mentorId } = context.params
    const formData = await request.formData()

    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: getNewBookingURL(mentorId),
            method: 'POST',
            headers: { Authorization: token },
            data: formData,
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
