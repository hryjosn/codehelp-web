import { FC, HTMLAttributes } from 'react'
import Calendar from 'react-calendar'
import { cn } from '~/lib/utils'

interface CalendarModalProps extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void
    onSelectDate: (date: Date) => void
    value: Date | null
}

const CalendarModal: FC<CalendarModalProps> = ({
    closeModal,
    onSelectDate,
    className,
    value,
}) => {
    return (
        <div style={{ width: '300px' }} className={cn('absolute', className)}>
            <div
                className="flex cursor-pointer justify-end font-bold text-green-800"
                onClick={closeModal}
            >
                X
            </div>
            <Calendar
                minDate={new Date()}
                className="react-calendar"
                view="month"
                onClickDay={(date) => {
                    onSelectDate(date)
                    closeModal()
                }}
                value={value}
            />
        </div>
    )
}

export default CalendarModal
