import type { Meta, StoryObj } from '@storybook/react'
import DefaultChattingArea from './DefaultChattingArea'

const meta = {
    title: 'Chat/DefaultChattingArea',
    component: DefaultChattingArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DefaultChattingArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
