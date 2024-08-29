import type { Meta, StoryObj } from '@storybook/react'
import { NavButton } from './NavButton'

const meta = {
    title: 'Header/NavButton',
    component: NavButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary'] },
        size: { control: 'select', options: ['default'] },
    },
} satisfies Meta<typeof NavButton>

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
    args: {
        children: 'Log in',
        variant: 'primary',
        size: 'default',
        path: '/login',
    },
}

export const SignUp: Story = {
    args: {
        children: 'Sign up',
        variant: 'secondary',
        size: 'default',
        path: '/signup',
    },
}
