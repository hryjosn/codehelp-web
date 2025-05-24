import type { Meta, StoryObj } from '@storybook/react'
import UploadAvatar from './UploadAvatar'
import { fn } from '@storybook/test'
import { useEditProfileModalStore } from '../EditProfileModal/store/EditProfileModalStore'
import { avatarChange } from '../../utils'

const meta = {
    title: 'UserProfile/MentorPage/UploadAvatar',
    component: UploadAvatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        avatarPreview: '',
        userName: 'test1',
        onChange: fn(),
    },
} satisfies Meta<typeof UploadAvatar>

export default meta
type Story = StoryObj<typeof meta>

const RenderUploadAvatar = () => {
    const newMentorInfo = useEditProfileModalStore(
        (state) => state.newMentorInfo
    )

    return (
        <UploadAvatar
            userName={newMentorInfo.userName}
            avatarPreview={newMentorInfo.avatar}
            onChange={avatarChange}
        />
    )
}

export const Default: Story = {
    args: {
        avatarPreview: '',
        userName: 'test1',
        onChange: fn(),
    },
    render: RenderUploadAvatar,
}
