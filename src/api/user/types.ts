import { Experience } from '~/container/Home/components/MentorList/types'
import {
    MENTOR_DISCIPLINES,
    MENTOR_SKILLS,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

export interface User {
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
    url: string
    primaryExpertise: string
    secondaryExpertise: string
    tertiaryExpertise: string
    disciplines: MENTOR_DISCIPLINES[]
    skills: MENTOR_SKILLS[]
    tools: MENTOR_TOOLS[]
    createdAt: string
    updatedAt: string
    quickReply: boolean
    experience: Experience[]
    education: string
}

export interface LoginReqT {
    email: string
    password: string
}

export interface LoginResT {
    data: {
        status: string
        msg: string
        identity: string
        token: string
        user: User
    }
}

export interface MemberSignUpT {
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

export interface MemberSignUpReqT {}

export interface MemberSignUpResT {
    newMember: MemberSignUpT
    status: string
    message: string
    token: string
}

export interface MentorSignUpT {}

export interface MentorSignUpReqT {}

export interface MentorSignUpResT {
    data: MentorSignUpT
}
export interface UserInfoReqT {}
export interface UserInfoResT {
    status: string
    msg: string
    identity: string
    token: string
    user: User
}

export interface BookingInfoReqT {}
export interface BookingTime {
    id: string
    host: string
    memberList: string[]
    startAt: string
    duration: string
    topic: string
    question: string
    pictureList: string[]
    createdAt: string
    updatedAt: string
}
export interface BookingInfoResT {
    status: string
    msg: string
    bookingTime: BookingTime[]
}
