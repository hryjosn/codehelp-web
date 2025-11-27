import type { Meta, StoryObj } from '@storybook/nextjs'
import BookingModal from './BookingModal'
import { fn } from 'storybook/test'
import { useState } from 'react'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/BookingModal',
    component: BookingModal,
    parameters: {
        layout: 'centered',
    },
    args: {
        mentorId: '1',
        selectedTimeCode: 0,
        selectedDate: new Date(),
        isOpen: false,
        onClose: fn(),
    },
} satisfies Meta<typeof BookingModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
        return (
            <div className="relative flex h-screen items-center justify-center">
                <button
                    className="rounded-lg border px-3 py-2"
                    onClick={() => setIsBookingModalOpen(true)}
                >
                    Open Booking
                </button>
                <BookingModal
                    mentorId="1"
                    selectedTimeCode={0}
                    selectedDate={new Date()}
                    isOpen={isBookingModalOpen}
                    onClose={() => {
                        setIsBookingModalOpen(false)
                    }}
                />
            </div>
        )
    },
}
