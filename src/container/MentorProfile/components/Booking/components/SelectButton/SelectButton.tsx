import { cva, VariantProps } from 'class-variance-authority'
import { FC, LiHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const SelectButtonVariants = cva(
    'flex cursor-pointer justify-center rounded-lg border border-solid border-gray-200 text-center hover:border-sky-900',
    {
        variants: {
            variant: {
                primary: 'px-2 h-16 flex-col gap-2',
                secondary: 'px-5 items-center font-bold',
            },
        },
    }
)

interface SelectButtonProps
    extends LiHTMLAttributes<HTMLLIElement>,
        VariantProps<typeof SelectButtonVariants> {}

const SelectButton: FC<SelectButtonProps> = ({
    className,
    variant,
    ...props
}) => {
    return (
        <li
            className={cn(SelectButtonVariants({ variant, className }))}
            {...props}
        />
    )
}

export default SelectButton
