import apiHandler from './api'
import { LoginDataT } from '~/container/Login/store/types'

export const callMentorSignUp = (data: any) => {
    return apiHandler({
        url: '/mentor/signUp',
        method: 'post',
        data,
    })
}
export const callMemberSignUp = (data: any) => {
    return apiHandler({
        url: '/member/signUp',
        method: 'post',
        data,
    })
}

export const callLogin = (data: LoginDataT) => {
    return apiHandler({
        url: '/login',
        method: 'post',
        data,
    })
}
