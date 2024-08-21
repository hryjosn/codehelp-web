import type { Meta, StoryObj } from '@storybook/react'
import Login from './Login'

const meta = {
    title: 'Login',
    component: Login,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
