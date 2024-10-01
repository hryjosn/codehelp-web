import type { Meta, StoryObj } from '@storybook/react'
import DateSlot from './DateSlot'
import { useState } from 'react'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/DateSlot',
    component: DateSlot,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DateSlot>

const DATE = new Date()

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => {
        const [selectedDate, setSelectedDate] = useState<Date | null>(null)
        return (
            <DateSlot
                onClick={() => {
                    if (selectedDate === DATE) {
                        setSelectedDate(null)
                    } else {
                        setSelectedDate(DATE)
                    }
                }}
                className={`${selectedDate === DATE && 'border-sky-900'}`}
                {...args}
            >
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
