'use client'
import React, { useState, useMemo } from 'react'
import 'react-calendar/dist/Calendar.css'
import { MOCK_TIME_OPTIONS } from './constants'
import { DateText } from './components/DateText/DateText'
import SelectButton from './components/SelectButton/SelectButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarModal from './components/CalendarModal/CalendarModal'

const Booking = () => {
    const [visibleTimes, setVisibleTimes] = useState<string[]>(
        MOCK_TIME_OPTIONS.slice(0, 6)
    )
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string>('')

    const currentFourDays = useMemo(() => {
        return Array.from(
            { length: 4 },
            (_, i) => new Date(Date.now() + i * 86400000)
        )
    }, [])

    const onSelectDate = (date: Date) => {
        if (selectedDate === date) {
            setSelectedDate(null)
        } else {
            setSelectedDate(date)
        }
        setIsCalendarOpen(false)
    }

    const onSelectTime = (time: string) => {
        if (selectedTime === time) {
            setSelectedTime('')
        } else {
            setSelectedTime(time)
        }
    }

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
            <p className="mb-1 text-lg font-bold tracking-wider text-blue-950">
                Available sessions
            </p>
            <small className="font-light tracking-wide text-slate-500">
                Book 1:1 sessions from the options based on your needs
            </small>
            <ul className="my-6 grid grid-cols-5 items-center gap-4">
                {currentFourDays.map((day, index) => (
                    <SelectButton
                        key={index}
                        variant={'primary'}
                        className={`${selectedDate === day && 'border-sky-900'}`}
                        onClick={() => onSelectDate(day)}
                    >
                        <DateText variant={'primary'}>
                            {day.toLocaleDateString('en-US', {
                                weekday: 'short',
                            })}
                        </DateText>
                        <DateText variant={'secondary'}>
                            {day.toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                            })}
                        </DateText>
                    </SelectButton>
                ))}
                <div
                    style={{ height: '70px' }}
                    className="flex cursor-pointer items-center justify-center font-bold text-green-800"
                    onClick={() => setIsCalendarOpen(true)}
                >
                    <span>View all</span>
                </div>
            </ul>
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
                {visibleTimes.map((time) => (
                    <SelectButton
                        key={time}
                        value={'secondary'}
                        className={`${selectedTime === time && 'border-sky-900'}`}
                        onClick={() => onSelectTime(time)}
                    >
                        <span>
                            {new Date(time).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </SelectButton>
                ))}
            </ul>
            <button className="my-6 h-10 w-full rounded-md bg-teal-700 font-bold text-white">
                BOOK
            </button>
            {isCalendarOpen && (
                <CalendarModal
                    className="bottom-0 left-0 right-0 top-0 m-auto"
                    closeModal={() => setIsCalendarOpen(false)}
                    onSelectDate={onSelectDate}
                    value={selectedDate}
                />
            )}
        </div>
    )
}

export default Booking
