import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LoginDataT } from '~/container/Login/store/types'
import apiHandler from '../api'
import {
    bookingInfoURL,
    loginURL,
    memberSignUpURL,
    mentorSignUpURL,
} from './route'
import { BookingInfoResT, LoginReqT, LoginResT } from './types'

export const useMentorSignUp = () => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            return await axios.post('/api/mentor/signUp', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        },
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
            return await axios.get('/api/user/getUserInfo')
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
