import { callGetUserInfoHandler } from '~/api/user/userAPI'
import MentorPage from './MentorPage/MentorPage'
import MemberPage from './MemberPage/MemberPage'
import { USER_IDENTITY } from '~/api/user/types'

const UserProfile = async () => {
    const userData = await callGetUserInfoHandler()

    return (
        <>
            {userData && (
                <>
                    {userData.identity === USER_IDENTITY.MENTOR ? (
                        <MentorPage userData={userData.user} />
                    ) : (
                        <MemberPage userData={userData.user} />
                    )}
                </>
            )}
        </>
    )
}

export default UserProfile
