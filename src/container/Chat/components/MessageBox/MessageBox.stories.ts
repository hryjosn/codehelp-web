import type { Meta, StoryObj } from '@storybook/react'
import MessageBox from './MessageBox'

const meta = {
    title: 'Chat/MessageBox',
    component: MessageBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { message: 'here is the messageBox test' },
} satisfies Meta<typeof MessageBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
