import { MentorProfileData } from '../../types'

export interface Props {
    profileData: MentorProfileData
    onSave: (data: MentorProfileData) => void
}
