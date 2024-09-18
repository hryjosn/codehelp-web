import apiHandler from './api'

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
