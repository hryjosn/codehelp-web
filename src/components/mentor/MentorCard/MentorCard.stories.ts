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
        disciplines: [
            MENTOR_DISCIPLINES.BIOLOGY,
            MENTOR_DISCIPLINES.BUSINESS_ADMINISTRATION,
        ],
        skills: [MENTOR_SKILLS.ADOBE_PHOTOSHOP, MENTOR_SKILLS.ANGULAR],
        tools: [MENTOR_TOOLS.ADOBE_PHOTOSHOP],
        createdAt: '2024-11-24T06:44:51.411Z',
        updatedAt: '2024-11-24T06:44:51.411Z',
        education: "海事資訊科技系$%$高雄科技大學'",
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
