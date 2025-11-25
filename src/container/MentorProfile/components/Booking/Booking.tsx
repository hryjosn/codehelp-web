'use client'
import React, { useEffect, useState } from 'react'
import DateSlot from './components/DateSlot/DateSlot'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Calendar from './components/Calendar/Calendar'
import BookingModal from './components/BookingModal/BookingModal'
import TimeSlot from './components/TimeSlot/TimeSlot'
import BookingButton from './components/BookingButton/BookingButton'
import { Days, Props } from './types'
import { convertTimeCode } from './utils'
import { cn } from '~/lib/utils'
import { useSession } from 'next-auth/react'

const Booking = ({ mentorId, mentorInfo }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { data: userData } = useSession()

    const dayOfWeek = Days[selectedDate.getDay()]

    const timeCodeForAvailable = mentorInfo?.mentorAvailableTimes?.find(
        (item) => item.day === dayOfWeek
    )?.timeCode

    const timeCodeForBooked = mentorInfo?.mentorBookedTimes?.find(
        (item) => item.day === dayOfWeek
    )?.timeCode

    const [visibleTimes, setVisibleTimes] = useState<number[] | undefined>(
        timeCodeForAvailable?.slice(0, 6)
    )
    const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false)
    const [selectedTimeCode, setSelectedTimeCode] = useState<
        number | undefined
    >()

    const currentFourDays = Array.from(
        { length: 4 },
        (_, i) => new Date(selectedDate.getTime() + i * 86400000)
    )

    const onNextTimes = () => {
        if (!timeCodeForAvailable || !visibleTimes) return

        const startIndex = timeCodeForAvailable.indexOf(visibleTimes[0]) + 6
        if (startIndex < timeCodeForAvailable.length) {
            setVisibleTimes(
                timeCodeForAvailable.slice(startIndex, startIndex + 6)
            )
            setSelectedTimeCode(undefined)
        }
    }

    const onPrevTimes = () => {
        if (!timeCodeForAvailable || !visibleTimes) return

        const startIndex = timeCodeForAvailable.indexOf(visibleTimes[0]) - 6
        if (startIndex >= 0) {
            setVisibleTimes(
                timeCodeForAvailable.slice(startIndex, startIndex + 6)
            )
            setSelectedTimeCode(undefined)
        }
    }

    useEffect(() => {
        setVisibleTimes(timeCodeForAvailable?.slice(0, 6))
    }, [timeCodeForAvailable])

    return (
        <div className="relative max-w-[480px] rounded-xl border border-solid border-gray-200 p-6">
            {selectedTimeCode && (
                <BookingModal
                    mentorId={mentorId}
                    selectedDate={selectedDate}
                    selectedTimeCode={selectedTimeCode}
                    isOpen={isBookingModalOpen}
                    onClose={() => {
                        setIsBookingModalOpen(false)
                    }}
                />
            )}
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
            <ul
                className={cn('text-center', {
                    'grid grid-cols-3 items-center gap-2':
                        visibleTimes && visibleTimes.length > 0,
                })}
            >
                {visibleTimes && visibleTimes.length > 0 ? (
                    <>
                        {visibleTimes.map((code) => (
                            <TimeSlot
                                key={code}
                                variant={
                                    timeCodeForBooked?.find(
                                        (timeCode) => timeCode === code
                                    )
                                        ? 'danger'
                                        : 'primary'
                                }
                                selected={selectedTimeCode === code}
                                disabled={
                                    !!timeCodeForBooked?.find(
                                        (timeCode) => timeCode === code
                                    )
                                }
                                onClick={() => setSelectedTimeCode(code)}
                            >
                                <span>{convertTimeCode(code)}</span>
                            </TimeSlot>
                        ))}
                    </>
                ) : (
                    <p className="font-bold text-slate-500">
                        There is no available time on today
                    </p>
                )}
            </ul>

            {userData?.user.identity === 'member' && (
                <BookingButton
                    title="BOOK"
                    isDisable={!selectedTimeCode}
                    onClick={() => {
                        setIsBookingModalOpen(true)
                    }}
                />
            )}
        </div>
    )
}

export default Booking
