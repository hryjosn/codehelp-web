import Experience from '~/components/mentor/Experience'
import { AppointmentT } from '~/container/Appointment/store/types'
import {
    MENTOR_SKILLS,
    MENTOR_DISCIPLINES,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'
import { Days } from '~/container/MentorProfile/components/Booking/types'

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
    quickReply: boolean
    education: string
    createdAt: string
    updatedAt: string
    mentorDisciplines: MentorDiscipline[]
    mentorSkills: MentorSkill[]
    mentorTools: MentorTool[]
    mentorAvailableTimes: MentorAvailableTimes[]
    mentorBookedTimes: MentorBookedTimes[]
}

export interface MentorDiscipline {
    id: string
    mentorId: string
    discipline: MENTOR_DISCIPLINES
    created_at: string
}

export interface MentorTool {
    id: string
    mentorId: string
    tool: MENTOR_TOOLS
    created_at: string
}

export interface MentorSkill {
    id: string
    mentorId: string
    skill: MENTOR_SKILLS
    created_at: string
}

export interface GetMentorInfoHandlerResT {
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

export interface UpdateMentorInfoParams {
    userName: string
    gender: string
    country: string
    title: string
    company: string
    introduction: string
    phoneNumber: string
    level: number
    linkedInURL: string
    primaryExpertise: string
    secondaryExpertise: string
    tertiaryExpertise: string
    education: string
    quickReply: boolean
}

export interface UpdateMentorDisciplinesParams {
    disciplines: string[]
}
export interface UpdateMentorSkillsParams {
    skills: string[]
}
export interface UpdateMentorToolsParams {
    tools: string[]
}

export interface MentorAvailableTimes {
    id: string
    mentorId: string
    day: keyof typeof Days
    timeCode: number[]
}
export interface MentorBookedTimes {
    id: string
    mentorId: string
    day: keyof typeof Days
    timeCode: number[]
}
