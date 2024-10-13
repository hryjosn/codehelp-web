'use client'
import { FC, forwardRef, HTMLAttributes } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface CalendarProps extends HTMLAttributes<HTMLDivElement> {
    setSelectedDate: (date: Date) => void
    value: Date
}

const Calendar: FC<CalendarProps> = ({ value, setSelectedDate }) => {
    const ShowCalendarButton = forwardRef<
        HTMLButtonElement,
        { onClick?: () => void }
    >(({ onClick }, ref) => (
        <button
            className="flex items-center justify-center font-bold text-green-800"
            onClick={onClick}
            ref={ref}
        >
            <span>View all</span>
        </button>
    ))

    ShowCalendarButton.displayName = 'ShowCalendarButton'

    return (
        <DatePicker
            selected={value}
            onChange={(date: Date | null) => {
                if (date !== null) {
                    setSelectedDate(date)
                }
            }}
            customInput={<ShowCalendarButton />}
        />
    )
}

export default Calendar
