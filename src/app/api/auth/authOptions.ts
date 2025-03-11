import axios from 'axios'
import { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginURL } from '~/api/user/route'

const serverURL = 'http://localhost:3000'

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
                    console.log(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.user = user
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
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
