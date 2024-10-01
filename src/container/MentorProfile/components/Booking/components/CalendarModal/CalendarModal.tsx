import { FC, HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
interface CalendarModalProps extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void
    setSelectedDate: (date: Date) => void
    value: Date
}

const CalendarModal: FC<CalendarModalProps> = ({
    closeModal,
    setSelectedDate,
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
            <DatePicker
                showIcon
                selected={new Date()}
                inline
                onChange={(date: Date | null) => {
                    if (date === null) return
                    setSelectedDate(date)
                    closeModal()
                }}
                value={value?.toLocaleString()}
            />
        </div>
    )
}

export default CalendarModal
