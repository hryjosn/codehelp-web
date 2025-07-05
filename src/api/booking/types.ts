import { UserForMember } from '../user/types'

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
    member: UserForMember
}

export interface NewBookingParams {
    data: FormData
    mentorId: string
}
