import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'
import { LoginHandler } from './types'

const loginHandler = async ({ data, router }: LoginHandler) => {
    const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
        redirect: false,
    })

    if (res?.error) {
        let errorData
        try {
            errorData = JSON.parse(res.error)
        } catch {
            errorData = { message: res.error }
        }
        return errorData
    }

    const session = await getSession()
    if (session?.accessToken) {
        await axios.post('/api/auth/token', {
            token: session.accessToken,
        })
    }

    if (res?.ok && res.url) {
        router.push(res.url)
    }
}

export default loginHandler
