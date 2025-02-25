'use client'
import { FC, useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { NavButton } from '../NavButton/NavButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Header: FC = () => {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const { data } = await axios.get('/api/auth/store-token')
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
            await axios.delete('/api/auth/store-token')
            setToken(null)
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }
    return (
        <div className="g-white flex items-center justify-between border-b border-gray-100 px-6 py-2 shadow-md">
            <Link className="rounded-lg border px-3 py-2" href="/">
                <p>Code Help Icon</p>
            </Link>
            {token ? (
                <div>
                    <Button
                        onClick={Logout}
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
export default Header
