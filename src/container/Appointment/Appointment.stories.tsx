import type { Meta, StoryObj } from '@storybook/nextjs'
import Appointment from './Appointment'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Decorator } from '@storybook/nextjs'
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient()

const decorators: Decorator[] = [
    (Story) => (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        </SessionProvider>
    ),
]

const meta = {
    title: 'Appointment/Appointment',
    component: Appointment,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    decorators,
} satisfies Meta<typeof Appointment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
