import type { Meta, StoryObj } from '@storybook/react'
import MentorPage from './MentorPage'
import {
    MENTOR_DISCIPLINES,
    MENTOR_SKILLS,
    MENTOR_TOOLS,
} from '~/container/SignUp/store/types'
import { UserForMentor } from '~/api/user/types'

const mockMentorData: UserForMentor = {
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
            discipline: MENTOR_DISCIPLINES.BIOLOGY,
            created_at: '2025-03-22T13:53:46.467Z',
        },
        {
            id: 'f89b1895-8c11-4576-af76-509675f4ba46',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            discipline: MENTOR_DISCIPLINES.BUSINESS_ADMINISTRATION,
            created_at: '2025-03-22T13:53:46.467Z',
        },
    ],
    mentorTools: [
        {
            id: '01f11b4d-a2ff-4504-8bf4-e6b6f7482a66',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: MENTOR_TOOLS.ADOBE_ILLUSTRATOR,
            created_at: '2025-03-22T13:53:46.525Z',
        },
        {
            id: 'f9256e1d-1b1c-46ef-9162-82449811bd18',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: MENTOR_TOOLS.ADOBE_PHOTOSHOP,
            created_at: '2025-03-22T13:53:46.525Z',
        },
        {
            id: '5420bf0f-0db8-4f3f-8c13-2247f987028a',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: MENTOR_TOOLS.ANGULAR,
            created_at: '2025-03-22T13:53:46.525Z',
        },
    ],
    mentorSkills: [
        {
            id: '9065f666-ff55-4573-ac93-23bac1590864',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            skill: MENTOR_SKILLS.ADOBE_PHOTOSHOP,
            created_at: '2025-03-22T13:53:46.497Z',
        },
        {
            id: 'ea16e735-166d-46c1-96b3-f9d2b0ad8017',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            skill: MENTOR_SKILLS.ASP_NET,
            created_at: '2025-03-22T13:53:46.497Z',
        },
    ],
    mentorAvailableTimes: [],
}

const meta = {
    title: 'UserProfile/MentorPage',
    component: MentorPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        userData: mockMentorData,
    },
} satisfies Meta<typeof MentorPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        userData: mockMentorData,
    },
}
