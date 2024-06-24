import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import en from '../lang/en.json'
import zh from '../lang/zh.json'

import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    const { locale } = useRouter()
    const [shortLocale] = locale ? locale.split('-') : ['en']
    const messages = useMemo(() => {
        switch (shortLocale) {
            case 'en':
                return en
            case 'zh':
                return zh
            default:
                return en
        }
    }, [shortLocale])

    return (
        <IntlProvider locale={locale as string} messages={messages}>
            <Component {...pageProps} />
        </IntlProvider>
    )
}
