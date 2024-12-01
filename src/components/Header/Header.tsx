import { DetailsHTMLAttributes, FC, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { NavButton } from '../NavButton/NavButton'
import rootStore from '~/store'

interface HeaderProps extends DetailsHTMLAttributes<HTMLDivElement> {
    isAuth: boolean
}

const Header: FC<HeaderProps> = ({ isAuth, ...props }) => {
    const {
        homeStore: { checkIsAuth },
    } = rootStore
    return (
        <div
            className="g-white flex items-center justify-between border-b border-gray-100 px-6 py-2 shadow-md"
            {...props}
        >
            <div className="rounded-lg border px-3 py-2">
                <text>Code Help Icon</text>
            </div>
            {isAuth ? (
                <div>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('token')
                            checkIsAuth()
                        }}
                        variant={'secondary'}
                        size={'default'}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <NavButton
                        path="/login"
                        variant={'primary'}
                        size={'default'}
                    >
                        Login
                    </NavButton>
                    <NavButton
                        path="/signup"
                        variant={'secondary'}
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
