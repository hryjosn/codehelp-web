import { Experience } from "../components/MentorList/types"

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
    education: string
    experience: Experience[]
    disciplines: string[]
    skills: string[]
    tools: string[]
    createdAt: string
    updatedAt: string
}
