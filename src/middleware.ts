import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    console.log('middleware is work')
    console.log(req.url)
    return NextResponse.redirect(new URL('/login', req.url))
}
export const config = {
    matcher: ['/'],
}
