import React, { useState, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { MOCK_TIME_OPTIONS } from './constants'

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
        setSelectedDate(date)
        setIsCalendarOpen(false)
    }

    const onSelectTime = (time: string) => {
        setSelectedTime(time)
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
        <div
            style={{ width: '480px' }}
            className="p-6 rounded-xl border border-solid border-gray-200 relative"
        >
            <p className="mb-1 tracking-wider text-lg text-blue-950 font-bold">
                Available sessions
            </p>
            <small className="tracking-wide text-slate-500 font-light">
                Book 1:1 sessions from the options based on your needs
            </small>
            <ul className="my-6 grid grid-cols-5 gap-4">
                {currentFourDays.map((day, index) => (
                    <li
                        key={index}
                        style={{ height: '70px' }}
                        className={`flex flex-col justify-center	gap-2 font-bold rounded-lg border border-solid border-gray-200 text-center cursor-pointer hover:border-sky-900 ${selectedDate === day ? 'border-sky-900' : ''}`}
                        onClick={() => onSelectDate(day)}
                    >
                        <small className="text-gray-500 text-xs uppercase">
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
                    className="flex justify-center items-center cursor-pointer text-green-800 font-bold"
                    onClick={() => setIsCalendarOpen(true)}
                >
                    <span>View all</span>
                </div>
            </ul>
            <div className="mb-3 pb-3 flex justify-between tracking-wider border-b border-solid border-gray-200">
                <span className="text-sm text-blue-950">
                    Available time slots
                </span>
                <div className="flex gap-5 cursor-pointer text-gray-200">
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
                {visibleTimes.map((time) => (
                    <li
                        key={time}
                        className={`flex items-center justify-center h-10 font-bold rounded-lg border border-solid border-gray-200 text-center cursor-pointer hover:border-sky-900 ${selectedTime === time ? 'border-sky-900' : ''}`}
                        onClick={() => onSelectTime(time)}
                    >
                        {new Date(time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </li>
                ))}
            </ul>
            <button className="my-6 w-full h-10 bg-teal-700 text-white font-bold rounded-md">
                BOOK
            </button>
            {isCalendarOpen && (
                <div
                    style={{ width: '300px' }}
                    className="absolute m-auto left-0 right-0 top-0 bottom-0"
                >
                    <div
                        className="flex justify-end cursor-pointer text-green-800 font-bold"
                        onClick={() => setIsCalendarOpen(false)}
                    >
                        X
                    </div>
                    <Calendar
                        minDate={new Date()}
                        className="react-calendar"
                        view="month"
                        onClickDay={(date) => onSelectDate(date)}
                    />
                </div>
            )}
        </div>
    )
}

export default Booking
