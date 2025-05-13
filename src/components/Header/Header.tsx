'use client'
import { FC, useEffect, useState } from 'react'

import Image from 'next/image'
import axios from 'axios'
import { useRouter } from '~/i18n/routing'
import { NavButton } from '../NavButton/NavButton'
import { signOut } from 'next-auth/react'
import { Link } from '~/i18n/routing'
import { IoChatbubbleOutline } from 'react-icons/io5'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useGetUserInfo } from '~/api/user/user'
import Avatar from '~/components/Avatar/Avatar'
import { useHeaderStore } from './store/HeaderStore'

const Header: FC = () => {
    const { data: userData } = useGetUserInfo()

    const { token, fetchToken, setToken } = useHeaderStore()

    const [dropDown, setDropDown] = useState<null | HTMLElement>(null)
    const router = useRouter()

    const openDropDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropDown(event.currentTarget)
    }
    const closeDropDown = () => {
        setDropDown(null)
    }

    useEffect(() => {
        fetchToken()
    }, [])

    const Logout = async () => {
        try {
            signOut({ callbackUrl: '/' })
            await axios.delete('/api/auth/token')
            setToken('')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-2 shadow-md">
            <Link className="flex items-center" href="/">
                <Image
                    src="/Logo/codehelp_logo.png"
                    alt=""
                    width={50}
                    height={50}
                />
                <p className="text-xl font-bold">Codehelp</p>
            </Link>
            <div className="flex">
                {token ? (
                    <>
                        <Link className="mr-5 flex items-center" href="/chat">
                            <IoChatbubbleOutline size={25} />
                        </Link>
                        <button className="rounded-full" onClick={openDropDown}>
                            <Avatar src={userData?.user?.avatar} />
                        </button>
                    </>
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
                <Menu
                    id="basic-menu"
                    anchorEl={dropDown}
                    open={!!dropDown}
                    onClose={closeDropDown}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            closeDropDown()
                            router.push('/user-profile')
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            closeDropDown()
                            Logout()
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
export default Header
