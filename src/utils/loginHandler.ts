import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'

const loginHandler = async (data: { email: string; password: string }) => {
    await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
    })

    const session = await getSession()
    if (session?.accessToken) {
        await axios.post('/api/auth/token', {
            token: session.accessToken,
        })
    }
}

export default loginHandler
