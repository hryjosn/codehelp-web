import React from 'react'
import Input from '~/components/Input/Input'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Button } from '~/components/Button/Button'
import { Modal } from '@mui/material'
import { useGetMentorInfo } from '~/api/mentor'
interface BookingModalProps {
    mentorId: string
    selectedDate: Date
    selectedTime: string
    isOpen: boolean
    onClose: () => void
}
const BookingModal = ({
    mentorId,
    selectedDate,
    selectedTime,
    isOpen,
    onClose,
}: BookingModalProps) => {
    const { data } = useGetMentorInfo(mentorId)
    const confirmBooking = () => {
        onClose()
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className="flex items-center justify-center"
        >
            <div className="relative flex gap-5 rounded-lg bg-white p-7 shadow-xl">
                <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                        {/* <Image
                            src={data.avatar} // Waiting for backend fix avatar URL problem
                            width={0}
                            height={0}
                            sizes="100%"
                            className="h-12 w-12 rounded-full"
                            alt="avatar"
                        /> */}
                        <div className="flex flex-col">
                            <p className="text-sm">{data.userName}</p>
                            <p className="text-sm text-zinc-500">
                                {data.title}
                            </p>
                        </div>
                    </div>
                    <hr className="h-1" />
                    <div className="flex flex-col gap-2 font-bold">
                        <h2>Mentorship Session</h2>
                        <small className="text-zinc-400">
                            Session duration
                        </small>
                        <p className="text-sm">30 minutes</p>
                        <small className="text-zinc-400">About</small>
                        <p className="text-sm">Mentorship session</p>
                    </div>
                </div>
                <hr className="h-auto border-r" />
                <div className="flex-1">
                    <h2 className="mb-4 text-lg font-black">
                        Confirm your booking
                    </h2>
                    <div className="flex gap-10 text-base">
                        <div className="flex gap-2">
                            <CalendarMonthIcon />
                            {selectedDate.toLocaleString('en-US', {
                                weekday: 'short',
                            })}
                            , &nbsp;
                            {selectedDate.toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'short',
                            })}
                        </div>
                        <div className="flex gap-2">
                            <AccessTimeIcon />
                            {new Date(selectedTime).toLocaleTimeString(
                                'en-US',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                }
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 mt-4">
                            What is the topic you want to ask?
                        </p>
                        <Input />
                        <p className="mb-2 mt-4">
                            What is the question you want to ask?
                        </p>
                        <textarea
                            className="w-full resize-none rounded-lg border border-zinc-300 p-2 outline-none focus:border-sky-600"
                            rows={5}
                        />
                    </div>

                    <Button
                        className="mt-5 w-full border-0 bg-gray-500 px-40 py-4 text-white hover:bg-teal-600"
                        onClick={confirmBooking}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default BookingModal
