import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl';
import { RootStoreProvider } from '../src/store/rootStoreProvider'
import "../src/styles/globals.css"
import React from 'react';

const mockMessages = {
  en: { hello: "Hello", welcome: "Welcome to Storybook" },
  zh: { hello: "你好", welcome: "歡迎來到 Storybook" },
};

const preview: Preview = {
    decorators: [
        (Story, context) => {
          const locale = context.globals.locale || 'zh';
    
          return (
            <NextIntlClientProvider messages={mockMessages[locale]} locale={locale}>
              <RootStoreProvider>
                <Story />
              </RootStoreProvider>
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
