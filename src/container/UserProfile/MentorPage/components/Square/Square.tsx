'use client'

import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { Props } from './types'

const squareVariants = cva('h-4 w-4 border', {
    variants: {
        variant: {
            default: '',
            checked: 'bg-green-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

const Square = ({ isChecked, className }: Props) => {
    return (
        <div
            className={cn(
                squareVariants({ variant: isChecked ? 'checked' : 'default' }),
                className
            )}
        />
    )
}

export default Square
