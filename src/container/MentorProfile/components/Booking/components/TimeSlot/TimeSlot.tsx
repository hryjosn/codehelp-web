import { cva, VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const TimeSlotVariants = cva(
    'flex items-center justify-center font-bold rounded-lg border border-solid border-gray-200 text-center py-2',
    {
        variants: {
            variant: {
                primary: 'bg-green-200 hover:border-sky-900 cursor-pointer',
                secondary: 'bg-gray-300',
                danger: 'bg-red-200',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    }
)

interface TimeSlotT
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof TimeSlotVariants> {
    selected: boolean
}

const TimeSlot = ({
    selected,
    variant,
    className,
    children,
    ...props
}: TimeSlotT) => {
    return (
        <button
            className={cn(TimeSlotVariants({ variant, className }), {
                'border-sky-900': selected,
            })}
            {...props}
        >
            {children}
        </button>
    )
}

export default TimeSlot
