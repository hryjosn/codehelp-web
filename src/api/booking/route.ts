import { baseURL } from '../api'

export const getBookingRecordListURL = `${baseURL}/booking/records`

export const getBookingRecordURL = (recordId: string) =>
    `${baseURL}/booking/record/${recordId}`
