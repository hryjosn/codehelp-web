import type { Meta, StoryObj } from '@storybook/nextjs'
import LinkText from './LinkText'

const meta = {
    title: 'Login/LinkText',
    component: LinkText,
    parameters: {
        layout: 'centered',
    },
    args: {
        href: '/signup',
    },
} satisfies Meta<typeof LinkText>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        value: `Don\'t have an account? Create a new account.`,
    },
}
