import type { Meta, StoryObj } from '@storybook/nextjs'
import ChattingArea from './ChattingArea'
import { UserForMember } from '~/api/user/types'
const userData: UserForMember = {
    id: '4e8c50f1-affd-41e9-9592-f90097fcab11',
    userName: 'testMember3',
    email: 'testmember3@gmail.com',
    avatar: 'https://codehelp-backend-production.up.railway.app/image/7badadf6-5e02-4c8a-9141-60503d2ab61b',
    gender: 'm',
    country: 'AF',
    title: 'frontend',
    company: 'ABCcompany',
    phoneNumber: '+886 0909 909 990   ',
    emailOtp: false,
    introduction: 'i am testMember3',
    level: 6,
    fieldOfWork: ['Fullstack Development', 'Frontend Development'],
    created_at: '2025-05-18T14:23:57.596Z',
    updated_at: '2025-05-18T14:46:57.667Z',
}

const meta = {
    title: 'Chat/ChattingArea',
    component: ChattingArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        chatroomId: '',
    },
} satisfies Meta<typeof ChattingArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        chatroomId: '',
        userData: userData,
    },
}
