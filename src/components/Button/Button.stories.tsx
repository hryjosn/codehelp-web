import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
    title: 'Header/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { children: '' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const LogIn: Story = {
    args: { children: 'Log in', variant: 'default' },
}
