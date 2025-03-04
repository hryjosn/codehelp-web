import { Session } from 'next-auth'
import { AppProps } from 'next/app'

export interface CustomAppProps extends AppProps {
    pageProps: {
        session?: Session
    }
}
