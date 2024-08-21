import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
    title: 'Login/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        title: 'Login',
        errors: {},
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const HasError: Story = {
    args: {
        title: 'Login',
        errors: {
            password: {
                type: 'pattern',
                message: '密碼格式錯誤',
            },
        },
    },
}

export const NoError: Story = {
    args: {
        title: 'Login',
        errors: {},
    },
}
