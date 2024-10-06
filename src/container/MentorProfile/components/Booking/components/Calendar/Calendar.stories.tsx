import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import Calendar from './Calendar'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/Calendar',
    component: Calendar,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onClose: fn(),
        setSelectedDate: fn(),
        value: new Date(),
    },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render: () => {
        const [isVisible, setIsVisible] = useState<boolean>(false)
        const [selectedDate, setSelectedDate] = useState<Date>(new Date())
        return (
            <div className="relative flex h-screen items-center justify-center">
                <button
                    className="rounded-lg border px-3 py-2"
                    onClick={() => setIsVisible(true)}
                >
                    {selectedDate?.toLocaleString() || 'Click to open calendar'}
                </button>
                {isVisible && (
                    <Calendar
                        className="top-50 bottom-50 right-80"
                        onClose={() => setIsVisible(false)}
                        setSelectedDate={setSelectedDate}
                        value={selectedDate}
                    />
                )}
            </div>
        )
    },
}
