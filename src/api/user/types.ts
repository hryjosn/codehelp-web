import { RESPONSE_CODE } from '~/container/Login/store/types'

export interface Login {
    id: string
    userName: string
    email: string
    avatar: string
    gender: string
    country: string
    title: string
    company: string
    phoneNumber: string
    emailOtp: boolean
    introduction: string
    level: number
    fieldOfWork: string[]
    createdAt: string
    updatedAt: string
}

export interface LoginReq {
    email: string
    password: string
}

export interface LoginRes {
    data: Login
}

export interface MemberSignUp {
    userName: string
    email: string
    avatar: string
    gender: string
    country: string
    title: string
    company: string
    phoneNumber: string
    introduction: string
    level: number
    fieldOfWork: string[]
    id: string
    emailOtp: boolean
    createdAt: string
    updatedAt: string
}

export interface MemberSignUpReq {}

export interface MemberSignUpRes {
    data: MemberSignUp
}

export interface MentorSignUp {}

export interface MentorSignUpReq {}

export interface MentorSignUpRes {
    data: MentorSignUp
}
