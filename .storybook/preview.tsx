import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl';
import { RootStoreProvider } from '../src/store/rootStoreProvider'
import { ReactQueryClientProvider } from '../src/components/ReactQueryClientProvider/ReactQueryClientProvider'
import "../src/styles/globals.css"
import React from 'react';
import enMessages from '../messages/en.json'
import zhMessages from '../messages/zh.json'

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
