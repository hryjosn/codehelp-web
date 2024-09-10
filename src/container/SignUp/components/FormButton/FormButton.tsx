import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '~/lib/utils'

const buttonVariants = cva('p-3 text-white', {
    variants: {
        variant: {
            default: 'mt-5 rounded-full w-40 bg-slate-800 hover:bg-slate-700',
            nextButton: 'bg-sky-600 px-4 rounded-lg hover:bg-sky-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const FormButton = ({ variant, ...props }: ButtonProps) => {
    const {
        formState: { errors },
    } = useFormContext()
    const hasError = Object.keys(errors).length !== 0
    return (
        <button
            type="submit"
            className={cn(buttonVariants({ variant }))}
            disabled={hasError}
            {...props}
        />
    )
}

export default FormButton
