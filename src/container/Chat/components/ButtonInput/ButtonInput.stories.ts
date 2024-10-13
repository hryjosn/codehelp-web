import type { Meta, StoryObj } from '@storybook/react'
import ButtonInput from './ButtonInput'

const meta = {
    title: 'Chat/ButtonInput',
    component: ButtonInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { placeholder: 'Write something...', maxRows: 17 },
} satisfies Meta<typeof ButtonInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
