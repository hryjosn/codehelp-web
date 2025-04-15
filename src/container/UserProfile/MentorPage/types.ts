import { Experience } from '~/container/Home/components/MentorList/types'
import { GenderCode } from '../types'
export interface Discipline {
    id: string
    mentorId: string
    discipline: string
    created_at: string
}

export interface Tool {
    id: string
    mentorId: string
    tool: string
    created_at: string
}

export interface Skill {
    id: string
    mentorId: string
    skill: string
    created_at: string
}

export interface Props {
    userData: {
        id: string
        userName: string
        email: string
        avatar: string
        gender: GenderCode
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
        mentorDisciplines: Discipline[]
        mentorSkills: Skill[]
        mentorTools: Tool[]
        created_at: string
        updated_at: string
        quickReply: boolean
        experience: Experience[]
        education: string
        mentorAvailableTimes: []
    }
}

export interface AdjustMinuteToHour {
    minute: number
    t: Function
}
