import type { Meta, StoryObj } from '@storybook/react'
import EditProfileModal from './EditProfileModal'
import { fn } from '@storybook/test'
import { useEditProfileModalStore } from './store/EditProfileModalStore'
import { MentorProfileData } from '../../types'

const profileData: MentorProfileData = {
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
            discipline: 'Law',
            created_at: '2025-03-22T13:53:46.467Z',
        },
        {
            id: 'f89b1895-8c11-4576-af76-509675f4ba46',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            discipline: 'Engineering',
            created_at: '2025-03-22T13:53:46.467Z',
        },
    ],
    mentorTools: [
        {
            id: '01f11b4d-a2ff-4504-8bf4-e6b6f7482a66',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: 'Spring',
            created_at: '2025-03-22T13:53:46.525Z',
        },
        {
            id: 'f9256e1d-1b1c-46ef-9162-82449811bd18',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: 'Django',
            created_at: '2025-03-22T13:53:46.525Z',
        },
        {
            id: '5420bf0f-0db8-4f3f-8c13-2247f987028a',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            tool: 'Flask',
            created_at: '2025-03-22T13:53:46.525Z',
        },
    ],
    mentorSkills: [
        {
            id: '9065f666-ff55-4573-ac93-23bac1590864',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            skill: 'Flask',
            created_at: '2025-03-22T13:53:46.497Z',
        },
        {
            id: 'ea16e735-166d-46c1-96b3-f9d2b0ad8017',
            mentorId: 'f029c005-b7ff-4c20-ab76-9af9a683385f',
            skill: 'Node.js',
            created_at: '2025-03-22T13:53:46.497Z',
        },
    ],
    mentorAvailableTimes: [],
}

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal',
    component: EditProfileModal,
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
            useEditProfileModalStore.setState({
                isOpen: true,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof EditProfileModal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModalButton = () => {
    const openModal = useEditProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditProfileModal profileData={profileData} onSave={fn} />
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
