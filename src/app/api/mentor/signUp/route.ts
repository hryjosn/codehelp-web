import { NextResponse } from 'next/server'
import apiHandler from '~/api/api'
import { mentorSignUpURL } from '~/api/user/route'

export async function POST(req: Request) {
    const formData = await req.formData()

    try {
        const res = await apiHandler({
            url: mentorSignUpURL,
            method: 'POST',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
