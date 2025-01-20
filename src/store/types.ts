import { ReactNode } from 'react'
import { BookingStore } from '~/container/MentorProfile/components/Booking/BookingStore/types'

export interface Props {
    children: ReactNode
}

export interface RootStoreAPI {
    bookingStore: BookingStore
}
