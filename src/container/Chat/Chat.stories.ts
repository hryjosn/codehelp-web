import type { Meta, StoryObj } from '@storybook/react'
import Chat from './Chat'

const meta = {
    title: 'Chat',
    component: Chat,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Chat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
