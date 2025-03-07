import { Metadata } from 'next'
import { ReactQueryClientProvider } from '~/components/ReactQueryClientProvider/ReactQueryClientProvider'
import '~/styles/globals.css'
import { server } from '~/../mocks/node'
import { MSWProvider } from '~/../mocks/msw-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '~/i18n/routing'
import Provider from '~/app/Provider'
import { RootStoreProvider } from '~/store/rootStoreProvider'

// server.listen()

export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}
export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    console.log(routing)
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }
    const messages = await getMessages()
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ReactQueryClientProvider>
                        {/* <MSWProvider>{children}</MSWProvider> */}
                        <Provider>
                            <RootStoreProvider>{children}</RootStoreProvider>
                        </Provider>
                    </ReactQueryClientProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
