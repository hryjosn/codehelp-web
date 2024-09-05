'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Metadata } from 'next'
import { Header } from '~/components/Header/Header'
import rootStore from '~/store'
import '~/styles/globals.css'

// export const metadata: Metadata = {
//     title: 'Code-Help Home',
//     description: 'Welcome to Code-Help',
// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {
        homeStore: { isAuth },
    } = rootStore
    const queryClient = new QueryClient()
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <Header isAuth={isAuth} />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    )
}
