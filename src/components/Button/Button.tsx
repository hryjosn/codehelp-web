import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva('rounded-[20px] text-primary', {
    variants: {
        variant: {
            default: 'bg-primary-100 ',
            outline: 'border border-blue-500',
        },
        size: {
            default: 'px-5 py-[7.5px]',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
    className,
    size,
    variant,
    children,
    onClick,
    ...props
}) => {
    return (
        <button
            className={cn(buttonVariants({ size, variant, className }))}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export { Button, buttonVariants }
