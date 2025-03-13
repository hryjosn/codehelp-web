import { http, HttpResponse } from 'msw'
import { getMentorInfoURL, saveAppointmentURL } from '~/api/mentor/route'
import {
    AppointmentParam,
    AppointmentReq,
    AppointmentRes,
    GetMentorInfoReqT,
    GetMentorInfoResT,
} from '~/api/mentor/types'
import {
    MENTOR_DISCIPLINES,
    MENTOR_SKILLS,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

export const getMentorInfo = [
    http.get<GetMentorInfoReqT, GetMentorInfoResT>(
        getMentorInfoURL('fakeId'),
        () => {
            return HttpResponse.json({
                status: 'ok',
                mentor: {
                    id: '90548928-d41d-4908-ae78-59fa0d5d13a2',
                    userName: 'testMentor17',
                    email: 'testmentor17@gmail.com',
                    avatar: 'https://codehelp-backend-production.up.railway.app/image/e7bcdf39-4ece-41d8-b572-b0526ae86c02',
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
                    created_at: '2025-03-13T06:33:48.121Z',
                    updated_at: '2025-03-13T06:33:48.121Z',
                    quickReply: false,
                    experience: [],
                    education: 'education',
                    mentorDisciplines: [
                        {
                            id: '10f738ff-a4f5-47be-98b8-91a13e0bd2df',
                            mentorId: '90548928-d41d-4908-ae78-59fa0d5d13a2',
                            discipline: 'Business Administration',
                            created_at: '2025-03-13T06:33:48.291Z',
                        },
                    ],
                    mentorTools: [
                        {
                            id: '8c4c0841-18a2-4137-bedc-6b7bf9b23cc3',
                            mentorId: '90548928-d41d-4908-ae78-59fa0d5d13a2',
                            tool: 'GraphQL',
                            created_at: '2025-03-13T06:33:48.473Z',
                        },
                    ],
                    mentorSkills: [
                        {
                            id: '9a317939-6645-48dd-a14f-9b130b2b05e1',
                            mentorId: '90548928-d41d-4908-ae78-59fa0d5d13a2',
                            skill: 'PHP',
                            created_at: '2025-03-13T06:33:48.367Z',
                        },
                    ],
                    mentorAvailableTimes: [],
                },
            })
        }
    ),
]

export const saveAppointment = [
    http.post<AppointmentParam, AppointmentReq, AppointmentRes>(
        saveAppointmentURL,
        () => {
            return HttpResponse.json({
                message: 'Save successfully',
                status: 'ok',
            })
        }
    ),
]

export const mentorHandlers = [...getMentorInfo, ...saveAppointment]
