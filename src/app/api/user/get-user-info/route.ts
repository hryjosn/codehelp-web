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
            url: userInfoURL + '/a192638c-ec69-411f-9512-2fae86d8fdc4',
            method: 'GET',
            // headers: { Authorization: `Bearer${token}` },
        })
        // const res = await fetch(
        //     userInfoURL + '/a192638c-ec69-411f-9512-2fae86d8fdc4',
        //     {
        //         method: 'GET',
        //         headers: { Authorization: `Bearer ${token}` },
        //         mode: 'cors',
        //     }
        // )

        if (!res) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            )
        }

        // const user = await res.json()
        return NextResponse.json(res)
    } catch (error) {
        console.log('error >>', error)
    }
}
