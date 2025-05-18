import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { updateAvatarURL } from '~/api/user/route'

export async function PUT(req: Request) {
    const formData = await req.formData()
    const token = cookies().get('auth_token')?.value

    if (!token) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 }
        )
    }

    try {
        const res = await apiHandler({
            url: updateAvatarURL,
            method: 'PUT',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token,
            },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
