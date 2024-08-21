import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
    title: 'Header/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['default'] },
        fontWeight: { control: 'select', options: ['default', 'bold'] },
        mode: { control: 'select', options: ['white', 'dark'] },
        hover: { control: 'select', options: ['white', 'dark', 'teal'] },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Login: Story = {
    args: {
        children: 'Log in',
        fontWeight: 'bold',
        size: 'default',
        mode: 'white',
        hover: 'dark',
    },
}

export const SignUp: Story = {
    args: {
        children: 'Sign up',
        fontWeight: 'bold',
        size: 'default',
        mode: 'dark',
        hover: 'teal',
    },
}
