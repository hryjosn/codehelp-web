import type { Meta, StoryObj } from '@storybook/react'
import EditMemberProfileModal from './EditMemberProfileModal'
import { fn } from '@storybook/test'
import { useEditMemberProfileModalStore } from './store/EditMemberProfileModalStore'
import { MemberProfileData } from '../../types'

const profileData: MemberProfileData = {
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
    level: 2,
    fieldOfWork: ['Fullstack Development', 'Frontend Development'],
    created_at: '2025-05-18T14:23:57.596Z',
    updated_at: '2025-05-18T14:38:16.052Z',
}

const meta = {
    title: 'UserProfile/MemberPage/EditMemberProfileModal',
    component: EditMemberProfileModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        profileData: profileData,
        onSave: fn(),
    },
    decorators: [
        (Story) => {
            useEditMemberProfileModalStore.setState({
                isOpen: true,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof EditMemberProfileModal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModalButton = () => {
    const openModal = useEditMemberProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditMemberProfileModal profileData={profileData} onSave={fn} />
        </>
    )
}

export const Default: Story = {
    args: {
        profileData: profileData,
        onSave: fn(),
    },
    render: OpenModalButton,
}
