'use client'
import { FC, useEffect, useState } from 'react'

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

const Header: FC = () => {
    const { data: userData } = useGetUserInfo()
    const [token, setToken] = useState<string | null>(null)
    const [dropDown, setDropDown] = useState<null | HTMLElement>(null)
    const router = useRouter()

    const openDropDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropDown(event.currentTarget)
    }
    const closeDropDown = () => {
        setDropDown(null)
    }

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const { data } = await axios.get('/api/auth/token')
                setToken(data.token)
            } catch (error) {
                console.error('Failed to fetch token:', error)
                setToken(null)
            }
        }

        fetchToken()
    }, [])

    const Logout = async () => {
        try {
            signOut({ callbackUrl: '/' })
            await axios.delete('/api/auth/token')
            setToken(null)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="g-white flex items-center justify-between border-b border-gray-100 px-6 py-2 shadow-md">
            <Link className="rounded-lg border px-3 py-2" href="/">
                <p>Code Help Icon</p>
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
