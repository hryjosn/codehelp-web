export interface INewBookingReq {
    mentorId: string
    bookingData: INewBookingReqBody
}
export interface INewBookingRes {
    status: string
    booking: Booking
}

export interface Booking {
    host: IMentor
    topic: string
    question: string
    bookingAt: string
    duration: number
    picture: any[]
    hostId: string
    id: string
    bookingStatus: string
    createdAt: string
    members: IMember[]
}

export interface IMentor {
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
    created_at: string
    updated_at: string
    quickReply: boolean
    experience: string[]
    education: string
    mentorDisciplines: string[]
    mentorTools: string[]
    mentorSkills: string[]
    mentorAvailableTimes: IMentorAvailableTime[]
}

export interface IMentorAvailableTime {
    id: string
    mentorId: string
    day: string
    timeCode: number[]
}

export interface IMember {
    bookingId: string
    memberId: string
    id: string
}

export interface INewBookingReqBody {
    topic: string
    question: string
    picture: File[]
    bookingTime: Date
    duration: number
    members: string[]
}
