import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import Image from 'next/image'

const buttonVariants = cva('flex items-center justify-center', {
    variants: {
        variant: {
            default: '',
            grayRound: 'bg-gray-200 rounded-full w-14 h-14',
            redRound: 'bg-red-600 rounded-full w-14 h-14',
        },
    },
})
interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    src: string
}
const Button = ({ src, onClick, variant }: ButtonProps) => {
    return (
        <button className={cn(buttonVariants({ variant }))} onClick={onClick}>
            <Image alt="" width={26} height={26} src={src} />
        </button>
    )
}
export default Button
