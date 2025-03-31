import { IAvailableTime } from '~/api/mentor/types'

export interface Props {
    mentorId: string
    selectedDate: Date
    selectedTime: string
    isOpen: boolean
    onClose: () => void
}

export interface IBookingProps {
    mentorId: string
    availableTimes: IAvailableTime[]
}
