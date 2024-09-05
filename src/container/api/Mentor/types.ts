export interface IMentor {
    avatar: string
    company: string
    country: string
    createdAt: string
    disciplines: string[]
    email: string
    emailOtp: boolean
    gender: string
    id: string
    introduction: string
    level: number
    phoneNumber: string
    primaryExpertise: string
    secondaryExpertise?: string
    skills: string[]
    tertiaryExpertise?: string
    title: string
    tools: string[]
    updatedAt: string
    url: string
    userName: string
    totalSessions: number
    totalReviews: number
}

export interface IGetMentorLists {
    data: {
        status: string
        mentorList: IMentor[]
        total: number
    }
    pageParam: number
}

export interface IGetMentorInfo {
    status: string
    mentor: IMentor
}
