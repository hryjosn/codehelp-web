import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { userInfoURL } from '~/api/user/route'

export async function GET() {
    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: userInfoURL,
            method: 'GET',
            headers: { Authorization: token },
        })

        if (!res) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        return NextResponse.json(res.data)
    } catch (error) {
        console.log('error >>', error)
    }
}
