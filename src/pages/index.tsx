import { Inter } from 'next/font/google'
import { FormattedMessage } from 'react-intl'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between${inter.className}`}
        >
            <div>
                <FormattedMessage
                    id="page.home.head.title"
                    defaultMessage="Next.js i18n example"
                />
            </div>
        </main>
    )
}
