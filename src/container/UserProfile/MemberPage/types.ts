import { GenderCode } from '../types'

export interface Props {
    userData: {
        userName: string
        email: string
        avatar: string
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
}
