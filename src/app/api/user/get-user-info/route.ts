import { NextResponse } from 'next/server'
import { userInfoURL } from '~/api/user/api_url'
import apiHandler from '~/api/api'

export async function GET(req: Request) {
    const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0]

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: `${userInfoURL}`,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
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
