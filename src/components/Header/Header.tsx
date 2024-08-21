import { cva, VariantProps } from 'class-variance-authority'
import { DetailsHTMLAttributes, FC } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '../Button/Button'

const buttonVariants = cva(
    'flex flex-1 items-center shadow-md justify-between py-2 px-6 border-b border-gray-100',
    {
        variants: {
            bg: {
                default: 'bg-white',
                gray: 'bg-gray-100',
            },
        },
        defaultVariants: {},
    }
)

interface HeaderProps
    extends DetailsHTMLAttributes<HTMLDivElement>,
        VariantProps<typeof buttonVariants> {
    token?: string
    login: () => void
    logout: () => void
    signUp: () => void
}

const Header: FC<HeaderProps> = ({
    className,
    token,
    login,
    logout,
    signUp,
    bg,
    ...props
}) => {
    return (
        <div className={cn(buttonVariants({ className, bg }))} {...props}>
            <div className="border py-2 px-3 border rounded-lg">
                <text>Code Help Icon</text>
            </div>
            {token ? (
                <div>
                    <Button
                        fontWeight={'bold'}
                        size={'default'}
                        mode={'dark'}
                        hover={'teal'}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Button
                        fontWeight={'bold'}
                        size={'default'}
                        mode={'white'}
                        hover={'dark'}
                        onClick={login}
                    >
                        Login
                    </Button>
                    <Button
                        fontWeight={'bold'}
                        size={'default'}
                        mode={'dark'}
                        hover={'teal'}
                        onClick={signUp}
                    >
                        Sign up
                    </Button>
                </div>
            )}
        </div>
    )
}
export { Header, buttonVariants }
