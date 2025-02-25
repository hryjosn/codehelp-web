import { useMutation, useQuery } from '@tanstack/react-query'
import { LoginDataT } from '~/container/Login/store/types'
import apiHandler from '../api'
import {
    loginURL,
    memberSignUpURL,
    mentorSignUpURL,
    userInfoURL,
} from './api_url'
import { LoginReqT, LoginResT, UserInfoResT } from './types'

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
                url: '/api/user/get-user-info',
                method: 'get',
            })
            // const res = await fetch('/api/user/get-user-info', {
            //     method: 'GET',
            //     headers: { 'Content-Type': 'application/json' },
            // })
            return res.data
        },
    })
}
