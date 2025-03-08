import NextAuth from 'next-auth'
import { MentorT } from '~/api/mentor/types'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User
        accessToken: sting
    }

    interface User extends MentorT {
        identity: string
        token: string
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        user: User
    }
}
