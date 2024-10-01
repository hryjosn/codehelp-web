import { cva, VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const TimeSlotVariants = cva(
    'flex items-center justify-center font-bold rounded-lg border border-solid border-gray-200 text-center ',
    {
        variants: {
            variant: {
                idle: 'bg-green-200 hover:border-sky-900 cursor-pointer',
                booked: 'bg-red-200 cursor-default',
                notAvailable: 'bg-gray-300 cursor-default',
            },
        },
        defaultVariants: {
            variant: 'idle',
        },
    }
)

interface TimeSlotT
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof TimeSlotVariants> {}

const TimeSlot = ({ variant, className, ...props }: TimeSlotT) => {
    return (
        <button
            className={cn(TimeSlotVariants({ variant, className }))}
            {...props}
        />
    )
}

export default TimeSlot
