import type { Meta, StoryObj } from '@storybook/react'
import { MentorCard } from './MentorCard'
import { MentorT } from '~/api/mentor/types'
import {
    MENTOR_SKILLS,
    MENTOR_DISCIPLINES,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'

const MOCK_MENTOR_LIST: MentorT[] = [
    {
        id: 'b261f991-128b-4433-9f38-dad8111ed032',
        userName: 'testMentor001',
        email: 'testmentoraccount11@gmail.com',
        avatar: 'https://codehelp-backend-production.up.railway.app/image/5e261c0a-19da-4a6f-a494-1eb593c68cf3',
        gender: 'm',
        country: 'AG',
        title: 'title',
        company: 'company',
        phoneNumber: '0909090000',
        emailOtp: false,
        introduction: 'hello',
        level: 0,
        url: 'linked url',
        experience: [
            {
                title: 'First Experience Title',
                company: 'First Company',
                description: 'First Description',
            },
            {
                title: 'Second Experience Title',
                company: 'Second Company',
                description: 'Second Description',
            },
        ],
        primaryExpertise: 'Sleep',
        secondaryExpertise: '',
        tertiaryExpertise: '',
        mentorDisciplines: [
            {
                id: '123',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                discipline: MENTOR_DISCIPLINES.BIOLOGY,
                created_at: '2024-11-24T06:44:51.411Z',
            },
            {
                id: '1234',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                discipline: MENTOR_DISCIPLINES.BUSINESS_ADMINISTRATION,
                created_at: '2024-11-24T06:44:51.411Z',
            },
        ],
        mentorSkills: [
            {
                id: '1222',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                skill: MENTOR_SKILLS.ADOBE_PHOTOSHOP,
                created_at: '2024-11-24T06:44:51.411Z',
            },
            {
                id: '12343',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                skill: MENTOR_SKILLS.ANGULAR,
                created_at: '2024-11-24T06:44:51.411Z',
            },
        ],
        mentorTools: [
            {
                id: '123fds',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                tool: MENTOR_TOOLS.ADOBE_PHOTOSHOP,
                created_at: '2024-11-24T06:44:51.411Z',
            },
        ],
        createdAt: '2024-11-24T06:44:51.411Z',
        updatedAt: '2024-11-24T06:44:51.411Z',
        education: "海事資訊科技系$%$高雄科技大學'",
        mentorAvailableTimes: [
            {
                id: '86c33fe0-8865-4718-895f-c776120f303c',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'MON',
                timeCode: [1, 2, 3, 4, 5],
            },
            {
                id: 'b2f9cb74-77f8-485d-8081-f9b3f2ea5872',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'TUE',
                timeCode: [1, 2, 3],
            },
            {
                id: 'f9278ad1-f953-4a59-92ba-da19e2c3f4de',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'WED',
                timeCode: [1, 2, 3, 6, 12, 15],
            },
            {
                id: 'fc4a0753-e220-4508-8b2a-33e979cc20c9',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'THU',
                timeCode: [17, 18, 19, 20, 21, 25, 26, 30],
            },
            {
                id: '1d4b721f-da5f-4ac3-a84b-5734d27ffb99',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'FRI',
                timeCode: [11, 12, 13, 14],
            },
            {
                id: 'b3bbab8f-65db-429e-a155-edc6d7d70f13',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'SAT',
                timeCode: [],
            },
            {
                id: '167b43ac-b7e4-4b8e-bfd9-548367b47559',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'SUN',
                timeCode: [1, 2, 3, 4],
            },
        ],
        mentorBookedTimes: [
            {
                id: '86c33fe0',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'MON',
                timeCode: [4, 5],
            },
            {
                id: 'b2f9cb74',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'TUE',
                timeCode: [3],
            },
            {
                id: 'f9278ad1',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'WED',
                timeCode: [],
            },
            {
                id: 'fc4a0753',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'THU',
                timeCode: [18, 19, 20, 21],
            },
            {
                id: '1d4b721f',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'FRI',
                timeCode: [13, 14],
            },
            {
                id: 'b3bbab8f',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'SAT',
                timeCode: [],
            },
            {
                id: '167b43ac',
                mentorId: 'b261f991-128b-4433-9f38-dad8111ed032',
                day: 'SUN',
                timeCode: [1, 2, 3],
            },
        ],
        quickReply: false,
    },
]

const meta = {
    title: 'MentorProfile/Components/MentorCard',
    component: MentorCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { mentor: MOCK_MENTOR_LIST[0] },
} satisfies Meta<typeof MentorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { mentor: MOCK_MENTOR_LIST[0] },
}
