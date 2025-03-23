'use client'

import { createContext, useContext } from 'react'
import { useBookingStore } from '~/container/MentorProfile/components/Booking/BookingStore/BookingStore'
import { useSignUpStore } from '~/container/SignUp/store/SignUpStore'
import { Props, RootStore } from './types'

const RootStoreContext = createContext<RootStore | undefined>(undefined)

export const RootStoreProvider = ({ children }: Props) => {
    const bookingStore = useBookingStore()
    const signUpStore = useSignUpStore()

    const rootStore: RootStore = { bookingStore, signUpStore }

    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    )
}

export const useStore = () => {
    const store = useContext(RootStoreContext)
    if (!store) {
        throw new Error('useStore must be used within a RootStoreProvider')
    }
    return store
}
