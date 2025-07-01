// lib/fetch/fetchApi.ts
import { IncomingMessage } from 'http'
import { getServerSession } from 'next-auth/next'
import { headers as NextHeaders } from 'next/headers'
import { NextRequest } from 'next/server'
import { authOptions } from '~/app/api/auth/authOptions'

export interface FetchRequestConfig {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    params?: Record<string, string | number | boolean>
    data?: unknown
    headers?: Record<string, string>
    signal?: AbortSignal
    req?:
        | NextRequest
        | (IncomingMessage & { cookies: Partial<Record<string, string>> })
}

export interface FetchResponse<T = unknown> {
    code: number
    data: T
    message?: string
    totalPage?: number
    [key: string]: unknown
}

function resolveRequestHeaders(
    req: FetchRequestConfig['req']
): string | undefined {
    if (!req) return undefined

    return (req as NextRequest).headers.get('accessToken') || undefined
}

async function resolveOrigin(): Promise<string> {
    const nextHeaders = (await NextHeaders()) as unknown as {
        get: (name: string) => string | undefined
    }
    const host = nextHeaders.get('host')
    const protocol = nextHeaders.get('x-forwarded-proto') || 'http'
    return `${protocol}://${host}`
}

function buildUrlWithParams(
    url: string,
    params?: Record<string, string | number | boolean>
): string {
    if (!params) return url

    const searchParams = new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
    )
    return url + (url.includes('?') ? '&' : '?') + searchParams.toString()
}

export default async function fetchApi<Req = unknown, Res = unknown>(
    config: FetchRequestConfig & { data?: Req }
): Promise<FetchResponse<Res>> {
    const {
        url: rawUrl,
        method = 'GET',
        params,
        data,
        headers = {},
        req,
        ...rest
    } = config

    let url = buildUrlWithParams(rawUrl, params)
    const finalHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    }

    const accessToken = resolveRequestHeaders(req)
    if (accessToken) {
        finalHeaders.Authorization = accessToken
    } else {
        if (!url.startsWith('https')) url = (await resolveOrigin()) + url
        const session = await getServerSession(authOptions)
        const token = session?.accessToken

        if (token) finalHeaders.accessToken = `${token}`
    }

    const fetchOptions: RequestInit = {
        method,
        headers: finalHeaders,
        ...rest,
    }

    if (data && method !== 'GET') {
        fetchOptions.body = JSON.stringify(data)
    }

    const res = await fetch(url, fetchOptions)

    if (!res.ok) {
        throw new Error(`HTTP Error ${res.status} ${res.statusText} at ${url}`)
    }

    const json = (await res.json()) as FetchResponse<Res>

    return json
}
