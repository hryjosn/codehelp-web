import { cva, VariantProps } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const textVariants = cva('uppercase font-bold', {
    variants: {
        variant: {
            primary: 'text-xs text-gray-500',
            secondary: 'text-sm text-cyan-900',
        },
    },
})

interface TextProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof textVariants> {}

const DateText: FC<TextProps> = ({ variant, ...props }) => {
    return <span className={cn(textVariants({ variant }))} {...props} />
}

export { DateText, textVariants }
