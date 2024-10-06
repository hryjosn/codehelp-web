import { cva, VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const TimeSlotVariants = cva(
    'flex items-center justify-center font-bold rounded-lg border border-solid border-gray-200 text-center py-2',
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
        VariantProps<typeof TimeSlotVariants> {
    selected: boolean
}

const TimeSlot = ({ selected, variant, className, ...props }: TimeSlotT) => {
    return (
        <button
            className={cn(TimeSlotVariants({ variant, className }), {
                'border-sky-900': selected,
            })}
            {...props}
        />
    )
}

export default TimeSlot