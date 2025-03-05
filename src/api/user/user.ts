import { useMutation, useQuery } from '@tanstack/react-query'
import { LoginDataT } from '~/container/Login/store/types'
import apiHandler from '../api'
import {
    bookingInfoURL,
    loginURL,
    memberSignUpURL,
    mentorSignUpURL,
    userInfoURL,
} from './api_url'
import { BookingInfoResT, LoginReqT, LoginResT, UserInfoResT } from './types'

export const callMentorSignUp = (data: any) => {
    return apiHandler({
        url: mentorSignUpURL,
        method: 'post',
        data,
    })
}

export const callMemberSignUp = (data: any) => {
    return apiHandler({
        url: memberSignUpURL,
        method: 'post',
        data,
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginDataT) => {
            const res = await apiHandler<LoginReqT, LoginResT>({
                url: loginURL,
                method: 'post',
                data,
            })
            return res
        },
    })
}

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await apiHandler<UserInfoResT>({
                url: userInfoURL,
                method: 'get',
            })
            return res.data
        },
    })
}
export const useGetBookingInfo = () => {
    return useQuery({
        queryKey: ['bookingInfo'],
        queryFn: async () => {
            const res = await apiHandler<BookingInfoResT>({
                url: bookingInfoURL,
                method: 'get',
            })
            return res.data
        },
    })
}
