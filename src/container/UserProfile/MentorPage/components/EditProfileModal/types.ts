import { UserProfileData } from '../../types'

export interface Props {
    profileData: UserProfileData
    onSave: (data: UserProfileData) => void
}
