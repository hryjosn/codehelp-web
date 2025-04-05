'use client'
import MentorPage from '../MentorPage/MentorPage'
import MemberPage from '../MemberPage/MemberPage'
import { useGetUserInfo } from '~/api/user/user'

const UserProfileSection = () => {
    const { data: userData } = useGetUserInfo()
    return (
        <>
            {userData && (
                <>
                    {userData.identity === 'mentor' ? (
                        <MentorPage userData={userData.user} />
                    ) : (
                        <MemberPage userData={userData.user} />
                    )}
                </>
            )}
        </>
    )
}

export default UserProfileSection
