import type { Meta, StoryObj } from '@storybook/nextjs'
import Square from './Square'

const meta = {
    title: 'UserProfile/MentorPage/Square',
    component: Square,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { isChecked: true },
} satisfies Meta<typeof Square>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { isChecked: false },
}

export const Checked: Story = {
    args: { isChecked: true },
}
