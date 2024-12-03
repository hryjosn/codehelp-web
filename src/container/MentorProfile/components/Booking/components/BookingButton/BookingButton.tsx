import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { ButtonT } from './types'

const buttonVariants = cva(
    'my-6 h-10 w-full rounded-md font-bold text-white min-w-40',
    {
        variants: {
            variant: {
                default: 'bg-teal-700',
                disable: 'bg-gray-400',
            },
        },
    }
)

const BookingButton = ({ title, isDisable, ...props }: ButtonT) => {
    return (
        <button
            className={cn(
                buttonVariants({ variant: isDisable ? 'disable' : 'default' })
            )}
            disabled={isDisable}
            {...props}
        >
            {title}
        </button>
    )
}

export default BookingButton
