import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl';
import { RootStoreProvider } from '../src/store/rootStoreProvider'
import { ReactQueryClientProvider } from '../src/components/ReactQueryClientProvider/ReactQueryClientProvider'
import "../src/styles/globals.css"
import enMessages from '../messages/en.json'
import zhMessages from '../messages/zh.json'
import 'react-phone-input-2/lib/style.css'

const Messages = {
  en: enMessages,
  zh: zhMessages,
};

const preview: Preview = {
    decorators: [
        (Story, context) => {
          const locale = context.globals.locale || 'zh';
    
          return (
            <NextIntlClientProvider messages={Messages[locale]} locale={locale}>
              <ReactQueryClientProvider>
                <RootStoreProvider>
                  <Story />
                </RootStoreProvider>
              </ReactQueryClientProvider>
            </NextIntlClientProvider>
          );
        },
    ],
    globals: {
      locale: 'zh',
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
