import type { Meta, StoryObj } from '@storybook/nextjs'
import Button from './Button'

const meta = {
    title: 'Login/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'Login',
        errors: {},
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Disable: Story = {
    args: {
        children: 'Login',
        errors: {
            password: {
                type: 'pattern',
                message: '密碼格式錯誤',
            },
        },
    },
}

export const Enable: Story = {}
