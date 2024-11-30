export interface MemberT {
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
    createdAt: string
    updatedAt: string
}

export interface LoginReqT {
    email: string
    password: string
}

export interface LoginResT {
    data: {
        msg: string
        token: string
        member: MemberT
        status: string
    }
}

export interface MemberSignUpT {
    userName: string
    email: string
    avatar: string
    gender: string
    country: string
    title: string
    company: string
    phoneNumber: string
    introduction: string
    level: number
    fieldOfWork: string[]
    id: string
    emailOtp: boolean
    createdAt: string
    updatedAt: string
}

export interface MemberSignUpReqT {}

export interface MemberSignUpResT {
    newMember: MemberSignUpT
    status: string
    message: string
    token: string
}

export interface MentorSignUpT {}

export interface MentorSignUpReqT {}

export interface MentorSignUpResT {
    data: MentorSignUpT
}
