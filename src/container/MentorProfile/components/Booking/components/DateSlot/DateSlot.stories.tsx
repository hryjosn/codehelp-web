import type { Meta, StoryObj } from '@storybook/nextjs'
import DateSlot from './DateSlot'
import { fn } from 'storybook/test'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/DateSlot',
    component: DateSlot,
    parameters: {
        layout: 'centered',
    },
    args: {
        onClick: fn(),
        selected: false,
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DateSlot>

const DATE = new Date()

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => {
        return (
            <DateSlot {...args}>
                <span className="text-xs font-bold uppercase text-gray-500">
                    {DATE.toLocaleDateString('en-US', {
                        weekday: 'short',
                    })}
                </span>
                <span className="text-sm font-bold uppercase text-cyan-900">
                    {DATE.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                    })}
                </span>
            </DateSlot>
        )
    },
}
export const Selected: Story = {
    args: { selected: true },
    render: (args) => {
        return (
            <DateSlot {...args}>
                <span className="text-xs font-bold uppercase text-gray-500">
                    {DATE.toLocaleDateString('en-US', {
                        weekday: 'short',
                    })}
                </span>
                <span className="text-sm font-bold uppercase text-cyan-900">
                    {DATE.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                    })}
                </span>
            </DateSlot>
        )
    },
}
