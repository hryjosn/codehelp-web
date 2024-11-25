import { RESPONSE_CODE } from '~/container/Login/store/types'

export interface Login {
    code?: RESPONSE_CODE
    message: string
    token: string
}

export interface LoginReq {
    email: string
    password: string
}

export interface LoginRes {
    data: Login
}

export interface MemberSignUp {}

export interface MemberSignUpReq {}

export interface MemberSignUpRes {
    data: MemberSignUp
}

export interface MentorSignUp {}

export interface MentorSignUpReq {}

export interface MentorSignUpRes {
    data: MentorSignUp
}
