'use client'
import React, { useState, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
    BookingState,
    MOCK_TIME_OPTIONS,
    MOCK_TIME_OPTIONS_T,
} from './constants'
import TimeBlock from '../TimeBlock/TimeBlock'

const Booking = () => {
    const [visibleTimes, setVisibleTimes] = useState<MOCK_TIME_OPTIONS_T[]>(
        MOCK_TIME_OPTIONS.slice(0, 6)
    )
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [selectedTime, setSelectedTime] = useState<string>('')

    const currentFourDays = useMemo(() => {
        return Array.from(
            { length: 4 },
            (_, i) => new Date(Date.now() + i * 86400000)
        )
    }, [])

    const onSelectDate = (date: Date) => {
        setSelectedDate(date)
        setIsCalendarOpen(false)
    }

    const onSelectTime = ({ time, state }: MOCK_TIME_OPTIONS_T) => {
        if (state === BookingState.idle) {
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
            <ul className="my-6 grid grid-cols-5 gap-4">
                {currentFourDays.map((day, index) => (
                    <li
                        key={index}
                        style={{ height: '70px' }}
                        className={`flex cursor-pointer flex-col justify-center gap-2 rounded-lg border border-solid border-gray-200 text-center font-bold hover:border-sky-900 ${selectedDate.getDay() === day.getDay() ? 'border-sky-900' : ''}`}
                        onClick={() => onSelectDate(day)}
                    >
                        <small className="text-xs uppercase text-gray-500">
                            {day
                                .toLocaleDateString('en-US', {
                                    weekday: 'short',
                                })
                                .toUpperCase()}
                        </small>
                        <p className="text-sm text-cyan-900">
                            {day
                                .toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                })
                                .toUpperCase()}
                        </p>
                    </li>
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
                <div className="flex cursor-pointer gap-5 text-gray-200">
                    <span
                        className="hover:text-blue-950"
                        onClick={() => onPrevTimes()}
                    >
                        &#8678;
                    </span>
                    <span
                        className="hover:text-blue-950"
                        onClick={() => onNextTimes()}
                    >
                        &#8680;
                    </span>
                </div>
            </div>
            <ul className="grid grid-cols-3 gap-2">
                {visibleTimes.map((data) => (
                    <TimeBlock
                        key={data.time}
                        time={data.time}
                        onClick={() => onSelectTime(data)}
                        selected={
                            selectedTime === data.time &&
                            data.state === BookingState.idle
                        }
                        variant={BookingState[data.state]}
                    />
                ))}
            </ul>
            <button className="my-6 h-10 w-full rounded-md bg-teal-700 font-bold text-white">
                BOOK
            </button>
            {isCalendarOpen && (
                <div
                    style={{ width: '300px' }}
                    className="absolute bottom-0 left-0 right-0 top-0 m-auto"
                >
                    <div
                        className="flex cursor-pointer justify-end font-bold text-green-800"
                        onClick={() => setIsCalendarOpen(false)}
                    >
                        X
                    </div>
                    <Calendar
                        minDate={new Date()}
                        className="react-calendar"
                        view="month"
                        value={selectedDate}
                        onClickDay={(date) => onSelectDate(date)}
                    />
                </div>
            )}
        </div>
    )
}

export default Booking
