import { Appointment } from '~/container/Appointment/store/types'

export interface MentorT {
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
    disciplines: string[]
    skills: string[]
    tools: string[]
    createdAt: string
    updatedAt: string
    quickReply: boolean
}

export interface GetMentorInfoReqT {}

export interface GetMentorInfoResT {
    status: string
    mentor: MentorT
}
export interface AppointmentParam {}

export interface AppointmentReq {
    data: Appointment[]
}

export interface AppointmentRes {
    message: string
    status: string
}
export interface AppointmentResWrapData {
    data: { message: string; status: string }
}
