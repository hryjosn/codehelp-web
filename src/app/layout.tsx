import { Metadata } from 'next'
import { ReactQueryClientProvider } from '~/components/ReactQueryClientProvider/ReactQueryClientProvider'
import '~/styles/globals.css'
import { server } from '~/../mocks/node'
import { MSWProvider } from '~/../mocks/msw-provider'

server.listen()

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <ReactQueryClientProvider>
                    <MSWProvider>{children}</MSWProvider>
                </ReactQueryClientProvider>
            </body>
        </html>
    )
}
