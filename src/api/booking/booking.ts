import { useMutation, useQuery } from '@tanstack/react-query'
import apiHandler from '../api'
import { INewBookingReq, INewBookingRes } from './types'
import { getBookingInfoEndPoint, generateNewBookingEndPoint } from './api_url'

export const useNewBooking = () => {
    return useMutation({
        mutationKey: ['newBooking'],
        mutationFn: async ({ mentorId, bookingData }: INewBookingReq) => {
            const res = await apiHandler<INewBookingRes>({
                url: generateNewBookingEndPoint(mentorId),
                data: bookingData,
            })

            return res.data.booking
        },
    })
}

export const useGetBookingInfo = () => {
    return useQuery({
        queryKey: ['bookingInfo'],
        queryFn: async () => {
            const res = await apiHandler({
                url: getBookingInfoEndPoint,
                method: 'get',
            })
            return res.data
        },
    })
}
