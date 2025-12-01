import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { getBookingRecordURL } from '~/api/booking/route'

export async function GET(
    request: Request,
    context: { params: Promise<{ recordId: string }> }
) {
    const { recordId } = (await context.params)

    const token = (await cookies()).get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    if (!recordId) {
        return NextResponse.json(
            { error: 'recordId is required' },
            { status: 400 }
        )
    }

    try {
        const res = await apiHandler({
            url: getBookingRecordURL(recordId),
            method: 'GET',
            headers: { Authorization: token },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
