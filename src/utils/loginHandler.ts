import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'

const loginHandler = async (data: { email: string; password: string }) => {
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
}

export default loginHandler
