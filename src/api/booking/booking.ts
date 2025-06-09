import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BookingRecordRes, NewBookingParams } from './types'

export const useGetBookingRecordList = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['bookingRecordList'],
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const pageSize = 10
            const {
                data: { total, bookingRecords },
            } = await axios.get(`/api/booking/recordList`, {
                params: { page: pageParam, count: pageSize },
            })

            return { bookingRecords, total, pageParam, pageSize }
        },
        getNextPageParam: (res) => {
            if (res.pageParam * res.pageSize < res.total) {
                return res.pageParam + 1
            }
            return undefined
        },
    })
}

export const useGetBookingRecord = (bookingId: string) => {
    return useQuery({
        queryKey: ['bookingRecord', bookingId],
        queryFn: async (): Promise<BookingRecordRes> => {
            const res = await axios.get(`/api/booking/record/${bookingId}`)
            return res.data.bookingRecord
        },
    })
}

export const useNewBooking = () => {
    return useMutation({
        mutationFn: async ({ data, mentorId }: NewBookingParams) => {
            return await axios.post(`/api/booking/new/${mentorId}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        },
    })
}
