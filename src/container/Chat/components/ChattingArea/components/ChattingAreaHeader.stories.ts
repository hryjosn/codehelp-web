import type { Meta, StoryObj } from '@storybook/nextjs'
import ChattingAreaHeader from './ChattingAreaHeader'

const meta = {
    title: 'Chat/ChattingArea/Components/ChattingAreaHeader',
    component: ChattingAreaHeader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        avatar: '',
        userName: '',
    },
} satisfies Meta<typeof ChattingAreaHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        avatar: 'https://codehelp-backend-production.up.railway.app/image/7badadf6-5e02-4c8a-9141-60503d2ab61b',
        userName: 'testMember3',
    },
}
