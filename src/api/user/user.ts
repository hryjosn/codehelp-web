import apiHandler from '../api'
import { LoginDataT } from '~/container/Login/store/types'
import { LoginReqT, LoginResT } from './types'
import { mentorSignUpURL, memberSignUpURL, loginURL } from './api_url'
import { useMutation } from '@tanstack/react-query'

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
