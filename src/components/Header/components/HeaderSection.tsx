'use client'
import { FC, useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { IoChatbubbleOutline } from 'react-icons/io5'
import Avatar from '~/components/Avatar/Avatar'
import { NavButton } from '~/components/NavButton/NavButton'
import { Link, useRouter } from '~/i18n/routing'

const HeaderSection: FC = () => {
    const { data: userData, status } = useSession()

    const [dropDown, setDropDown] = useState<null | HTMLElement>(null)
    const router = useRouter()

    const openDropDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDropDown(event.currentTarget)
    }
    const closeDropDown = () => {
        setDropDown(null)
    }

    const logout = async () => {
        try {
            signOut({ callbackUrl: '/' })
            await axios.delete('/api/auth/token')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="flex">
            {status === 'authenticated' ? (
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
                        logout()
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}
export default HeaderSection
