import { http, HttpResponse } from 'msw'
import { loginURL, memberSignUpURL, mentorSignUpURL } from '~/api/user/user'
import {
    LoginReq,
    LoginRes,
    MemberSignUpReq,
    MemberSignUpRes,
    MentorSignUpReq,
    MentorSignUpRes,
} from '~/api/user/types'

export const login = [
    http.post<LoginReq, LoginRes>(loginURL, () => {
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
    http.post<MemberSignUpReq, MemberSignUpRes>(memberSignUpURL, () => {
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
    http.post<MentorSignUpReq, MentorSignUpRes>(mentorSignUpURL, () => {
        return HttpResponse.json({})
    }),
]
