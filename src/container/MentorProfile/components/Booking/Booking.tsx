'use client'
import React, { useState, useMemo } from 'react'
import { MOCK_TIME_OPTIONS, MOCK_TIME_OPTIONS_T } from './constants'
import DateSlot from './components/DateSlot/DateSlot'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Calendar from './components/Calendar/Calendar'
import BookingModal from './components/BookingModal/BookingModal'
import TimeSlot from './components/TimeSlot/TimeSlot'
import BookingButton from './components/BookingButton/BookingButton'
import { IBookingProps } from './components/BookingModal/types'

const Booking = ({ mentorId, availableTimes }: IBookingProps) => {
    console.log(availableTimes)

    const [visibleTimes, setVisibleTimes] = useState<MOCK_TIME_OPTIONS_T[]>(
        MOCK_TIME_OPTIONS.slice(0, 6)
    )
    const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedTime, setSelectedTime] = useState<string>('')

    const currentFourDays = Array.from(
        { length: 4 },
        (_, i) => new Date(selectedDate.getTime() + i * 86400000)
    )

    const onNextTimes = () => {
        const startIndex = MOCK_TIME_OPTIONS.indexOf(visibleTimes[0]) + 6
        if (startIndex < MOCK_TIME_OPTIONS.length) {
            setVisibleTimes(MOCK_TIME_OPTIONS.slice(startIndex, startIndex + 6))
        }
    }

    const onPrevTimes = () => {
        const startIndex = MOCK_TIME_OPTIONS.indexOf(visibleTimes[0]) - 6
        if (startIndex >= 0) {
            setVisibleTimes(MOCK_TIME_OPTIONS.slice(startIndex, startIndex + 6))
        }
    }

    return (
        <div className="relative max-w-[480px] rounded-xl border border-solid border-gray-200 p-6">
            <BookingModal
                mentorId={mentorId}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                isOpen={isBookingModalOpen}
                onClose={() => {
                    setIsBookingModalOpen(false)
                }}
            />
            <p className="mb-1 text-lg font-bold tracking-wider text-blue-950">
                Available sessions
            </p>
            <small className="font-light tracking-wide text-slate-500">
                Book 1:1 sessions from the options based on your needs
            </small>
            <div className="my-6 grid grid-cols-5 items-center gap-4">
                {currentFourDays.map((day, index) => (
                    <DateSlot
                        key={index}
                        selected={selectedDate.getDate() === day.getDate()}
                        onClick={() => setSelectedDate(day)}
                    >
                        <span className="self-center text-xs font-bold uppercase text-gray-500">
                            {day.toLocaleDateString('en-US', {
                                weekday: 'short',
                            })}
                        </span>
                        <span className="self-center text-sm font-bold uppercase text-cyan-900">
                            {day.toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                            })}
                        </span>
                    </DateSlot>
                ))}
                <Calendar
                    value={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            <div className="mb-3 flex justify-between border-b border-solid border-gray-200 pb-3 tracking-wider">
                <span className="text-sm text-blue-950">
                    Available time slots
                </span>
                <div className="flex cursor-pointer items-center gap-2 text-gray-200">
                    <ArrowBackIcon
                        className={'hover:text-black'}
                        onClick={() => onPrevTimes()}
                        sx={{
                            height: '15px',
                            width: '15px',
                            color: 'lightGray',
                        }}
                    />
                    <ArrowForwardIcon
                        className={'hover:text-black'}
                        onClick={() => onNextTimes()}
                        sx={{
                            height: '15px',
                            width: '15px',
                            color: 'lightGray',
                        }}
                    />
                </div>
            </div>
            <ul className="grid grid-cols-3 items-center gap-2">
                {visibleTimes.map((data) => (
                    <TimeSlot
                        key={data.time}
                        variant={
                            data.state === 'idle'
                                ? 'primary'
                                : data.state === 'booked'
                                  ? 'danger'
                                  : 'secondary'
                        }
                        selected={selectedTime === data.time}
                        disabled={data.state !== 'idle'}
                        onClick={() => setSelectedTime(data.time)}
                    >
                        <span>
                            {new Date(data.time).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </TimeSlot>
                ))}
            </ul>
            <BookingButton
                title="BOOK"
                isDisable={!selectedTime}
                onClick={() => {
                    setIsBookingModalOpen(true)
                }}
            />
        </div>
    )
}

export default Booking
