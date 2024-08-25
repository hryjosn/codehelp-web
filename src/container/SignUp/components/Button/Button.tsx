import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
export interface ButtonProps {
    text: string
    errors: object
}

const Button = ({ text, errors }: ButtonProps) => {
    const hasError = Object.keys(errors).length !== 0

    const buttonVariants = cva('text-white p-3 rounded-full w-40', {
        variants: {
            state: {
                default: 'bg-slate-800 hover:bg-slate-700',
                hasError: 'bg-gray-400',
            },
        },
        defaultVariants: {
            state: 'default',
        },
    })

    return (
        <button
            type="submit"
            className={cn(
                buttonVariants({ state: hasError ? 'hasError' : 'default' })
            )}
            disabled={hasError}
        >
            {text}
        </button>
    )
}

export default Button
