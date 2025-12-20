import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MSWProvider } from '~/../mocks/msw-provider'
import { server } from '~/../mocks/node'
import Provider from '~/app/Provider'
import { ReactQueryClientProvider } from '~/components/ReactQueryClientProvider/ReactQueryClientProvider'
import { routing } from '~/i18n/routing'
import { RootStoreProvider } from '~/store/rootStoreProvider'
import { Toaster } from '~/components/ui/toaster'
import 'react-phone-input-2/lib/style.css'

import '~/styles/globals.css'
if (process.env.NEXT_PUBLIC_MOCK === 'true') {
    server.listen()
}

export const metadata: Metadata = {
    title: {
        template: '%s - Codehelp',
        default: 'Codehelp',
    },
    description: 'Welcome to Codehelp',
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
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }
    const messages = await getMessages()
    return (
        <html lang={locale}>
            <head>
                <link rel="icon" href="/Logo/codehelp_logo.png" />
            </head>

            <body>
                <NextIntlClientProvider messages={messages}>
                    <ReactQueryClientProvider>
                        <Provider>
                            <RootStoreProvider>
                                <MSWProvider>{children}</MSWProvider>
                                <Toaster />
                            </RootStoreProvider>
                        </Provider>
                    </ReactQueryClientProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
