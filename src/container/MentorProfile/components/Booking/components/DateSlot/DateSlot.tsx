import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '~/lib/utils'

interface DateSlotProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    selected: boolean
}

const DateSlot: FC<DateSlotProps> = ({
    className,
    selected,
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                className,
                { 'border-sky-900': selected },
                'flex h-16 cursor-pointer flex-col justify-center gap-2 rounded-lg border border-solid px-2 text-center hover:border-sky-900'
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default DateSlot
