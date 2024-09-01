import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva('text-white p-3 rounded-full w-40', {
    variants: {
        variant: {
            default: 'bg-slate-800 hover:bg-slate-700',
            hasError: 'bg-gray-400',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    errors: object
}

const Button = ({ errors, ...props }: ButtonProps) => {
    const hasError = Object.keys(errors).length !== 0
    return (
        <button
            className={cn(
                buttonVariants({ variant: hasError ? 'hasError' : 'default' })
            )}
            disabled={hasError}
            {...props}
        />
    )
}

export default Button
