import type { Meta, StoryObj } from '@storybook/react'
import TimeSlot from './TimeSlot'
import { fn } from '@storybook/test'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/TimeSlot',
    component: TimeSlot,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['idle', 'booked', 'notAvailable'],
        },
    },
} satisfies Meta<typeof TimeSlot>

export default meta
type Story = StoryObj<typeof meta>
const date = new Date()
export const Default: Story = {
    args: {
        variant: 'idle',
        className: 'p-2',
    },
    render: (args) => {
        return (
            <TimeSlot variant={args.variant} className={args.className}>
                <span>
                    {date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </span>
            </TimeSlot>
        )
    },
}
export const Booked: Story = {
    args: {
        variant: 'booked',
        className: 'p-2',
    },
    render: (args) => {
        return (
            <TimeSlot variant={args.variant} className={args.className}>
                <span>
                    {date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </span>
            </TimeSlot>
        )
    },
}
export const NotAvailable: Story = {
    args: {
        variant: 'notAvailable',
        className: 'p-2',
    },
    render: (args) => {
        return (
            <TimeSlot variant={args.variant} className={args.className}>
                <span>
                    {date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </span>
            </TimeSlot>
        )
    },
}
