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
