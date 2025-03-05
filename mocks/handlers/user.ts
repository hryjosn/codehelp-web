import { http, HttpResponse } from 'msw'
import {
    bookingInfoURL,
    loginURL,
    memberSignUpURL,
    mentorSignUpURL,
    mentorInfoURL,
} from '~/api/user/api_url'
import {
    BookingInfoReqT,
    BookingInfoResT,
    LoginReqT,
    LoginResT,
    MemberSignUpReqT,
    MemberSignUpResT,
    MentorSignUpReqT,
    MentorSignUpResT,
    UserInfoReqT,
    UserInfoResT,
} from '~/api/user/types'
import {
    MENTOR_SKILLS,
    MENTOR_DISCIPLINES,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

export const login = [
    http.post<LoginReqT, LoginResT>(loginURL, () => {
        return HttpResponse.json({
            status: 'member_login',
            msg: 'Login successful',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpZCI6IjdmMTdmNjQzLWM3OWEtNDJhOS04NDFjLWRkYzc3NWY3YTgwNyIsImlhdCI6MTczMjU0NDIyMCwiZXhwIjoxNzM1MTM2MjIwfQ.vYUkkCmFCFRz3YKtoF6bHEyRi4EPcCcNUUPxjV_yKfg',
            member: {
                id: '7f17f643-c79a-42a9-841c-ddc775f7a807',
                userName: 'test1',
                email: 'test1@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/89b927ba-9a39-4ec6-9679-10fee13d6e06',
                gender: 'm',
                country: 'AG',
                title: 'title',
                company: 'company',
                phoneNumber: '0909090000          ',
                emailOtp: false,
                introduction: 'hello',
                level: 1,
                fieldOfWork: ['work1'],
                createdAt: '2024-11-25T13:46:54.381Z',
                updatedAt: '2024-11-25T13:46:54.381Z',
            },
        })
    }),
]

export const memberSignUp = [
    http.post<MemberSignUpReqT, MemberSignUpResT>(memberSignUpURL, () => {
        return HttpResponse.json({
            newMember: {
                userName: 'test1',
                email: 'test1@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/89b927ba-9a39-4ec6-9679-10fee13d6e06',
                gender: 'm',
                country: 'AG',
                title: 'title',
                company: 'company',
                phoneNumber: '0909090000',
                introduction: 'hello',
                level: 1,
                fieldOfWork: ['work1'],
                id: '7f17f643-c79a-42a9-841c-ddc775f7a807',
                emailOtp: false,
                createdAt: '2024-11-25T13:46:54.381Z',
                updatedAt: '2024-11-25T13:46:54.381Z',
            },
            status: 'ok',
            message: 'test1 sign up successful!',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpZCI6IjdmMTdmNjQzLWM3OWEtNDJhOS04NDFjLWRkYzc3NWY3YTgwNyIsImlhdCI6MTczMjU0MjQxNCwiZXhwIjoxNzM1MTM0NDE0fQ.Y59lYvRWbkdBEMyqHXWaL9AUzGBl60MTOexjsF5tQRw',
        })
    }),
]

export const mentorSignUp = [
    http.post<MentorSignUpReqT, MentorSignUpResT>(mentorSignUpURL, () => {
        return HttpResponse.json({})
    }),
]
export const getUserInfo = [
    http.get<UserInfoReqT, UserInfoResT>(mentorInfoURL, () => {
        return HttpResponse.json({
            status: 'user_login',
            msg: 'Login successful',
            identity: 'mentor',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QwMDEiLCJlbWFpbCI6InRlc3QwMDFAZ21haWwuY29tIiwiaWQiOiI5Mzg3ODk1Ny1iYjA3LTQ4NzctYTJjYi03NGNlYjMyYTJmNDAiLCJpYXQiOjE3MzczNjYyMzUsImV4cCI6MTczOTk1ODIzNX0.mGkUaZRZjC6qbruTwYJ0_G0KWjKNHNpmJqDOf0UV1zM',
            user: {
                id: '93878957-bb07-4877-a2cb-74ceb32a2f40',
                userName: 'test001',
                email: 'test001@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                gender: 'm',
                country: 'AT',
                title: 'test001',
                company: 'test001',
                phoneNumber: '+1 555 555 5555     ',
                emailOtp: false,
                introduction: 'test001test001test001',
                level: 0,
                url: 'https://www.linkedin.com/in/%E9%84%AD%E6%98%8E%E5%80%AB-%E6%B5%B7%E4%BA%8B%E8%B3%87%E8%A8%8A%E7%A7%91%E6%8A%80%E7%B3%BB-4baaba316/',
                primaryExpertise: 'Backend Development',
                secondaryExpertise: 'Data Science',
                tertiaryExpertise: '',
                disciplines: [
                    MENTOR_DISCIPLINES.BIOLOGY,
                    MENTOR_DISCIPLINES.BUSINESS_ADMINISTRATION,
                ],
                skills: [MENTOR_SKILLS.ADOBE_PHOTOSHOP, MENTOR_SKILLS.ANGULAR],
                tools: [MENTOR_TOOLS.ADOBE_PHOTOSHOP],
                createdAt: '2024-11-05T09:22:49.379Z',
                updatedAt: '2024-11-05T09:22:49.379Z',
                quickReply: false,
                experience: [],
                education: '',
            },
        })
    }),
] //this needs to refactor
export const getBookingInfo = [
    http.get<BookingInfoReqT, BookingInfoResT>(bookingInfoURL, () => {
        return HttpResponse.json({
            status: 'ok',
            msg: 'Get booking info successful',
            bookingTime: [
                {
                    id: '1',
                    host: 'test002',
                    memberList: ['test001', 'test003', 'test004'],
                    startAt: '2025-02-18T09:22:49.379Z',
                    duration: '30',
                    topic: 'A topic',
                    question: 'A question',
                    pictureList: [
                        'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                    ],
                    createdAt: '2024-11-05T09:22:49.379Z',
                    updatedAt: '2024-11-05T09:22:49.379Z',
                },
                {
                    id: '2',
                    host: 'test002',
                    memberList: ['test001', 'test003', 'test004'],
                    startAt: '2025-02-18T09:22:49.379Z',
                    duration: '30',
                    topic: 'A topic',
                    question: 'A question',
                    pictureList: [
                        'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                    ],
                    createdAt: '2024-11-05T09:22:49.379Z',
                    updatedAt: '2024-11-05T09:22:49.379Z',
                },
                {
                    id: '4',
                    host: 'test002',
                    memberList: ['test001', 'test003', 'test004'],
                    startAt: '2025-02-19T09:22:49.379Z',
                    duration: '30',
                    topic: 'A topic',
                    question: 'A question',
                    pictureList: [
                        'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                    ],
                    createdAt: '2024-11-05T09:22:49.379Z',
                    updatedAt: '2024-11-05T09:22:49.379Z',
                },
                {
                    id: '5',
                    host: 'test002',
                    memberList: ['test001', 'test003', 'test004'],
                    startAt: '2025-02-18T09:22:49.379Z',
                    duration: '30',
                    topic: 'A topic',
                    question: 'A question',
                    pictureList: [
                        'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                    ],
                    createdAt: '2024-11-05T09:22:49.379Z',
                    updatedAt: '2024-11-05T09:22:49.379Z',
                },
                {
                    id: '7',
                    host: 'test002',
                    memberList: ['test001', 'test003', 'test004'],
                    startAt: '2025-02-20T09:22:49.379Z',
                    duration: '30',
                    topic: 'A topic',
                    question: 'A question',
                    pictureList: [
                        'https://codehelp-backend-production.up.railway.app/image/9ff9deca-4cce-486d-9010-6b8e36eb219e',
                    ],
                    createdAt: '2024-11-05T09:22:49.379Z',
                    updatedAt: '2024-11-05T09:22:49.379Z',
                },
            ],
        })
    }),
]

export const userHandlers = [
    ...login,
    ...memberSignUp,
    ...getUserInfo,
    ...getBookingInfo,
]
