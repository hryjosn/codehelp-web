import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import ScheduleSetting from './ScheduleSetting'
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
    title: 'ScheduleSetting/ScheduleSetting',
    component: ScheduleSetting,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    decorators,
} satisfies Meta<typeof ScheduleSetting>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
