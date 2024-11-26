import apiHandler from '../api'
import { LoginDataT } from '~/container/Login/store/types'
import { LoginReqT, LoginResT } from './types'
import { baseURL } from '../api'

export const mentorSignUpURL = `${baseURL}mentor/signUp`
export const callMentorSignUp = (data: any) => {
    return apiHandler({
        url: mentorSignUpURL,
        method: 'post',
        data,
    })
}

export const memberSignUpURL = `${baseURL}member/signUp`
export const callMemberSignUp = (data: any) => {
    return apiHandler({
        url: memberSignUpURL,
        method: 'post',
        data,
    })
}

export const loginURL = `${baseURL}login`
export const callLogin = (data: LoginDataT) => {
    return apiHandler<LoginReqT, LoginResT>({
        url: loginURL,
        method: 'post',
        data,
    })
}
