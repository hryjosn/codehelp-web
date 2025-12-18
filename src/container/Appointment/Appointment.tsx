import { callGetUserInfoHandler } from '~/api/user/userAPI'
import AppointmentSection from './components/AppointmentSection/AppointmentSection'
import { USER_IDENTITY } from '~/api/user/types'

export default async function AppointmentPage() {
    const userData = await callGetUserInfoHandler()

    return (
        <AppointmentSection
            mentorAvailableTimes={
                userData.identity === USER_IDENTITY.MENTOR
                    ? (userData.user?.mentorAvailableTimes ?? [])
                    : []
            }
        />
    )
}
