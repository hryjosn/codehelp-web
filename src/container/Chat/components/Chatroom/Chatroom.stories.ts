import type { Meta, StoryObj } from '@storybook/react'
import Chatroom from './Chatroom'

const meta = {
    title: 'Chat/Chatroom',
    component: Chatroom,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        id: '1',
        userName: 'teacher1',
        avatar: '/MentorList/mentor_1.jpg',
    },
} satisfies Meta<typeof Chatroom>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
