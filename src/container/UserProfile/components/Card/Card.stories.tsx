import type { Meta, StoryObj } from '@storybook/nextjs'
import Card from './Card'
import { fn } from 'storybook/test'

const meta = {
    title: 'UserProfile/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        className: '',
        headerTitle: 'About Me',
        onClick: fn(),
        content: <p>here is content</p>,
    },
}
