'use client'

import { cva, VariantProps } from 'class-variance-authority'
import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva('w-full border py-5', {
    variants: {
        variant: {
            primary: 'bg-green-200',
            secondary: 'bg-white',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})
interface ButtonGrid
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const ButtonGrid = ({ variant, className, onClick }: ButtonGrid) => {
    return (
        <td className="flex max-w-40 flex-1">
            <button
                className={cn(buttonVariants({ className, variant }))}
                onClick={onClick}
            />
        </td>
    )
}

export default ButtonGrid
