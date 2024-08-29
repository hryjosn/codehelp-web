import { cva, VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'
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
    extends AnchorHTMLAttributes<HTMLAnchorElement>,
        VariantProps<typeof buttonVariants> {
    path: string
}

const NavButton: FC<ButtonProps> = ({
    className,
    variant,
    size,
    children,
    path,
    ...props
}) => {
    return (
        <Link
            className={cn(buttonVariants({ size, className, variant }))}
            href={path}
            {...props}
        >
            {children}
        </Link>
    )
}
export { NavButton, buttonVariants }
