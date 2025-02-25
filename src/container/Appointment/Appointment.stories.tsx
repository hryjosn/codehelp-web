import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import Appointment from './Appointment'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const decorators = [
    (Story: StoryFn) => (
        <QueryClientProvider client={queryClient}>
            <Story />
        </QueryClientProvider>
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
