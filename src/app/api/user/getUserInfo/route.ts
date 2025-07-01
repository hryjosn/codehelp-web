import { NextRequest, NextResponse } from 'next/server'

import { userInfoURL } from '~/api/user/route'
import fetchApi from '~/utils/fetch'

export async function GET(req: NextRequest) {
    const res = await fetchApi({
        url: userInfoURL,
        method: 'GET',
        req,
    })

    return NextResponse.json(res)
}
