import type { Meta, StoryObj } from '@storybook/nextjs'
import MemberPage from './MemberPage'

const meta = {
    title: 'UserProfile/MemberPage',
    component: MemberPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        userData: {
            id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
            userName: 'testMember1',
            email: 'testmember1@gmail.com',
            avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
            gender: 'm',
            country: 'AG',
            title: 'title',
            company: 'company',
            phoneNumber: '0909090000',
            emailOtp: false,
            introduction: 'hello',
            level: 1,
            fieldOfWork: ['work1'],
            created_at: '2025-03-09T03:38:23.402Z',
            updated_at: '2025-03-09T03:38:23.402Z',
        },
    },
} satisfies Meta<typeof MemberPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        userData: {
            id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
            userName: 'testMember1',
            email: 'testmember1@gmail.com',
            avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
            gender: 'm',
            country: 'AG',
            title: 'title',
            company: 'company',
            phoneNumber: '0909090000',
            emailOtp: false,
            introduction: 'hello',
            level: 1,
            fieldOfWork: ['work1'],
            created_at: '2025-03-09T03:38:23.402Z',
            updated_at: '2025-03-09T03:38:23.402Z',
        },
    },
}
