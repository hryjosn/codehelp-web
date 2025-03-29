import type { Meta, StoryObj } from '@storybook/react'
import CardHeader from './CardHeader'
import { fn } from '@storybook/test'

const meta = {
    title: 'UserProfile/CardHeader',
    component: CardHeader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof CardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        className: '',
        title: 'About Me',
        onClick: fn(),
    },
}
