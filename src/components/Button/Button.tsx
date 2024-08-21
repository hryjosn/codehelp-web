import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva('border rounded-lg border-black', {
    variants: {
        mode: {
            white: 'bg-white text-black',
            dark: 'bg-gray-900 text-white',
        },
        size: {
            default: 'px-5 py-2',
        },
        fontWeight: {
            default: 'font-normal',
            bold: 'font-bold',
        },
        hover: {
            default: '',
            white: 'transition duration-500 hover:bg-white hover:text-black',
            dark: 'transition duration-500 hover:bg-gray-900 hover:text-white',
            teal: 'transition duration-500 hover:bg-[#008080] hover:border-[#008080]',
        },
    },
    defaultVariants: {
        size: 'default',
        fontWeight: 'default',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
    className,
    size,
    children,
    fontWeight,
    mode,
    hover,
    onClick,
    ...props
}) => {
    return (
        <button
            className={cn(
                buttonVariants({ size, className, fontWeight, mode, hover })
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export { Button, buttonVariants }
