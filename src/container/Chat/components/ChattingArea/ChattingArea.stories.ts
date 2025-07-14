import type { Meta, StoryObj } from '@storybook/react'
import ChattingArea from './ChattingArea'
import { UserForMember } from '~/api/user/types'
import { ChatroomInfoT } from '../../store/type'
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

const chatroomData: ChatroomInfoT = {
    id: 'a67fabfc-c0cf-4f58-afbb-67e1f683ba8b',
    created_at: '2025-04-28T08:03:29.251Z',
    member: {
        id: 'd0430160-988e-4aa6-a35f-3a559651a334',
        userName: 'testmember2',
        avatar: 'https://codehelp-backend-production.up.railway.app/image/72578fde-d3d0-4bd9-83e0-90141d0fc123',
    },
    mentor: {
        id: '7f366868-a86f-491f-bc23-4bcf0ff8718d',
        userName: 'testmentor8',
        avatar: 'https://codehelp-backend-production.up.railway.app/image/a8e4ab41-0e86-4418-b609-b2be579ee91b',
    },
    messages: [
        {
            id: 'fd70ebad-e3dd-43d8-ae3a-c167d3f8b785',
            userId: 'd0430160-988e-4aa6-a35f-3a559651a334',
            content: 'hello 111',
            created_at: '2025-04-28T08:03:44.502Z',
        },
        {
            id: '7972a7df-d767-4431-a245-8c05f5470fd4',
            userId: 'd0430160-988e-4aa6-a35f-3a559651a334',
            content: 'grsg',
            created_at: '2025-04-28T14:48:02.535Z',
        },
    ],
}

const meta = {
    title: 'Chat/ChattingArea',
    component: ChattingArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        chatroomData,
        userData,
    },
} satisfies Meta<typeof ChattingArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        chatroomData,
        userData,
    },
}
