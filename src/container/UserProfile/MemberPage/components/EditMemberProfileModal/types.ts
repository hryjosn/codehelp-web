import { MemberProfileData } from '~/container/UserProfile/MemberPage/types'

export interface Props {
    profileData: MemberProfileData
    onSave: (data: MemberProfileData) => void
}
