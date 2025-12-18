import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { updateAvailableTimeURL } from '~/api/mentor/route'

export async function PUT(req: Request) {
    const { data } = await req.json()
    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: updateAvailableTimeURL,
            method: 'PUT',
            headers: { Authorization: token },
            data,
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
