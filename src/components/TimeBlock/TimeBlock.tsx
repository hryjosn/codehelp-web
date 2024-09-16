import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils'

const TimeBlockVariants = cva(
    'flex items-center justify-center h-10 font-bold rounded-lg border border-solid border-gray-200 text-center ',
    {
        variants: {
            variant: {
                idle: 'bg-green-200 hover:border-sky-900 cursor-pointer',
                booked: 'bg-red-200 cursor-default',
                notAvailable: 'bg-gray-300 cursor-default',
            },
            selected: {
                false: '',
                true: 'border-sky-900',
            },
        },
        defaultVariants: {
            variant: 'idle',
            selected: false,
        },
    }
)

interface TimeBlockT extends VariantProps<typeof TimeBlockVariants> {
    time: string
    selected: boolean
    onClick: React.MouseEventHandler<HTMLLIElement>
}

const TimeBlock = ({ time, selected, onClick, variant }: TimeBlockT) => {
    return (
        <li
            className={cn(TimeBlockVariants({ variant, selected }))}
            onClick={onClick}
        >
            {new Date(time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            })}
        </li>
    )
}

export default TimeBlock
