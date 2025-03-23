import { ReactNode } from 'react'
import { BookingStore } from '~/container/MentorProfile/components/Booking/BookingStore/BookingStore'
import { SignUpStore } from '~/container/SignUp/store/SignUpStore'
export interface Props {
    children: ReactNode
}

export interface RootStore {
    bookingStore: BookingStore
    signUpStore: SignUpStore
}
