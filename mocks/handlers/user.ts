import { http, HttpResponse } from 'msw'
import { loginURL, memberSignUpURL, mentorSignUpURL } from '~/api/user/user'
import {
    LoginReq,
    LoginRes,
    MemberSignUpReq,
    MemberSignUpRes,
    MentorSignUpReq,
    MentorSignUpRes,
} from '~/api/user/types'

export const login = [
    http.post<LoginReq, LoginRes>(loginURL, () => {
        return HttpResponse.json({
            message: '',
            token: '',
        })
    }),
]

export const memberSignUp = [
    http.post<MemberSignUpReq, MemberSignUpRes>(memberSignUpURL, () => {
        return HttpResponse.json({
            // message: '',
            // token: '',
        })
    }),
]

export const mentorSignUp = [
    http.post<MentorSignUpReq, MentorSignUpRes>(mentorSignUpURL, () => {
        return HttpResponse.json({
            // message: '',
            // token: '',
        })
    }),
]
