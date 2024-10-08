import type { Meta, StoryObj } from '@storybook/react'
import BookingModal from './BookingModal'
import { fn } from '@storybook/test'
import { useEffect, useState } from 'react'
import { Mentor } from '~/container/Home/components/MentorList/types'
import { MOCK_MENTOR_LIST } from '~/container/Home/components/MentorList/constant'
import { runInAction } from 'mobx'
import rootStore from '~/store'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/BookingModal',
    component: BookingModal,
    parameters: {
        layout: 'centered',
    },
    args: {
        selectedTime: '2024-07-16T07:00:00+02:00',
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
        const currentMentor: Mentor | undefined = MOCK_MENTOR_LIST.find(
            (mentor) => mentor.id === 1
        )
        useEffect(() => {
            if (!currentMentor) return
            runInAction(() => {
                rootStore.mentorProfileStore.avatar = currentMentor.avatar
                rootStore.mentorProfileStore.name = currentMentor.name
                rootStore.mentorProfileStore.company = currentMentor.company
                rootStore.mentorProfileStore.title = currentMentor.title
            })
        }, [currentMentor])
        return (
            <div className="relative flex h-screen items-center justify-center">
                <button
                    className="rounded-lg border px-3 py-2"
                    onClick={() => setIsBookingModalOpen(true)}
                >
                    Open Booking
                </button>
                {isBookingModalOpen && (
                    <BookingModal
                        selectedTime="2024-07-16T07:00:00+02:00"
                        selectedDate={new Date()}
                        isOpen={isBookingModalOpen}
                        onClose={() => {
                            setIsBookingModalOpen(false)
                        }}
                    />
                )}
            </div>
        )
    },
}
