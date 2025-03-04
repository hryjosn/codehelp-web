import { Metadata } from 'next'
import { ReactQueryClientProvider } from '~/components/ReactQueryClientProvider/ReactQueryClientProvider'
import '~/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { server } from '~/../mocks/node'
import { MSWProvider } from '~/../mocks/msw-provider'
import { CustomAppProps } from '~/types/types'
import Provider from './Provider'
// server.listen()

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
    appProps,
}: {
    children: React.ReactNode
    appProps: CustomAppProps
}) {
    return (
        <html lang="en">
            <body>
                <ReactQueryClientProvider>
                    <Provider>{children}</Provider>
                    {/* <MSWProvider>{children}</MSWProvider> */}
                </ReactQueryClientProvider>
            </body>
        </html>
    )
}
