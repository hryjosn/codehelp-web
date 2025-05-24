import axios, { AxiosError } from 'axios'
import { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginURL } from '~/api/user/route'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(loginURL, {
                        email: credentials?.email,
                        password: credentials?.password,
                    })

                    res.data.user.identity = res.data.identity
                    res.data.user.token = res.data.token

                    return res.data.user || null
                } catch (error) {
                    let errorMessage = ''
                    if (error instanceof AxiosError) {
                        errorMessage = error.response?.data
                    }
                    throw new Error(JSON.stringify(errorMessage))
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, trigger, user, session }) {
            if (user) {
                token.user = user
                token.accessToken = user.token
            }

            if (trigger === 'update' && session?.user?.avatar) {
                token.user.avatar = session?.user?.avatar
            }
            return token
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user
                session.accessToken = token.accessToken
            }
            return session
        },
    },
    pages: {
        signIn: '/en/login',
    },
}
