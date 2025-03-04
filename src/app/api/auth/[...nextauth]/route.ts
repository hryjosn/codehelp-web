import axios from 'axios'
import NextAuth, { Session, User, NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginURL } from '~/api/user/api_url'

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
            async authorize(credentials, req) {
                try {
                    const res = await axios.post(loginURL, {
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                    console.log('login res >', res.data)
                    if (res.data.token) {
                        const token = res.data.token.split(' ')[1]
                        try {
                            await axios.post(`${serverURL}/api/auth/token`, {
                                token,
                            })
                        } catch (error) {
                            console.log('here >>>>>>', error)
                        }
                    }
                    res.data.user.identity = res.data.identity
                    console.log('refactor res >', res.data)

                    return res.data.user || null
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            console.log('nextAuth jwt token >', token)

            if (user) token.user = user
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token.user) {
                session.user = token.user
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
