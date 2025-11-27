import type { Meta, StoryObj } from '@storybook/nextjs'
import Header from './Header'

const meta = {
    title: 'Header/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        isAuth: { control: 'boolean' },
    },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {
    args: {
        isAuth: false,
    },
}

export const LoggedIn: Story = {
    args: {
        isAuth: true,
    },
}
