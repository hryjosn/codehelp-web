import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '~/lib/utils'

const buttonVariants = cva('border rounded-lg border-black font-bold', {
    variants: {
        variant: {
            primary:
                'bg-white text-black transition duration-500 hover:bg-gray-900 hover:text-white',
            secondary:
                'bg-gray-900 text-white transition duration-500 hover:bg-[#008080] hover:border-[#008080]',
        },
        size: {
            default: 'px-5 py-2',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
    className,
    variant,
    size,
    onClick,
    ...props
}) => {
    return (
        <button
            className={cn(buttonVariants({ size, className, variant }))}
            onClick={onClick}
            {...props}
        />
    )
}
export { Button, buttonVariants }
