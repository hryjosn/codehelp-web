import Experience from '~/components/mentor/Experience'
import { AppointmentT } from '~/container/Appointment/store/types'
import {
    MENTOR_SKILLS,
    MENTOR_DISCIPLINES,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

export interface IAvailableTime {
    id: string
    mentorId: string
    day: string
    timeCode: number[]
}

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
    experience: Experience[]
    mentorDisciplines: MENTOR_DISCIPLINES[]
    mentorSkills: MENTOR_SKILLS[]
    mentorTools: MENTOR_TOOLS[]
    education: string
    createdAt: string
    updatedAt: string
    mentorAvailableTimes: IAvailableTime[]
}

export interface GetMentorInfoReqT {}

export interface GetMentorInfoResT {
    status: string
    mentor: MentorT
}
export interface AppointmentParam {}

export interface AppointmentReq {
    data: AppointmentT[]
}

export interface AppointmentRes {
    message: string
    status: string
}
export interface AppointmentResWrapData {
    data: { message: string; status: string }
}

export interface MentorListResT {
    mentorList: MentorT[]
    status: string
    total: number
}
export interface MentorInfoResT {
    mentor: MentorT
    status: string
}
