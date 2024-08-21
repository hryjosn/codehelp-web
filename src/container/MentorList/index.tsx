'use client'
import Link from 'next/link'
import { Button } from '~/components/Button/Button'
import { Header } from '~/components/Header/Header'
import { MentorCard } from '~/components/mentor/MentorCard/MentorCard'
import { MOCK_MENTOR_LIST } from '~/container/MentorList/constant'

const MentorList = () => {
    const login = () => {
        console.log('Login')
    }
    const logout = () => {
        console.log('Logout')
    }
    const signUp = () => {
        console.log('signUp')
    }
    return (
        <div>
            <Header login={login} logout={logout} signUp={signUp} />
            <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {MOCK_MENTOR_LIST.map((mentor) => (
                    <Link
                        key={mentor.id}
                        href={`/mentor-profile/${mentor.slug}`}
                    >
                        <MentorCard mentor={mentor} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MentorList
