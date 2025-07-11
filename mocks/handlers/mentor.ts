import { http, HttpResponse } from 'msw'
import { saveAppointmentURL } from '~/api/mentor/route'
import {
    AppointmentParam,
    AppointmentReq,
    AppointmentRes,
} from '~/api/mentor/types'

export const getMentorInfo = [
    http.get('/api/mentor/info/:mentorId', () => {
        return HttpResponse.json({
            status: 'ok',
            mentor: {
                id: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                userName: 'testMentor2',
                email: 'testmentor2@gmail.com',
                avatar: 'https://codehelp-backend-production.up.railway.app/image/07ec0043-7a27-4db6-8215-585327dbfe8e',
                gender: 'f',
                country: 'AG',
                title: 'Professional Title',
                company: 'companjhy',
                phoneNumber: '+886989999554',
                emailOtp: false,
                introduction: 'hello, my name is testmentor2 teacher!!!',
                level: 1,
                url: 'https://linked.com',
                primaryExpertise: 'Fullstack Development',
                secondaryExpertise: 'Mobile Development',
                tertiaryExpertise: 'Artificial Intelligence',
                created_at: '2025-03-15T01:09:40.674Z',
                updated_at: '2025-05-29T07:39:18.199Z',
                quickReply: false,
                experience: [],
                education: '1',
                mentorDisciplines: [
                    {
                        id: '619aaf8a-6414-41db-a5ca-103b2701d614',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Law',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                    {
                        id: '08f12087-717a-4a74-86f6-6c001934dc16',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Engineering',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                    {
                        id: '55754015-766c-4041-b912-7cd041e7effe',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Biology',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                    {
                        id: '619aaf8a-6414-41db-a5ca-103b2701d614y',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Law',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                    {
                        id: '08f12087-717a-4a74-86f6-6c001934dc16u',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Engineering',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                    {
                        id: '55754015-766c-4041-b912-7cd041e7effet',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        discipline: 'Biology',
                        created_at: '2025-05-23T03:27:49.012Z',
                    },
                ],
                mentorTools: [
                    {
                        id: '6d7c1755-74e2-44e2-aadf-334519519709',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        tool: 'HTML',
                        created_at: '2025-05-17T07:56:52.751Z',
                    },
                    {
                        id: '487cc730-a96e-481a-9d32-b7f479792fdc',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        tool: 'MEAN Stack',
                        created_at: '2025-05-17T07:56:52.751Z',
                    },
                ],
                mentorSkills: [
                    {
                        id: '8760183a-ccaa-4476-9d35-d0efd8280380',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        skill: 'Spring',
                        created_at: '2025-05-17T07:33:21.848Z',
                    },
                    {
                        id: '76a2fc21-0b76-4a26-a8c0-7d233bf644c6',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        skill: 'Django',
                        created_at: '2025-05-17T07:33:21.848Z',
                    },
                ],
                mentorAvailableTimes: [
                    {
                        id: '86c33fe0-8865-4718-895f-c776120f303c',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'MON',
                        timeCode: [1, 2, 3, 4, 5],
                    },
                    {
                        id: 'b2f9cb74-77f8-485d-8081-f9b3f2ea5872',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'TUE',
                        timeCode: [1, 2, 3],
                    },
                    {
                        id: 'f9278ad1-f953-4a59-92ba-da19e2c3f4de',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'WED',
                        timeCode: [1, 2, 3, 6, 12, 15],
                    },
                    {
                        id: 'fc4a0753-e220-4508-8b2a-33e979cc20c9',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'THU',
                        timeCode: [17, 18, 19, 20, 21, 25, 26, 30],
                    },
                    {
                        id: '1d4b721f-da5f-4ac3-a84b-5734d27ffb99',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'FRI',
                        timeCode: [11, 12, 13, 14],
                    },
                    {
                        id: 'b3bbab8f-65db-429e-a155-edc6d7d70f13',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'SAT',
                        timeCode: [],
                    },
                    {
                        id: '167b43ac-b7e4-4b8e-bfd9-548367b47559',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'SUN',
                        timeCode: [1, 2, 3, 4],
                    },
                ],
                mentorBookedTimes: [
                    {
                        id: '86c33fe0',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'MON',
                        timeCode: [4, 5],
                    },
                    {
                        id: 'b2f9cb74',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'TUE',
                        timeCode: [3],
                    },
                    {
                        id: 'f9278ad1',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'WED',
                        timeCode: [],
                    },
                    {
                        id: 'fc4a0753',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'THU',
                        timeCode: [18, 19, 20, 21],
                    },
                    {
                        id: '1d4b721f',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'FRI',
                        timeCode: [13, 14],
                    },
                    {
                        id: 'b3bbab8f',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'SAT',
                        timeCode: [],
                    },
                    {
                        id: '167b43ac',
                        mentorId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
                        day: 'SUN',
                        timeCode: [1, 2, 3],
                    },
                ],
            },
        })
    }),
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
