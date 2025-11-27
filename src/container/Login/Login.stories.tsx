import type { Meta, StoryObj } from '@storybook/nextjs'
import Login from './Login'

const meta = {
    title: 'Login',
    component: Login,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    args: {},
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
