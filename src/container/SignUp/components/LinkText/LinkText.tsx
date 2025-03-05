import React, { LinkHTMLAttributes } from 'react'
import { Link } from '~/i18n/routing'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const linkVariants = cva('font-bold', {
    variants: {
        variant: {
            default: '',
            underline: 'underline',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})
interface LinkProps
    extends LinkHTMLAttributes<HTMLLinkElement>,
        VariantProps<typeof linkVariants> {
    href: string
}

const LinkText = ({ href, variant, children }: LinkProps) => {
    return (
        <Link href={href} className={cn(linkVariants({ variant }))}>
            {children}
        </Link>
    )
}

export default LinkText
