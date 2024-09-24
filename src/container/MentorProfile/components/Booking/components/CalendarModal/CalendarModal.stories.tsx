import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import CalendarModal from './CalendarModal'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/CalendarModal',
    component: CalendarModal,
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        closeModal: fn(),
        onSelectDate: fn(),
        value: new Date(),
    },
} satisfies Meta<typeof CalendarModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render: () => {
        const [isVisible, setIsVisible] = useState<boolean>(false)
        const [selectedDate, setSelectedDate] = useState<Date | null>(null)
        return (
            <div className="relative flex h-screen items-center justify-center">
                <button
                    className="rounded-lg border px-3 py-2"
                    onClick={() => setIsVisible(true)}
                >
                    {selectedDate?.toLocaleString() ||
                        'Click to open calendar modal'}
                </button>
                {isVisible && (
                    <CalendarModal
                        className="top-50 bottom-50 right-80"
                        closeModal={() => setIsVisible(false)}
                        onSelectDate={setSelectedDate}
                        value={selectedDate}
                    />
                )}
            </div>
        )
    },
}
