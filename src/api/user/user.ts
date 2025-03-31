import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LoginDataT } from '~/container/Login/store/types'
import apiHandler from '../api'
import {
    loginURL,
    memberSignUpURL,
    mentorSignUpURL,
    userInfoURL,
} from './route'

import { BookingInfoResT, LoginReqT, LoginResT } from './types'

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
            const res = await axios.get('/api/user/get-user-info')
            return res
        },
    })
}
