import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { fn } from '@storybook/test'

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variants: { control: 'select', options: ['primary', 'secondary'] },
        size: { control: 'select', options: ['default'] },
    },
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
    args: {
        children: 'Log in',
        variants: 'primary',
        size: 'default',
    },
}

export const SignUp: Story = {
    args: {
        children: 'Sign up',
        variants: 'secondary',
        size: 'default',
    },
}