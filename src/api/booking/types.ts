export interface BookingRecordRes {
    id: string
    hostId: string
    topic: string
    question: string
    picture: any[]
    bookingStatus: number
    bookingAt: Date
    duration: number
    createdAt: string
    memberList: MemberList[]
}

export interface MemberList {
    id: string
    bookingId: string
    memberId: string
    member: Member
}

export interface Member {
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
    fieldOfWork: string[]
    created_at: string
    updated_at: string
}
