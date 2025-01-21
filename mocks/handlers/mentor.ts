import { http, HttpResponse } from 'msw'
import { getMentorInfoURL, saveScheduleURL } from '~/api/mentor/api_url'
import {
    GetMentorInfoReqT,
    GetMentorInfoResT,
    ScheduleReqT,
    ScheduleResT,
} from '~/api/mentor/types'

export const getMentorInfo = [
    http.get<GetMentorInfoReqT, GetMentorInfoResT>(
        getMentorInfoURL('fakeId'),
        () => {
            return HttpResponse.json({
                status: 'ok',
                mentor: {
                    id: '0415338d-95be-4977-8b2a-74029e64ca25',
                    userName: 'justTest',
                    email: 'test007@gmail.com',
                    avatar: 'https://codehelp-backend-production.up.railway.app/image/f6a9ab3c-165d-4dae-b102-8501aadcb8c9',
                    gender: 'm',
                    country: 'AZ',
                    title: 'test007',
                    company: 'test007',
                    phoneNumber: '+1 555 555 5555     ',
                    emailOtp: false,
                    introduction: 'test007test007',
                    level: 1,
                    url: 'https://www.linkedin.com/in/%E9%84%AD%E6%98%8E%E5%80%AB-%E6%B5%B7%E4%BA%8B%E8%B3%87%E8%A8%8A%E7%A7%91%E6%8A%80%E7%B3%BB-4baaba316/',
                    primaryExpertise: 'Frontend Development',
                    secondaryExpertise: 'Fullstack Development',
                    tertiaryExpertise: 'Mobile Development',
                    disciplines: [
                        'Business Administration',
                        'Design',
                        'Economics',
                    ],
                    skills: ['PHP', 'ASP.NET'],
                    tools: ['GraphQL', 'Spring', 'Django'],
                    createdAt: '2024-11-05T07:37:10.922Z',
                    updatedAt: '2024-11-05T07:37:10.922Z',
                    quickReply: false,
                },
            })
        }
    ),
]

export const saveSchedule = [
    http.post<any, ScheduleResT>(saveScheduleURL, () => {
        return HttpResponse.json({
            message: 'Save successfully',
            status: 'ok',
        })
    }),
]

export const mentorHandlers = [...getMentorInfo, ...saveSchedule]
