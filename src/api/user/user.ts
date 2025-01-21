import apiHandler from '../api'
import { LoginDataT } from '~/container/Login/store/types'
import { LoginReqT, LoginResT, UserInfoResT } from './types'
import {
    mentorSignUpURL,
    memberSignUpURL,
    loginURL,
    userInfoURL,
} from './api_url'
import { useQuery } from '@tanstack/react-query'

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

export const callLogin = (data: LoginDataT) => {
    return apiHandler<LoginReqT, LoginResT>({
        url: loginURL,
        method: 'post',
        data,
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
