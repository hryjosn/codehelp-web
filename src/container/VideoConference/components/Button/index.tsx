import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'
import Image from 'next/image'
const buttonVariants = cva(
    'flex items-center justify-center rounded-full w-14 h-14 bg-gray-200',
    {
        variants: {
            variant: {
                default: '',
                red: 'bg-red-600 text-white',
            },
        },
    }
)
interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    src: string
}
const Button = ({ src, onClick, variant }: ButtonProps) => {
    console.log(src)
    return (
        <button className={cn(buttonVariants({ variant }))} onClick={onClick}>
            <Image
                alt=""
                width={26}
                height={26}
                src={src}
                className="text-white"
            />
        </button>
    )
}
export default Button
