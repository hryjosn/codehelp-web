'use client'
import { FC } from 'react'
import rootStore from '~/store'
import { Button } from '../Button/Button'
import { NavButton } from '../NavButton/NavButton'

import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

const Header: FC = () => {
    const {
        homeStore: { checkIsAuth, isAuth },
    } = rootStore

    return (
        <div className="g-white flex items-center justify-between border-b border-gray-100 px-6 py-2 shadow-md">
            <Link className="rounded-lg border px-3 py-2" href="/">
                <text>Code Help Icon</text>
            </Link>
            {isAuth ? (
                <div>
                    <Button
                        onClick={() => {
                            fetch('/api/auth/logout')
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
export default observer(Header)
