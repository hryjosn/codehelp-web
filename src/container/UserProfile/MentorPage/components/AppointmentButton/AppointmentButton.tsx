'use client'
import { adjustTimeZone, adjustMinuteToHour } from '../../utils'
import { useTranslations } from 'next-intl'
import { Props } from './types'

import { forwardRef } from 'react'

const AppointmentButton = forwardRef<HTMLButtonElement, Props>(
    ({ bookingAt, duration, onClick }, ref) => {
        const timeTranslate = useTranslations('Time')

        return (
            <button
                ref={ref}
                className="flex flex-col border-b-2 pb-2 text-sm hover:text-gray-500 sm:flex-row sm:items-center sm:justify-between"
                onClick={onClick}
            >
                <span className="flex space-x-3 text-muted-foreground">
                    <p className="font-bold">At:</p>
                    <p>{adjustTimeZone(bookingAt)}</p>
                </span>
                <span className="flex space-x-3 text-muted-foreground">
                    <p className="font-bold">Duration:</p>
                    <p>
                        {adjustMinuteToHour({
                            minute: duration,
                            t: timeTranslate,
                        })}
                    </p>
                </span>
            </button>
        )
    }
)

AppointmentButton.displayName = 'AppointmentButton'
export default AppointmentButton
