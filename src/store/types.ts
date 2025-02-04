import { ReactNode } from 'react'
import { BookingStore } from '~/container/MentorProfile/components/Booking/BookingStore/BookingStore'

export interface Props {
    children: ReactNode
}

export interface RootStore {
    bookingStore: BookingStore
}
