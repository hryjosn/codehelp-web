import { ReactNode } from 'react'
import { BookingStore } from '~/container/MentorProfile/components/Booking/BookingStore/BookingStore'
import { SignUpStore } from '~/container/SignUp/store/SignUpStore'
import { VideoConferenceStore } from '~/container/VideoConference/store/VideoConferenceStore'
export interface Props {
    children: ReactNode
}

export interface RootStore {
    bookingStore: BookingStore
    signUpStore: SignUpStore
    videoConferenceStore: VideoConferenceStore
}
