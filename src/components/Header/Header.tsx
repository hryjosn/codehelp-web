import { DetailsHTMLAttributes, FC } from 'react'
import { Button } from '../Button/Button'
import { NavButton } from '../NavButton/NavButton'

interface HeaderProps extends DetailsHTMLAttributes<HTMLDivElement> {
    isAuth: boolean
}

const Header: FC<HeaderProps> = ({ isAuth, ...props }) => {
    return (
        <div
            className="flex items-center g-white shadow-md justify-between py-2 px-6 border-b border-gray-100"
            {...props}
        >
            <div className="border py-2 px-3 border rounded-lg">
                <text>Code Help Icon</text>
            </div>
            {isAuth ? (
                <div>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('token')
                        }}
                        variants={'secondary'}
                        size={'default'}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <NavButton
                        path="/login"
                        variants={'primary'}
                        size={'default'}
                    >
                        Login
                    </NavButton>
                    <NavButton
                        path="/signup"
                        variants={'secondary'}
                        size={'default'}
                    >
                        Sign up
                    </NavButton>
                </div>
            )}
        </div>
    )
}
export { Header }
