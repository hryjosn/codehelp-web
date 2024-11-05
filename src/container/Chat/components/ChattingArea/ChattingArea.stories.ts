import type { Meta, StoryObj } from '@storybook/react'
import ChattingArea from './ChattingArea'

const meta = {
    title: 'Chat/ChattingArea',
    component: ChattingArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChattingArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
