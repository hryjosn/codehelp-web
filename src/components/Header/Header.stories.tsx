import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'
import { fn } from '@storybook/test'

const meta = {
    title: 'Header/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        bg: { control: 'select', options: ['default', 'gray'] },
    },
    args: {
        bg: 'default',
        login: fn(),
        logout: fn(),
        signUp: fn(),
    },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {
    args: {
        token: '',
    },
}

export const LoggedIn: Story = {
    args: {
        token: 'token',
    },
}
