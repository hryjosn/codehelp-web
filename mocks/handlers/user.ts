import { http, HttpResponse } from 'msw'
import {
    bookingInfoURL,
    loginURL,
    memberSignUpURL,
    mentorInfoURL,
    mentorSignUpURL,
} from '~/api/user/route'
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
    MENTOR_DISCIPLINES,
    MENTOR_SKILLS,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

export const login = [
    http.post<LoginReqT, LoginResT>(loginURL, () => {
        return HttpResponse.json({
            status: 'ok',
            msg: 'Login successful',
            identity: 'mentor',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RtZW50b3IxMyIsImVtYWlsIjoidGVzdG1lbnRvcjEzQGdtYWlsLmNvbSIsImlkIjoiZjAyOWMwMDUtYjdmZi00YzIwLWFiNzYtOWFmOWE2ODMzODVmIiwiaWF0IjoxNzQyNjUyNjMxLCJleHAiOjE3NDUyNDQ2MzF9.T-wdwawnLbpgyL50jMO5lZuYyle-9oIQjy5S1ZdHSTI',
            user: {
                id: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                userName: 'testmentor13',
                email: 'testmentor13@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/2f581b38-c020-4556-869a-d816307f0f67',
                gender: 'm',
                country: 'AW',
                title: 'dsadsa',
                company: 'dsadsa',
                phoneNumber: '+886 0909 909 990   ',
                emailOtp: false,
                introduction: 'dsada sad sad adad ad as ',
                level: 2,
                url: 'https://www.linkedin.com/in/',
                primaryExpertise: 'UI/UX Design',
                secondaryExpertise: 'Fullstack Development',
                tertiaryExpertise: '',
                created_at: '2025-03-22T13:53:46.280Z',
                updated_at: '2025-03-22T13:53:46.280Z',
                quickReply: false,
                experience: [],
                education: '0',
                mentorDisciplines: [
                    {
                        id: 'ac4a559c-ac99-4c44-814a-cce6453b2e7d',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        discipline: 'Law',
                        created_at: '2025-03-22T13:53:46.467Z',
                    },
                    {
                        id: 'f89b1895-8c11-4576-af76-509675f4ba46',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        discipline: 'Engineering',
                        created_at: '2025-03-22T13:53:46.467Z',
                    },
                ],
                mentorTools: [
                    {
                        id: '01f11b4d-a2ff-4504-8bf4-e6b6f7482a66',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        tool: 'Spring',
                        created_at: '2025-03-22T13:53:46.525Z',
                    },
                    {
                        id: 'f9256e1d-1b1c-46ef-9162-82449811bd18',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        tool: 'Django',
                        created_at: '2025-03-22T13:53:46.525Z',
                    },
                    {
                        id: '5420bf0f-0db8-4f3f-8c13-2247f987028a',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        tool: 'Flask',
                        created_at: '2025-03-22T13:53:46.525Z',
                    },
                ],
                mentorSkills: [
                    {
                        id: '9065f666-ff55-4573-ac93-23bac1590864',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        skill: 'Flask',
                        created_at: '2025-03-22T13:53:46.497Z',
                    },
                    {
                        id: 'ea16e735-166d-46c1-96b3-f9d2b0ad8017',
                        mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
                        skill: 'Node.js',
                        created_at: '2025-03-22T13:53:46.497Z',
                    },
                ],
                mentorAvailableTimes: [],
            },
        })
    }),
]

export const memberSignUp = [
    http.post<MemberSignUpReqT, MemberSignUpResT>('/api/member/signUp', () => {
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
    http.post<MentorSignUpReqT, MentorSignUpResT>('/api/mentor/signUp', () => {
        return HttpResponse.json({
            newMentor: {
                id: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                userName: 'testMentor2',
                email: 'testmentor2@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/d17b5b40-a243-426b-a946-8a697c211f30',
                gender: 'm',
                country: 'AG',
                title: 'title',
                company: 'company',
                phoneNumber: '0909090000          ',
                emailOtp: false,
                introduction: 'hello',
                level: 0,
                url: 'linked url',
                primaryExpertise: 'Sleep',
                secondaryExpertise: '',
                tertiaryExpertise: '',
                created_at: '2025-03-15T01:09:40.674Z',
                updated_at: '2025-03-15T01:09:40.674Z',
                quickReply: false,
                experience: [],
                education: 'Associate Degree',
                mentorDisciplines: [
                    {
                        id: '6c264fd2-0e9c-4c53-b1dc-07a63a55a2b9',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Business Administration',
                        created_at: '2025-03-15T01:09:40.761Z',
                    },
                ],
                mentorTools: [
                    {
                        id: '9cdff9e2-a794-4b45-bb05-0454bada390f',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        tool: 'GraphQL',
                        created_at: '2025-03-15T01:09:40.819Z',
                    },
                ],
                mentorSkills: [
                    {
                        id: 'ae71b324-42d9-4b16-851c-e82bc6f5864d',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        skill: 'PHP',
                        created_at: '2025-03-15T01:09:40.790Z',
                    },
                    {
                        id: 'e1d7d79f-2d29-4547-85aa-2bdd567ff5a2',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        skill: 'ASP.NET',
                        created_at: '2025-03-15T01:09:40.790Z',
                    },
                ],
                mentorAvailableTimes: [],
            },
            status: 'ok',
            message: 'testMentor2 sign up successful!',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RNZW50b3IyIiwiZW1haWwiOiJ0ZXN0bWVudG9yMkBnbWFpbC5jb20iLCJpZCI6IjBkNTMwNDJlLWYxNzktNDljZi1iYWQwLTk5NzdhZGYxNWE5ZSIsImlhdCI6MTc0MjAwMDk4MCwiZXhwIjoxNzQ0NTkyOTgwfQ.T7d-LvP3wfL2PBMwB4utDcBiSLZq5r6N_H_Cn8baLJI',
        })
    }),
]

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
                    startAt: '2025-03-01T09:22:49.379Z',
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
                    startAt: '2025-03-01T09:22:49.379Z',
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
                    startAt: '2025-03-02T09:22:49.379Z',
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
                    startAt: '2025-03-01T09:22:49.379Z',
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
                    startAt: '2025-03-03T09:22:49.379Z',
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
    ...getBookingInfo,
    ...mentorSignUp,
]
