import { GenderCode } from '../types'

export interface Props {
    userData: MemberProfileData
}

export interface MemberProfileData {
    userName: string
    email: string
    avatar: string | File
    gender: GenderCode
    country: string
    title: string
    company: string
    phoneNumber: string
    introduction: string
    level: number
    fieldOfWork: string[]
    id: string
    emailOtp: boolean
    created_at: string
    updated_at: string
}
